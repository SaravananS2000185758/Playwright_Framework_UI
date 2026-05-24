import { test, expect } from '../../src/ui/fixtures/fixtures';
import { getLogger } from '../../src/ui/utils/logger';

const logger = getLogger('BookingSpec');

test.describe('@booking Booking Page Tests', () => {
  test('@booking @smoke Verify booking page loads successfully', async ({ commonMethods }) => {
    logger.info('Test: Verify booking page loads successfully');

    await commonMethods.navigateToBooking();
    const pageTitle = await commonMethods.getPageTitle();
    expect(pageTitle).toContain('Booking');

    logger.info('✓ Test passed: Booking page loaded successfully');
  });

  test('@booking @functional Search bookings with valid criteria', async ({ bookingPage, testData }) => {
    logger.info('Test: Search bookings with valid criteria');

    const bookingData = testData[1];
    await bookingPage.searchBookings(bookingData.destination, bookingData.checkInDate, bookingData.checkOutDate, bookingData.guests, bookingData.rooms);
    await bookingPage.page.waitForLoadState('networkidle');

    await bookingPage.verifyBookingResultsDisplayed();
    const resultCount = await bookingPage.getBookingResultsCount();
    expect(resultCount).toBeGreaterThan(0);

    logger.info(`✓ Test passed: Found ${resultCount} booking results`);
  });

  test('@booking @functional Verify hotel details in search results', async ({ bookingPage, testData }) => {
    logger.info('Test: Verify hotel details in search results');

    const bookingData = testData[1];
    await bookingPage.searchBookings(bookingData.destination, bookingData.checkInDate, bookingData.checkOutDate, bookingData.guests, bookingData.rooms);
    await bookingPage.page.waitForLoadState('networkidle');

    const hotelName = await bookingPage.getFirstHotelName();
    const hotelPrice = await bookingPage.getFirstHotelPrice();
    const hotelRating = await bookingPage.getFirstHotelRating();

    expect(hotelName.length).toBeGreaterThan(0);
    expect(hotelPrice.length).toBeGreaterThan(0);
    expect(hotelRating.length).toBeGreaterThan(0);

    logger.info(`✓ Test passed: Hotel details - Name: ${hotelName}, Price: ${hotelPrice}, Rating: ${hotelRating}`);
  });

  test('@booking @functional Clear search form', async ({ bookingPage }) => {
    logger.info('Test: Clear search form');

    await bookingPage.enterDestination('Paris');
    await bookingPage.clickClearButton();

    const destinationValue = await bookingPage.page.locator('input[id="destination"]').inputValue();
    expect(destinationValue).toBe('');

    logger.info('✓ Test passed: Search form cleared successfully');
  });

  test('@booking @functional Navigate to next page of results', async ({ bookingPage, testData }) => {
    logger.info('Test: Navigate to next page of results');

    const bookingData = testData[1];
    await bookingPage.searchBookings(bookingData.destination, bookingData.checkInDate, bookingData.checkOutDate, bookingData.guests, bookingData.rooms);
    await bookingPage.page.waitForLoadState('networkidle');

    const nextButtonEnabled = await bookingPage.page.locator('button:has-text("Next")').isEnabled();
    if (nextButtonEnabled) {
      await bookingPage.clickNextButton();
      await bookingPage.page.waitForLoadState('networkidle');
      logger.info('✓ Test passed: Navigated to next page');
    } else {
      logger.info('⚠ Next button not available (only one page of results)');
    }
  });

  test('@booking @negative Search without destination should show error', async ({ bookingPage }) => {
    logger.info('Test: Search without destination should show error');

    await bookingPage.enterCheckInDate('2024-06-15');
    await bookingPage.enterCheckOutDate('2024-06-20');
    await bookingPage.clickSearchButton();

    await bookingPage.verifyErrorMessageDisplayed();
    const errorMessage = await bookingPage.getErrorMessageText();
    expect(errorMessage.length).toBeGreaterThan(0);

    logger.info(`✓ Test passed: Error displayed - ${errorMessage}`);
  });
});
