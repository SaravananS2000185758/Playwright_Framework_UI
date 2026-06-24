# Framework Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Architecture Diagram](#architecture-diagram)
4. [Core Components](#core-components)
5. [Execution Flow](#execution-flow)
6. [Design Patterns](#design-patterns)
7. [Configuration](#configuration)
8. [Extensibility](#extensibility)
9. [Best Practices](#best-practices)

---

## Overview

This Playwright Automation Framework implements a **Hybrid Framework** design combining:
- **Page Object Model (POM)** - Maintainability and reusability
- **Action-Driven Testing** - Centralized action methods
- **Assertion Separation** - Dedicated hard and soft assertion layer
- **Data-Driven Approach** - JSON data integration via `testData.json`
- **Custom Fixtures** - Pre-configured test setup with hooks
- **Config-Driven Test Selection** - `test/execution.config.properties` controls which suites and tags are executed
- **Allure + HTML + JUnit Reporting** - Multi-reporter setup

---

## Folder Structure

```
Playwright_Framework_UI/
│
├── .github/
│   └── workflows/
│       └── playwright.yml                  # GitHub Actions CI/CD
│
├── src/
│   └── ui/
│       ├── actions/
│       │   └── actions.ts                  # All UI interaction methods
│       ├── assertions/
│       │   └── assertions.ts               # Hard + soft assertion methods
│       ├── commonMethods/
│       │   └── commonMethods.ts            # Navigation + utility methods
│       ├── fixtures/
│       │   └── fixtures.ts                 # Custom fixtures + beforeEach/afterEach
│       ├── locators/
│       │   ├── automationExcercise.locator.ts  # Static locators for AE site
│       │   └── inbuildLocators.ts              # Playwright built-in locator wrappers
│       ├── pages/
│       │   └── automationExcercise.page.ts     # Page object for AE site
│       └── utils/
│           ├── logger.ts                   # Winston logger (console + file)
│           ├── dataUtils.ts                # JSON/Excel readers + helpers
│           └── executionConfig.ts          # Reads config.properties → grep pattern
│
├── test/
│   ├── data/
│   │   └── testData.json                   # JSON test data (1 record)
│   ├── ui/
│   │   └── specs/
│   │       └── automationExcercise.spec.ts # @smoke + @regression tests
│   └── execution.config.properties         # Suite/tag execution control
│
├── reports/
│   ├── allure-results/                     # Allure raw results
│   ├── html-report/                        # Playwright HTML report
│   ├── logs/
│   │   ├── all.log                         # All log entries
│   │   └── error.log                       # Error-only logs
│   ├── junit.xml                           # JUnit XML report
│   └── test-results.json                   # JSON report
│
├── allure-results/                         # Root-level Allure results
├── test-results/                           # Playwright traces + videos
├── .env                                    # Local env config (NOT committed)
├── playwright.config.ts                    # Playwright configuration
├── test.sets.ts                            # Logical suite definitions
├── tsconfig.json                           # TypeScript config
├── package.json                            # Dependencies + npm scripts
├── azure-pipelines.yml                     # Azure DevOps pipeline
├── verify-setup.js                         # Setup verification script
├── ARCHITECTURE.md                         # This file
├── COMPLETION_REPORT.md                    # Completion status report
├── FRAMEWORK_PROMPT.md                     # AI scaffolding prompt
├── README.md                               # Main documentation
├── INSTALLATION.md                         # Installation guide
└── QUICKSTART.md                           # Quick start guide
```

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CONFIGURATION LAYER                           │
│                                                                      │
│   .env file                    execution.config.properties           │
│   ├── BASE_URL                 ├── feature.enabled = false           │
│   ├── HEADLESS (hardcoded:off) ├── feature.tagName = smoke           │
│   ├── WORKERS=1                ├── e2e.enabled = true                │
│   ├── LOG_LEVEL=info           └── e2e.tagName = regression          │
│   ├── ACTION_TIMEOUT=10000                  │                        │
│   └── NAVIGATION_TIMEOUT=30000             ▼                        │
│                                  executionConfig.ts                  │
│                                  └── buildGrepPattern()              │
│                                      → "@regression"                 │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     playwright.config.ts                             │
│                                                                      │
│  - testDir: test/ui/specs                                            │
│  - fullyParallel: false, workers: 1 (default)                        │
│  - headless: false (always headed locally)                           │
│  - Reporters: HTML, JSON, JUnit, Allure, List                        │
│  - Projects: chromium (firefox/webkit commented out)                 │
│  - grep: from buildGrepPattern()                                     │
│  - retries: 0 (local) / 2 (CI)                                       │
│  - screenshot/video/trace: on                                        │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                  TEST SPEC LAYER                                      │
│         test/ui/specs/automationExcercise.spec.ts                    │
│                                                                      │
│  test.describe('Automation Excercise Page Tests', () => {            │
│    test('@smoke ...', async ({ automationExcercisePage, testData })  │
│    test('@regression ...', async ({ automationExcercisePage, testData│
│  });                                                                 │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     FIXTURES LAYER                                   │
│                 src/ui/fixtures/fixtures.ts                          │
│                                                                      │
│  Provides:                                                           │
│  ├── automationExcercisePage  → AutomationExcercisePage instance     │
│  ├── commonMethods            → CommonMethods instance               │
│  └── testData                 → JSON array from testData.json        │
│                                                                      │
│  beforeEach:                                                         │
│  ├── Read BASE_URL (throws if missing)                               │
│  ├── page.goto(BASE_URL)                                             │
│  └── commonMethods.waitForPageLoad(30000, 'load')                    │
│                                                                      │
│  afterEach:                                                          │
│  └── page.context().clearCookies()                                   │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    PAGE OBJECT LAYER                                 │
│            src/ui/pages/automationExcercise.page.ts                  │
│                                                                      │
│  AutomationExcercisePage                                             │
│  ├── constructor(page)                                               │
│  │   ├── new Actions(page)                                           │
│  │   ├── new Assertions(page)                                        │
│  │   ├── new CommonMethods(page)                                     │
│  │   └── new InbuildLocators(page)                                   │
│  └── validateAutomationExcerciseHomePage(data)                       │
│      ├── waitForPageLoad (networkidle, 3000ms)                        │
│      ├── click(signuplink)                                           │
│      ├── fill(emailAddress, data.username)                           │
│      ├── fill(password, data.password)                               │
│      ├── click(loginButton)                                          │
│      ├── waitForElementVisible(productsLabel, 5000ms)                │
│      ├── click(addToCartButton)                                      │
│      ├── waitForElementVisible(cartAdded, 5000ms)                    │
│      └── click(continueShoppingButton)                               │
└──────────┬───────────────────────────────────────────────────────────┘
           │
     ┌─────┴──────────────────┐
     ▼                        ▼
┌─────────────────┐   ┌──────────────────────────────────────────────┐
│  ACTIONS LAYER  │   │              ASSERTIONS LAYER                │
│  actions.ts     │   │              assertions.ts                   │
│                 │   │                                              │
│ click()         │   │  Hard:              Soft:                    │
│ fill()          │   │  validateText()     softValidateText()       │
│ selectDropdown()│   │  validateVisible()  softValidateVisible()    │
│ getCount()      │   │  validateEnabled()  softValidateAttribute()  │
│ getLength()     │   │  validateHidden()   softAssertEqual()        │
│ isVisible()     │   │  validateDisabled() getSoftErrors()          │
│ isDisabled()    │   │  validateAttribute()clearSoftErrors()        │
│ getAttribute()  │   │  validateTitle()    throwSoftErrors()        │
│ getText()       │   │  validateURL()                               │
│ hover()         │   │  assertEqual()                               │
│ scrollToElement()   └──────────────────────────────────────────────┘
│ navigateTo()    │
│ waitForPageLoad()
│ waitForElement()
│ waitForElementVisible()
│ refreshPage()   │
│ pressKey()      │
│ wait()          │
│ sleep()         │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       LOCATORS LAYER                                │
│                                                                     │
│  automationExcercise.locator.ts (static CSS/XPath selectors)        │
│  ├── signuplink        = 'a[href="/login"]'                         │
│  ├── emailAddress      = 'input[data-qa="login-email"]'             │
│  ├── password          = 'input[data-qa="login-password"]'          │
│  ├── loginButton       = 'button[data-qa="login-button"]'           │
│  ├── productsLabel     = 'a[href="/products"]:has-text("Products")' │
│  ├── addToCartButton   = XPath for product 1 add-to-cart            │
│  ├── cartAdded         = XPath for cart success message             │
│  └── continueShoppingButton = XPath for continue shopping           │
│                                                                     │
│  inbuildLocators.ts (Playwright semantic locator wrappers)          │
│  ├── getByRole(role, name?)                                         │
│  ├── getByText(text)                                                │
│  ├── getByLabel(label)                                              │
│  ├── getByPlaceholder(placeholder)                                  │
│  ├── getByAltText(altText)                                          │
│  ├── getByTitle(title)                                              │
│  └── getByTestId(testId)                                            │
└─────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     PLAYWRIGHT CORE (Browser API)                   │
│  Page instance → Browser context → Chromium (primary)              │
└─────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    UTILITIES & LOGGING LAYER                        │
│                                                                     │
│  logger.ts (Winston)                                                │
│  ├── getLogger('ModuleName') → child logger with context            │
│  ├── Console transport (colorized)                                  │
│  ├── File → reports/logs/all.log (5MB, 5 files rotation)            │
│  └── File → reports/logs/error.log (errors only)                   │
│                                                                     │
│  dataUtils.ts                                                       │
│  ├── readJSONData<T>(filePath) → T[]                                │
│  ├── readExcelData(filePath, sheetName?) → Record[]                 │
│  ├── getTimestamp(format)                                           │
│  ├── generateUniqueId()                                             │
│  ├── retry(fn, retries, delay)                                      │
│  ├── wait(milliseconds)                                             │
│  └── randomDelay(min, max)                                          │
│                                                                     │
│  executionConfig.ts                                                 │
│  ├── loadExecutionConfig() → reads execution.config.properties      │
│  └── buildGrepPattern()   → "@smoke" | "@regression" | both | undef │
└─────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       REPORTING LAYER                               │
│                                                                     │
│  HTML Report   → reports/html-report/index.html                     │
│  JSON Report   → reports/test-results.json                          │
│  JUnit Report  → reports/junit.xml                                  │
│  Allure Report → reports/allure-results/ (generate with allure CLI) │
│  Logs          → reports/logs/all.log + error.log                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Actions Layer (`src/ui/actions/actions.ts`)
Centralizes all UI interactions. Every method accepts `Locator | string` and an optional log message.

| Method | Description |
|--------|-------------|
| `click(locator, message?)` | Click an element |
| `fill(locator, value, message?)` | Fill an input field |
| `selectDropdown(locator, value, message?)` | Select dropdown option |
| `getCount(locator, message?)` | Get element count |
| `getLength(locator, message?)` | Alias for getCount |
| `isVisible(locator, message?)` | Returns boolean visibility |
| `isDisabled(locator, message?)` | Returns boolean disabled state |
| `getAttribute(locator, attr, message?)` | Get attribute value |
| `getText(locator, message?)` | Get text content |
| `hover(locator, message?)` | Hover over element |
| `scrollToElement(locator, message?)` | Scroll element into view |
| `navigateTo(url, message?)` | Navigate to URL |
| `waitForPageLoad(timeout, state, message?)` | Wait for load state |
| `waitForElement(locator, timeout, message?)` | Wait for element |
| `waitForElementVisible(locator, timeout, message?)` | Alias for waitForElement |
| `refreshPage(message?)` | Reload the page |
| `pressKey(key, message?)` | Press keyboard key |
| `wait(ms, message?)` | Wait for milliseconds |
| `sleep(ms, message?)` | Alias for wait |

### 2. Assertions Layer (`src/ui/assertions/assertions.ts`)

**Hard Assertions** — test fails immediately on failure:

| Method | Description |
|--------|-------------|
| `validateText(locator, text, message?)` | Exact text match |
| `validateContainsText(locator, text, message?)` | Partial text match |
| `validateVisible(locator, message?)` | Element is visible |
| `validateEnabled(locator, message?)` | Element is enabled |
| `validateHidden(locator, message?)` | Element is hidden |
| `validateDisabled(locator, message?)` | Element is disabled |
| `validateAttribute(locator, attr, value, message?)` | Attribute value match |
| `validateTitle(title, message?)` | Page title match |
| `validateURL(url, message?)` | Page URL match |
| `assertEqual(actual, expected, message?)` | Value equality (sync) |

**Soft Assertions** — errors collected, test continues:

| Method | Description |
|--------|-------------|
| `softValidateText(locator, text, message?)` | Collect text mismatch |
| `softValidateVisible(locator, message?)` | Collect visibility failure |
| `softValidateAttribute(locator, attr, value, message?)` | Collect attribute failure |
| `softAssertEqual(actual, expected, message?)` | Collect equality failure |
| `getSoftErrors()` | Returns collected errors array |
| `clearSoftErrors()` | Clears collected errors |
| `throwSoftErrors()` | Throws all collected errors at once |

### 3. Page Object (`src/ui/pages/automationExcercise.page.ts`)
Encapsulates all interactions with the Automation Exercise website.

```typescript
export class AutomationExcercisePage {
  constructor(page: Page) {
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    this.commonMethods = new CommonMethods(page);
    this.inbuildLocators = new InbuildLocators(page);
  }

  async validateAutomationExcerciseHomePage(data: { username: string; password: string }): Promise<void> {
    // waitForPageLoad → click signuplink → fill email/password
    // → click login → waitForProductsLabel → addToCart → continueShopping
  }
}
```

### 4. Locators

**`src/ui/locators/automationExcercise.locator.ts`** — Static CSS/XPath selectors:
```typescript
export class AutomationExcerciseLocators {
  static readonly signuplink         = 'a[href="/login"]';
  static readonly emailAddress       = 'input[data-qa="login-email"]';
  static readonly password           = 'input[data-qa="login-password"]';
  static readonly loginButton        = 'button[data-qa="login-button"]';
  static readonly productsLabel      = 'a[href="/products"]:has-text("Products")';
  static readonly addToCartButton    = '(//div[@class="productinfo text-center"]/a[@data-product-id=\'1\'])[1]';
  static readonly cartAdded          = '//p[text()="Your product has been added to cart."]';
  static readonly continueShoppingButton = '//button[text()="Continue Shopping"]';
}
```

**`src/ui/locators/inbuildLocators.ts`** — Playwright semantic locator wrappers (instance-based):
```typescript
export class InbuildLocators {
  getByRole(role, name?)
  getByText(text)
  getByLabel(label)
  getByPlaceholder(placeholder)
  getByAltText(altText)
  getByTitle(title)
  getByTestId(testId)
}
```

### 5. Fixtures (`src/ui/fixtures/fixtures.ts`)
Single fixture file providing all test dependencies.

```typescript
// Available in every test:
automationExcercisePage  // AutomationExcercisePage instance
commonMethods            // CommonMethods instance
testData                 // Record<string, string>[] from testData.json

// Automatic hooks:
beforeEach → page.goto(BASE_URL) + commonMethods.waitForPageLoad(30000, 'load')
afterEach  → page.context().clearCookies()
```

### 6. CommonMethods (`src/ui/commonMethods/commonMethods.ts`)

| Method | Description |
|--------|-------------|
| `navigateToLogin()` | Navigate to `BASE_URL/login` |
| `refreshPage()` | Reload current page |
| `goBack()` | Browser back navigation |
| `getPageTitle()` | Returns current page title |
| `getCurrentURL()` | Returns current URL |
| `waitForPageLoad(timeout, state, message?)` | Delegates to actions.waitForPageLoad |
| `closeBrowser()` | Closes browser instance |

### 7. Logger (`src/ui/utils/logger.ts`)

```typescript
const logger = getLogger('MyModule');
logger.error('...')   // → console + all.log + error.log
logger.warn('...')    // → console + all.log
logger.info('...')    // → console + all.log
logger.debug('...')   // → all.log (if LOG_LEVEL allows)
```

Format: `[YYYY-MM-DD HH:mm:ss] [LEVEL] message`

### 8. Data Utilities (`src/ui/utils/dataUtils.ts`)

| Function | Description |
|----------|-------------|
| `readJSONData<T>(filePath)` | Parse JSON file into typed array |
| `readExcelData(filePath, sheetName?)` | Parse Excel sheet into array |
| `getTimestamp(format)` | Returns formatted timestamp string |
| `generateUniqueId()` | Returns `timestamp_randomstring` |
| `retry(fn, retries, delay)` | Retry async function on failure |
| `wait(ms)` | Promise-based delay |
| `randomDelay(min, max)` | Random delay between min and max ms |

### 9. Execution Config (`src/ui/utils/executionConfig.ts`)

```
feature.enabled=false + e2e.enabled=true + e2e.tagName=regression
→ buildGrepPattern() returns "@regression"
→ playwright.config.ts applies: grep: /@regression/
```

---

## Execution Flow

```
1. npx playwright test
   ├── playwright.config.ts loads .env
   ├── buildGrepPattern() reads execution.config.properties
   └── grep "@regression" applied → only @regression tests run

2. beforeEach (fixtures.ts)
   ├── page.goto(BASE_URL)
   └── commonMethods.waitForPageLoad('load', 30000ms)

3. Test body
   └── automationExcercisePage.validateAutomationExcerciseHomePage(testData[0])
       ├── actions.waitForPageLoad('networkidle', 3000ms)
       ├── actions.click(signuplink)
       ├── actions.fill(emailAddress, username)
       ├── actions.fill(password, password)
       ├── actions.click(loginButton)
       ├── actions.waitForElementVisible(productsLabel, 5000ms)
       ├── actions.click(addToCartButton)
       ├── actions.waitForElementVisible(cartAdded, 5000ms)
       └── actions.click(continueShoppingButton)

4. afterEach (fixtures.ts)
   └── page.context().clearCookies()

5. Reporting
   ├── HTML  → reports/html-report/index.html
   ├── JSON  → reports/test-results.json
   ├── JUnit → reports/junit.xml
   ├── Allure→ reports/allure-results/
   └── Logs  → reports/logs/all.log + error.log
```

---

## Design Patterns

### Page Object Model (POM)
Each page is a class. Page methods represent user workflows. Locators are in separate files.

### Action Layer Pattern
All Playwright interactions go through the `Actions` class — single source of truth with consistent error handling and logging.

### Assertion Layer Pattern
Hard and soft assertions separated from test logic. Soft assertions collect all failures before throwing.

### Fixture Pattern
Dependency injection via Playwright fixtures. Page objects, common methods, and test data are injected — never instantiated in tests.

### Data-Driven Pattern
Test data stored in `test/data/testData.json`. Loaded automatically via the `testData` fixture.

### Config-Driven Execution
`execution.config.properties` controls which suite runs without modifying test code or CLI args.

---

## Configuration

### .env Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | - | Target application URL |
| `WORKERS` | `1` | Parallel workers |
| `RETRIES` | `0` (local) / `2` (CI) | Retry count on failure |
| `LOG_LEVEL` | `info` | Winston log level |
| `ACTION_TIMEOUT` | `10000` | Action timeout (ms) |
| `NAVIGATION_TIMEOUT` | `30000` | Navigation timeout (ms) |
| `VIEWPORT_WIDTH` | `1920` | Browser viewport width |
| `VIEWPORT_HEIGHT` | `1080` | Browser viewport height |
| `UPDATE_SNAPSHOTS` | - | Set `true` to update snapshots |

> Note: `headless` is hardcoded to `false` in `playwright.config.ts` (always headed locally).

### execution.config.properties

| Property | Current Value | Description |
|----------|--------------|-------------|
| `feature.enabled` | `false` | Enable/disable feature suite |
| `feature.tagName` | `smoke` | Tag for feature suite |
| `e2e.enabled` | `true` | Enable/disable e2e suite |
| `e2e.tagName` | `regression` | Tag for e2e suite |

### playwright.config.ts Key Settings
- `testDir`: `test/ui/specs`
- `fullyParallel`: `false`
- `workers`: from `WORKERS` env var (default `1`)
- `headless`: `false` (hardcoded — always headed)
- `screenshot`: `only-on-failure`
- `video`: `on`
- `trace`: `on`
- `retries`: `0` locally, `2` in CI
- Active project: `chromium` only (firefox/webkit commented out)
- Reporters: HTML, JSON, JUnit, Allure, List

### test.sets.ts

```typescript
export const testSets = {
  feature: {
    description: 'Feature suite for smoke-tagged validation',
    tests: ['@smoke Verify Automation Excercise Page successfully'],
  },
  e2e: {
    description: 'E2E suite for regression-tagged validation',
    tests: ['@regression Verify Automation Excercise Page successfully'],
  },
};
```

---

## Extensibility

### Adding a New Page

```
1. src/ui/locators/newPage.locator.ts     → define static locators
2. src/ui/pages/newPage.page.ts           → create page class
3. src/ui/fixtures/fixtures.ts            → add fixture entry
4. test/ui/specs/newPage.spec.ts          → write tests
```

### Adding a New Action
```typescript
async doubleClick(locator: Locator | string, message?: string): Promise<void> {
  const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  await element.dblclick();
  logger.info(this.formatSuccess(message));
}
```

### Adding a New Assertion
```typescript
async validateCount(locator: Locator | string, expected: number, message?: string): Promise<void> {
  const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  await expect(element).toHaveCount(expected);
  logger.info(this.formatSuccess(message));
}
```

---

## Best Practices

1. Always use `Actions` methods — never call Playwright API directly in page objects
2. Keep all selectors in `*.locator.ts` files — never hardcode in page objects or tests
3. Use `getLogger('ClassName')` in every file for contextual logging
4. Use soft assertions when validating multiple things in one test
5. Always call `throwSoftErrors()` at the end of tests using soft assertions
6. Control test execution via `execution.config.properties` — not CLI flags
7. Set `HEADLESS=false` in `.env` for local debugging (already hardcoded in config)
8. Store all test data in `test/data/testData.json`
9. Never commit `.env` — it is git-ignored
10. Use `InbuildLocators` for semantic/accessible selectors where applicable

---

**Framework Version**: 1.0.0
**Last Updated**: 2025
**CI/CD Provider**: GitHub Actions / Azure DevOps
**Target Application**: https://automationexercise.com
