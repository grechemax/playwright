# a small suite split into two test categories: with and without login

Use one of these valid commands:

- `npx playwright test generic-tests.spec.ts --project=firefox`
- `npx playwright test no-authests.spec.ts --project=firefox`
- `npx playwright test --project=chromium`
- `npx playwright test --project=webkit`

The project names defined in `playwright.config.ts` are:

- `firefox`
- `chromium`
- `webkit`

The `.auth` directory is reset before each run, and auth state is generated automatically when authenticated tests execute.
