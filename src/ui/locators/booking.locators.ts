export class BookingLocators {
  static readonly DESTINATION_INPUT = 'input[id="destination"]';
  static readonly CHECK_IN_INPUT = 'input[id="checkin"]';
  static readonly CHECK_OUT_INPUT = 'input[id="checkout"]';
  static readonly GUESTS_INPUT = 'input[id="guests"]';
  static readonly ROOMS_INPUT = 'input[id="rooms"]';

  static readonly SEARCH_BUTTON = 'button:has-text("Search")';
  static readonly CLEAR_BUTTON = 'button:has-text("Clear")';
  static readonly NEXT_BUTTON = 'button:has-text("Next")';

  static readonly RESULT_CONTAINER = '.booking-results';
  static readonly RESULT_CARD = '.hotel-card';
  static readonly FIRST_HOTEL_NAME = '.hotel-card .hotel-name';
  static readonly FIRST_HOTEL_PRICE = '.hotel-card .hotel-price';
  static readonly FIRST_HOTEL_RATING = '.hotel-card .hotel-rating';

  static readonly ERROR_MESSAGE = '.error-message';
}
