import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { BookingLocators } from '../locators/booking.locators';
import { getLogger } from '../utils/logger';

const logger = getLogger('BookingPage');

/**
 * Booking Page Object
 * Encapsulates all booking page actions and validations
 */
export class BookingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Enter destination
   * @param destination - Destination name
   */
  async enterDestination(destination: string): Promise<void> {
    await this.actions.fill(BookingLocators.DESTINATION_INPUT, destination, 'Entering destination');
  }

  /**
   * Enter check-in date
   * @param date - Check-in date
   */
  async enterCheckInDate(date: string): Promise<void> {
    await this.actions.fill(BookingLocators.CHECK_IN_DATE, date, 'Entering check-in date');
  }

  /**
   * Enter check-out date
   * @param date - Check-out date
   */
  async enterCheckOutDate(date: string): Promise<void> {
    await this.actions.fill(BookingLocators.CHECK_OUT_DATE, date, 'Entering check-out date');
  }

  /**
   * Select number of guests
   * @param guests - Number of guests
   */
  async selectGuests(guests: string): Promise<void> {
    await this.actions.selectDropdown(BookingLocators.GUESTS_SELECT, guests, 'Selecting number of guests');
  }

  /**
   * Select number of rooms
   * @param rooms - Number of rooms
   */
  async selectRooms(rooms: string): Promise<void> {
    await this.actions.selectDropdown(BookingLocators.ROOMS_SELECT, rooms, 'Selecting number of rooms');
  }

  /**
   * Click search button
   */
  async clickSearchButton(): Promise<void> {
    await this.actions.click(BookingLocators.SEARCH_BUTTON, 'Clicking search button');
  }

  /**
   * Click clear button
   */
  async clickClearButton(): Promise<void> {
    await this.actions.click(BookingLocators.CLEAR_BUTTON, 'Clicking clear button');
  }

  /**
   * Search for bookings
   * @param destination - Destination
   * @param checkInDate - Check-in date
   * @param checkOutDate - Check-out date
   * @param guests - Number of guests
   * @param rooms - Number of rooms
   */
  async searchBookings(
    destination: string,
    checkInDate: string,
    checkOutDate: string,
    guests: string,
    rooms: string
  ): Promise<void> {
    await this.enterDestination(destination);
    await this.enterCheckInDate(checkInDate);
    await this.enterCheckOutDate(checkOutDate);
    await this.selectGuests(guests);
    await this.selectRooms(rooms);
    await this.clickSearchButton();
  }

  /**
   * Get booking results count
   */
  async getBookingResultsCount(): Promise<number> {
    return await this.actions.getCount(BookingLocators.BOOKING_CARD, 'Getting booking results count');
  }

  /**
   * Verify booking results displayed
   */
  async verifyBookingResultsDisplayed(): Promise<void> {
    await this.assertions.validateVisible(BookingLocators.BOOKING_RESULTS, 'Verifying booking results are displayed');
  }

  /**
   * Get first hotel name
   */
  async getFirstHotelName(): Promise<string> {
    return await this.actions.getText(
      this.page.locator(BookingLocators.BOOKING_CARD).first().locator(BookingLocators.HOTEL_NAME),
      'Getting first hotel name'
    );
  }

  /**
   * Get first hotel price
   */
  async getFirstHotelPrice(): Promise<string> {
    return await this.actions.getText(
      this.page.locator(BookingLocators.BOOKING_CARD).first().locator(BookingLocators.PRICE_ELEMENT),
      'Getting first hotel price'
    );
  }

  /**
   * Get first hotel rating
   */
  async getFirstHotelRating(): Promise<string> {
    return await this.actions.getText(
      this.page.locator(BookingLocators.BOOKING_CARD).first().locator(BookingLocators.RATING_ELEMENT),
      'Getting first hotel rating'
    );
  }

  /**
   * Click next button
   */
  async clickNextButton(): Promise<void> {
    await this.actions.click(BookingLocators.NEXT_BUTTON, 'Clicking next button');
  }

  /**
   * Click previous button
   */
  async clickPreviousButton(): Promise<void> {
    await this.actions.click(BookingLocators.PREVIOUS_BUTTON, 'Clicking previous button');
  }

  /**
   * Verify error message displayed
   */
  async verifyErrorMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(BookingLocators.ERROR_MESSAGE, 'Verifying error message is displayed');
  }

  /**
   * Verify success message displayed
   */
  async verifySuccessMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(BookingLocators.SUCCESS_MESSAGE, 'Verifying success message is displayed');
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    return await this.actions.getText(BookingLocators.ERROR_MESSAGE, 'Getting error message text');
  }
}
