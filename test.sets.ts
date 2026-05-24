export const testSets = {
  smoke: {
    E2E: {
      description: 'Entire booking process',
      tests: [
        'validate the login page',
        'Validate the booking creation',
        'Validate the retrieve booking',
      ],
    },
  },
};

export default testSets;
