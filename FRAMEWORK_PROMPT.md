# Playwright Hybrid Automation Framework — Implementation Prompt

Use this prompt with any AI assistant (Amazon Q, GitHub Copilot, ChatGPT, etc.) to scaffold the exact same framework for your project.

---

## PROMPT (Copy everything below this line)

---

Build a **Playwright Automation Framework** using **TypeScript** with a **Hybrid Design Pattern** (Page Object Model + Data-Driven Testing). Scaffold the complete folder structure and all source files exactly as described below.

---

### Tech Stack & Dependencies

```json
{
  "@playwright/test": "^1.60.0",
  "typescript": "^6.0.0",
  "winston": "^3.19.0",
  "dotenv": "^17.0.0",
  "csv-parser": "^3.2.1",
  "xlsx": "^0.18.5",
  "ts-node": "^10.9.2",
  "cross-env": "^10.1.0"
}
```

---

### Folder Structure to Generate

```
<project-root>/
├── src/
│   └── ui/
│       ├── actions/actions.ts
│       ├── assertions/assertions.ts
│       ├── commonMethods/commonMethods.ts
│       ├── fixtures/fixtures.ts
│       ├── locators/<pageName>.locator.ts
│       ├── pages/<pageName>.page.ts
│       └── utils/
│           ├── logger.ts
│           ├── dataUtils.ts
│           └── executionConfig.ts
├── test/
│   ├── data/testData.json
│   ├── specs/<pageName>.spec.ts
│   └── execution.config.properties
├── reports/
│   └── logs/
├── .env
├── playwright.config.ts
├── test.sets.ts
├── tsconfig.json
└── package.json
```

---

### File-by-File Implementation Instructions

---

#### 1. `src/ui/actions/actions.ts`

Create an `Actions` class that wraps Playwright's `Page` and `Locator` APIs. Every method must:
- Accept `locator: Locator | string` (resolve string to `page.locator(string)`)
- Accept an optional `message?: string` for logging
- Log `✓ <message>` on success using `getLogger('Actions')`
- Log `✗ Failed to <action>: <message>` on error and re-throw

Implement these methods:
```
click(locator, message?)
fill(locator, value, message?)
selectDropdown(locator, value, message?)        // uses selectOption()
getCount(locator, message?) → Promise<number>
getLength(locator, message?) → Promise<number>  // alias for getCount
isVisible(locator, message?) → Promise<boolean>
isDisabled(locator, message?) → Promise<boolean>
getAttribute(locator, attribute, message?) → Promise<string | null>
getText(locator, message?) → Promise<string>    // uses textContent()
hover(locator, message?)
scrollToElement(locator, message?)              // uses scrollIntoViewIfNeeded()
navigateTo(url, message?)
waitForPageLoad(timeout=30000, state='load', message?)
waitForElement(locator, timeout=5000, message?)
waitForElementVisible(locator, timeout=5000, message?)  // alias for waitForElement
refreshPage(message?)
pressKey(key, message?)
wait(milliseconds, message?)
sleep(milliseconds, message?)                   // alias for wait
```

---

#### 2. `src/ui/assertions/assertions.ts`

Create an `Assertions` class with a private `softErrors: Error[]` array.

**Hard Assertions** (throw immediately on failure):
```
validateText(locator, expectedText, message?)           // toHaveText
validateContainsText(locator, expectedText, message?)   // toContainText
validateAttribute(locator, attribute, value, message?)  // toHaveAttribute
validateVisible(locator, message?)                      // toBeVisible
validateEnabled(locator, message?)                      // toBeEnabled
validateHidden(locator, message?)                       // toBeHidden
validateDisabled(locator, message?)                     // toBeDisabled
validateTitle(expectedTitle, message?)                  // expect(page).toHaveTitle
validateURL(expectedURL, message?)                      // expect(page).toHaveURL
assertEqual(actual, expected, message?)                 // synchronous, toBe
```

**Soft Assertions** (push to `softErrors`, do not throw):
```
softValidateText(locator, expectedText, message?)
softValidateVisible(locator, message?)
softValidateAttribute(locator, attribute, value, message?)
softAssertEqual(actual, expected, message?)
getSoftErrors() → Error[]
clearSoftErrors()
throwSoftErrors()   // throws combined error message if softErrors.length > 0
```

