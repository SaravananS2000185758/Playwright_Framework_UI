import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { buildGrepPattern } from './src/ui/utils/executionConfig';

dotenv.config({ path: path.join(__dirname, '.env') });

const workers = Number.parseInt(process.env.WORKERS || '4', 10);
const viewportWidth = Number.parseInt(process.env.VIEWPORT_WIDTH || '1920', 10);
const viewportHeight = Number.parseInt(process.env.VIEWPORT_HEIGHT || '1080', 10);
const actionTimeout = Number.parseInt(process.env.ACTION_TIMEOUT || '10000', 10);
const navigationTimeout = Number.parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10);
const retries = Number.parseInt(process.env.RETRIES || '0', 10);

export default defineConfig({
  testDir: path.join(__dirname, 'test/specs'),
  testMatch: '**/*.spec.ts',
  testIgnore: '**/node_modules/**',

  fullyParallel: true,
  workers,

  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  globalTimeout: 30 * 60 * 1000,

  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: process.env.CI ? 'never' : 'always' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['list'],
  ],

  use: {
    viewport: {
      width: viewportWidth,
      height: viewportHeight,
    },
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout,
    navigationTimeout,
    acceptDownloads: true,
  },

  retries,

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

