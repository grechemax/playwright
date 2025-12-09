import { expect } from '@playwright/test';
import { test } from '../src/fixtures/SauceDemoFixtures';
import { ItemDetailsPage } from '../src/pages/ItemDetails.page';

test.describe('Buy two items from inventory page', () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
        await inventoryPage.addBackpack();
        await inventoryPage.addTShirt();
    });

    test('Basket icon shows two items', async ({ inventoryPage }) => {
        const badgeNumber = await inventoryPage.itemsInCart();
        expect(badgeNumber).toBe('2');
    });

    test('Basket contains two items', async ({ cartPage }) => {
        await cartPage.open();
        const itemsInCart = await cartPage.countItemsInCart();
        expect(itemsInCart).toBe(2);
    });

    //TODO Add checkout tests
});

test('Inventory page has 6 items', async ({ inventoryPage }) => {
    const inventoryItems = await inventoryPage.countInventoryItems();
    expect(inventoryItems).toEqual(6);
});

test('Compare all inventory items with their detail pages', async ({ inventoryPage }) => {
    const cards = await inventoryPage.getAllItemCards();

    for (const card of cards) {
        const inventoryDTO = await card.getComponentData();

        await card.clickToDetails();
        const detailPage = new ItemDetailsPage(inventoryPage.page);
        const detailDTO = await detailPage.getItemData();

        expect(detailDTO).toEqual(inventoryDTO);

        await inventoryPage.page.goBack();
        await inventoryPage.page.waitForURL(/inventory.html/);
    }
});
