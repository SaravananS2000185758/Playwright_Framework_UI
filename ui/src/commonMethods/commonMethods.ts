import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BookingPage } from '../pages/bookingPage';
import { RetrieveBookingPage } from '../pages/retrieveBookingPage';
import { getLogger } from '../utils/logger';

const logger = getLogger('CommonMethods');

/**
 * Common Methods
 * Reusable workflow methods and generic flows
 */
export class CommonMethods {
  constructor(private page: Page) {}

  /**
   * Navigate to login page
   * @param baseURL - Base URL
   */
  async navigateToLogin(baseURL: string): Promise<void> {
    await this.page.goto(`${baseURL}/login`);
    logger.info('✓ Navigated to login page');
  }

  /**
   * Perform login flow
   * @param username - Username
   * @param password - Password
   */
  async loginFlow(username: string, password: string): Promise<LoginPage> {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, password);
    logger.info('✓ Login flow completed');
    return loginPage;
  }

  /**
   * Navigate to booking page
   * @param baseURL - Base URL
   */
  async navigateToBooking(baseURL: string): Promise<void> {
    await this.page.goto(`${baseURL}/booking`);
    logger.info('✓ Navigated to booking page');
  }

  /**
   * Navigate to retrieve booking page
   * @param baseURL - Base URL
   */
  async navigateToRetrieveBooking(baseURL: string): Promise<void> {
    await this.page.goto(`${baseURL}/retrieve-booking`);
    logger.info('✓ Navigated to retrieve booking page');
  }

  /**
   * Refresh current page
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
    logger.info('✓ Page refreshed');
  }

  /**
   * Go back to previous page
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
    logger.info('✓ Navigated to previous page');
  }

  /**
   * Get current page title
   */
  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    logger.info(`✓ Current page title: ${title}`);
    return title;
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    const url = this.page.url();
    logger.info(`✓ Current URL: ${url}`);
    return url;
  }

  /**
   * Wait for page to load
   * @param timeout - Timeout in milliseconds
   */
  async waitForPageLoad(timeout: number = 5000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
    logger.info('✓ Page loaded');
  }

  /**
   * Close browser
   */
  async closeBrowser(): Promise<void> {
    await this.page.context()?.browser()?.close();
    logger.info('✓ Browser closed');
  }

  /**
   * Get page instance
   */
  getPage(): Page {
    return this.page;
  }
}
