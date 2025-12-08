import { Locator, Page } from '@playwright/test';
export class LoginPage {
    constructor(readonly page: Page) {}

    public async open(): Promise<void> {
        await this.page.goto('/');
    }

    private getInputUsername(): Locator {
        return this.page.locator('#user-name');
    }

    private getInputPassword(): Locator {
        return this.page.locator('#password');
    }

    private getButtonLogin(): Locator {
        return this.page.locator('#login-button');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.getInputUsername().fill(username);
        await this.getInputPassword().fill(password);
        await this.getButtonLogin().click();

        await this.page.context().storageState({ path: `.auth/user.json` });
    }
}
