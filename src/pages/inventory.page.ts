import { Locator, Page, Response } from '@playwright/test';
export class InventoryPage {
    constructor(readonly page: Page) {}

    public async open(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    private getBackpack(): Locator {
        return this.page.locator('#add-to-cart-sauce-labs-backpack');
    }

    private getBoltTShirt(): Locator {
        return this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
    }

    public async addBackpack(): Promise<void> {
        await this.getBackpack().click();
    }

    public async addTShirt(): Promise<void> {
        await this.getBoltTShirt().click();
    }

    public async openAndExpectResponse(): Promise<Response> {
        const [response] = await Promise.all([
            this.page.waitForResponse((resp) => resp.url().includes('/inventory.html') && resp.request().method() === 'GET'),
            this.page.goto('/inventory.html') // triggers the GET request
        ]);
        return response;
    }

    public async itemsInCart(): Promise<string> {
        const badge = this.page.locator('.shopping_cart_badge');
        await badge.waitFor({ state: 'visible' });
        const badgeText = await badge.textContent();
        return badgeText ?? '';
    }
}
