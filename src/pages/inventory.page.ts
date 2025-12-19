import { Locator, Page, Response } from '@playwright/test';
import { ItemCardComponent } from './components/item-card-component';
import { ItemCardDTO } from '../models/item-card-dto';

export class InventoryPage {
    private readonly inventoryItems = this.page.locator('.inventory_item');
    private readonly backpackItem = this.page.locator('#add-to-cart-sauce-labs-backpack');
    private readonly tShirtItem = this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
    private readonly badge = this.page.locator('.shopping_cart_badge');

    public constructor(public readonly page: Page) {}

    public async open(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    private getBackpack(): Locator {
        return this.backpackItem;
    }

    private getBoltTShirt(): Locator {
        return this.tShirtItem;
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
            this.page.goto('/inventory.html')
        ]);
        return response;
    }

    public async itemsInCart(): Promise<string> {
        await this.badge.waitFor({ state: 'visible' });
        const badgeText = await this.badge.textContent();
        return badgeText ?? '';
    }

    public async countInventoryItems(): Promise<number> {
        return await this.inventoryItems.count();
    }

    public async getAllItemCards(): Promise<ItemCardComponent[]> {
        const cards: ItemCardComponent[] = [];
        for (let i = 0; i < (await this.countInventoryItems()); i++) {
            const itemRoot = this.inventoryItems.nth(i); // Particular item via nth
            cards.push(new ItemCardComponent(this.page, itemRoot));
        }
        return cards;
    }

    public async getAllItemCardDTOs(): Promise<ItemCardDTO[]> {
        const dtos: ItemCardDTO[] = [];
        const cards = await this.getAllItemCards();
        for (const card of cards) {
            dtos.push({
                name: (await card.getComponentData()).name,
                price: (await card.getComponentData()).price,
                description: (await card.getComponentData()).description
            });
        }
        return dtos;
    }
}
