import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { InventoryPage } from '../pages/Inventory.page';
import { CartPage } from '../pages/Cart.page';

interface SauceDemoFixture {
    cartPage: CartPage;
    loginPage: LoginPage;
    authenticatedPage: Page;
    inventoryPage: InventoryPage;
}

export const test = base.extend<SauceDemoFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },

    // AuthenticatedPage as is (handles login)
    authenticatedPage: async ({ page }, use) => {
        const username = process.env.STANDARD_USER!;
        const password = process.env.PASSWORD!;
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(username, password);

        await page.waitForURL(/inventory.html/, { timeout: 5000 });
        await use(page);
    },

    inventoryPage: async ({ authenticatedPage }, use) => {
        const inventoryPage = new InventoryPage(authenticatedPage);
        await use(inventoryPage);
    },

    cartPage: async ({ authenticatedPage }, use) => {
        const cartPage = new CartPage(authenticatedPage);
        await use(cartPage);
    }
});

export { expect } from '@playwright/test';
