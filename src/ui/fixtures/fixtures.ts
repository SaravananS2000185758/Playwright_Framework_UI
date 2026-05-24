import * as path from 'path';
import { test as base, expect } from '@playwright/test';
import { readCSVtoJSON } from '../utils/dataUtils';
import { LoginPage } from '../pages/loginPage';
import { BookingPage } from '../pages/bookingPage';
import { RetrieveBookingPage } from '../pages/retrieveBookingPage';
import { CommonMethods } from '../commonMethods/commonMethods';
import { getLogger } from '../utils/logger';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = getLogger('Fixtures');

type CustomFixtures = {
  loginPage: LoginPage;
  bookingPage: BookingPage;
  retrieveBookingPage: RetrieveBookingPage;
  commonMethods: CommonMethods;
  testData: Record<string, string>[];
};

export const test = base.extend<CustomFixtures>({
  testData: async ({}, use) => {
    const csvPath = path.resolve(__dirname, '../../../test/data/testData.csv');
    const data = await readCSVtoJSON(csvPath);
    await use(data as Record<string, string>[]);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
    logger.info('✓ LoginPage fixture teardown');
  },

  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
    logger.info('✓ BookingPage fixture teardown');
  },

  retrieveBookingPage: async ({ page }, use) => {
    await use(new RetrieveBookingPage(page));
    logger.info('✓ RetrieveBookingPage fixture teardown');
  },

  commonMethods: async ({ page }, use) => {
    await use(new CommonMethods(page));
    logger.info('✓ CommonMethods fixture teardown');
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
