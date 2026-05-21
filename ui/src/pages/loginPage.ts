import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { LoginLocators } from '../locators/login.locators';
import { getLogger } from '../utils/logger';

const logger = getLogger('LoginPage');

/**
 * Login Page Object
 * Encapsulates all login page actions and validations
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Enter username
   * @param username - Username to enter
   */
  async enterUsername(username: string): Promise<void> {
    try {
      await this.actions.fill(LoginLocators.USERNAME_INPUT, username, 'Entering username');
      logger.info(`Entered username: ${username}`);
    } catch (error) {
      logger.error(`Error entering username: ${error}`);
      throw error;
    }
    }
    

  /**
   * Enter password
   * @param password - Password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.actions.fill(LoginLocators.PASSWORD_INPUT, password, 'Entering password');
  }

  /**
   * Enter email
   * @param email - Email to enter
   */
  async enterEmail(email: string): Promise<void> {
    await this.actions.fill(LoginLocators.EMAIL_INPUT, email, 'Entering email');
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.actions.click(LoginLocators.LOGIN_BUTTON, 'Clicking login button');
  }

  /**
   * Click forgot password link
   */
  async clickForgotPasswordLink(): Promise<void> {
    await this.actions.click(LoginLocators.FORGOT_PASSWORD_LINK, 'Clicking forgot password link');
  }

  /**
   * Click sign up link
   */
  async clickSignUpLink(): Promise<void> {
    await this.actions.click(LoginLocators.SIGNUP_LINK, 'Clicking sign up link');
  }

  /**
   * Toggle remember me checkbox
   */
  async toggleRememberMe(): Promise<void> {
    await this.actions.click(LoginLocators.REMEMBER_ME_CHECKBOX, 'Toggling remember me checkbox');
  }

  /**
   * Login with credentials
   * @param username - Username
   * @param password - Password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Verify login form is visible
   */
  async verifyLoginFormVisible(): Promise<void> {
    await this.assertions.validateVisible(LoginLocators.LOGIN_FORM, 'Verifying login form is visible');
  }

  /**
   * Verify error message displayed
   */
  async verifyErrorMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(LoginLocators.ERROR_MESSAGE, 'Verifying error message is displayed');
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    return await this.actions.getText(LoginLocators.ERROR_MESSAGE, 'Getting error message text');
  }

  /**
   * Verify success message displayed
   */
  async verifySuccessMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(LoginLocators.SUCCESS_MESSAGE, 'Verifying success message is displayed');
  }
}
