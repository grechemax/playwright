import { expect } from '@playwright/test';
import { test } from '../src/fixtures/SauceDemoFixtures';
import { InventoryPage } from '../src/pages/Inventory.page';

// Unauthenticated test (run with --project=unauthenticated-firefox)
test('Page has title', async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.page).toHaveTitle('Swag Labs');
});

test('inventory page returns 404 status for unauthenticated users (response check)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const response = await inventoryPage.openAndExpectResponse();

    expect(response.status()).toBe(404);

    await expect(page.locator("button[class='error-button']")).toBeVisible();
});
