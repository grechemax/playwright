import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { InventoryPage } from '../src/pages/inventory.page';

// Unauthenticated test (run with --project=unauthenticated-firefox)
test('Page has title', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await expect(page).toHaveTitle('Swag Labs');
});

test('inventory page returns 404 status for unauthenticated users (response check)', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const response = await inventoryPage.openAndExpectResponse();

  expect(response.status()).toBe(404);
  
  await expect(page.locator('button[class=\'error-button\']')).toBeVisible();
});





