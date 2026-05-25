# Framework Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Actual Folder Structure](#actual-folder-structure)
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
- **CircleCI Pipeline** - Ready-to-use CI/CD configuration

---

## Actual Folder Structure

```
Playwright_Framework_UI/
│
├── .circleci/
│   └── config.yml                          # CircleCI pipeline (3 workflows)
│
├── .github/
│   └── workflows/
│       └── playwright.yml                  # GitHub Actions pipeline
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
│       │   └── automationExcercise.locator.ts  # Static locators for AE site
│       ├── pages/
│       │   └── automationExcercise.page.ts     # Page object for AE site
│       └── utils/
│           ├── logger.ts                   # Winston logger (console + file)
│           ├── dataUtils.ts                # JSON/CSV/Excel readers + helpers
│           └── executionConfig.ts          # Reads config.properties → grep pattern
│
├── test/
│   ├── data/
│   │   └── testData.json                   # JSON test data (5 records)
│   ├── specs/
│   │   └── automationExcercise.spec.ts     # @smoke + @regression tests
│   └── execution.config.properties         # Suite/tag execution control
│
├── reports/
│   ├── html-report/                        # Playwright HTML report
│   ├── logs/
│   │   ├── all.log                         # All log entries
│   │   └── error.log                       # Error-only logs
│   ├── junit.xml                           # JUnit XML report
│   └── test-results.json                   # JSON report
│
├── test-results/                           # Playwright traces + screenshots
├── .env                                    # Local env config (NOT committed)
├── playwright.config.ts                    # Playwright configuration
├── test.sets.ts                            # Logical suite definitions
├── tsconfig.json                           # TypeScript config
├── package.json                            # Dependencies + npm scripts
├── azure-pipelines.yml                     # Azure DevOps pipeline
├── verify-setup.js                         # Setup verification script
├── ARCHITECTURE.md                         # This file
├── CIRCLECI.md                             # CircleCI documentation
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
│   ├── HEADLESS=false           ├── feature.tagName = smoke           │
│   ├── WORKERS=4                ├── e2e.enabled = true                │
│   ├── LOG_LEVEL=info           └── e2e.tagName = regression          │
│   ├── ACTION_TIMEOUT                        │                        │
│   └── NAVIGATION_TIMEOUT                    ▼                        │
│                                  executionConfig.ts                  │
│                                  └── buildGrepPattern()              │
│                                      → "@regression"                 │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     playwright.config.ts                             │
│                                                                      │
│  - Loads .env via dotenv                                             │
│  - Sets headless, workers, viewport, timeouts                        │
│  - Applies grep pattern from buildGrepPattern()                      │
│  - Configures reporters: HTML, JSON, JUnit, List                     │
│  - Projects: chromium, firefox, webkit                               │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                  TEST SPEC LAYER                                      │
│              test/specs/automationExcercise.spec.ts                  │
│                                                                      │
│  test.describe('Automation Excercise Page Tests', () => {            │
│    test('@smoke ...', async ({ automationExcercisePage }) => {})     │
│    test('@regression ...', async ({ automationExcercisePage }) => {})│
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
│  ├── Navigate to BASE_URL                                            │
│  └── Wait for page load (networkidle, 30s)                           │
│                                                                      │
│  afterEach:                                                          │
│  └── Clear cookies                                                   │
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
│  │   └── new CommonMethods(page)                                     │
│  └── validateAutomationExcerciseHomePage()                           │
│      ├── waitForPageLoad (networkidle)                               │
│      ├── navigateToLogin()                                           │
│      ├── fill(emailAddress, value)                                   │
│      ├── fill(password, value)                                       │
│      ├── click(loginButton)                                          │
│      └── waitForElementVisible(productsLabel)                        │
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
│ scrollToElement()│  └──────────────────────────────────────────────┘
│ navigateTo()    │
│ waitForPageLoad()│
│ waitForElement() │
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
│            src/ui/locators/automationExcercise.locator.ts           │
│                                                                     │
│  AutomationExcerciseLocators                                        │
│  ├── emailAddress   = 'input[data-qa="login-email"]'                │
│  ├── password       = 'input[data-qa="login-password"]'             │
│  ├── loginButton    = 'button[data-qa="login-button"]'              │
│  └── productsLabel  = 'a[href="/products"]:has-text("Products")'    │
└────────┬────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     PLAYWRIGHT CORE (Browser API)                   │
│                                                                     │
│  Page instance → Browser context → Chromium / Firefox / WebKit     │
└────────┬────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    UTILITIES & LOGGING LAYER                        │
│                                                                     │
│  logger.ts                                                          │
│  ├── Winston logger with context (getLogger('ModuleName'))          │
│  ├── Console transport (colorized)                                  │
│  ├── File transport → reports/logs/all.log (5MB, 5 files)           │
│  └── Error transport → reports/logs/error.log (5MB, 5 files)        │
│                                                                     │
│  dataUtils.ts                                                       │
│  ├── readJSONData(filePath)                                         │
│  ├── readExcelData(filePath, sheetName?)                            │
│  ├── getTimestamp(format)                                           │
│  ├── generateUniqueId()                                             │
│  ├── retry(fn, retries, delay)                                      │
│  ├── wait(milliseconds)                                             │
│  └── randomDelay(min, max)                                          │
│                                                                     │
│  executionConfig.ts                                                 │
│  ├── loadExecutionConfig() → reads execution.config.properties      │
│  └── buildGrepPattern()   → returns "@smoke" | "@regression" | both │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Actions Layer (`src/ui/actions/actions.ts`)
Centralizes all UI interactions. Every method accepts `Locator | string` and an optional log message.

| Method | Description |
|--------|-------------|
| `click(locator, message)` | Click an element |
| `fill(locator, value, message)` | Fill an input field |
| `selectDropdown(locator, value, message)` | Select dropdown option |
| `getCount(locator, message)` | Get element count |
| `getLength(locator, message)` | Alias for getCount |
| `isVisible(locator, message)` | Returns boolean visibility |
| `isDisabled(locator, message)` | Returns boolean disabled state |
| `getAttribute(locator, attr, message)` | Get attribute value |
| `getText(locator, message)` | Get text content |
| `hover(locator, message)` | Hover over element |
| `scrollToElement(locator, message)` | Scroll element into view |
| `navigateTo(url, message)` | Navigate to URL |
| `waitForPageLoad(timeout, state, message)` | Wait for load state |
| `waitForElement(locator, timeout, message)` | Wait for element |
| `waitForElementVisible(locator, timeout, message)` | Alias for waitForElement |
| `refreshPage(message)` | Reload the page |
| `pressKey(key, message)` | Press keyboard key |
| `wait(ms, message)` | Wait for milliseconds |
| `sleep(ms, message)` | Alias for wait |

### 2. Assertions Layer (`src/ui/assertions/assertions.ts`)
Provides hard and soft assertion strategies.

**Hard Assertions** — test fails immediately on failure:

| Method | Description |
|--------|-------------|
| `validateText(locator, text, message)` | Exact text match |
| `validateContainsText(locator, text, message)` | Partial text match |
| `validateVisible(locator, message)` | Element is visible |
| `validateEnabled(locator, message)` | Element is enabled |
| `validateHidden(locator, message)` | Element is hidden |
| `validateDisabled(locator, message)` | Element is disabled |
| `validateAttribute(locator, attr, value, message)` | Attribute value match |
| `validateTitle(title, message)` | Page title match |
| `validateURL(url, message)` | Page URL match |
| `assertEqual(actual, expected, message)` | Value equality |

**Soft Assertions** — errors collected, test continues:

| Method | Description |
|--------|-------------|
| `softValidateText(locator, text, message)` | Collect text mismatch |
| `softValidateVisible(locator, message)` | Collect visibility failure |
| `softValidateAttribute(locator, attr, value, message)` | Collect attribute failure |
| `softAssertEqual(actual, expected, message)` | Collect equality failure |
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
  }

  async validateAutomationExcerciseHomePage(): Promise<void> {
    // waitForPageLoad → navigateToLogin → fill email → fill password
    // → click login → waitForElementVisible(productsLabel)
  }
}
```

