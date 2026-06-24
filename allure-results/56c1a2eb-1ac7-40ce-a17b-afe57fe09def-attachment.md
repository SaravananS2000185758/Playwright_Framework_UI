# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: automationExcercise.spec.ts >> Automation Excercise Page Tests >> @smoke Verify Automation Excercise Page successfully-01
- Location: test\ui\specs\automationExcercise.spec.ts:8:7

# Error details

```
Error: page.goto: NS_ERROR_UNKNOWN_HOST
Call log:
  - navigating to "https://automationexercise.com/", waiting until "load"

```

# Page snapshot

```yaml
- article "Server Not Found" [ref=e3]:
  - img "Illustration of a fox looking at disconnected network cables." [ref=e5]
  - generic [ref=e7]:
    - heading "Server Not Found" [level=1] [ref=e8]
    - paragraph [ref=e9]:
      - text: Nightly can’t connect to the server at
      - strong [ref=e10]: automationexercise.com
    - generic [ref=e11]:
      - heading "What can you do about it?" [level=3] [ref=e12]
      - paragraph [ref=e13]: Try connecting on a different device. Check your modem or router. Disconnect and reconnect to Wi-Fi.
    - paragraph [ref=e14]:
      - link "Learn more…" [ref=e15] [cursor=pointer]:
        - /url: https://support.mozilla.org/1/firefox/150.0.2/WINNT/en-US/server-not-found-connection-problem
    - button "Try Again" [ref=e18]:
      - generic [ref=e20]:
        - generic: Try Again
```

# Test source

```ts
  1  | import * as path from 'path';
  2  | import { test as base, expect } from '@playwright/test';
  3  | import { readJSONData } from '../utils/dataUtils';
  4  | import { getLogger } from '../utils/logger';
  5  | import * as dotenv from 'dotenv';
  6  | import { CommonMethods } from '../commonMethods/commonMethods';
  7  | import { AutomationExcercisePage } from '../pages/automationExcercise.page';
  8  | 
  9  | dotenv.config();
  10 | 
  11 | const logger = getLogger('Fixtures');
  12 | 
  13 | type CustomFixtures = {
  14 |   commonMethods: CommonMethods;
  15 |   testData: Record<string, string>[];
  16 |   automationExcercisePage: AutomationExcercisePage;
  17 | };
  18 | 
  19 | export const test = base.extend<CustomFixtures>({
  20 |   testData:
  21 |     async ({}, use) => {
  22 |       const jsonPath = path.resolve(__dirname, '../../../test/data/testData.json');
  23 |       const data = readJSONData<Record<string, string>>(jsonPath);
  24 |       await use(data);
  25 |     },
  26 | 
  27 |   commonMethods:
  28 |     async ({ page }, use) => {
  29 |       await use(new CommonMethods(page));
  30 |       logger.info('✓ CommonMethods fixture teardown');
  31 |     },
  32 | 
  33 |   automationExcercisePage:
  34 |     async ({ page }, use) => {
  35 |       await use(new AutomationExcercisePage(page));
  36 |       logger.info('✓ AutomationExcercisePage fixture teardown');
  37 |     },
  38 | });
  39 | 
  40 | export { expect };
  41 | 
  42 | test.beforeEach(async ({ page, commonMethods }) => {
  43 |   const baseURL = process.env.BASE_URL;
  44 |   if (!baseURL) throw new Error('BASE_URL is not configured in .env');
  45 |   logger.info('================== TEST STARTED ==================');
  46 |   logger.info(`✓ Navigating to base URL: ${baseURL}`);
> 47 |   await page.goto(baseURL);
     |              ^ Error: page.goto: NS_ERROR_UNKNOWN_HOST
  48 |   await commonMethods.waitForPageLoad(30000, 'load', 'Waiting for initial page load');
  49 | });
  50 | 
  51 | test.afterEach(async ({ page }) => {
  52 |   logger.info('================== TEST ENDED ==================');
  53 |   await page.context().clearCookies();
  54 |   logger.info('✓ Cookies cleared');
  55 | });
  56 | 
```