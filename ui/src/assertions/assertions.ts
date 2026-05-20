import { Page, Locator, expect } from '@playwright/test';
import { getLogger } from '../utils/logger';

const logger = getLogger('Assertions');

/**
 * Assertions Layer - Contains all assertion methods (hard and soft)
 * Hard Assertions: Test fails immediately on assertion failure
 * Soft Assertions: Test continues even on assertion failure, errors are collected
 */
export class Assertions {
  private softErrors: Error[] = [];

  constructor(private page: Page) {}

  /**
   * Validate text content (Hard Assertion)
   * @param locator - Playwright locator object or selector string
   * @param expectedText - Expected text
   * @param message - Optional message for logging
   */
  async validateText(
    locator: Locator | string,
    expectedText: string,
    message: string = 'Validating text'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toHaveText(expectedText);
      logger.info(`✓ ${message}: "${expectedText}" found`);
    } catch (error) {
      logger.error(`✗ ${message}: Expected "${expectedText}" but assertion failed`);
      throw error;
    }
  }

  /**
   * Validate text content with partial match (Hard Assertion)
   * @param locator - Playwright locator object or selector string
   * @param expectedText - Expected text (partial)
   * @param message - Optional message for logging
   */
  async validateContainsText(
    locator: Locator | string,
    expectedText: string,
    message: string = 'Validating text contains'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toContainText(expectedText);
      logger.info(`✓ ${message}: "${expectedText}" found in text`);
    } catch (error) {
      logger.error(`✗ ${message}: Expected text to contain "${expectedText}"`);
      throw error;
    }
  }

  /**
   * Validate attribute value (Hard Assertion)
   * @param locator - Playwright locator object or selector string
   * @param attribute - Attribute name
   * @param expectedValue - Expected attribute value
   * @param message - Optional message for logging
   */
  async validateAttribute(
    locator: Locator | string,
    attribute: string,
    expectedValue: string | RegExp,
    message: string = 'Validating attribute'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toHaveAttribute(attribute, expectedValue as any);
      logger.info(`✓ ${message}: Attribute "${attribute}" = "${expectedValue}"`);
    } catch (error) {
      logger.error(`✗ ${message}: Attribute validation failed for "${attribute}"`);
      throw error;
    }
  }

  /**
   * Validate element visibility (Hard Assertion)
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
  async validateVisible(
    locator: Locator | string,
    message: string = 'Validating element visibility'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toBeVisible();
      logger.info(`✓ ${message}: Element is visible`);
    } catch (error) {
      logger.error(`✗ ${message}: Element is not visible`);
      throw error;
    }
  }

  /**
   * Validate element is enabled (Hard Assertion)
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
  async validateEnabled(
    locator: Locator | string,
    message: string = 'Validating element enabled'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toBeEnabled();
      logger.info(`✓ ${message}: Element is enabled`);
    } catch (error) {
      logger.error(`✗ ${message}: Element is not enabled`);
      throw error;
    }
  }

  /**
   * Validate element is hidden (Hard Assertion)
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
  async validateHidden(
    locator: Locator | string,
    message: string = 'Validating element hidden'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toBeHidden();
      logger.info(`✓ ${message}: Element is hidden`);
    } catch (error) {
      logger.error(`✗ ${message}: Element is visible`);
      throw error;
    }
  }

  /**
   * Validate element is disabled (Hard Assertion)
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
  async validateDisabled(
    locator: Locator | string,
    message: string = 'Validating element disabled'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toBeDisabled();
      logger.info(`✓ ${message}: Element is disabled`);
    } catch (error) {
      logger.error(`✗ ${message}: Element is not disabled`);
      throw error;
    }
  }

  /**
   * Validate page title (Hard Assertion)
   * @param expectedTitle - Expected page title
   * @param message - Optional message for logging
   */
  async validateTitle(
    expectedTitle: string | RegExp,
    message: string = 'Validating page title'
  ): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(expectedTitle as any);
      logger.info(`✓ ${message}: Title matches "${expectedTitle}"`);
    } catch (error) {
      logger.error(`✗ ${message}: Title validation failed`);
      throw error;
    }
  }

  /**
   * Validate URL (Hard Assertion)
   * @param expectedURL - Expected URL
   * @param message - Optional message for logging
   */
  async validateURL(
    expectedURL: string | RegExp,
    message: string = 'Validating URL'
  ): Promise<void> {
    try {
      await expect(this.page).toHaveURL(expectedURL as any);
      logger.info(`✓ ${message}: URL is "${expectedURL}"`);
    } catch (error) {
      logger.error(`✗ ${message}: URL validation failed`);
      throw error;
    }
  }

  /**
   * Soft Assertion - Validate text content (doesn't fail test immediately)
   * @param locator - Playwright locator object or selector string
   * @param expectedText - Expected text
   * @param message - Optional message for logging
   */
  async softValidateText(
    locator: Locator | string,
    expectedText: string,
    message: string = 'Soft validating text'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toHaveText(expectedText);
      logger.info(`✓ ${message}: "${expectedText}" found`);
    } catch (error) {
      logger.warn(`⚠ ${message}: Expected "${expectedText}" but found different text`);
      this.softErrors.push(error as Error);
    }
  }

  /**
   * Soft Assertion - Validate element visibility (doesn't fail test immediately)
   * @param locator - Playwright locator object or selector string
   * @param message - Optional message for logging
   */
  async softValidateVisible(
    locator: Locator | string,
    message: string = 'Soft validating visibility'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toBeVisible();
      logger.info(`✓ ${message}: Element is visible`);
    } catch (error) {
      logger.warn(`⚠ ${message}: Element is not visible`);
      this.softErrors.push(error as Error);
    }
  }

  /**
   * Soft Assertion - Validate attribute value (doesn't fail test immediately)
   * @param locator - Playwright locator object or selector string
   * @param attribute - Attribute name
   * @param expectedValue - Expected attribute value
   * @param message - Optional message for logging
   */
  async softValidateAttribute(
    locator: Locator | string,
    attribute: string,
    expectedValue: string | RegExp,
    message: string = 'Soft validating attribute'
  ): Promise<void> {
    try {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await expect(element).toHaveAttribute(attribute, expectedValue as any);
      logger.info(`✓ ${message}: Attribute "${attribute}" = "${expectedValue}"`);
    } catch (error) {
      logger.warn(`⚠ ${message}: Attribute validation failed for "${attribute}"`);
      this.softErrors.push(error as Error);
    }
  }

  /**
   * Get collected soft assertion errors
   * @returns Array of collected errors
   */
  getSoftErrors(): Error[] {
    return this.softErrors;
  }

  /**
   * Clear soft assertion errors
   */
  clearSoftErrors(): void {
    this.softErrors = [];
  }

  /**
   * Throw all collected soft assertion errors
   */
  throwSoftErrors(): void {
    if (this.softErrors.length > 0) {
      const errorMessages = this.softErrors.map((error, index) => `${index + 1}. ${error.message}`).join('\n');
      logger.error(`✗ Soft assertion failures:\n${errorMessages}`);
      this.softErrors = [];
      throw new Error(`Soft assertion failures:\n${errorMessages}`);
    }
  }

  /**
   * Assert equals
   * @param actual - Actual value
   * @param expected - Expected value
   * @param message - Optional message for logging
   */
  assertEqual(actual: any, expected: any, message: string = 'Validating equality'): void {
    try {
      expect(actual).toBe(expected);
      logger.info(`✓ ${message}: ${actual} equals ${expected}`);
    } catch (error) {
      logger.error(`✗ ${message}: Expected ${expected} but got ${actual}`);
      throw error;
    }
  }

  /**
   * Soft assert equals (doesn't fail test immediately)
   * @param actual - Actual value
   * @param expected - Expected value
   * @param message - Optional message for logging
   */
  softAssertEqual(actual: any, expected: any, message: string = 'Soft validating equality'): void {
    try {
      expect(actual).toBe(expected);
      logger.info(`✓ ${message}: ${actual} equals ${expected}`);
    } catch (error) {
      logger.warn(`⚠ ${message}: Expected ${expected} but got ${actual}`);
      this.softErrors.push(error as Error);
    }
  }
}
