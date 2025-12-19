import { Locator, Page } from '@playwright/test';
import { ItemCardDTO } from 'src/models/item-card-dto';
export class ItemCardComponent {
    private readonly name: Locator;
    private readonly price: Locator;
    private readonly description: Locator;
    private readonly cardLocator: Locator;

    public constructor(page: Page, cardLocator: Locator) {
        this.cardLocator = cardLocator;
        this.name = this.cardLocator.locator('.inventory_item_name');
        this.price = this.cardLocator.locator('.inventory_item_price');
        this.description = this.cardLocator.locator('.inventory_item_desc');
    }

    public async getComponentData(): Promise<ItemCardDTO> {
        return {
            name: (await this.name.textContent()) ?? '',
            price: (await this.price.textContent()) ?? '',
            description: (await this.description.textContent()) ?? ''
        };
    }

    public async clickToDetails(): Promise<void> {
        await this.name.click();
        await this.cardLocator.page().waitForURL(/inventory-item.html/); // Wait for navigation
    }
}

/*
Why ItemCardComponent is needed?

1. Encapsulation: Isolates component logic (locators, methods) from pages, avoiding bloat. Pages compose components.

2. Reusability: Import across pages (e.g., inventory, cart) without duplication; adapt via root locator.

3. Readability: Cleaner tests, e.g., card.clickToDetails().

4. Scalability: Easier to add/maintain components as project grows.
*/
