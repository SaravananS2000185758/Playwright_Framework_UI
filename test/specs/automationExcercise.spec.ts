import { test, expect } from '../../src/ui/fixtures/fixtures';
import { getLogger } from '../../src/ui/utils/logger';

const logger = getLogger('BookingSpec');

test.describe('Automation Excercise Page Tests', () => {

  test('@e2e-smoke @smoke Verify Automation Excercise Page loads successfully', async ({ automationExcercisePage }) => {
    await automationExcercisePage.validateDHRHomePage();
  });

  test('@feature-regression Verify Automation Excercise page is accessible for feature regression', async ({ automationExcercisePage }) => {
    await automationExcercisePage.validateDHRHomePage();
  });

});
