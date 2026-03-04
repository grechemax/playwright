# Playwright AQA Suite

Small TypeScript Playwright project for SauceDemo UI tests.

## Setup

```bash
npm install
```

## Environment

Create `.env` with credentials

```env
BASE_URL=https://www....
STANDARD_USER=...
PASSWORD=...
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run one file:

```bash
npx playwright test tests/generic-tests.spec.ts --project=firefox
```

Run in specific browser:

```bash
npx playwright test --project=chromium
```

## Reports

- Playwright HTML: `playwright-report/`
- Allure data: `allure-results/`
- Mochawesome: `mochawesome-report/`
