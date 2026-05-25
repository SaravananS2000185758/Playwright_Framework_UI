# Playwright Automation Framework - Hybrid Design Pattern

## Framework Overview

This is a **Playwright Automation Framework** built using **TypeScript** with a **Hybrid Framework** design pattern. It combines **Page Object Model (POM)** with **Data-Driven Testing** for scalability, maintainability, and reusability.

### Key Features
- **Page Object Model (POM)** - Encapsulates UI elements and interactions
- **Action Layer** - Centralized reusable action methods
- **Assertion Layer** - Hard and soft assertions
- **Custom Fixtures** - Pre-configured test fixtures with page objects and hooks
- **Data-Driven Testing** - JSON data support via `testData.json`
- **Winston Logger** - Comprehensive logging with file outputs
- **Parallel Execution** - Multi-browser and multi-worker support
- **Comprehensive Reporting** - HTML, JSON, and JUnit reports
- **Config-Driven Execution** - `test/execution.config.properties` controls enabled suites and tag selection
- **Cross-Browser Testing** - Chrome, Firefox, and Safari support
- **CircleCI Integration** - CI/CD pipeline configuration ready

---

## Folder Structure

```
Playwright_Framework_UI/
│
├── .circleci/
│   └── config.yml                      # CircleCI CI/CD pipeline configuration
│
├── .github/
│   └── workflows/
│       └── playwright.yml              # GitHub Actions CI/CD
│
├── src/
│   └── ui/
│       ├── actions/
│       │   └── actions.ts              # Action methods layer
│       ├── assertions/
│       │   └── assertions.ts           # Hard and soft assertions
│       ├── fixtures/
│       │   └── fixtures.ts             # Custom test fixtures with hooks + data loading
│       ├── locators/
│       │   └── automationExcercise.locator.ts  # Automation Exercise page locators
│       ├── pages/
│       │   └── automationExcercise.page.ts     # Automation Exercise page object
│       ├── commonMethods/
│       │   └── commonMethods.ts        # Reusable navigation and utility methods
│       └── utils/
│           ├── logger.ts               # Winston logger setup
│           ├── dataUtils.ts            # JSON/CSV/Excel reading utilities
│           └── executionConfig.ts      # Reads execution.config.properties and builds grep pattern
│
├── test/
│   ├── data/
│   │   └── testData.json               # JSON test data for data-driven tests
│   ├── specs/
│   │   └── automationExcercise.spec.ts # Automation Exercise test suite
│   └── execution.config.properties     # Controls which suites/tags are executed
│
├── reports/
│   ├── html-report/                    # HTML reports
│   ├── logs/                           # Log files (all.log, error.log)
│   ├── junit.xml                       # JUnit report
│   └── test-results.json               # JSON report
│
├── test-results/                       # Playwright test results & traces
│
├── .env                                # Environment configuration (NOT committed)
├── .gitignore                          # Git ignore rules
├── .prettierrc                         # Code formatting rules
├── azure-pipelines.yml                 # Azure DevOps CI/CD
├── playwright.config.ts                # Playwright configuration
├── tsconfig.json                       # TypeScript configuration
├── test.sets.ts                        # Test suite configuration
├── package.json                        # Project dependencies
├── verify-setup.js                     # Setup verification script
├── README.md                           # This file
├── ARCHITECTURE.md                     # Architecture documentation
├── CIRCLECI.md                         # CircleCI CI/CD documentation
├── INSTALLATION.md                     # Installation guide
└── QUICKSTART.md                       # Quick start guide
```

---

## Execution Flow Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Test Execution Flow                        │
└──────────────────────────────────────────────────────────────────┘

1. execution.config.properties
   └─→ Controls which suite/tag is active (feature or e2e)

2. executionConfig.ts
   └─→ Reads config and builds grep pattern for playwright.config.ts

3. playwright.config.ts
   └─→ Loads .env, sets headless/headed, workers, timeouts, reporters
   └─→ Applies grep pattern from executionConfig.ts