---

#### 3. `src/ui/utils/logger.ts`

Use **Winston** to create a singleton logger:
- Log level from `process.env.LOG_LEVEL || 'info'`
- Format: `[YYYY-MM-DD HH:mm:ss] [LEVEL] message`
- Transports:
  - Console (colorized)
  - File: `reports/logs/all.log` (maxsize 5MB, maxFiles 5)
  - File: `reports/logs/error.log` (level: error, maxsize 5MB, maxFiles 5)
- Export `getLogger(context: string): winston.Logger` that returns `logger.child({ context })`

---

#### 4. `src/ui/utils/dataUtils.ts`

Export these utility functions:
```typescript
readJSONData<T>(filePath: string): T[]                          // fs + JSON.parse
readExcelData(filePath, sheetName?): Record<string, unknown>[]  // xlsx library
getTimestamp(format: 'full'|'date'|'time'|'iso'): string
generateUniqueId(): string                                       // Date.now + random
retry<T>(fn, retries=3, delay=1000): Promise<T>                 // recursive retry
wait(milliseconds): Promise<void>
randomDelay(min=1000, max=3000): Promise<void>
```

---

#### 5. `src/ui/utils/executionConfig.ts`

Parse `test/execution.config.properties` (key=value format, skip `#` comments).

Export:
```typescript
loadExecutionConfig(): { feature: { enabled, tagName }, e2e: { enabled, tagName } }
buildGrepPattern(): string | undefined   // returns "@tag1|@tag2" or undefined
```

---

#### 6. `src/ui/commonMethods/commonMethods.ts`

Create a `CommonMethods` class that uses `Actions` internally:
```
navigateToLogin()             // navigates to BASE_URL/login
navigateToBooking()           // navigates to BASE_URL/booking
navigateToRetrieveBooking()   // navigates to BASE_URL/retrieve-booking
refreshPage()
goBack()
getPageTitle() → Promise<string>
getCurrentURL() → Promise<string>
waitForPageLoad(timeout=5000, state='networkidle', message?)
closeBrowser()
getPage() → Page
```

Read `BASE_URL` from `process.env.BASE_URL` (throw if missing). Strip trailing slash.

---

#### 7. `src/ui/locators/<pageName>.locator.ts`

Create a class with **static readonly** CSS/attribute selector strings. Example:
```typescript
export class MyPageLocators {
  static readonly emailInput = 'input[data-qa="login-email"]';
  static readonly passwordInput = 'input[data-qa="login-password"]';
  static readonly loginButton = 'button[data-qa="login-button"]';
}
```

Replace with your application's actual selectors.

---

#### 8. `src/ui/pages/<pageName>.page.ts`

Create a Page Object class:
- Constructor receives `Page`, initializes `Actions`, `Assertions`, `CommonMethods`
- Each method represents a user workflow (e.g., `login()`, `verifyDashboard()`)
- Use locators from the corresponding `*.locator.ts` file
- Log each step using `getLogger('<PageName>Page')`

---

#### 9. `src/ui/fixtures/fixtures.ts`

Extend Playwright's `base` test with these custom fixtures:
```typescript
type CustomFixtures = {
  commonMethods: CommonMethods;
  testData: Record<string, string>[];
  <pageName>Page: <PageName>Page;
};
```

- `testData`: reads `test/data/testData.json` using `readJSONData`
- `commonMethods`: instantiates `CommonMethods(page)`
- `<pageName>Page`: instantiates the page object

**beforeEach hook:**
1. Read `BASE_URL` from env (throw if missing)
2. `page.goto(BASE_URL)`
3. `commonMethods.waitForPageLoad(30000, 'load', ...)`

**afterEach hook:**
1. `page.context().clearCookies()`

Export `test` and `expect`.

---

#### 10. `test/specs/<pageName>.spec.ts`

```typescript
import { test } from '../../src/ui/fixtures/fixtures';
import { getLogger } from '../../src/ui/utils/logger';

const logger = getLogger('<SpecName>');

test.describe('<Page> Tests', () => {
  test('@smoke Verify <page> loads successfully', async ({ <pageName>Page }) => {
    await <pageName>Page.<method>();
  });

  test('@regression Verify <page> full flow', async ({ <pageName>Page, testData }) => {
    const user = testData[0];
    await <pageName>Page.<method>();
  });
});
```

