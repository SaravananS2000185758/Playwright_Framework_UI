import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { Assertions } from '../assertions/assertions';
import { LoginLocators } from '../locators/login.locators';
import { getLogger } from '../utils/logger';

const logger = getLogger('LoginPage');

export class LoginPage {
  public page: Page;
  private actions: Actions;
  private assertions: Assertions;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    logger.info('✓ LoginPage initialized');
  }

  async enterUsername(username: string): Promise<void> {
    await this.actions.fill(LoginLocators.USERNAME_INPUT, username, 'Entering username');
    logger.info(`Entered username: ${username}`);
  }

  async enterPassword(password: string): Promise<void> {
    await this.actions.fill(LoginLocators.PASSWORD_INPUT, password, 'Entering password');
  }

  async enterEmail(email: string): Promise<void> {
    await this.actions.fill(LoginLocators.EMAIL_INPUT, email, 'Entering email');
  }

  async clickLoginButton(): Promise<void> {
    await this.actions.click(LoginLocators.LOGIN_BUTTON, 'Clicking login button');
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.actions.click(LoginLocators.FORGOT_PASSWORD_LINK, 'Clicking forgot password link');
  }

  async clickSignUpLink(): Promise<void> {
    await this.actions.click(LoginLocators.SIGNUP_LINK, 'Clicking sign up link');
  }

  async toggleRememberMe(): Promise<void> {
    await this.actions.click(LoginLocators.REMEMBER_ME_CHECKBOX, 'Toggling remember me checkbox');
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async verifyLoginFormVisible(): Promise<void> {
    await this.assertions.validateVisible(LoginLocators.LOGIN_FORM, 'Verifying login form is visible');
  }

  async verifyErrorMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(LoginLocators.ERROR_MESSAGE, 'Verifying error message is displayed');
  }

  async getErrorMessageText(): Promise<string> {
    return this.actions.getText(LoginLocators.ERROR_MESSAGE, 'Getting error message text');
  }

  async verifySuccessMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(LoginLocators.SUCCESS_MESSAGE, 'Verifying success message is displayed');
  }
}
