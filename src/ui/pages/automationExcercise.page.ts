import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { Assertions } from '../assertions/assertions';
import { CommonMethods } from '../commonMethods/commonMethods';
import { getLogger } from '../utils/logger';
import { AutomationExcerciseLocators } from '../locators/automationExcercise.locator';

const logger = getLogger('AutomationExcercisePage');

export class AutomationExcercisePage {
  public page: Page;
  private actions: Actions;
  private assertions: Assertions;
  private commonMethods: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    this.commonMethods = new CommonMethods(page);
    logger.info('✓ AutomationExcercisePage initialized');
  }

  async validateAutomationExcerciseHomePage(): Promise<void> {

    await this.actions.waitForPageLoad(3000, 'networkidle', 'Waiting for page to load');
    await this.commonMethods.navigateToLogin();
    await this.actions.fill(AutomationExcerciseLocators.emailAddress, 'SaravananS23@hexaware.com', 'Enter the username');
    await this.actions.fill(AutomationExcerciseLocators.password, 'Br@v02026!@#', 'Enter the password');
    await this.actions.click(AutomationExcerciseLocators.loginButton, 'Clicking on LoginIn button');
    await this.actions.waitForElementVisible(AutomationExcerciseLocators.productsLabel, 5000, 'Waiting for products label to be visible');
    logger.warn('✓ Successfully validated the Automation Excercise Home Page - Testing Warn log');
    logger.info('✓ Successfully validated the Automation Excercise Home Page - Testing Info log');
    logger.error('✓ Successfully validated the Automation Excercise Home Page - Testing Error log');
    logger.verbose('✓ Successfully validated the Automation Excercise Home Page - Testing Verbose log');
    logger.silly('✓ Successfully validated the Automation Excercise Home Page - Testing Silly log');
  }
}
