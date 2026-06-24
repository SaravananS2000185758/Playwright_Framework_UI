import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { buildGrepPattern } from './src/ui/utils/executionConfig';

dotenv.config({ path: path.join(__dirname, '.env') });

function envNumber(name: string, defaultValue: string) {
  return Number.parseInt(process.env[name] || defaultValue, 10);
}

function envBoolean(name: string, defaultValue: boolean) {
  return process.env[name] ? process.env[name] !== 'false' : defaultValue;
}

export default defineConfig({
  testDir: path.join(__dirname, 'test/ui/specs'),
  testMatch: '**/*.spec.ts',
  testIgnore: '**/node_modules/**',

  fullyParallel: false,
  workers: envNumber('WORKERS', '1'),

  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  globalTimeout: 30 * 60 * 1000,

  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: process.env.CI ? 'never' : 'always' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['allure-playwright', { resultsDir: 'reports/allure-results' }],
    ['list'],
  ],

  use: {
    viewport: {
      width: envNumber('VIEWPORT_WIDTH', '1920'),
      height: envNumber('VIEWPORT_HEIGHT', '1080'),
    },
    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
    actionTimeout: envNumber('ACTION_TIMEOUT', '10000'),
    navigationTimeout: envNumber('NAVIGATION_TIMEOUT', '30000'),
    acceptDownloads: true,
  },

  retries: process.env.CI ? 2 : 0,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  grep: buildGrepPattern() ? new RegExp(buildGrepPattern()!) : undefined,

  forbidOnly: !!process.env.CI,
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true' ? 'all' : undefined,
});

