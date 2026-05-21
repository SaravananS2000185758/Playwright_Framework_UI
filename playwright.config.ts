import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

/**
 * Playwright Configuration
 * Reference: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: path.join(__dirname, 'test/specs'),

  // Glob patterns
  testMatch: '**/*.spec.ts',
  testIgnore: '**/node_modules/**',

  // Parallel execution
  fullyParallel: true,
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS) : 4,

  // Timeouts
  timeout: 30 * 1000, // 30 seconds
  expect: {
    timeout: 5 * 1000, // 5 seconds
  },

  // Global timeout
  globalTimeout: 30 * 60 * 1000, // 30 minutes

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['list'],
  ],

  // Use configuration
  use: {
    // Base URL
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Viewport
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1920'),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '1080'),
    },

    // Screenshots and videos
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    // Action timeout
    actionTimeout: 10 * 1000, // 10 seconds

    // Navigation timeout
    navigationTimeout: 30 * 1000, // 30 seconds

    // Accept downloads
    acceptDownloads: true,
  },

  // Retries
  retries: process.env.RETRIES ? parseInt(process.env.RETRIES) : 0,

  // Projects (browsers)
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
    // Uncomment for mobile testing
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Webserver configuration (optional)
  // Uncomment if you need to start a local server
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000,
  // },

  // Global settings
  forbidOnly: !!process.env.CI,
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true' ? 'all' : undefined,
});