4. SPEC FILE (test/specs/*.spec.ts)
   └─→ Entry point of the test

5. FIXTURES (src/ui/fixtures/fixtures.ts)
   └─→ Provides:
       • automationExcercisePage instance
       • commonMethods instance
       • testData fixture (JSON data loading from testData.json)
       • beforeEach: navigates to BASE_URL, waits for page load
       • afterEach: clears cookies

6. PAGE OBJECTS (src/ui/pages/*.page.ts)
   └─→ Encapsulates page-specific workflows
       └─→ Constructor initializes:
           • Actions instance
           • Assertions instance
           • CommonMethods instance

7. ACTIONS LAYER (src/ui/actions/actions.ts)
   └─→ Reusable UI interaction methods:
       • click(), fill(), selectDropdown()
       • getText(), getAttribute(), isVisible(), isDisabled()
       • getCount(), getLength()
       • hover(), scrollToElement()
       • navigateTo(), waitForPageLoad()
       • waitForElement(), waitForElementVisible()
       • refreshPage(), pressKey(), wait(), sleep()

8. LOCATORS (src/ui/locators/*.locator.ts)
   └─→ Centralized static element selectors

9. ASSERTIONS LAYER (src/ui/assertions/assertions.ts)
   └─→ Hard Assertions: validateText(), validateContainsText(),
       validateVisible(), validateEnabled(), validateHidden(),
       validateDisabled(), validateAttribute(), validateTitle(),
       validateURL(), assertEqual()
   └─→ Soft Assertions: softValidateText(), softValidateVisible(),
       softValidateAttribute(), softAssertEqual(),
       getSoftErrors(), clearSoftErrors(), throwSoftErrors()

10. COMMON METHODS (src/ui/commonMethods/commonMethods.ts)
    └─→ navigateToLogin(), navigateToBooking(), navigateToRetrieveBooking()
    └─→ refreshPage(), goBack(), getPageTitle(), getCurrentURL()
    └─→ waitForPageLoad(), closeBrowser(), getPage()

11. LOGGER (src/ui/utils/logger.ts)
    └─→ Winston logger:
        • Console output (colorized)
        • File output → reports/logs/all.log
        • Error file → reports/logs/error.log
        • Timestamps and context per module

Flow Diagram:
┌─────────────────────────────────────────────────────────┐
│ execution.config.properties → executionConfig.ts        │
│ → playwright.config.ts (grep pattern + settings)        │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│ Spec File Test                                          │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│ Fixture (beforeEach)                                    │
│ - Navigate to BASE_URL                                  │
│ - Wait for page load                                    │
│ - Provide page object instances                         │
│ - Load testData.json                                    │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│ Page Object Methods                                     │
│ - automationExcercisePage.validateAutomationExcercise.. │
└──────────────┬──────────────────────────────────────────┘
               │
         ┌─────┴─────┐
         ▼           ▼
    ┌────────┐   ┌─────────────┐
    │Actions │   │ Assertions  │
    └────────┘   └─────────────┘
         │           │
         ▼           ▼
    ┌──────────────────────────┐
    │ Logger + Reporting       │
    └──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│ Fixture (afterEach)                                     │
│ - Clear cookies                                         │
└─────────────────────────────────────────────────────────┘
```

---

## How to Run Tests

### Prerequisites
- Node.js v18+ and npm
- All dependencies installed: `npm install`

### 1. Run All Tests
```bash
npx playwright test
```

> Uses settings from `test/execution.config.properties`. Current values:
> - `feature.enabled = false`
> - `e2e.enabled = true` → `e2e.tagName = regression`
>
> Default run executes only `@regression` tests.

### 2. Run Tests by Tag
```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

### 3. Run Specific Test File
```bash
npx playwright test test/specs/automationExcercise.spec.ts
```

### 4. Run in Headed Mode (Browser Visible)
```bash
npx playwright test --headed
```
> Or set `HEADLESS=false` in `.env` to always run headed.

### 5. Run in Debug Mode
```bash
npx playwright test --debug
```

### 6. Run on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### 7. Run Single Test
```bash
npx playwright test test/specs/automationExcercise.spec.ts -g "@smoke Verify Automation Excercise Page successfully-01"
```

### 8. Run with Workers
```bash
npx playwright test --workers=4
```

### 9. Show Test Report
```bash
npx playwright show-report
```

---

## Test Suites (test.sets.ts)

| Suite | Tag | Description |
|-------|-----|-------------|
| **feature** | @smoke | Feature suite for smoke-tagged validation |
| **e2e** | @regression | E2E suite for regression-tagged validation |

### Current execution.config.properties
```properties
feature.enabled = false
feature.tagName = smoke

e2e.enabled = true
e2e.tagName = regression
```

With these values, `npx playwright test` runs only `@regression` tests.

---

## Logging & Reporting

### Log Files
Generated in `reports/logs/`:
- `all.log` - All log entries (max 5MB, 5 files rotation)
- `error.log` - Error logs only (max 5MB, 5 files rotation)

### Log Levels
Set via `LOG_LEVEL` in `.env`:

| Level | Usage |
|-------|-------|
| `error` | `logger.error('...')` |
| `warn` | `logger.warn('...')` |
| `info` | `logger.info('...')` |
| `verbose` | `logger.verbose('...')` |
| `debug` | `logger.debug('...')` |
| `silly` | `logger.silly('...')` |

### Report Types
| Report | Location | Command |
|--------|----------|---------|
| HTML | `reports/html-report/index.html` | `npx playwright show-report` |
| JSON | `reports/test-results.json` | - |
| JUnit | `reports/junit.xml` | - |

---

## Configuration

### .env File
```properties
# Application
BASE_URL=https://automationexercise.com/

# Browser
HEADLESS=false

# Logging
LOG_LEVEL=info

# Execution
WORKERS=4
RETRIES=0
ACTION_TIMEOUT=10000
NAVIGATION_TIMEOUT=30000
```

### playwright.config.ts Key Settings
- Viewport: 1920x1080
- Workers: from `WORKERS` env var (default 4)
- Headless: controlled by `HEADLESS` env var (`false` = headed)
- Screenshots: on-failure
- Videos: retain-on-failure
- Trace: retain-on-failure
- Grep: built dynamically from `execution.config.properties`

---

## Framework Layers

### Actions Layer (`src/ui/actions/actions.ts`)
```typescript
click(locator, message)
fill(locator, value, message)
selectDropdown(locator, value, message)
getCount(locator, message)
getLength(locator, message)
isVisible(locator, message)
isDisabled(locator, message)
getAttribute(locator, attribute, message)
getText(locator, message)
hover(locator, message)
scrollToElement(locator, message)
navigateTo(url, message)
waitForPageLoad(timeout, state, message)
waitForElement(locator, timeout, message)
waitForElementVisible(locator, timeout, message)
refreshPage(message)
pressKey(key, message)
wait(milliseconds, message)
sleep(milliseconds, message)
```

### Assertions Layer (`src/ui/assertions/assertions.ts`)

**Hard Assertions** (fail immediately):
```typescript
validateText(locator, expectedText, message)
validateContainsText(locator, expectedText, message)
validateAttribute(locator, attribute, value, message)
validateVisible(locator, message)
validateEnabled(locator, message)
validateHidden(locator, message)
validateDisabled(locator, message)
validateTitle(expectedTitle, message)
validateURL(expectedURL, message)
assertEqual(actual, expected, message)
```

**Soft Assertions** (collect errors, continue test):
```typescript
softValidateText(locator, expectedText, message)
softValidateVisible(locator, message)
softValidateAttribute(locator, attribute, value, message)
softAssertEqual(actual, expected, message)
getSoftErrors()
clearSoftErrors()
throwSoftErrors()
```

### CommonMethods Layer (`src/ui/commonMethods/commonMethods.ts`)
```typescript
navigateToLogin()
navigateToBooking()
navigateToRetrieveBooking()
refreshPage()
goBack()
getPageTitle()
getCurrentURL()
waitForPageLoad(timeout, state, message)
closeBrowser()
getPage()
```

### Locators (`src/ui/locators/automationExcercise.locator.ts`)
```typescript
AutomationExcerciseLocators.emailAddress   // 'input[data-qa="login-email"]'
AutomationExcerciseLocators.password       // 'input[data-qa="login-password"]'
AutomationExcerciseLocators.loginButton    // 'button[data-qa="login-button"]'
AutomationExcerciseLocators.productsLabel  // 'a[href="/products"]:has-text("Products")'
```

### Fixtures (`src/ui/fixtures/fixtures.ts`)
```typescript
// Available fixtures in tests:
automationExcercisePage  // AutomationExcercisePage instance
commonMethods            // CommonMethods instance
testData                 // JSON data loaded from test/data/testData.json
```

### Data Utilities (`src/ui/utils/dataUtils.ts`)
```typescript
readJSONData(filePath)                        // Read JSON test data
readExcelData(filePath, sheetName?)           // Read Excel data
getTimestamp(format)                          // Get formatted timestamp
generateUniqueId()                            // Generate unique ID
retry(fn, retries, delay)                     // Retry async function
wait(milliseconds)                            // Promise-based wait
randomDelay(min, max)                         // Random delay
```

---

## Code Examples

### Example 1: Basic Test
```typescript
import { test } from '../../src/ui/fixtures/fixtures';
import { getLogger } from '../../src/ui/utils/logger';

const logger = getLogger('MySpec');

test.describe('Automation Exercise Page Tests', () => {
  test('@smoke Verify page loads', async ({ automationExcercisePage }) => {
    logger.info('Running smoke test');
    await automationExcercisePage.validateAutomationExcerciseHomePage();
  });
});
```

### Example 2: Data-Driven Test
```typescript
test('@regression Login with test data', async ({ automationExcercisePage, testData }) => {
  const user = testData[0];
  // testData is auto-loaded from test/data/testData.json
  logger.info(`Testing with user: ${user.username}`);
  await automationExcercisePage.validateAutomationExcerciseHomePage();
});
```

### Example 3: Soft Assertions
```typescript
test('@smoke Multiple validations', async ({ page }) => {
  const assertions = new Assertions(page);
  await assertions.softValidateVisible(locator1, 'Check header');
  await assertions.softValidateText(locator2, 'Expected', 'Check title');
  assertions.throwSoftErrors(); // throws all collected errors at end
});
```

### Example 4: Adding a New Page
```typescript
// 1. src/ui/locators/newPage.locator.ts
export class NewPageLocators {
  static readonly HEADING = 'h1.page-title';
}

// 2. src/ui/pages/newPage.page.ts
export class NewPage {
  constructor(page: Page) {
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
  }
  async verifyHeading() {
    await this.assertions.validateVisible(NewPageLocators.HEADING);
  }
}

// 3. Add to fixtures.ts
newPage: async ({ page }, use) => {
  await use(new NewPage(page));
}
```

---

## CI/CD Integration

### CircleCI (Active)
Configuration: `.circleci/config.yml`
Documentation: `CIRCLECI.md`

Three workflows:
| Workflow | Trigger | Jobs |
|----------|---------|------|
| `full-pipeline` | Push to `main`/`develop` | validate-setup → chromium + firefox + webkit |
| `pr-validation` | Feature branch push | smoke tests on Chromium |
| `scheduled-regression` | Daily 2 AM UTC | @regression tests |

Setup: Connect repo at [app.circleci.com](https://app.circleci.com) and add `BASE_URL` in Project Settings → Environment Variables.

### GitHub Actions
Configuration: `.github/workflows/playwright.yml`
- Runs on push/PR to `main`/`develop`
- Matrix: Ubuntu + Windows × Chromium + Firefox + WebKit
- Uploads HTML reports and logs as artifacts

### Azure DevOps
Configuration: `azure-pipelines.yml`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests timing out | Increase `ACTION_TIMEOUT` / `NAVIGATION_TIMEOUT` in `.env` |
| Locators not found | Use `npx playwright test --debug` to inspect |
| Running in headless unexpectedly | Set `HEADLESS=false` in `.env` |
| Soft assertion errors not showing | Call `throwSoftErrors()` at end of test |
| Reports not generating | Ensure `reports/` directory exists with write permissions |
| BASE_URL not set | Add `BASE_URL=...` to `.env` file |

---

## Best Practices

1. Keep locators in separate `*.locator.ts` files
2. Use meaningful test names with tags (`@smoke`, `@regression`)
3. Always use fixtures — never create page objects directly in tests
4. Use `waitForElement` instead of `waitForTimeout`
5. Use soft assertions for multiple validations in one test
6. Log important steps using the logger
7. Store test data in `test/data/testData.json`
8. Control suite execution via `test/execution.config.properties`
9. Never commit `.env` — use `.env` locally only
10. Use `HEADLESS=false` in `.env` for local debugging

---

**Framework Version**: 1.0.0
**Last Updated**: 2025
**CI/CD Provider**: CircleCI
**Target Application**: https://automationexercise.com
