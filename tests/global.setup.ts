import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Username').fill(process.env.USERNAME!);
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.context().storageState({ path: authFile });
});
