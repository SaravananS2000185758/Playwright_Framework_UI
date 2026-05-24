import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { Assertions } from '../assertions/assertions';
import { RetrieveBookingLocators } from '../locators/retrieveBooking.locators';
import { getLogger } from '../utils/logger';

const logger = getLogger('RetrieveBookingPage');

export class RetrieveBookingPage {
  public page: Page;
  private actions: Actions;
  private assertions: Assertions;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    logger.info('✓ RetrieveBookingPage initialized');
  }

  async enterBookingId(bookingId: string): Promise<void> {
    await this.actions.fill(RetrieveBookingLocators.BOOKING_ID_INPUT, bookingId, 'Entering booking ID');
  }

  async enterEmail(email: string): Promise<void> {
    await this.actions.fill(RetrieveBookingLocators.BOOKING_EMAIL_INPUT, email, 'Entering email');
  }

  async enterPhoneNumber(phone: string): Promise<void> {
    await this.actions.fill(RetrieveBookingLocators.PHONE_NUMBER_INPUT, phone, 'Entering phone number');
    logger.info(`Entered phone number: ${phone}`);
  }

  async clickSearchButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.SEARCH_BUTTON, 'Clicking search button');
  }

  async clickCancelButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.CANCEL_BUTTON, 'Clicking cancel button');
  }

  async clickModifyButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.MODIFY_BUTTON, 'Clicking modify button');
  }

  async clickCancelBookingButton(): Promise<void> {
    await this.actions.click(RetrieveBookingLocators.CANCEL_BOOKING_BUTTON, 'Clicking cancel booking button');
    await this.actions.getText(RetrieveBookingLocators.GUEST_NAME, 'Getting confirmation dialog text');
  }

  async searchBooking(bookingId: string, email: string, phone: string): Promise<void> {
    await this.enterBookingId(bookingId);
    await this.enterEmail(email);
    await this.enterPhoneNumber(phone);
    await this.clickSearchButton();
  }

  async verifyBookingDetailsDisplayed(): Promise<void> {
    await this.assertions.validateVisible(
      RetrieveBookingLocators.BOOKING_DETAILS_CONTAINER,
      'Verifying booking details are displayed'
    );
  }

  async getBookingNumber(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.BOOKING_NUMBER, 'Getting booking number');
  }

  async getBookingDate(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.BOOKING_DATE, 'Getting booking date');
  }

  async getGuestName(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.GUEST_NAME, 'Getting guest name');
  }

  async getHotelName(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.HOTEL_NAME, 'Getting hotel name');
  }

  async getCheckInDate(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.CHECK_IN_DATE, 'Getting check-in date');
  }

  async getCheckOutDate(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.CHECK_OUT_DATE, 'Getting check-out date');
  }

  async getTotalPrice(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.TOTAL_PRICE, 'Getting total price');
  }

  async getBookingStatus(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.BOOKING_STATUS, 'Getting booking status');
  }

  async verifyErrorMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(RetrieveBookingLocators.ERROR_MESSAGE, 'Verifying error message is displayed');
  }

  async verifySuccessMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(
      RetrieveBookingLocators.SUCCESS_MESSAGE,
      'Verifying success message is displayed'
    );
  }

  async verifyNotFoundMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(
      RetrieveBookingLocators.NOT_FOUND_MESSAGE,
      'Verifying not found message is displayed'
    );
  }

  async getErrorMessageText(): Promise<string> {
    return this.actions.getText(RetrieveBookingLocators.ERROR_MESSAGE, 'Getting error message text');
  }
}
