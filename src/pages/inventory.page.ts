import { Locator, Page } from '@playwright/test';
export class InventoryPage {

    constructor(private readonly page: Page) {}

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

}