### 4. Locators (`src/ui/locators/automationExcercise.locator.ts`)
Static class with all selectors for the Automation Exercise site.

```typescript
export class AutomationExcerciseLocators {
  static readonly emailAddress  = 'input[data-qa="login-email"]';
  static readonly password      = 'input[data-qa="login-password"]';
  static readonly loginButton   = 'button[data-qa="login-button"]';
  static readonly productsLabel = 'a[href="/products"]:has-text("Products")';
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
beforeEach → page.goto(BASE_URL) + waitForPageLoad
afterEach  → page.context().clearCookies()
```

### 6. CommonMethods (`src/ui/commonMethods/commonMethods.ts`)
Reusable navigation and page utility methods.

| Method | Description |
|--------|-------------|
| `navigateToLogin()` | Navigate to `BASE_URL/login` |
| `navigateToBooking()` | Navigate to `BASE_URL/booking` |
| `navigateToRetrieveBooking()` | Navigate to `BASE_URL/retrieve-booking` |
| `refreshPage()` | Reload current page |
| `goBack()` | Browser back navigation |
| `getPageTitle()` | Returns current page title |
| `getCurrentURL()` | Returns current URL |
| `waitForPageLoad(timeout, state, message)` | Delegates to actions.waitForPageLoad |
| `closeBrowser()` | Closes browser instance |
| `getPage()` | Returns raw Playwright Page |

### 7. Logger (`src/ui/utils/logger.ts`)
Winston-based logger with context support.

