/* Is a global setup file for Playwright tests to authenticate a user and save the session state.
 It's not needed when using fixtures that handle authentication per test.
 See playwright.config.ts for usage context.
*/
// import { test as setup } from '@playwright/test';
// import path from 'path';

// const authFile = path.join(__dirname, '../.auth/user.json');

// setup('authenticate', async ({ page }) => {
//     await page.goto('/');

//     await page.getByPlaceholder('Username').fill(process.env.USERNAME!);
//     await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
//     await page.getByRole('button', { name: 'Login' }).click();

//     await page.context().storageState({ path: authFile });
// });
