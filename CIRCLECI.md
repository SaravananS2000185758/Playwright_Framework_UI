# CircleCI Pipeline Configuration

## Overview

This document covers the CircleCI CI/CD pipeline setup for the Playwright Automation Framework.

---

## Pipeline Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    CIRCLECI PIPELINE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  WORKFLOW 1: full-pipeline (main / develop push)                │
│  ├─ validate-setup ──────────────► Verify framework config      │
│  ├─ test-chromium ───────────────► Run tests on Chrome          │
│  ├─ test-firefox ────────────────► Run tests on Firefox         │
│  └─ test-webkit ─────────────────► Run tests on Safari          │
│                                                                  │
│  WORKFLOW 2: pr-validation (feature branches)                   │
│  └─ test-smoke ──────────────────► Smoke tests on Chromium      │
│                                                                  │
│  WORKFLOW 3: scheduled-regression (daily 2 AM UTC)              │
│  └─ test-regression ─────────────► @regression tag tests        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Setup Instructions

### Step 1: Connect Repository to CircleCI

1. Go to [https://app.circleci.com](https://app.circleci.com)
2. Sign in with your GitHub/Bitbucket account
3. Click **Projects** → **Set Up Project**
4. Select your repository
5. CircleCI will auto-detect `.circleci/config.yml`

### Step 2: Configure Environment Variables

Go to **Project Settings → Environment Variables** and add:

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Target application URL |
| `WORKERS` | Parallel workers (default: 4) |
| `LOG_LEVEL` | Logger level (default: info) |

### Step 3: Set Up Scheduled Pipeline

The `scheduled-regression` workflow runs daily at 2 AM UTC automatically via the `cron` trigger in `config.yml`. No additional setup needed.

---

## Workflows

### 1. `full-pipeline`
- Triggers on push to `main` or `develop`
- Runs `validate-setup` first, then all three browser jobs in parallel
- Stores HTML reports, JUnit XML, and logs as artifacts

### 2. `pr-validation`
- Triggers on all feature branches (any branch except `main`/`develop`)
- Runs smoke tests (`@smoke`) on Chromium only for fast feedback

### 3. `scheduled-regression`
- Runs daily at 2 AM UTC on `main`
- Executes `@regression` tagged tests across all workers

---

## Artifacts

After each pipeline run, the following are stored:

| Artifact | Path | Description |
|----------|------|-------------|
| HTML Report | `html-report/` | Interactive Playwright HTML report |
| Logs | `logs/` | Winston log files (all.log, error.log) |
| JUnit XML | `reports/junit.xml` | Test results for CircleCI test summary |
| Test Results | `test-results/` | Playwright trace files |

Access artifacts via **CircleCI UI → Pipeline → Job → Artifacts tab**.

---

## Running Tests Locally (same commands as CI)

```bash
# All tests
npx playwright test

# Smoke tests
npx playwright test --grep @smoke

# Regression tests
npx playwright test --grep @regression

# Specific browser
npx playwright test --project=chromium
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Pipeline not triggering | Verify `.circleci/config.yml` is in repo root |
| Browser install fails | The `mcr.microsoft.com/playwright` Docker image includes all browsers |
| Tests timeout | Reduce `WORKERS` or increase `timeout` in `playwright.config.ts` |
| Artifacts missing | Check job completed — artifacts only upload on job completion |

---

## Additional Resources

- [CircleCI Documentation](https://circleci.com/docs/)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [CircleCI Node.js Orb](https://circleci.com/developer/orbs/orb/circleci/node)

---

**Last Updated:** 2025  
**Framework Version:** 1.0.0  
**CI/CD Provider:** CircleCI
