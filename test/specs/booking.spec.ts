import { test, expect } from '../../ui/src/fixtures/baseFixture';
import { getLogger } from '../../ui/src/utils/logger';

const logger = getLogger('BookingSpec');

/**
 * Booking Test Suite
 */
test.describe('@booking Booking Page Tests', () => {
  /**
   * Test: Navigate to booking page and verify page loads
   */
  test('@booking @smoke Verify booking page loads successfully', async ({ page, bookingPage, commonMethods }) => {
    logger.info('Test: Verify booking page loads successfully');

    // Navigate to booking page
    const baseURL = process.env.BASE_URL || 'http://localhost:3000';
    await commonMethods.navigateToBooking(baseURL);

    // Verify page title contains "Booking"
    const pageTitle = await commonMethods.getPageTitle();
    expect(pageTitle).toContain('Booking');

    logger.info('✓ Test passed: Booking page loaded successfully');
  });

  /**
   * Test: Search for bookings with valid data
   */
  test('@booking @functional Search bookings with valid criteria', async ({ bookingPage }) => {
    logger.info('Test: Search bookings with valid criteria');

    // Fill search criteria
    await bookingPage.searchBookings('New York', '2024-06-15', '2024-06-20', '2', '1');

    // Wait for results to load
    await bookingPage.page.waitForLoadState('networkidle');

    // Verify results are displayed
    await bookingPage.verifyBookingResultsDisplayed();

    // Get results count
    const resultCount = await bookingPage.getBookingResultsCount();
    expect(resultCount).toBeGreaterThan(0);

    logger.info(`✓ Test passed: Found ${resultCount} booking results`);
  });

  /**
   * Test: Verify first hotel details
   */
  test('@booking @functional Verify hotel details in search results', async ({ bookingPage }) => {
    logger.info('Test: Verify hotel details in search results');

    // Perform search
    await bookingPage.searchBookings('Los Angeles', '2024-07-01', '2024-07-05', '3', '2');
    await bookingPage.page.waitForLoadState('networkidle');

    // Get hotel details
    const hotelName = await bookingPage.getFirstHotelName();
    const hotelPrice = await bookingPage.getFirstHotelPrice();
    const hotelRating = await bookingPage.getFirstHotelRating();

    // Verify hotel details are not empty
    expect(hotelName.length).toBeGreaterThan(0);
    expect(hotelPrice.length).toBeGreaterThan(0);
    expect(hotelRating.length).toBeGreaterThan(0);

    logger.info(`✓ Test passed: Hotel details - Name: ${hotelName}, Price: ${hotelPrice}, Rating: ${hotelRating}`);
  });

  /**
   * Test: Clear search form
   */
  test('@booking @functional Clear search form', async ({ bookingPage }) => {
    logger.info('Test: Clear search form');

    // Fill search criteria
    await bookingPage.enterDestination('Paris');
    await bookingPage.clickClearButton();

    // Verify fields are cleared
    const destinationValue = await bookingPage.page.locator('input[id="destination"]').inputValue();
    expect(destinationValue).toBe('');

    logger.info('✓ Test passed: Search form cleared successfully');
  });

  /**
   * Test: Pagination - Next button
   */
  test('@booking @functional Navigate to next page of results', async ({ bookingPage }) => {
    logger.info('Test: Navigate to next page of results');

    // Perform search
    await bookingPage.searchBookings('New York', '2024-06-15', '2024-06-20', '2', '1');
    await bookingPage.page.waitForLoadState('networkidle');

    // Click next button
    const nextButtonEnabled = await bookingPage.page.locator('button:has-text("Next")').isEnabled();
    if (nextButtonEnabled) {
      await bookingPage.clickNextButton();
      await bookingPage.page.waitForLoadState('networkidle');
      logger.info('✓ Test passed: Navigated to next page');
    } else {
      logger.info('⚠ Next button not available (only one page of results)');
    }
  });

  /**
   * Test: Invalid search - Missing destination
   */
  test('@booking @negative Search without destination should show error', async ({ bookingPage }) => {
    logger.info('Test: Search without destination should show error');

    // Try to search without destination
    await bookingPage.enterCheckInDate('2024-06-15');
    await bookingPage.enterCheckOutDate('2024-06-20');
    await bookingPage.clickSearchButton();

    // Verify error message is displayed
    await bookingPage.verifyErrorMessageDisplayed();

    const errorMessage = await bookingPage.getErrorMessageText();
    expect(errorMessage.length).toBeGreaterThan(0);

    logger.info(`✓ Test passed: Error displayed - ${errorMessage}`);
  });
});
