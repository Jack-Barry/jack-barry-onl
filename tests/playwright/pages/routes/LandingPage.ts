import { expect, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LandingPage extends BasePage {
	static URL = '/';

	constructor(public page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto(LandingPage.URL);
		await expect(this.page).toHaveURL(LandingPage.URL);
	}

	readonly buttons = {
		enter: () => this.page.getByRole('link', { name: 'Enter' })
	};

	async enterSite() {
		await this.buttons.enter().click();
	}
}
