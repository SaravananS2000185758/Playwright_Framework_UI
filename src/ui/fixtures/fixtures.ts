import * as path from 'path';
import { test as base, expect } from '@playwright/test';
import { readJSONData } from '../utils/dataUtils';
import { getLogger } from '../utils/logger';
import * as dotenv from 'dotenv';
import { CommonMethods } from '../commonMethods/commonMethods';
import { AutomationExcercisePage } from '../pages/automationExcercise.page';

dotenv.config();

const logger = getLogger('Fixtures');

type CustomFixtures = {
  commonMethods: CommonMethods;
  testData: Record<string, string>[];
  automationExcercisePage: AutomationExcercisePage;
};

export const test = base.extend<CustomFixtures>({
  testData:
    async ({}, use) => {
      const jsonPath = path.resolve(__dirname, '../../../test/data/testData.json');
      const data = readJSONData<Record<string, string>>(jsonPath);
      await use(data);
    },

  commonMethods:
    async ({ page }, use) => {
      await use(new CommonMethods(page));
      logger.info('✓ CommonMethods fixture teardown');
    },

  automationExcercisePage:
    async ({ page }, use) => {
      await use(new AutomationExcercisePage(page));
      logger.info('✓ AutomationExcercisePage fixture teardown');
    },
});

export { expect };

test.beforeEach(async ({ page, commonMethods }) => {
  const baseURL = process.env.BASE_URL;
  if (!baseURL) throw new Error('BASE_URL is not configured in .env');
  logger.info('================== TEST STARTED ==================');
  logger.info(`✓ Navigating to base URL: ${baseURL}`);
  await page.goto(baseURL);
  await commonMethods.waitForPageLoad(30000, 'load', 'Waiting for initial page load');
});

test.afterEach(async ({ page }) => {
  logger.info('================== TEST ENDED ==================');
  await page.context().clearCookies();
  logger.info('✓ Cookies cleared');
});
