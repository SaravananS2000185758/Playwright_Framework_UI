# Playwright Automation Framework - Hybrid Design Pattern

## 📋 Framework Overview

This is a comprehensive **Playwright Automation Framework** built using **TypeScript** with a **Hybrid Framework** design pattern. It combines the benefits of **Page Object Model (POM)** with **Data-Driven Testing** for maximum scalability, maintainability, and reusability.

### Key Features
- ✅ **Page Object Model (POM)** - Encapsulates UI elements and interactions
- ✅ **Action Layer** - Centralized reusable action methods
- ✅ **Assertion Layer** - Hard and soft assertions
- ✅ **Custom Fixtures** - Pre-configured test fixtures with page objects
- ✅ **Data-Driven Testing** - CSV and Excel data support
- ✅ **Winston Logger** - Comprehensive logging with file outputs
- ✅ **Parallel Execution** - Multi-browser and multi-worker support
- ✅ **Comprehensive Reporting** - HTML, JSON, and JUnit reports
- ✅ **Config-Driven Execution** - `test/execution.config.properties` controls enabled suites and tag selection
- ✅ **Cross-Browser Testing** - Chrome, Firefox, and Safari support

---

## 📁 Folder Structure

```
Playwright_Framework_UI/
│
├── ui/
│   └── src/
│       ├── actions/
│       │   └── actions.ts              # Action methods layer
│       ├── assertions/
│       │   └── assertions.ts           # Hard and soft assertions
│       ├── fixtures/
│       │   ├── baseFixture.ts          # Custom test fixtures with hooks
│       │   └── fixtures.ts             # Data-driven test fixtures
│       ├── locators/
│       │   ├── login.locators.ts       # Login page locators
│       │   ├── booking.locators.ts     # Booking page locators
│       │   ├── retrieveBooking.locators.ts
│       │   └── automationExcercise.locator.ts
│       ├── pages/
│       │   ├── basePage.ts             # Base page object
│       │   ├── loginPage.ts            # Login page object
│       │   ├── bookingPage.ts          # Booking page object
│       │   ├── retrieveBookingPage.ts  # Retrieve booking page object
│       │   └── automationExcercise.page.ts
│       ├── commonMethods/
│       │   └── commonMethods.ts        # Reusable workflow methods
│       └── utils/
│           ├── logger.ts               # Winston logger setup
│           └── dataUtils.ts            # CSV/Excel reading utilities
│
├── test/
│   ├── data/
│   │   ├── config.properties           # Environment configuration
│   │   └── testData.csv                # Test data
│   └── specs/
│       ├── login.spec.ts               # Login test suite
│       ├── booking.spec.ts             # Booking test suite
│       └── retrieveBooking.spec.ts     # Retrieve booking test suite
│
├── reports/
│   ├── html-report/                    # HTML reports
│   ├── logs/                           # Log files (all.log, error.log)
│   ├── junit.xml                       # JUnit report
│   └── test-results.json               # JSON report
│
├── test-results/                       # Playwright test results & traces
│
├── .github/
│   └── workflows/
│       └── playwright.yml              # GitHub Actions CI/CD
│
├── .env                                # Environment configuration (NOT committed)
├── .gitignore                          # Git ignore rules
├── .gitlab-ci.yml                      # GitLab CI/CD
├── .prettierrc                         # Code formatting rules
├── azure-pipelines.yml                 # Azure DevOps CI/CD
├── playwright.config.ts                # Playwright configuration
├── tsconfig.json                       # TypeScript configuration
├── test.sets.ts                        # Test suite configuration
├── package.json                        # Project dependencies
├── verify-setup.js                     # Setup verification script
├── README.md                           # This file
├── ARCHITECTURE.md                     # Architecture documentation
├── INSTALLATION.md                     # Installation guide
├── QUICKSTART.md                       # Quick start guide
└── GITLAB_CICD.md                      # GitLab CI/CD documentation
```

---

## 🏗️ Execution Flow Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Test Execution Flow                        │
└──────────────────────────────────────────────────────────────────┘

1. SPEC FILE (.spec.ts)
   └─→ Entry point of the test
   
2. FIXTURES (baseFixture.ts / fixtures.ts)
   └─→ Custom fixtures provide:
       • LoginPage instance
       • BookingPage instance
       • RetrieveBookingPage instance
       • CommonMethods instance
       • testData fixture (CSV data loading)
       • beforeEach/afterEach hooks
   
