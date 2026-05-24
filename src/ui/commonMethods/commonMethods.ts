import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { LoginPage } from '../pages/loginPage';
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

  private async navigate(path: string): Promise<void> {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    await this.actions.navigateTo(`${this.getBaseURL()}${normalizedPath}`, `Navigated to ${normalizedPath}`);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate('/login');
  }

  async navigateToBooking(): Promise<void> {
    await this.navigate('/booking');
  }

  async navigateToRetrieveBooking(): Promise<void> {
    await this.navigate('/retrieve-booking');
  }

  async loginFlow(username: string, password: string): Promise<LoginPage> {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, password);
    logger.info('✓ Login flow completed');
    return loginPage;
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

  getPage(): Page {
    return this.page;
  }
}