---

#### 11. `test/data/testData.json`

JSON array of test data objects. Adapt fields to your application:
```json
[
  {
    "username": "<email>",
    "password": "<password>",
    "expectedResult": "Success"
  }
]
```

---

#### 12. `test/execution.config.properties`

```properties
feature.enabled = true
feature.tagName = smoke

e2e.enabled = false
e2e.tagName = regression
```

---

#### 13. `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { buildGrepPattern } from './src/ui/utils/executionConfig';

dotenv.config();

export default defineConfig({
  testDir: 'test/specs',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  workers: Number(process.env.WORKERS || 4),
  timeout: 30_000,
  globalTimeout: 30 * 60_000,
  retries: Number(process.env.RETRIES || 0),
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: process.env.CI ? 'never' : 'always' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1920, height: 1080 },
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    actionTimeout: Number(process.env.ACTION_TIMEOUT || 10000),
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT || 30000),
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  grep: buildGrepPattern() ? new RegExp(buildGrepPattern()!) : undefined,
  forbidOnly: !!process.env.CI,
});
```

---

#### 14. `.env`

```properties
BASE_URL=https://your-app-url.com/
HEADLESS=false
LOG_LEVEL=info
WORKERS=4
RETRIES=0
ACTION_TIMEOUT=10000
NAVIGATION_TIMEOUT=30000
```

---

#### 15. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "outDir": "dist",
    "rootDir": ".",
    "skipLibCheck": true
  },
  "include": ["src/**/*", "test/**/*", "playwright.config.ts", "test.sets.ts"],
  "exclude": ["node_modules", "dist"]
}
```

---

#### 16. `test.sets.ts`

```typescript
export const testSets = {
  feature: {
    description: 'Feature suite for smoke-tagged validation',
    tests: ['@smoke Verify <page> successfully'],
  },
  e2e: {
    description: 'E2E suite for regression-tagged validation',
    tests: ['@regression Verify <page> successfully'],
  },
};
export default testSets;
```

---

### Key Design Rules to Follow

1. **Never create page objects directly in spec files** — always use fixtures
2. **All locators** must live in `*.locator.ts` as `static readonly` strings
3. **All UI interactions** must go through the `Actions` class, never call `page.click()` directly in page objects
4. **All assertions** must go through the `Assertions` class
5. **Tags** in test names control execution: `@smoke`, `@regression`, `@functional`, `@negative`
6. **Execution control** is done via `test/execution.config.properties`, not by modifying code
7. **Every method** must log success (`✓`) and error (`✗`) using the Winston logger
8. **Test data** lives in `test/data/testData.json` and is injected via the `testData` fixture
9. **Environment config** lives in `.env` — never hardcode URLs or credentials in source files
10. **Soft assertions** are used when multiple validations should run before failing the test

---

### Customization Checklist

Replace these placeholders with your project's actual values:

| Placeholder | Replace With |
|---|---|
| `<pageName>` | Your page name (e.g., `loginPage`, `dashboardPage`) |
| `<PageName>` | PascalCase page name (e.g., `LoginPage`) |
| `<SpecName>` | Spec logger name (e.g., `LoginSpec`) |
| `<method>` | Page object method name (e.g., `login()`) |
| `BASE_URL` | Your application's base URL |
| Locator selectors | Your application's actual CSS/attribute selectors |
| `testData.json` fields | Fields matching your application's test scenarios |

---

### npm Scripts to Include in `package.json`

```json
"scripts": {
  "test": "playwright test",
  "test:smoke": "playwright test --grep @smoke",
  "test:regression": "playwright test --grep @regression",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "test:chromium": "playwright test --project=chromium",
  "test:firefox": "playwright test --project=firefox",
  "test:webkit": "playwright test --project=webkit",
  "test:report": "playwright show-report",
  "test:serial": "playwright test --workers=1",
  "lint": "tsc --noEmit"
}
```

---

### After Scaffolding — Run These Commands

```bash
npm install
npx playwright install
npx playwright test --project=chromium --grep @smoke
npx playwright show-report
```

---

*End of prompt. Replace all `<placeholder>` values with your project-specific details before running.*
