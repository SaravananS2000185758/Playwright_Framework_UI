import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { RetrieveBookingLocators } from '../locators/retrieveBooking.locators';
import { getLogger } from '../utils/logger';

const logger = getLogger('RetrieveBookingPage');

/**
 * Retrieve Booking Page Object
 * Encapsulates all retrieve booking page actions and validations
 */
export class RetrieveBookingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Enter booking ID
   * @param bookingId - Booking ID
   */
  async enterBookingId(bookingId: string): Promise<void> {
    await this.actions.fill(RetrieveBookingLocators.BOOKING_ID_INPUT, bookingId, 'Entering booking ID');
  }

  /**
   * Enter email
   * @param email - Email address
   */
  async enterEmail(email: string): Promise<void> {
    await this.actions.fill(RetrieveBookingLocators.BOOKING_EMAIL_INPUT, email, 'Entering email');
  }

  /**
   * Enter phone number
   * @param phone - Phone number
   */
  async enterPhoneNumber(phone: string): Promise<void> {
    try {
      await this.actions.fill(RetrieveBookingLocators.PHONE_NUMBER_INPUT,phone,'Entering phone number');
      logger.info(`Entered phone number: ${phone}`);
    } catch (error) {
      logger.error(`Failed to enter phone number: ${phone}`);
      throw error;
    }
  }

  /**
   * Click search button
   */
  async clickSearchButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.SEARCH_BUTTON, 'Clicking search button');
  }

  /**
   * Click cancel button
   */
  async clickCancelButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.CANCEL_BUTTON, 'Clicking cancel button');
  }

  /**
   * Click modify button
   */
  async clickModifyButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.MODIFY_BUTTON, 'Clicking modify button');
  }

  /**
   * Click cancel booking button
   */
  async clickCancelBookingButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.CANCEL_BOOKING_BUTTON, 'Clicking cancel booking button');
    await this.actions.getText(RetrieveBookingLocators.GUEST_NAME, 'Getting confirmation dialog text');
    
  }

  /**
   * Search booking
   * @param bookingId - Booking ID
   * @param email - Email address
   * @param phone - Phone number
   */
  async searchBooking(bookingId: string, email: string, phone: string): Promise<void> {
    await this.enterBookingId(bookingId);
    await this.enterEmail(email);
    await this.enterPhoneNumber(phone);
    await this.clickSearchButton();
  }

  /**
   * Verify booking details displayed
   */
  async verifyBookingDetailsDisplayed(): Promise<void> {
    await this.assertions.validateVisible(
      RetrieveBookingLocators.BOOKING_DETAILS_CONTAINER,
      'Verifying booking details are displayed'
    );
  }

  /**
   * Get booking number
   */
  async getBookingNumber(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.BOOKING_NUMBER, 'Getting booking number');
  }

  /**
   * Get booking date
   */
  async getBookingDate(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.BOOKING_DATE, 'Getting booking date');
  }

  /**
   * Get guest name
   */
  async getGuestName(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.GUEST_NAME, 'Getting guest name');
  }

  /**
   * Get hotel name
   */
  async getHotelName(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.HOTEL_NAME, 'Getting hotel name');
  }

  /**
   * Get check-in date
   */
  async getCheckInDate(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.CHECK_IN_DATE, 'Getting check-in date');
  }

  /**
   * Get check-out date
   */
  async getCheckOutDate(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.CHECK_OUT_DATE, 'Getting check-out date');
  }

  /**
   * Get total price
   */
  async getTotalPrice(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.TOTAL_PRICE, 'Getting total price');
  }

  /**
   * Get booking status
   */
  async getBookingStatus(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.BOOKING_STATUS, 'Getting booking status');
  }

  /**
   * Verify error message displayed
   */
  async verifyErrorMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(RetrieveBookingLocators.ERROR_MESSAGE, 'Verifying error message is displayed');
  }

  /**
   * Verify success message displayed
   */
  async verifySuccessMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(
      RetrieveBookingLocators.SUCCESS_MESSAGE,
      'Verifying success message is displayed'
    );
  }

  /**
   * Verify not found message displayed
   */
  async verifyNotFoundMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(
      RetrieveBookingLocators.NOT_FOUND_MESSAGE,
      'Verifying not found message is displayed'
    );
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    return await this.actions.getText(RetrieveBookingLocators.ERROR_MESSAGE, 'Getting error message text');
  }
}
