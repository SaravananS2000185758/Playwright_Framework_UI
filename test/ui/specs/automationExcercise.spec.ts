import { test } from '../../../src/ui/fixtures/fixtures';
import { getLogger } from '../../../src/ui/utils/logger';

const logger = getLogger('BookingSpec');

test.describe('Automation Excercise Page Tests', () => {

  test('@smoke Verify Automation Excercise Page successfully-01', async ({ automationExcercisePage, testData }) => {
    await automationExcercisePage.validateAutomationExcerciseHomePage(testData[0] as { username: string; password: string });
  });

  test('@regression Verify Automation Excercise Page successfully-02', async ({ automationExcercisePage, testData }) => {
    await automationExcercisePage.validateAutomationExcerciseHomePage(testData[0] as { username: string; password: string });
  });

});
