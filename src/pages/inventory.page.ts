import { Locator, Page } from '@playwright/test';
export class InventoryPage {

    constructor(private readonly page: Page) {}

    private selectBackpack(): Locator {
        return this.page.locator('#add-to-cart-sauce-labs-backpack');
    }

    private selectBoltTShirt(): Locator {
        return this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
    }

    public async selectBackpackAndTShirt(): Promise<void> {
        await this.selectBackpack().click();
        await this.selectBoltTShirt().click();
    }

}