/**
 * Retrieve Booking Page Locators
 * Centralized locator management for retrieve booking page elements
 */
export class RetrieveBookingLocators {
  // Search fields
  static readonly BOOKING_ID_INPUT = 'input[id="bookingId"]';
  static readonly BOOKING_EMAIL_INPUT = 'input[id="email"]';
  static readonly PHONE_NUMBER_INPUT = 'input[id="phone"]';

  // Buttons
  static readonly SEARCH_BUTTON = 'button:has-text("Search Booking")';
  static readonly CANCEL_BUTTON = 'button:has-text("Cancel")';
  static readonly MODIFY_BUTTON = 'button:has-text("Modify")';
  static readonly CANCEL_BOOKING_BUTTON = 'button:has-text("Cancel Booking")';

  // Booking details
  static readonly BOOKING_DETAILS_CONTAINER = '.booking-details';
  static readonly BOOKING_NUMBER = '.booking-number';
  static readonly BOOKING_DATE = '.booking-date';
  static readonly GUEST_NAME = '.guest-name';
  static readonly HOTEL_NAME = '.hotel-name';
  static readonly CHECK_IN_DATE = '.check-in-date';
  static readonly CHECK_OUT_DATE = '.check-out-date';
  static readonly TOTAL_PRICE = '.total-price';
  static readonly BOOKING_STATUS = '.booking-status';

  // Messages
  static readonly ERROR_MESSAGE = '.error-message';
  static readonly SUCCESS_MESSAGE = '.success-message';
  static readonly NOT_FOUND_MESSAGE = '.not-found-message';
}
