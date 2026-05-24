import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { Assertions } from '../assertions/assertions';
import { BookingLocators } from '../locators/booking.locators';
import { getLogger } from '../utils/logger';

const logger = getLogger('BookingPage');

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

  async enterDestination(destination: string): Promise<void> {
    await this.actions.fill(BookingLocators.DESTINATION_INPUT, destination, 'Entering destination');
  }

  async enterCheckInDate(checkInDate: string): Promise<void> {
    await this.actions.fill(BookingLocators.CHECK_IN_INPUT, checkInDate, 'Entering check-in date');
  }

  async enterCheckOutDate(checkOutDate: string): Promise<void> {
    await this.actions.fill(BookingLocators.CHECK_OUT_INPUT, checkOutDate, 'Entering check-out date');
  }

  async enterGuests(guests: string): Promise<void> {
    await this.actions.fill(BookingLocators.GUESTS_INPUT, guests, 'Entering guest count');
  }

  async enterRooms(rooms: string): Promise<void> {
    await this.actions.fill(BookingLocators.ROOMS_INPUT, rooms, 'Entering room count');
  }

  async clickSearchButton(): Promise<void> {
    await this.actions.click(BookingLocators.SEARCH_BUTTON, 'Clicking search button');
  }

  async clickClearButton(): Promise<void> {
    await this.actions.click(BookingLocators.CLEAR_BUTTON, 'Clicking clear button');
  }

  async clickNextButton(): Promise<void> {
    await this.actions.click(BookingLocators.NEXT_BUTTON, 'Clicking next button');
  }

  async searchBookings(destination: string, checkInDate: string, checkOutDate: string, guests: string, rooms: string): Promise<void> {
    await this.enterDestination(destination);
    await this.enterCheckInDate(checkInDate);
    await this.enterCheckOutDate(checkOutDate);
    await this.enterGuests(guests);
    await this.enterRooms(rooms);
    await this.clickSearchButton();
  }

  async verifyBookingResultsDisplayed(): Promise<void> {
    await this.assertions.validateVisible(BookingLocators.RESULT_CONTAINER, 'Verifying booking results are displayed');
  }

  async getBookingResultsCount(): Promise<number> {
    return this.actions.getCount(BookingLocators.RESULT_CARD, 'Getting booking results count');
  }

  async getFirstHotelName(): Promise<string> {
    return this.actions.getText(BookingLocators.FIRST_HOTEL_NAME, 'Getting first hotel name');
  }

  async getFirstHotelPrice(): Promise<string> {
    return this.actions.getText(BookingLocators.FIRST_HOTEL_PRICE, 'Getting first hotel price');
  }

  async getFirstHotelRating(): Promise<string> {
    return this.actions.getText(BookingLocators.FIRST_HOTEL_RATING, 'Getting first hotel rating');
  }

  async verifyErrorMessageDisplayed(): Promise<void> {
    await this.assertions.validateVisible(BookingLocators.ERROR_MESSAGE, 'Verifying error message is displayed');
  }

  async getErrorMessageText(): Promise<string> {
    return this.actions.getText(BookingLocators.ERROR_MESSAGE, 'Getting error message text');
  }
}