3. PAGE OBJECTS (*.page.ts)
   └─→ Page classes (LoginPage, BookingPage, etc.)
       └─→ Constructor initializes:
           • Actions instance
           • Assertions instance
   
4. ACTIONS LAYER (actions.ts)
   └─→ Reusable UI interaction methods:
       • click()
       • fill()
       • selectDropdown()
       • getCount()
       • isVisible()
       • getAttribute()
       • etc.
   
5. LOCATORS (*.locators.ts)
   └─→ Centralized element locators:
       • Selector strings
       • XPath expressions
       • Static properties
   
6. ASSERTIONS LAYER (assertions.ts)
   └─→ Validation methods:
       • Hard Assertions (expect)
       • Soft Assertions (softExpect)
       • Custom validation methods
   
7. LOGGER (utils/logger.ts)
   └─→ Winston logger logs:
       • Console output
       • File output (all.log, error.log)
       • Timestamps and context

Flow Diagram:
┌─────────────────────────────────────────────────────────┐
│ Spec File Test                                          │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│ Fixture (beforeEach)                                    │
│ - Create page instances                                 │
│ - Navigate to base URL                                  │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│ Page Object Methods                                     │
│ - bookingPage.searchBookings()                          │
│ - loginPage.login()                                     │
│ - retrieveBookingPage.searchBooking()                   │
└──────────────┬──────────────────────────────────────────┘
               │
         ┌─────┴─────┐
         ▼           ▼
    ┌────────┐   ┌─────────────┐
    │ Actions│   │ Assertions  │
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
│ - Cleanup resources                                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 How to Run Tests

### Prerequisites
- Node.js v18+ and npm
- All dependencies installed: `npm install`

### 1. Run All Tests
```bash
npx playwright test
```

> `npx playwright test` uses the settings from `test/execution.config.properties`. With the current values:
> - `feature.enabled = true`
> - `feature.tagName = smoke`
> - `e2e.enabled = false`
> - `e2e.tagName = regression`
>
> the default run executes only `@smoke` tests.

### 2. Run Tests by Tag
```bash
# Run only smoke tests (current default)
npx playwright test --grep @smoke

# Run only regression tests after enabling the e2e suite in the config
npx playwright test --grep @regression
```

### 3. Run Specific Test File
```bash
# Run the current automation exercise spec
npx playwright test test/specs/automationExcercise.spec.ts
```

### 4. Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### 5. Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### 6. Run Tests in Specific Browser
```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Safari only
npx playwright test --project=webkit
```

### 7. Run Single Test
```bash
npx playwright test test/specs/automationExcercise.spec.ts -g "@smoke Verify Automation Excercise Page successfully"
```

### 8. Run Tests with Workers
```bash
# Run with 8 workers in parallel
npx playwright test --workers=8
```

### 9. Show Test Report
```bash
npx playwright show-report
```

---

## 📊 Test Suites (test.sets.ts)

The framework exposes two logical suites in `test.sets.ts`:

| Suite | Tags | Purpose |
|-------|------|---------|
| **feature** | @smoke | Feature suite for smoke-tagged validation |
| **e2e** | @regression | E2E suite for regression-tagged validation |

The active suite selection is controlled by `test/execution.config.properties` through `playwright.config.ts`.

### Current default configuration
```properties
feature.enabled = true
feature.tagName = smoke

e2e.enabled = false
e2e.tagName = regression
```

With these values, `npx playwright test` runs only `@smoke` tests.

### Override examples
```bash
# Run only smoke tests using the current feature tag
npx playwright test --grep "@smoke"

# Run only regression tests after enabling the e2e suite in the config
npx playwright test --grep "@regression"
```

---

## 📝 Logging & Reporting

### Log Files
Logs are generated in `reports/logs/` directory:
- `all.log` - All log entries
- `error.log` - Error logs only

### Log Levels
Configure in `.env` file:
```
LOG_LEVEL=info  # info, warn, error, debug
```

### Report Types
After test execution, reports are generated:

1. **HTML Report** - `reports/html-report/index.html`
   ```bash
   npx playwright show-report
   ```

2. **JSON Report** - `reports/test-results.json`

3. **JUnit Report** - `reports/junit.xml`

### View Reports
```bash
# Show HTML report
npx playwright show-report

# Open specific path
npx playwright show-report reports/html-report
```

---

