# Framework Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Core Components](#core-components)
4. [Execution Flow](#execution-flow)
5. [Design Patterns](#design-patterns)
6. [Best Practices](#best-practices)
7. [Extensibility](#extensibility)

---

## Overview

This Playwright Automation Framework implements a **Hybrid Framework** design combining:
- **Page Object Model (POM)** - For maintainability and reusability
- **Action-Driven Testing** - Centralized action methods
- **Assertion Separation** - Dedicated assertion layer
- **Data-Driven Approach** - CSV/Excel integration
- **Custom Fixtures** - Pre-configured test setup
- **Modular Architecture** - Separated concerns

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────┐
│         CONFIGURATION LAYER                          │
│              (.env file)                             │
│  ┌────────────────────────────────────────────────┐  │
│  │ BASE_URL, WORKERS, LOG_LEVEL, Credentials...  │  │
│  └────────────────┬───────────────────────────────┘  │
└───────────────────┼────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│              PLAYWRIGHT CONFIG                                  │
│          (playwright.config.ts)                                 │
│  Loads environment variables from .env                          │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      TEST EXECUTION LAYER                       │
│                    (test/specs/*.spec.ts)                       │
│                                                                  │
│  test('...', async ({ loginPage, bookingPage, ... }) => {})    │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FIXTURES LAYER                             │
│                (ui/src/fixtures/baseFixture.ts)                 │
│                                                                  │
│  - Provides pre-configured page object instances                │
│  - Handles setup/teardown (beforeEach/afterEach)                │
│  - Manages browser and page context                             │
│  - Initializes actions and assertions                           │
└────────────────┬────────────────────────────────────────────────┘
                 │
     ┌───────────┼───────────┐
     ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────────┐
│LoginPage │ │BookingPg │ │RetrieveBook  │
│ (Page    │ │ (Page    │ │ Pg (Page     │
│ Object)  │ │ Object)  │ │ Object)      │
└────┬─────┘ └────┬─────┘ └──────┬───────┘
     │            │              │
     └────────────┼──────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PAGE OBJECT BASE CLASS                         │
│                    (ui/src/pages/basePage.ts)                   │
│                                                                  │
│  - Constructor initializes Actions and Assertions               │
│  - Provides access to Playwright Page instance                  │
│  - Utility methods for common operations                        │
└────────────┬─────────────────────────────────────────────────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
  ┌────────────┐ ┌─────────────┐
  │ ACTIONS    │ │ ASSERTIONS  │
  │ LAYER      │ │ LAYER       │
  ├────────────┤ ├─────────────┤
  │ • click()  │ │ • validate()│
  │ • fill()   │ │ • soft()    │
  │ • getText()│ │ • assert()  │
  │ • etc.     │ │ • etc.      │
  └─────┬──────┘ └──────┬──────┘
        │               │
        └───────┬───────┘
                ▼
      ┌──────────────────────┐
      │   LOCATORS LAYER     │
      │  (*.locators.ts)     │
      │                      │
      │ • CSS Selectors      │
      │ • XPath Expressions  │
      │ • Static Variables   │
      └──────────┬───────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │  PLAYWRIGHT CORE     │
      │   (Browser API)      │
      │                      │
      │ • Page instance      │
      │ • Browser context    │
      │ • Actions & checks   │
      └──────────────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │   UTILITIES LAYER    │
      │   & LOGGING          │
      │                      │
      │ • Logger (Winston)   │
      │ • Data Utils         │
      │ • Helpers            │
      └──────────────────────┘
```

---

## Core Components

### 1. **Actions Layer** (`ui/src/actions/actions.ts`)
**Purpose**: Centralize UI interaction methods

**Key Methods**:
```typescript
click(locator, message)          // Click element
fill(locator, value, message)    // Fill input
selectDropdown(locator, value)   // Select option
getCount(locator)                // Get element count
isVisible(locator)               // Check visibility
getAttribute(locator, attr)      // Get attribute value
getText(locator)                 // Get text content
hover(locator)                   // Hover over element
scrollToElement(locator)         // Scroll to element
navigateTo(url)                  // Navigate to URL
waitForElement(locator)          // Wait for element
```

**Benefits**:
- Single source of truth for UI interactions
- Consistent error handling and logging
- Easy to maintain and update selectors
- Reusable across all page objects

### 2. **Assertions Layer** (`ui/src/assertions/assertions.ts`)
**Purpose**: Provide both hard and soft assertion methods

**Hard Assertions**:
- `validateText()` - Validate exact text
- `validateVisible()` - Check visibility
- `validateEnabled()` - Check if enabled
- `validateAttribute()` - Validate attribute value

**Soft Assertions**:
- `softValidateText()` - Collect validation error
- `softValidateVisible()` - Collect visibility error
- `softValidateAttribute()` - Collect attribute error
- `throwSoftErrors()` - Throw all collected errors

**Benefits**:
- Multiple validations without test failure
- Flexible validation strategy
- Better error reporting

### 3. **Page Objects** (`ui/src/pages/*.page.ts`)
**Purpose**: Encapsulate page-specific logic

**Structure**:
```typescript
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  
  async login(username: string, password: string): Promise<void> {
    // Use actions and assertions
  }
  
  async verifyPageLoaded(): Promise<void> {
    // Custom verification
  }
}
```

**Benefits**:
- Separation of UI elements from test logic
- Reusable page methods
- Easy to update when UI changes

### 4. **Locators** (`ui/src/locators/*.locators.ts`)
**Purpose**: Centralize element selectors

**Pattern**:
```typescript
export class LoginLocators {
  static readonly USERNAME_INPUT = 'input[placeholder="Username"]';
  static readonly PASSWORD_INPUT = 'input[placeholder="Password"]';
  static readonly LOGIN_BUTTON = 'button:has-text("Login")';
}
```

**Benefits**:
- Single location for selector management
- Easy to update when UI changes
- Avoid hardcoding selectors in tests

### 5. **Fixtures** (`ui/src/fixtures/baseFixture.ts`)
**Purpose**: Pre-configure test environment

**Provides**:
- Page object instances
- Setup and teardown hooks
- Browser initialization
- Page navigation

**Usage**:
```typescript
test('...', async ({ loginPage, bookingPage }) => {
  // Page objects are ready to use
});
```

---

## Execution Flow

### Step-by-Step Execution

```
1. Test Starts
   ├─ beforeEach Hook
   │  ├─ Initialize browser/context
   │  ├─ Create page instance
   │  ├─ Create page object instances
   │  └─ Navigate to base URL
   │
2. Test Body Executes
   ├─ Call page object methods
   │  ├─ Use Actions layer
   │  ├─ Use Assertions layer
   │  └─ Log each step
   │
3. Test Ends
   ├─ afterEach Hook
   │  ├─ Clear cookies
   │  ├─ Clear storage
   │  └─ Cleanup resources
   │
4. Reporting
   ├─ Generate HTML report
   ├─ Save logs
   ├─ Save screenshots/videos
   └─ Update test results
```

---

## Design Patterns

### 1. **Page Object Model (POM)**
- Each page is represented by a class
- Page methods represent user actions
- Locators are separated from test logic

### 2. **Action Layer Pattern**
- All UI interactions go through Actions class
- Centralized error handling
- Consistent logging

### 3. **Assertion Layer Pattern**
- Hard and soft assertions available
- Custom validation methods
- Failure collection mechanism

### 4. **Fixture Pattern**
- Pre-configured test setup
- Automatic cleanup
- Dependency injection of page objects

### 5. **Data-Driven Pattern**
- CSV/Excel support
- Parameterized tests
- Reusable test data

---

## Best Practices

### 1. **Locator Strategy**
```typescript
// ✅ GOOD - Stable selectors
const SUBMIT_BUTTON = 'button[type="submit"]';
const USERNAME_FIELD = 'input[name="username"]';

// ❌ BAD - Fragile selectors
const FIRST_BUTTON = 'div > button'; // Too generic
const BURIED_TEXT = 'div > div > div > span'; // Too nested
```

### 2. **Action Method Usage**
```typescript
// ✅ GOOD - Use action methods
await this.actions.fill(locator, 'value', 'Filling username');
await this.actions.click(locator, 'Clicking login button');

// ❌ BAD - Direct playwright API
await page.locator(locator).fill('value');
await page.locator(locator).click();
```

### 3. **Page Object Methods**
```typescript
// ✅ GOOD - Encapsulate workflow
async login(username: string, password: string): Promise<void> {
  await this.enterUsername(username);
  await this.enterPassword(password);
  await this.clickLoginButton();
}

// ❌ BAD - Actions mixed with test logic
test('Login', async ({ page }) => {
  await page.fill('...', 'username');
  await page.fill('...', 'password');
  await page.click('...');
});
```

### 4. **Assertion Usage**
```typescript
// ✅ GOOD - Meaningful assertions
await assertions.validateText(successMsg, 'Login Successful');
await assertions.validateVisible(dashboard);

// ❌ BAD - Vague assertions
await expect(page).toBeTruthy();
```

### 5. **Test Organization**
```typescript
// ✅ GOOD - Clear test names and tags
test('@login @functional Login with valid credentials', async () => {});

// ❌ BAD - Vague test names
test('test1', async () => {});
```

---

## Extensibility

### Adding a New Page

1. Create locator file: `ui/src/locators/newPage.locators.ts`
2. Create page class: `ui/src/pages/newPage.ts`
3. Extend BasePage and use actions/assertions
4. Add to fixture: `ui/src/fixtures/baseFixture.ts`
5. Create tests: `test/specs/newPage.spec.ts`

### Adding Custom Actions

```typescript
// In actions.ts
async customAction(locator, param1, param2): Promise<any> {
  // Implementation
  logger.info('✓ Custom action performed');
  return result;
}
```

### Adding Custom Assertions

```typescript
// In assertions.ts
async validateCustomState(locator): Promise<void> {
  try {
    // Custom validation logic
    logger.info('✓ Custom assertion passed');
  } catch (error) {
    logger.error('✗ Custom assertion failed');
    throw error;
  }
}
```

### Integrating Data Sources

```typescript
// Use readCSVtoJSON or readExcelData in tests
const testData = await readCSVtoJSON('path/to/data.csv');
for (const data of testData) {
  // Run test with data
}
```

---

## Configuration & Customization

### Environment Configuration (.env)
The framework uses `.env` file for environment-specific configuration:

**File Structure**:
- `.env` - Your local configuration (git-ignored, NOT committed)
- `.env.example` - Template for version control (committed)

**Setup**:
```bash
# 1. Copy template
cp .env.example .env

# 2. Update with your values
# BASE_URL=http://localhost:3000
# WORKERS=4
# LOG_LEVEL=info
```

**Example Configuration**:
```properties
# Application
BASE_URL=http://localhost:3000

# Browser
HEADLESS=true
WORKERS=4

# Logging
LOG_LEVEL=info

# Test Data
TEST_USERNAME=testuser@example.com
TEST_PASSWORD=TestPassword123!
```

### Playwright Config Options
- Browser launch options
- Viewport size
- Timeouts
- Screenshot/video capture
- Reporter settings
- Environment variable loading from `.env`

### Environment Variables
All environment variables are loaded from `.env` file:
- `BASE_URL` - Application URL to test
- `WORKERS` - Number of parallel workers
- `LOG_LEVEL` - Logging level (info, warn, error, debug)
- `HEADLESS` - Run in headless mode
- `RETRIES` - Retry failed tests
- `ACTION_TIMEOUT` - Action timeout (milliseconds)
- `NAVIGATION_TIMEOUT` - Navigation timeout (milliseconds)
- Custom credentials and test data

### Test Execution Options
- Serial/Parallel execution
- Specific browser selection
- Tag filtering
- Debug mode
- Environment-specific configurations

---

**Framework Version**: 1.0.0  
**Last Updated**: May 2026  
**Documentation**: Complete
