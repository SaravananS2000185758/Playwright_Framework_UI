import { Page, Locator } from '@playwright/test';
import { getLogger } from '../utils/logger';

const logger = getLogger('Actions');

export class Actions {
  constructor(private page: Page) {}

  private formatSuccess(message?: string): string {
    return message?.trim() ? `✓ ${message}` : '✓';
  }

  private formatError(message?: string): string {
    return message?.trim() ? `: ${message}` : '';
  }

  async click(locator: Locator | string, message?: string): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.click();
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to click element${this.formatError(message)}`);
      throw error;
    }
  }

  async fill(locator: Locator | string, value: string, message?: string): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.fill(value);
      logger.info(message?.trim() ? `${this.formatSuccess(message)} with value: ${value}` : '✓');
    } catch (error) {
      logger.error(`✗ Failed to fill element with value: ${value}${this.formatError(message)}`);
      throw error;
    }
  }

  async selectDropdown(locator: Locator | string, value: string, message?: string): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.selectOption(value);
      logger.info(message?.trim() ? `✓ ${message}: ${value}` : '✓');
    } catch (error) {
      logger.error(`✗ Failed to select dropdown option: ${value}${this.formatError(message)}`);
      throw error;
    }
  }

  async getCount(locator: Locator | string, message?: string): Promise<number> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      const count = await element.count();
      logger.info(message?.trim() ? `✓ ${message}: ${count} elements found` : '✓');
      return count;
    } catch (error) {
      logger.error(`✗ Failed to get element count${this.formatError(message)}`);
      throw error;
    }
  }

  async getLength(locator: Locator | string, message?: string): Promise<number> {
    return this.getCount(locator, message);
  }

  async isVisible(locator: Locator | string, message?: string): Promise<boolean> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      const visible = await element.isVisible();
      logger.info(
        message?.trim()
          ? `✓ ${message}: Element is ${visible ? 'visible' : 'not visible'}`
          : `✓ Element is ${visible ? 'visible' : 'not visible'}`
      );
      return visible;
    } catch (error) {
      logger.error(`✗ Failed to check element visibility${this.formatError(message)}`);
      throw error;
    }
  }

  async isDisabled(locator: Locator | string, message?: string): Promise<boolean> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      const disabled = await element.isDisabled();
      logger.info(
        message?.trim()
          ? `✓ ${message}: Element is ${disabled ? 'disabled' : 'enabled'}`
          : `✓ Element is ${disabled ? 'disabled' : 'enabled'}`
      );
      return disabled;
    } catch (error) {
      logger.error(`✗ Failed to check element disabled state${this.formatError(message)}`);
      throw error;
    }
  }

  async isInvisible(locator: Locator | string, message?: string): Promise<boolean> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      const invisible = await element.isHidden();
      logger.info(
        message?.trim()
          ? `✓ ${message}: Element is ${invisible ? 'invisible' : 'visible'}`
          : `✓ Element is ${invisible ? 'invisible' : 'visible'}`
      );
      return invisible;
    } catch (error) {
      logger.error(`✗ Failed to check element invisibility${this.formatError(message)}`);
      throw error;
    }
  }

  async getAttribute(locator: Locator | string, attribute: string, message?: string): Promise<string | null> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      const value = await element.getAttribute(attribute);
      logger.info(message?.trim() ? `✓ ${message} '${attribute}': ${value}` : '✓');
      return value;
    } catch (error) {
      logger.error(`✗ Failed to get attribute '${attribute}'${this.formatError(message)}`);
      throw error;
    }
  }

  async getText(locator: Locator | string, message?: string): Promise<string> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      const text = await element.textContent();
      logger.info(message?.trim() ? `✓ ${message}: ${text}` : '✓');
      return text || '';
    } catch (error) {
      logger.error(`✗ Failed to get element text${this.formatError(message)}`);
      throw error;
    }
  }

  async hover(locator: Locator | string, message?: string): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.hover();
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to hover over element${this.formatError(message)}`);
      throw error;
    }
  }

  async scrollToElement(locator: Locator | string, message?: string): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.scrollIntoViewIfNeeded();
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to scroll to element${this.formatError(message)}`);
      throw error;
    }
  }

  async navigateTo(url: string, message?: string): Promise<void> {
    try {
      await this.page.goto(url);
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to navigate to ${url}${this.formatError(message)}`);
      throw error;
    }
  }

  async waitForPageLoad(timeout: number = 30000, state: 'load' | 'domcontentloaded' | 'networkidle' = 'load', message?: string): Promise<void> {
    try {
      await this.page.waitForLoadState(state, { timeout });
      logger.info(message?.trim() ? this.formatSuccess(message) : `✓ Page loaded in ${timeout}ms`);
    } catch (error) {
      logger.error(`✗ Page did not load within ${timeout}ms${this.formatError(message)}`);
      throw error;
    }
  }

  async waitForElement(locator: Locator | string, timeout: number = 5000, message?: string): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.waitFor({ timeout });
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed while${this.formatError(message)}`);
      throw error;
    }
  }

  async waitForElementVisible(locator: Locator | string, timeout: number = 5000, message?: string): Promise<void> {
    await this.waitForElement(locator, timeout, message);
  }

  async refreshPage(message?: string): Promise<void> {
    try {
      await this.page.reload();
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to refresh page${this.formatError(message)}`);
      throw error;
    }
  }

  async pressKey(key: string, message?: string): Promise<void> {
    try {
      await this.page.keyboard.press(key);
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to press key: ${key}${this.formatError(message)}`);
      throw error;
    }
  }

  async wait(milliseconds: number, message?: string): Promise<void> {
    try {
      await this.page.waitForTimeout(milliseconds);
      logger.info(message?.trim() ? `${this.formatSuccess(message)} (${milliseconds}ms)` : `✓ Delayed for ${milliseconds}ms`);
    } catch (error) {
      logger.error(`✗ Failed during wait of ${milliseconds}ms${this.formatError(message)}`);
      throw error;
    }
  }

  async sleep(milliseconds: number, message?: string): Promise<void> {
    await this.wait(milliseconds, message);
  }
}