## ⚙️ Configuration

### Environment Setup (.env file)

The framework uses a `.env` file in the project root for environment configuration. Additionally, `test/data/config.properties` is used by fixtures for runtime configuration.

#### Step 1: Create .env File
Create a `.env` file in the project root with the following configuration:

#### Step 2: Update .env with Your Configuration
Edit `.env` and update values according to your environment:
```properties
# Application URLs
BASE_URL=http://localhost:3000

# Browser Configuration
HEADLESS=true
VIEWPORT_WIDTH=1920
VIEWPORT_HEIGHT=1080

# Execution Configuration
WORKERS=4
RETRIES=0

# Timeouts (in milliseconds)
ACTION_TIMEOUT=10000
NAVIGATION_TIMEOUT=30000

# Logging
LOG_LEVEL=info

# Test Data
TEST_USERNAME=testuser@example.com
TEST_PASSWORD=TestPassword123!
TEST_DESTINATION=New York
TEST_GUESTS=2
TEST_ROOMS=1

# Optional Integrations
SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
```

#### Step 3: Environment-Specific Configurations (Optional)
For different environments, create additional files:
```bash
.env              # Default/local configuration (NOT committed)
.env.staging      # Staging environment
.env.prod         # Production environment
```

**Load specific environment:**
```bash
# Load staging environment
npm run test:staging

# Load production environment  
npm run test:prod
```

### Playwright Configuration (playwright.config.ts)

The Playwright configuration loads environment variables from `.env`:
```typescript
dotenv.config({ path: path.join(__dirname, '.env') });

Key settings:
- Viewport: 1920x1080
- Workers: 4 (parallel execution)
- Retries: 0
- Timeout: 30 seconds
- Screenshots: on-failure
- Videos: retain-on-failure
- Trace: on-first-retry
```

### Environment Variables Usage

Override environment variables at runtime:
```bash
# Set custom base URL (Windows PowerShell)
$env:BASE_URL="http://your-app.com"
npx playwright test

# Set custom base URL (Windows CMD)
set BASE_URL=http://your-app.com
npx playwright test

# Run with 8 workers
$env:WORKERS="8"
npx playwright test

# Enable retries
$env:RETRIES="2"
npx playwright test

# Combined
$env:BASE_URL="http://staging.app.com"; $env:WORKERS="6"; npx playwright test
```

---

## 🔍 Framework Layers Explained

### 1. **Actions Layer** (`actions.ts`)
Provides reusable methods for UI interactions:
```typescript
- click(locator, message)
- fill(locator, value, message)
- selectDropdown(locator, value, message)
- getCount(locator, message)
- isVisible(locator, message)
- getAttribute(locator, attribute, message)
- getText(locator, message)
- hover(locator, message)
- navigateTo(url, message)
- waitForElement(locator, timeout, message)
```

### 2. **Assertions Layer** (`assertions.ts`)
Provides validation methods:

**Hard Assertions** (Test fails immediately):
```typescript
- validateText(locator, expectedText, message)
- validateContainsText(locator, expectedText, message)
- validateAttribute(locator, attribute, value, message)
- validateVisible(locator, message)
- validateEnabled(locator, message)
```

**Soft Assertions** (Test continues, errors collected):
```typescript
- softValidateText(locator, expectedText, message)
- softValidateVisible(locator, message)
- softValidateAttribute(locator, attribute, value, message)
- getSoftErrors() - Get collected errors
- throwSoftErrors() - Throw all collected errors
```

### 3. **Locators Layer** (`*.locators.ts`)
Centralized element locators:
```typescript
export class LoginLocators {
  static readonly USERNAME_INPUT = 'input[placeholder="Username"]';
  static readonly PASSWORD_INPUT = 'input[placeholder="Password"]';
  static readonly LOGIN_BUTTON = 'button:has-text("Login")';
}
```

### 4. **Page Objects** (`*.page.ts`)
Encapsulates page logic:
```typescript
export class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    await this.actions.fill(LoginLocators.USERNAME_INPUT, username);
    await this.actions.fill(LoginLocators.PASSWORD_INPUT, password);
    await this.actions.click(LoginLocators.LOGIN_BUTTON);
  }
}
```

### 5. **Fixtures** (`baseFixture.ts`)
Provides pre-configured test setup:
```typescript
test('...', async ({ loginPage, bookingPage, commonMethods }) => {
  // Use page objects directly
});
```

