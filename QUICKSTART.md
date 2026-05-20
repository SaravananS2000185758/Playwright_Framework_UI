#!/usr/bin/env node

/**
 * PLAYWRIGHT FRAMEWORK - QUICK START GUIDE
 * 
 * This file provides quick commands to get started with the framework
 */

import testSets, { printAllTestSets, printTestSetInfo } from './test.sets';
import { getLogger } from './ui/src/utils/logger';

const logger = getLogger('QuickStart');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  PLAYWRIGHT AUTOMATION FRAMEWORK - QUICK START GUIDE           ║
╚════════════════════════════════════════════════════════════════╝
`);

console.log('📋 AVAILABLE COMMANDS:\n');

console.log('1️⃣  RUN ALL TESTS');
console.log('   Command: npm test\n');

console.log('2️⃣  RUN SPECIFIC TEST SUITE');
console.log('   Command: npx playwright test --grep @tag-name');
console.log('   Examples:');
console.log('   - npx playwright test --grep @smoke');
console.log('   - npx playwright test --grep @functional');
console.log('   - npx playwright test --grep @login');
console.log('   - npx playwright test --grep @booking');
console.log('   - npx playwright test --grep @retrieve\n');

console.log('3️⃣  RUN TESTS IN HEADED MODE (See Browser)');
console.log('   Command: npm run test:headed\n');

console.log('4️⃣  RUN TESTS IN DEBUG MODE');
console.log('   Command: npm run test:debug\n');

console.log('5️⃣  RUN TESTS IN UI MODE');
console.log('   Command: npm run test:ui\n');

console.log('6️⃣  RUN SPECIFIC TEST FILE');
console.log('   Command: npx playwright test test/specs/login.spec.ts\n');

console.log('7️⃣  VIEW TEST REPORT');
console.log('   Command: npm run test:report\n');

console.log('8️⃣  RUN TESTS IN SPECIFIC BROWSER');
console.log('   Command: npm run test:chromium');
console.log('   Command: npm run test:firefox');
console.log('   Command: npm run test:webkit\n');

console.log('9️⃣  RUN TESTS SERIALLY (One at a time)');
console.log('   Command: npm run test:serial\n');

console.log('🔟 RUN TESTS IN PARALLEL');
console.log('   Command: npm run test:parallel\n');

console.log('════════════════════════════════════════════════════════════════\n');

console.log('📊 AVAILABLE TEST SETS:\n');

Object.entries(testSets).forEach(([key, value]) => {
  console.log(`  ✓ ${key.padEnd(12)} - ${value.description}`);
});

console.log('\n════════════════════════════════════════════════════════════════\n');

console.log('🎯 QUICK START STEPS:\n');
console.log('1. Install dependencies: npm install');
console.log('2. Configure BASE_URL in test/data/config.properties');
console.log('3. Update test data in test/data/testData.csv');
console.log('4. Run tests: npm test');
console.log('5. View report: npm run test:report\n');

console.log('════════════════════════════════════════════════════════════════\n');

console.log('📚 DOCUMENTATION:\n');
console.log('  • Full documentation: See README.md');
console.log('  • Test examples: test/specs/*.spec.ts');
console.log('  • Page objects: ui/src/pages/');
console.log('  • Locators: ui/src/locators/');
console.log('  • Actions: ui/src/actions/');
console.log('  • Assertions: ui/src/assertions/\n');

console.log('════════════════════════════════════════════════════════════════\n');

console.log('✅ Framework is ready to use!');
console.log('   Start writing your tests in test/specs/\n');
