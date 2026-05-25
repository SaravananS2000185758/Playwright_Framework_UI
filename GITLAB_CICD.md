# GitLab CI/CD Pipeline Configuration

## Overview

This document provides comprehensive guidance on setting up and using the GitLab CI/CD pipeline for the Playwright Automation Framework.

## 📋 Table of Contents

1. [Pipeline Structure](#pipeline-structure)
2. [Setup Instructions](#setup-instructions)
3. [Configuration](#configuration)
4. [Pipeline Stages](#pipeline-stages)
5. [Environment Variables](#environment-variables)
6. [Running Tests](#running-tests)
7. [Viewing Reports](#viewing-reports)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Pipeline Structure

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    GITLAB CI/CD PIPELINE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STAGE 1: INSTALL                                               │
│  ├─ install:dependencies ────────────► Install npm packages     │
│  └─ install:browsers ────────────────► Install Playwright      │
│                                                                  │
│  STAGE 2: TEST (Parallel Execution)                             │
│  ├─ test:chromium ────────► Run tests on Chrome                │
│  ├─ test:firefox ─────────► Run tests on Firefox               │
│  └─ test:webkit ──────────► Run tests on Safari                │
│                                                                  │
│  STAGE 3: SMOKE                                                 │
│  └─ smoke:tests ──────────► Run configured feature suite        │
│                                                                  │
│  STAGE 4: REPORT                                                │
│  ├─ report:html ──────────► Generate HTML reports              │
│  ├─ report:logs ──────────► Collect test logs                  │
│  └─ report:junit ─────────► Generate JUnit reports             │
│                                                                  │
│  STAGE 5: CLEANUP                                               │
│  └─ cleanup:artifacts ────► Clean temporary files              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Pipeline Execution Flow

```
Code Push / PR / Schedule
    ↓
Install Dependencies & Browsers
    ↓
Parallel Test Execution (Chromium, Firefox, WebKit)
    ↓
Generate & Publish Reports
    ↓
Cleanup Temporary Artifacts
    ↓
Pipeline Complete
```

---

## Setup Instructions

### Step 1: Ensure .gitlab-ci.yml is in Repository

The `.gitlab-ci.yml` file should be in the root of your repository:

```
Playwright_Framework_UI/
├── .gitlab-ci.yml          ✅ CI/CD configuration
├── playwright.config.ts
├── package.json
└── ... (other files)
```

### Step 2: Enable GitLab CI/CD

1. Go to your GitLab project
2. Navigate to: **Settings → CI/CD**
3. Ensure "CI/CD pipeline" is **enabled**
4. Verify runner availability (project or group runners)

### Step 3: Configure Project Variables

Go to **Settings → CI/CD → Variables** and add:

```
BASE_URL = http://your-application-url
WORKERS = 4  (optional, defaults to 4)
```

### Step 4: Create Scheduled Pipelines (Optional)

For daily automated tests:

1. Go to **CI/CD → Schedules**
2. Click **New schedule**
3. Configure:
   - **Interval pattern**: `0 2 * * *` (Daily at 2 AM UTC)
   - **Description**: "Daily Configured Suite Tests"
   - **Active**: Toggle ON

---

## Configuration

### Variable Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_VERSION` | 18.20.0 | Node.js version for pipeline |
| `WORKERS` | 4 | Number of parallel workers |
| `BASE_URL` | http://localhost:3000 | Target application URL |
| `CI` | true | CI/CD environment indicator |
| `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` | 0 | Download Playwright browsers |

### Cache Configuration

The pipeline uses intelligent caching to speed up builds:

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}-npm
  paths:
    - .npm/
    - node_modules/
```

**Cache Strategy:**
- npm packages cached per branch
- Playwright browsers cached separately
- Cache retained for 30 days

### Artifacts Configuration

Test artifacts are automatically uploaded:

| Type | Location | Retention |
|------|----------|-----------|
| HTML Reports | `reports/html-report/` | 30 days |
| JUnit XML | `reports/junit.xml` | 30 days |
| Test Logs | `reports/logs/` | 30 days |
| JSON Results | `reports/test-results.json` | 30 days |

---

## Pipeline Stages

### Stage 1: INSTALL

**Purpose:** Set up development environment

#### `install:dependencies`
- Installs npm packages using `npm ci`
- Uses cached `.npm` directory
- **Runs on:** All pushes and merge requests
- **Duration:** ~2-3 minutes (first run), ~10-20 seconds (cached)

```bash
# Manual equivalent
npm ci --cache .npm --prefer-offline
```

#### `install:browsers`
- Installs Playwright browsers (Chromium, Firefox, WebKit)
- Caches browser binaries
- **Duration:** ~5-10 minutes (first run), ~30 seconds (cached)

```bash
# Manual equivalent
npx playwright install --with-deps chromium firefox webkit
```

---

### Stage 2: TEST

**Purpose:** Execute the configured suite selection in parallel on all browsers

#### `test:chromium`
- Tests on Chromium browser using the configured suite selection
- Uses 4 parallel workers (configurable)
- **Triggers:** Pushes to main/develop, merge requests, schedules
- **Artifacts:** HTML, JUnit, JSON reports

```bash
# Manual equivalent
npx playwright test --project=chromium --workers=4
```

#### `test:firefox`
- Tests on Firefox browser using the configured suite selection
- Same parallelization as Chromium
- **Triggers:** Same as Chromium
- **Artifacts:** HTML, JUnit, JSON reports

```bash
# Manual equivalent
npx playwright test --project=firefox --workers=4
```

#### `test:webkit`
- Tests on WebKit browser using the configured suite selection
- Same parallelization as Chromium
- **Triggers:** Same as Chromium
- **Artifacts:** HTML, JUnit, JSON reports

```bash
# Manual equivalent
npx playwright test --project=webkit --workers=4
```

---

### Stage 3: SMOKE

**Purpose:** Run the current feature suite selection (manual trigger)

#### `smoke:tests`
- Runs the feature suite selection from `test/execution.config.properties`
- Defaults to tests tagged with `@smoke`
- Manual trigger via GitLab UI
- Faster feedback loop
- **Triggers:** Merge requests (manual only)

```bash
# Manual equivalent
npx playwright test --grep @smoke --workers=4
```

If you want the pipeline to execute the e2e suite instead, update `test/execution.config.properties` and adjust the pipeline command accordingly.

---

### Stage 4: REPORT

**Purpose:** Generate and publish comprehensive test reports

#### `report:html`
- Generates interactive HTML test report
- Accessible via GitLab CI/CD artifacts
- **URL format:** `<project-url>/-/jobs/<job-id>/artifacts/file/reports/html-report/index.html`

#### `report:logs`
- Collects all test execution logs
- Separated by browser and test run
- Useful for debugging

#### `report:junit`
- Generates JUnit-format XML reports
- Integrated with GitLab test report interface
- Enables test statistics in merge requests

---

### Stage 5: CLEANUP

**Purpose:** Clean up temporary artifacts

#### `cleanup:artifacts`
- Removes temporary JSON files
- Keeps reports for archival
- Runs on all successful pipelines

---

## Environment Variables

### Required Variables

Add these in **Settings → CI/CD → Variables**:

```
BASE_URL = http://your-app-url
```

### Optional Variables

```
WORKERS = 4              # Parallel workers (default: 4)
CI = true               # Automatically set by GitLab
```

### Using Variables in Pipeline

Variables can be accessed via `$VARIABLE_NAME`:

```yaml
script:
  - npx playwright test --project=chromium
env:
  BASE_URL: "${BASE_URL:-http://localhost:3000}"
```

---

## Running Tests

### Automatic Test Execution

Tests run automatically on:

1. **Push to main/develop**
   - The configured suite selection on all browsers
   - Reports published automatically

2. **Merge Request**
   - The configured suite selection on Chromium
   - Reports linked in MR UI

3. **Scheduled Pipeline**
   - The configured suite selection at 2 AM UTC
   - Email notifications on failure

### Config-Driven Execution

The pipeline uses the same execution settings as local runs from `test/execution.config.properties`.

Current defaults:
```properties
feature.enabled = true
feature.tagName = smoke

e2e.enabled = false
e2e.tagName = regression
```

With these values, the default pipeline behavior resolves to `@smoke` only. To change the executed suite, update the config file and rerun the pipeline.

### Manual Test Execution

Trigger tests manually via GitLab UI:

1. Navigate to **CI/CD → Pipelines**
2. Click **Run pipeline** button
3. Select branch and variables
4. Click **Create pipeline**

### Running Specific Tests

Modify `test/execution.config.properties` to control the suite selection and rerun the pipeline:

```yaml
script:
  - npx playwright test
```

If you want to override the config temporarily, you can also run a tag-specific command manually:

```yaml
script:
  - npx playwright test --grep @smoke
```

---

## Viewing Reports

### HTML Test Reports

1. Navigate to **CI/CD → Pipelines**
2. Click on job name (e.g., `test:chromium`)
3. Click **Artifacts** tab
4. Download or view `html-report/index.html`

**Report Contents:**
- Test overview and statistics
- Pass/fail breakdown by browser
- Detailed test case results
- Screenshots on failure
- Video recordings on failure
- Execution timeline

### JUnit Test Results

1. In **Merge Request**, scroll to "Test reports"
2. View test statistics and results
3. Click test name to see details

### Logs

1. Navigate to **CI/CD → Pipelines**
2. Click job name
3. View logs in main panel
4. Download logs via **Artifacts** tab

### Pipeline Status

Check pipeline status in multiple places:

- **Project homepage** - Latest pipeline badge
- **Merge Request** - Inline pipeline status
- **CI/CD → Pipelines** - Full pipeline history
- **Branch page** - Status indicator

---

## Troubleshooting

### Common Issues

#### 1. **Pipeline Not Starting**

**Problem:** Pipeline doesn't trigger on push

**Solution:**
- Verify `.gitlab-ci.yml` is in repository root
- Check CI/CD is enabled in project settings
- Ensure runner is available
- Check branch protection rules

#### 2. **Browser Installation Fails**

**Problem:** "Error: Browser download failed"

**Solution:**
```bash
# Clear cache and retry
# Settings → CI/CD → Cache → Clear cache
# Then run pipeline again
```

#### 3. **Tests Timeout**

**Problem:** Tests exceed 30-minute timeout

**Solution:**
- Reduce parallel workers (increase `WORKERS`)
- Split tests into smaller batches
- Increase timeout in `playwright.config.ts`

#### 4. **Out of Memory**

**Problem:** "JavaScript heap out of memory"

**Solution:**
- Reduce `WORKERS` value
- Split tests across multiple jobs
- Use different runners with more memory

#### 5. **Reports Not Generated**

**Problem:** Artifacts not found

**Solution:**
- Check test execution completed successfully
- Verify report paths in `playwright.config.ts`
- Check disk space on runner

### Debug Mode

View detailed pipeline information:

1. **Enable Debug Logging**
   ```yaml
   variables:
     CI_DEBUG_TRACE: "true"
   ```
   ⚠️ **Warning:** Exposes sensitive data. Use carefully!

2. **View Job Logs**
   - Click job name in pipeline
   - Scroll through logs
   - Look for error messages

3. **SSH to Runner**
   ```bash
   # Use debug jobs to access runner
   # Navigate to job → Debug
   ```

---

## Best Practices

### 1. **Optimize Test Execution**

```yaml
# ✅ Good: Parallel browser execution
test:chromium: ...
test:firefox: ...
test:webkit: ...

# ❌ Bad: Sequential browser execution
test:all_browsers:
  script:
    - npx playwright test
```

### 2. **Use Appropriate Branch Filters**

```yaml
only:
  - merge_requests    # Run on PRs
  - main              # Run on main push
  - develop           # Run on develop push
  - schedules         # Run on schedule
```

### 3. **Set Proper Timeouts**

```yaml
# Always set timeout for long-running jobs
timeout: 30m

script:
  - timeout 25m npx playwright test
```

### 4. **Cache Effectively**

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}-npm
  paths:
    - .npm/
    - node_modules/
    - ~/.cache/ms-playwright/
  policy: pull-push
```

### 5. **Handle Failures Gracefully**

```yaml
# Allow non-critical jobs to fail
allow_failure: true
when: on_failure

# Retry on infrastructure failures
retry:
  max: 2
  when:
    - runner_system_failure
    - stuck_or_timeout_failure
```

### 6. **Version Lock Dependencies**

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 7. **Use Artifacts Efficiently**

```yaml
artifacts:
  paths:
    - reports/
  expire_in: 30 days
  when: always  # Keep even on failure
```

### 8. **Document Configuration**

Add comments to `.gitlab-ci.yml`:

```yaml
# ============================================================================
# STAGE 1: INSTALL - Setup dependencies
# ============================================================================
install:dependencies:
  stage: install
  # ... rest of config
```

### 9. **Monitor Pipeline Performance**

1. Track average pipeline duration
2. Identify slow jobs
3. Optimize caching strategy
4. Scale runners if needed

### 10. **Security Best Practices**

- Use **CI/CD variables** for sensitive data (URLs, credentials)
- Never commit secrets in `.gitlab-ci.yml`
- Use **protected variables** for sensitive data
- Rotate credentials regularly
- Use **masked variables** for passwords

---

## Advanced Configuration

### Custom Docker Image

```yaml
image: mcr.microsoft.com/playwright:v1.40.0-focal
```

### Matrix Strategy

```yaml
test:parallel:
  stage: test
  strategy:
    matrix:
      - PROJECT: chromium
      - PROJECT: firefox
      - PROJECT: webkit
  script:
    - npx playwright test --project=$PROJECT
```

### Conditional Execution

```yaml
script:
  - |
    if [ "$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" == "main" ]; then
      npx playwright test --grep @smoke
    else
      npx playwright test
    fi
```

### Custom Notifications

Set up Slack/Teams notifications:

1. **Settings → Integrations**
2. Add Slack or Teams
3. Configure pipeline alerts

---

## Integration with Merge Requests

### Automatic MR Comments

Pipeline automatically adds comments to merge requests with:
- ✅ Test status
- 📊 Test statistics
- 🔗 Report links
- ⏱️ Execution time

### Blocking Merges

Require passing pipeline before merge:

1. **Settings → Merge requests**
2. Enable **Pipelines must succeed**
3. Enable **All discussions must be resolved**

---

## Monitoring and Analytics

### Pipeline Analytics

View in **Analytics → CI/CD Analytics**:
- Average pipeline duration
- Success rate
- Job duration trends
- Failed job insights

### Test Report Analytics

Available in **Analytics → Test Reports**:
- Test pass/fail trends
- Failed tests summary
- Performance metrics

---

## FAQ

**Q: How do I run only smoke tests?**
A: Use `npx playwright test --grep @smoke` or manually trigger `smoke:tests` job

**Q: Can I skip CI/CD on certain commits?**
A: Add `[ci skip]` or `[skip ci]` to commit message

**Q: How do I view test reports after pipeline completes?**
A: Navigate to **CI/CD → Pipelines → Job → Artifacts** or use MR test report interface

**Q: Can I run tests on specific browsers only?**
A: Disable jobs in `.gitlab-ci.yml` or use `--project=chromium` flag

**Q: How do I increase test timeout?**
A: Modify `timeout: 30m` in job configuration or `timeout: 30000` in playwright.config.ts

---

## Additional Resources

- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [GitLab Runner Configuration](https://docs.gitlab.com/runner/)
- [YAML Syntax Reference](https://docs.gitlab.com/ee/ci/yaml/)

---

## Support

For issues or questions:

1. Check this documentation first
2. Review [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
3. Check pipeline logs for error messages
4. Contact your GitLab administrator

---

**Last Updated:** May 20, 2026
**Framework Version:** 1.0.0
**CI/CD Provider:** GitLab
