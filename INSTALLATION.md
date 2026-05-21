# Installation & Setup Guide

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Git**: Latest version
- **Operating System**: Windows, macOS, or Linux

## Installation Steps

### Step 1: Verify Prerequisites

```bash
# Check Node.js version
node --version
# Expected: v18.x.x or higher

# Check npm version
npm --version
# Expected: v8.x.x or higher
```

### Step 2: Clone or Download Framework

```bash
# If cloning from git repository
git clone https://github.com/SaravananS2000185758/Playwright_Framework_UI.git

# Navigate to project directory
cd Playwright_Framework_UI
```

### Step 3: Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - @playwright/test (latest)
# - typescript
# - ts-node
# - cross-env
# - dotenv
# - csv-parser
# - xlsx
# - winston
```

### Step 4: Install Playwright Browsers

```bash
# Install browsers and system dependencies
npx playwright install --with-deps

# For specific browser
npx playwright install --with-deps chromium
npx playwright install --with-deps firefox
npx playwright install --with-deps webkit
```

### Step 5: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Update .env with your configuration
# - BASE_URL: Your application URL
# - LOG_LEVEL: Logging level (info, warn, error, debug)
# - WORKERS: Number of parallel workers
# - TEST_USERNAME: Test user credentials
# - TEST_PASSWORD: Test user password
```

### Step 6: Verify Installation

```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run a sample test to verify setup
npx playwright test test/specs/login.spec.ts --headed
```

---

## Directory Structure After Installation

```
Playwright_Framework_UI/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions workflow
├── ui/
│   └── src/
│       ├── actions/
│       │   └── actions.ts          # ✅ Installed
│       ├── assertions/
│       │   └── assertions.ts       # ✅ Installed
│       ├── fixtures/
│       │   └── baseFixture.ts      # ✅ Installed
│       ├── locators/
│       │   ├── login.locators.ts
│       │   ├── booking.locators.ts
│       │   └── retrieveBooking.locators.ts
│       ├── pages/
│       │   ├── basePage.ts
│       │   ├── loginPage.ts
│       │   ├── bookingPage.ts
│       │   └── retrieveBookingPage.ts
│       ├── commonMethods/
│       │   └── commonMethods.ts
│       └── utils/
│           ├── logger.ts           # ✅ Installed
│           └── dataUtils.ts        # ✅ Installed
├── test/
│   ├── data/
│   │   └── testData.csv            # ✅ Sample data
│   └── specs/
│       ├── login.spec.ts           # ✅ Created
│       ├── booking.spec.ts         # ✅ Created
│       └── retrieveBooking.spec.ts # ✅ Created
├── reports/
│   ├── html-report/                # Reports generated here
│   ├── logs/                       # Logs generated here
│   └── test-output/                # Test artifacts here
├── node_modules/                   # ✅ Installed
├── .env.example                    # ✅ Created
├── .env                            # Create and configure
├── .gitignore                      # ✅ Created
├── .prettierrc                     # ✅ Created
├── azure-pipelines.yml             # ✅ Created
├── playwright.config.ts            # ✅ Created
├── tsconfig.json                   # ✅ Created
├── test.sets.ts                    # ✅ Created
├── package.json                    # ✅ Updated
├── package-lock.json               # ✅ Generated
├── README.md                       # ✅ Created
├── ARCHITECTURE.md                 # ✅ Created
└── QUICKSTART.md                   # ✅ Created
```

---

## Troubleshooting Installation

### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Playwright browsers not installed

**Solution:**
```bash
# Reinstall Playwright with system dependencies
npx playwright install --with-deps

# Check installation
npx playwright install --dry-run
```

### Issue: TypeScript compilation errors

**Solution:**
```bash
# Verify tsconfig.json
npx tsc --noEmit

# Rebuild project
npx tsc
```

### Issue: Tests cannot find modules

**Solution:**
```bash
# Verify all dependencies are installed
npm list @playwright/test typescript ts-node winston csv-parser xlsx dotenv

# If missing, install specific package
npm install @playwright/test

# Clear TypeScript cache
rm -rf dist/
```

### Issue: Port already in use

**Solution:**
```bash
# Update BASE_URL in .env to different port
BASE_URL=http://localhost:3001

# Or check and kill process using the port
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

---

## First Time Setup Checklist

- [ ] Node.js v18+ installed
- [ ] npm v8+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] Environment configured (`.env` file created from `.env.example`)
- [ ] Application URL configured in `.env`
- [ ] TypeScript compilation verified (`npx tsc --noEmit`)
- [ ] Test data updated if needed
- [ ] GitHub/Azure DevOps secrets configured (if using CI/CD)

---

## Next Steps After Installation

1. **Read Documentation**
   - Review `README.md` for full framework overview
   - Review `ARCHITECTURE.md` for design patterns
   - Review `QUICKSTART.md` for quick commands

2. **Run Sample Tests**
   ```bash
   npm test
   ```

3. **View Test Report**
   ```bash
   npm run test:report
   ```

4. **Create Custom Tests**
   - Create new spec file in `test/specs/`
   - Create new page object in `ui/src/pages/`
   - Create new locators in `ui/src/locators/`

5. **Configure CI/CD** (Optional)
   - Update GitHub Actions workflow in `.github/workflows/playwright.yml`
   - Or setup Azure DevOps pipeline from `azure-pipelines.yml`

---

## System Requirements

### Minimum Requirements
- OS: Windows 10/11, macOS 10.14+, Ubuntu 20.04+
- RAM: 4GB
- Disk Space: 2GB
- Node.js: v18.0.0 or higher

### Recommended Requirements
- OS: Windows 11, macOS 12+, Ubuntu 22.04+
- RAM: 8GB+
- Disk Space: 5GB+
- Node.js: v20 LTS or higher

---

## Support & Troubleshooting

### Common Commands

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test test/specs/login.spec.ts

# Run with tags
npx playwright test --grep @smoke

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug

# Generate fresh report
npm run test:report

# Clean build
npm run clean
```

### Getting Help

1. **Check Logs**
   - Logs are saved in `reports/logs/` directory
   - Check `all.log` for all entries
   - Check `error.log` for errors only

2. **Review Documentation**
   - README.md - Framework overview
   - ARCHITECTURE.md - Design patterns
   - QUICKSTART.md - Quick reference

3. **Check Playwright Docs**
   - https://playwright.dev/docs/intro
   - https://playwright.dev/docs/api/class-test

4. **Review Test Examples**
   - `test/specs/login.spec.ts`
   - `test/specs/booking.spec.ts`
   - `test/specs/retrieveBooking.spec.ts`

---

**Framework Version**: 1.0.0  
**Installation Date**: May 2026  
**Status**: ✅ Ready to Use
