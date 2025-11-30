import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { InventoryPage } from '../src/pages/inventory.page';

// Authenticated tests (run with --project=authenticated-firefox)
test('Inventory page has 6 items', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  
  await expect(page).toHaveURL(/inventory/);
  await expect(page).toHaveTitle('Swag Labs');
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('Basket reflects added two items', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.addBackpack();
  await inventoryPage.addTShirt();  
  
  const numberOfItemsInCart = await inventoryPage.itemsInCart();
  await expect(numberOfItemsInCart).toBe('2');
})

