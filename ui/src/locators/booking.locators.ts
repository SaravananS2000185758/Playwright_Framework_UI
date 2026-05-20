/**
 * Booking Page Locators
 * Centralized locator management for booking page elements
 */
export class BookingLocators {
  // Search/Filter fields
  static readonly DESTINATION_INPUT = 'input[id="destination"]';
  static readonly CHECK_IN_DATE = 'input[id="checkInDate"]';
  static readonly CHECK_OUT_DATE = 'input[id="checkOutDate"]';
  static readonly GUESTS_SELECT = 'select[id="guests"]';
  static readonly ROOMS_SELECT = 'select[id="rooms"]';

  // Buttons
  static readonly SEARCH_BUTTON = 'button:has-text("Search")';
  static readonly CLEAR_BUTTON = 'button:has-text("Clear")';
  static readonly NEXT_BUTTON = 'button:has-text("Next")';
  static readonly PREVIOUS_BUTTON = 'button:has-text("Previous")';

  // Results
  static readonly BOOKING_RESULTS = '.booking-results';
  static readonly BOOKING_CARD = '.booking-card';
  static readonly PRICE_ELEMENT = '.price';
  static readonly AVAILABILITY_BADGE = '.availability-badge';

  // Booking form
  static readonly BOOKING_FORM = 'form[id="booking-form"]';
  static readonly HOTEL_NAME = '.hotel-name';
  static readonly RATING_ELEMENT = '.rating';

  // Error/Success messages
  static readonly ERROR_MESSAGE = '.error-message';
  static readonly SUCCESS_MESSAGE = '.success-message';
}