```typescript
const logger = getLogger('MyModule');
logger.error('...')    // → console + all.log + error.log
logger.warn('...')     // → console + all.log
logger.info('...')     // → console + all.log
logger.verbose('...')  // → all.log (if LOG_LEVEL allows)
logger.debug('...')    // → all.log (if LOG_LEVEL allows)
logger.silly('...')    // → all.log (if LOG_LEVEL allows)
```

Format: `[YYYY-MM-DD HH:mm:ss] [LEVEL] message`

### 8. Data Utilities (`src/ui/utils/dataUtils.ts`)

| Function | Description |
|----------|-------------|
| `readJSONData(filePath)` | Parse JSON file into typed array |
| `readExcelData(filePath, sheetName?)` | Parse Excel sheet into array |
| `getTimestamp(format)` | Returns formatted timestamp string |
| `generateUniqueId()` | Returns `timestamp_randomstring` |
| `retry(fn, retries, delay)` | Retry async function on failure |
| `wait(ms)` | Promise-based delay |
| `randomDelay(min, max)` | Random delay between min and max ms |

### 9. Execution Config (`src/ui/utils/executionConfig.ts`)
Reads `test/execution.config.properties` and builds the Playwright grep pattern.

```
feature.enabled=false + e2e.enabled=true + e2e.tagName=regression
→ buildGrepPattern() returns "@regression"
→ playwright.config.ts applies: grep: /@regression/
```

---

## Execution Flow

### Step-by-Step

```
1. npm run test / npx playwright test
   │
   ├─ playwright.config.ts loads .env
   ├─ buildGrepPattern() reads execution.config.properties
   └─ grep pattern applied → only matching tagged tests run
   │
2. beforeEach (fixtures.ts)
   ├─ page.goto(BASE_URL)
   └─ waitForPageLoad('load', 30000ms)
   │
3. Test body executes
   ├─ automationExcercisePage.validateAutomationExcerciseHomePage()
   │   ├─ actions.waitForPageLoad('networkidle', 3000ms)
   │   ├─ commonMethods.navigateToLogin()
   │   ├─ actions.fill(emailAddress, value)
   │   ├─ actions.fill(password, value)
   │   ├─ actions.click(loginButton)
   │   └─ actions.waitForElementVisible(productsLabel, 5000ms)
   └─ Each step logs via Winston logger
   │
4. afterEach (fixtures.ts)
   └─ page.context().clearCookies()
   │
5. Reporting
   ├─ HTML report → reports/html-report/index.html
   ├─ JSON report → reports/test-results.json
   ├─ JUnit XML  → reports/junit.xml
   └─ Logs       → reports/logs/all.log + error.log
```

---

## Design Patterns

### Page Object Model (POM)
Each page is a class. Page methods represent user workflows. Locators are in separate files.

### Action Layer Pattern
All Playwright interactions go through `Actions` class — single source of truth with consistent error handling and logging.

### Assertion Layer Pattern
Hard and soft assertions separated from test logic. Soft assertions collect all failures before throwing.

### Fixture Pattern
Dependency injection via Playwright fixtures. Page objects, common methods, and test data are injected — never instantiated in tests.

### Data-Driven Pattern
Test data stored in `test/data/testData.json`. Loaded automatically via `testData` fixture.

### Config-Driven Execution
`execution.config.properties` controls which suite runs without modifying test code or CLI args.

---

## Configuration

### .env Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | - | Target application URL |
| `HEADLESS` | `true` | `false` = headed (browser visible) |
| `WORKERS` | `4` | Parallel workers |
| `RETRIES` | `0` | Retry count on failure |
| `LOG_LEVEL` | `info` | Winston log level |
| `ACTION_TIMEOUT` | `10000` | Action timeout (ms) |
| `NAVIGATION_TIMEOUT` | `30000` | Navigation timeout (ms) |
| `VIEWPORT_WIDTH` | `1920` | Browser viewport width |
| `VIEWPORT_HEIGHT` | `1080` | Browser viewport height |

### execution.config.properties

| Property | Current Value | Description |
|----------|--------------|-------------|
| `feature.enabled` | `false` | Enable/disable feature suite |
| `feature.tagName` | `smoke` | Tag for feature suite |
| `e2e.enabled` | `true` | Enable/disable e2e suite |
| `e2e.tagName` | `regression` | Tag for e2e suite |

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
4. test/specs/newPage.spec.ts             → write tests
```

### Adding a New Action
```typescript
// In actions.ts
async doubleClick(locator: Locator | string, message?: string): Promise<void> {
  const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  await element.dblclick();
  logger.info(this.formatSuccess(message));
}
```

### Adding a New Assertion
```typescript
// In assertions.ts
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
7. Set `HEADLESS=false` in `.env` for local debugging
8. Store all test data in `test/data/testData.json`
9. Never commit `.env` — it is git-ignored

---

**Framework Version**: 1.0.0
**Last Updated**: 2025
**CI/CD Provider**: CircleCI
**Target Application**: https://automationexercise.com
