import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { Assertions } from '../assertions/assertions';
import { getLogger } from '../utils/logger';

const logger = getLogger('BasePage');

/**
 * Base Page Object
 * Contains common functionality for all page objects
 */
export class BasePage {
  public page: Page;
  protected actions: Actions;
  protected assertions: Assertions;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    logger.info(`✓ ${this.constructor.name} initialized`);
  }

  /**
   * Get page instance
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Get actions instance
   */
  getActions(): Actions {
    return this.actions;
  }

  /**
   * Get assertions instance
   */
  getAssertions(): Assertions {
    return this.assertions;
  }

  /**
   * Close page
   */
  async closePage(): Promise<void> {
    try {
      await this.page.close();
      logger.info(`✓ Page closed`);
    } catch (error) {
      logger.error(`✗ Error closing page: ${(error as Error).message}`);
    }
  }
}
