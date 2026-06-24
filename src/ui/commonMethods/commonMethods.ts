import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { getLogger } from '../utils/logger';

const logger = getLogger('CommonMethods');

export class CommonMethods {
  private actions: Actions;

  constructor(private page: Page) {
    this.actions = new Actions(page);
  }

  private getBaseURL(): string {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
      throw new Error('BASE_URL is not configured in .env');
    }
    return baseURL.replace(/\/$/, '');
  }

  async navigateToLogin(): Promise<void> {
    const baseURL = this.getBaseURL();
    await this.actions.navigateTo(`${baseURL}/login`, 'Navigated to login page');
  }

  async refreshPage(): Promise<void> {
    await this.page.reload();
    logger.info('✓ Page refreshed');
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
    logger.info('✓ Navigated to previous page');
  }

  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    logger.info(`✓ Current page title: ${title}`);
    return title;
  }

  async getCurrentURL(): Promise<string> {
    const url = this.page.url();
    logger.info(`✓ Current URL: ${url}`);
    return url;
  }

  async waitForPageLoad(timeout: number = 5000, state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle', message?: string): Promise<void> {
    await this.actions.waitForPageLoad(timeout, state, message ?? 'Waiting for page load');
  }

  async closeBrowser(): Promise<void> {
    await this.page.context()?.browser()?.close();
    logger.info('✓ Browser closed');
  }

}
