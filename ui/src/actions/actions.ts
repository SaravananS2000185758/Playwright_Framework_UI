import { Page, Locator } from '@playwright/test';
import { getLogger } from '../utils/logger';

const logger = getLogger('Actions');

/**
 * Actions Layer - Contains all reusable action methods for UI interaction
 * This layer abstracts the Playwright API to provide consistent action methods
 */
export class Actions {
  constructor(private page: Page) {}

  private formatSuccess(message?: string): string {
    return message?.trim() ? `✓ ${message}` : '✓';
  }

  private formatError(message?: string): string {
    return message?.trim() ? `: ${message}` : '';
  }

  /**
   * Click on an element
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
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

  /**
   * Fill text input with value
   * @param locator - Playwright locator object or selector string
   * @param value - Text value to fill
   * @param message - Optional message for logging
   */
  async fill(locator: Locator | string, value: string, message?: string): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.fill(value);
      logger.info(message?.trim() ? `✓ ${message} with value: ${value}` : '✓');
    } catch (error) {
      logger.error(`✗ Failed to fill element with value: ${value}${this.formatError(message)}`);
      throw error;
    }
  }

  /**
   * Select option from dropdown
   * @param locator - Playwright locator object or selector string
   * @param value - Value or label to select
   * @param message - Optional message for logging
   */
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

  /**
   * Get count of elements matching locator
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   * @returns Count of elements
   */
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

  /**
   * Get length of element collection
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   * @returns Length of collection
   */
  async getLength(locator: Locator | string, message?: string): Promise<number> {
    return this.getCount(locator, message);
  }

  /**
   * Check if element is visible
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   * @returns True if visible, false otherwise
   */
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

  /**
   * Check if element is disabled
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   * @returns True if disabled, false otherwise
   */
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

  /**
   * Get attribute value of element
   * @param locator - Playwright locator object or selector string
   * @param attribute - Attribute name
   * @param message - Optional message for logging
   * @returns Attribute value
   */
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

  /**
   * Get text content of element
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   * @returns Text content
   */
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

  /**
   * Hover over element
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
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

  /**
   * Scroll to element
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
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

  /**
   * Navigate to URL
   * @param url - URL to navigate to
   * @param message - Optional message for logging
   */
  async navigateTo(url: string, message?: string): Promise<void> {
    try {
      await this.page.goto(url);
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to navigate to ${url}${this.formatError(message)}`);
      throw error;
    }
  }

  /**
   * Wait for element to be visible
   * @param locator - Playwright locator object or selector string
   * @param timeout - Timeout in milliseconds
   * @param message - Optional message for logging
   */
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

  /**
   * Refresh page
   * @param message - Optional message for logging
   */
  async refreshPage(message?: string): Promise<void> {
    try {
      await this.page.reload();
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to refresh page${this.formatError(message)}`);
      throw error;
    }
  }

  /**
   * Press key
   * @param key - Key to press
   * @param message - Optional message for logging
   */
  async pressKey(key: string, message?: string): Promise<void> {
    try {
      await this.page.keyboard.press(key);
      logger.info(this.formatSuccess(message));
    } catch (error) {
      logger.error(`✗ Failed to press key: ${key}${this.formatError(message)}`);
      throw error;
    }
  }
}
