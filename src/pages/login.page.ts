import { Locator, Page } from '@playwright/test';
export class LoginPage {

    constructor(private readonly page: Page) {}
    
    private getInputUsername(): Locator {
        return this.page.locator('#user-name');
    }

    private getInputPassword(): Locator {
        return this.page.locator('#password');
    }

    private getButtonLogin(): Locator {
        return this.page.locator('#login-button');
    }

    public async open(): Promise<void> {
        await this.page.goto('/');
    }


    public async login(username: string, password: string): Promise<void> {
        await this.getInputUsername().fill(username);
        await this.getInputPassword().fill(password);
        await this.getButtonLogin().click();
    }
}