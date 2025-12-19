import { Locator, Page } from '@playwright/test';
import { ItemCardDTO } from '../models/item-card-dto';

export class ItemDetailsPage {
    private readonly name: Locator;
    private readonly price: Locator;
    private readonly description: Locator;
    private readonly backToInventory;

    public constructor(public readonly page: Page) {
        this.name = page.locator('[data-test="inventory-item-name"]');
        this.price = page.locator('[data-test="inventory-item-price"]');
        this.description = page.locator('[data-test="inventory-item-desc"]');
        this.backToInventory = this.page.locator('[data-test="back-to-products"]');
    }

    public async getItemData(): Promise<ItemCardDTO> {
        return {
            name: (await this.name.textContent()) ?? '',
            price: (await this.price.textContent()) ?? '',
            description: (await this.description.textContent()) ?? ''
        };
    }

    public async clickBackToInventory(): Promise<void> {
        await this.backToInventory.click();
    }
}
