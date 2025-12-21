import { test as base, Page, Browser } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import * as fs from 'fs';
import { expect } from '@playwright/test';

interface SauceDemoFixture {
    cartPage: CartPage;
    loginPage: LoginPage;
    authenticatedPage: Page;
    inventoryPage: InventoryPage;
}

const storageState = (workerId: number): string => `.auth/storage-state-${workerId}.json`;

async function authenticateSauceDemo(browser: Browser, workerId: number): Promise<void> {
    if (fs.existsSync(storageState(workerId))) return;

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const username = process.env.STANDARD_USER || 'standard_user';
    const password = process.env.PASSWORD || 'secret_sauce';

    await loginPage.open();
    console.log('Open Login Page, URL is:', page.url());
    await loginPage.login(username, password);
    console.log('After Login, URL is:', page.url());
    await page.screenshot({ path: 'debug-after-goto.png' });
    await expect(page).toHaveURL(/inventory.html/, { timeout: 60000 });

    await page.context().storageState({ path: storageState(workerId) });
    console.log(`authenticated storage state saved to ${storageState(workerId)}`);

    await context.close();
}

export const test = base.extend<SauceDemoFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },

    authenticatedPage: async ({ browser }, use) => {
        const workerId = test.info().workerIndex;
        await authenticateSauceDemo(browser, workerId);

        const context = await browser.newContext({ storageState: storageState(workerId) });
        const page = await context.newPage();

        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.waitForURL(/inventory.html/, { timeout: 5000 });
        await use(page);

        await page.close();
        await context.close();
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
