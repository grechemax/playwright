import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { env } from 'process';

test('Page has title', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await expect(page).toHaveTitle('Swag Labs');

  if (env.USERNAME && env.PASSWORD) {
    await loginPage.login(env.USERNAME, env.PASSWORD);
  } else {
    console.log('USERNAME or PASSWORD is not defined');
  }

});

