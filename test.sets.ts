import { getLogger } from './ui/src/utils/logger';

const logger = getLogger('TestSets');

/**
 * Test Set Configuration
 * Defines test suites based on tags and scenarios
 */
export interface TestSet {
  tagName: string;
  scenarios: string[];
  description?: string;
}

export interface TestSetConfig {
  [key: string]: TestSet;
}

/**
 * Test Sets Configuration
 * Define various test suites that can be executed
 */
const testSets: TestSetConfig = {
  // E2E Test Suite
  e2e: {
    tagName: '@booking @login @retrieve',
    scenarios: [
      'Navigate to booking page',
      'Create the booking',
      'Retrieve the booking',
      'Modify the booking',
      'Cancel the booking',
    ],
    description: 'Complete end-to-end booking workflow',
  },

  // Smoke Test Suite
  smoke: {
    tagName: '@smoke',
    scenarios: [
      'Verify login page loads successfully',
      'Verify booking page loads successfully',
      'Verify retrieve booking page loads successfully',
    ],
    description: 'Smoke tests for basic functionality',
  },

  // Functional Test Suite
  functional: {
    tagName: '@functional',
    scenarios: [
      'Login with valid credentials',
      'Search bookings with valid criteria',
      'Verify hotel details in search results',
      'Search for booking with valid data',
      'Verify booking details are populated',
    ],
    description: 'Functional tests for core features',
  },

  // Negative Test Suite
  negative: {
    tagName: '@negative',
    scenarios: [
      'Login with invalid password',
      'Search without destination should show error',
      'Search without email should show error',
    ],
    description: 'Negative tests for error handling',
  },

  // Booking Tests
  booking: {
    tagName: '@booking',
    scenarios: [
      'Verify booking page loads successfully',
      'Search bookings with valid criteria',
      'Verify hotel details in search results',
      'Clear search form',
      'Navigate to next page of results',
      'Search without destination should show error',
    ],
    description: 'All booking related tests',
  },

  // Login Tests
  login: {
    tagName: '@login',
    scenarios: [
      'Verify login page loads successfully',
      'Login with valid credentials',
      'Login with invalid password',
      'Verify forgot password link is clickable',
      'Toggle remember me checkbox',
      'Verify login button is disabled with empty fields',
      'Verify sign up link navigation',
    ],
    description: 'All login related tests',
  },

  // Retrieve Booking Tests
  retrieve: {
    tagName: '@retrieve',
    scenarios: [
      'Verify retrieve booking page loads successfully',
      'Search for booking with valid data',
      'Verify booking details are populated',
      'Search without email should show error',
      'Verify cancel booking button is available',
      'Verify modify booking button is available',
      'Retrieve booking total price',
      'Verify check-in and check-out dates',
    ],
    description: 'All retrieve booking related tests',
  },

  // Regression Test Suite
  regression: {
    tagName: '@booking @login @retrieve @functional',
    scenarios: [
      'Verify booking page loads successfully',
      'Login with valid credentials',
      'Search bookings with valid criteria',
      'Verify retrieve booking page loads successfully',
      'Search for booking with valid data',
    ],
    description: 'Regression tests for critical functionality',
  },

  // All Tests
  all: {
    tagName: '@booking @login @retrieve @smoke @functional @negative',
    scenarios: [
      'All available tests',
    ],
    description: 'Complete test suite',
  },
};

/**
 * Get test set by name
 * @param setName - Name of the test set
 * @returns TestSet configuration
 */
export function getTestSet(setName: string): TestSet | undefined {
  const set = testSets[setName.toLowerCase()];
  if (set) {
    logger.info(`✓ Test Set '${setName}' loaded: ${set.description}`);
    logger.info(`  Tags: ${set.tagName}`);
    logger.info(`  Scenarios: ${set.scenarios.length}`);
  } else {
    logger.warn(`⚠ Test Set '${setName}' not found`);
  }
  return set;
}

/**
 * Get all available test sets
 * @returns Map of all test sets
 */
export function getAllTestSets(): TestSetConfig {
  logger.info(`✓ Available Test Sets: ${Object.keys(testSets).join(', ')}`);
  return testSets;
}

/**
 * Print test set information
 * @param setName - Name of the test set
 */
export function printTestSetInfo(setName: string): void {
  const set = getTestSet(setName);
  if (set) {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log(`║ Test Set: ${setName.toUpperCase().padEnd(40)}║`);
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║ Description: ${set.description?.padEnd(36)}║`);
    console.log(`║ Tags: ${set.tagName.padEnd(45)}║`);
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║ Scenarios (${set.scenarios.length}):${' '.repeat(40 - String(set.scenarios.length).length)}║`);
    set.scenarios.forEach((scenario, index) => {
      console.log(`║   ${index + 1}. ${scenario.padEnd(45)}║`);
    });
    console.log('╚════════════════════════════════════════════════════╝\n');
  }
}

/**
 * Print all available test sets
 */
export function printAllTestSets(): void {
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║         Available Test Sets and Suites             ║');
  console.log('╠════════════════════════════════════════════════════╣');

  Object.entries(testSets).forEach(([key, value]) => {
    console.log(`║ ${key.padEnd(8)} - ${value.description?.padEnd(38)}║`);
  });

  console.log('╚════════════════════════════════════════════════════╝\n');
  console.log('Usage: npx playwright test --grep "@tag-name"\n');
}

// Export test sets for direct access
export default testSets;
