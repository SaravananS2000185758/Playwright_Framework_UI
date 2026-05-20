import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BookingPage } from '../pages/bookingPage';
import { RetrieveBookingPage } from '../pages/retrieveBookingPage';
import { CommonMethods } from '../commonMethods/commonMethods';
import { getLogger } from '../utils/logger';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: 'test/data/config.properties' });

const logger = getLogger('Fixtures');

/**
 * Define custom fixtures
 */
type CustomFixtures = {
  loginPage: LoginPage;
  bookingPage: BookingPage;
  retrieveBookingPage: RetrieveBookingPage;
  commonMethods: CommonMethods;
};

/**
 * Create extended test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
  // LoginPage fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    logger.info('✓ LoginPage fixture created');
    await use(loginPage);
    logger.info('✓ LoginPage fixture teardown');
  },

  // BookingPage fixture
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);
    logger.info('✓ BookingPage fixture created');
    await use(bookingPage);
    logger.info('✓ BookingPage fixture teardown');
  },

  // RetrieveBookingPage fixture
  retrieveBookingPage: async ({ page }, use) => {
    const retrieveBookingPage = new RetrieveBookingPage(page);
    logger.info('✓ RetrieveBookingPage fixture created');
    await use(retrieveBookingPage);
    logger.info('✓ RetrieveBookingPage fixture teardown');
  },

  // CommonMethods fixture
  commonMethods: async ({ page }, use) => {
    const commonMethods = new CommonMethods(page);
    logger.info('✓ CommonMethods fixture created');
    await use(commonMethods);
    logger.info('✓ CommonMethods fixture teardown');
  },
});

export { expect };

/**
 * Hook: Before each test
 */
test.beforeEach(async ({ page, commonMethods }) => {
  logger.info('================== TEST STARTED ==================');
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  
  // Navigate to application
  await page.goto(baseURL);
  logger.info(`✓ Navigated to base URL: ${baseURL}`);
});

/**
 * Hook: After each test
 */
test.afterEach(async ({ page }) => {
  logger.info('================== TEST ENDED ==================');
  
  // Clear cookies and storage
  const context = page.context();
  await context.clearCookies();
  logger.info('✓ Cookies cleared');
});