### 6. **Utilities** (`utils/`)
Helper functions:
- **Logger** - Winston-based logging
- **Data Utilities** - CSV/Excel reading, timestamps, retry logic

---

## 📚 Code Examples

### Example 1: Simple Login Test
```typescript
import { test } from '../../ui/src/fixtures/fixtures';
import { getLogger } from '../../ui/src/utils/logger';

const logger = getLogger('LoginSpec');

test('@login @smoke Verify login page loads', async ({ loginPage, commonMethods }) => {
  logger.info('Test: Verify login page loads successfully');
  
  await commonMethods.navigateToLogin();
  await loginPage.verifyLoginFormVisible();
  
  logger.info('✓ Test passed: Login page loaded successfully');
});
```

### Example 2: Booking Search with Data Validation
```typescript
test('Search and validate hotel details', async ({ bookingPage }) => {
  await bookingPage.searchBookings('New York', '2024-06-15', '2024-06-20', '2', '1');
  
  const hotelName = await bookingPage.getFirstHotelName();
  const hotelPrice = await bookingPage.getFirstHotelPrice();
  
  expect(hotelName).toBeTruthy();
  expect(hotelPrice).toContain('$');
});
```

### Example 3: Soft Assertions
```typescript
test('Multiple assertions without failing', async ({ retrieveBookingPage, assertions }) => {
  // These won't fail immediately
  await assertions.softValidateText(locator1, 'Expected Text');
  await assertions.softValidateVisible(locator2);
  await assertions.softValidateAttribute(locator3, 'class', 'active');
  
  // Throw all collected errors at the end
  assertions.throwSoftErrors();
});
```

### Example 4: Data-Driven Test
```typescript
import { test } from '../../ui/src/fixtures/fixtures';

test('@login @functional Login with valid credentials', async ({ loginPage, testData, commonMethods }) => {
  // testData fixture automatically loads CSV data
  const loginData = testData[0];
  
  await loginPage.login(loginData.username, loginData.password);
  await commonMethods.waitForPageLoad(30000, 'networkidle', 'Waiting for login navigation');
  
  const currentURL = await commonMethods.getCurrentURL();
  expect(currentURL).not.toContain('/login');
});
```

---

## 🔧 CI/CD Integration

### GitHub Actions Example
Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npm run test
      
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: reports/html-report/
          retention-days: 30
```

### Azure DevOps Example
Create `azure-pipelines.yml`:

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
  
  - script: npm install
    displayName: 'Install dependencies'
  
  - script: npx playwright install --with-deps
    displayName: 'Install Playwright'
  
  - script: npx playwright test
    displayName: 'Run tests'
  
  - task: PublishTestResults@2
    condition: always()
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: '**/junit.xml'
      mergeTestResults: true
```

---

## 🐛 Troubleshooting

### Tests timing out
- Increase timeout in `playwright.config.ts`
- Check if application is running
- Verify BASE_URL is correct

### Locators not found
- Verify CSS/XPath selectors
- Use Playwright Inspector: `npx playwright test --debug`
- Check page has loaded: `await page.waitForLoadState('networkidle')`

### Soft assertion errors not showing
- Call `throwSoftErrors()` at the end of test
- Check log files in `reports/logs/`

### Reports not generating
- Ensure `reports/` directory exists
- Check write permissions
- Verify `playwright.config.ts` reporter configuration

---

## 📞 Support & Additional Resources

- **Playwright Documentation**: https://playwright.dev
- **TypeScript Documentation**: https://www.typescriptlang.org
- **Winston Logger**: https://github.com/winstonjs/winston

---

## 📝 Best Practices

1. **Keep locators in separate files** - Easier to maintain
2. **Use meaningful test names** - Describe what test does
3. **Add tags to tests** - Organize by test type
4. **Use fixtures** - Avoid creating page objects in tests
5. **Implement proper waits** - Use `waitForElement` instead of `waitForTimeout`
6. **Log strategically** - Log important steps and assertions
7. **Use soft assertions** - For multiple validations
8. **Organize test data** - CSV/Excel for data-driven tests
9. **Handle errors gracefully** - Use try-catch where needed
10. **Review reports regularly** - Monitor test trends

---

## 📄 License

This framework is provided as-is for automation testing purposes.

---

**Framework Version**: 1.0.0  
**Last Updated**: January 2025  
**Created by**: QA Automation Team
