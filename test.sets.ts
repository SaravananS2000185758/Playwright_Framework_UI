export const testSets = {
  feature: {
    description: 'Feature suite for smoke-tagged validation',
    tests: [
      '@smoke Verify Automation Excercise Page successfully',
    ],
  },

  e2e: {
    description: 'E2E suite for regression-tagged validation',
    tests: [
      '@regression Verify Automation Excercise Page successfully',
    ],
  },
};

export default testSets;
