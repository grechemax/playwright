import { test, expect } from '@playwright/test';
import { InventoryPage } from '../src/pages/inventory.page';
import { CartPage } from '../src/pages/cart.page';

// Authenticated tests (run with --project=authenticated-firefox)
test.describe('Buy two items from inventory page', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await inventoryPage.open();
        await inventoryPage.addBackpack();
        await inventoryPage.addTShirt();
    });

    test('Inventory page has 6 items', async ({ page }) => {
        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveTitle('Swag Labs');
        const inventoryItems = await inventoryPage.countInventoryItems();
        expect(inventoryItems).toEqual(6);
    });

    test('Basket icon shows two items', async ({ page }) => {
        const badgeNumber = await inventoryPage.itemsInCart();
        expect(badgeNumber).toBe('2');
    });

    test('Basket contains two items', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.open();

        const itemsInCart = await cartPage.countItemsInCart();
        expect(itemsInCart).toBe(2);
    });
});
