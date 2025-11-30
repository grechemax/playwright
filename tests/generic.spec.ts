import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { InventoryPage } from '../src/pages/inventory.page';
import { env } from 'process';

test('Page has title', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await expect(page).toHaveTitle('Swag Labs');

  await loginPage.login(0);

});

test('Add backpack to cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.open();
  await inventoryPage.addBackpack();
  await inventoryPage.addTShirt();
})

