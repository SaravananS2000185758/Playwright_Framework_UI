import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { Assertions } from '../assertions/assertions';
import { BookingLocators } from '../locators/automationExcercise.locator';
import { getLogger } from '../utils/logger';

const logger = getLogger('AutomationExercisePage');

export class BookingPage {
  public page: Page;
  private actions: Actions;
  private assertions: Assertions;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    logger.info('✓ BookingPage initialized');
  }

  async validateAutomationExcerciseHomePage(): Promise<void> {
    await this.actions.waitForElementVisible(
      BookingLocators.PAGE_TITLE,
      5000,
      'Waiting for page title to be visible'
    );
    await this.assertions.validateText(
      BookingLocators.PAGE_TITLE,
      'Website for automation practice',
      'Validating page title text'
    );
  }
}
