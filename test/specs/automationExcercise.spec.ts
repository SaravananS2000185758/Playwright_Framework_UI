import { test, expect } from '../../src/ui/fixtures/fixtures';
import { getLogger } from '../../src/ui/utils/logger';

const logger = getLogger('BookingSpec');

test.describe('Automation Excercise Page Tests', () => {

  test('@smoke Verify Automation Excercise Page successfully-01', async ({ automationExcercisePage }) => {
    await automationExcercisePage.validateAutomationExcerciseHomePage();
  });

  test('@regression Verify Automation Excercise Page successfully-02', async ({ automationExcercisePage }) => {
    await automationExcercisePage.validateAutomationExcerciseHomePage();
  });

});
