import type { Page } from '@playwright/test';

export class LandingPage {
	static URL = '/';

	constructor(public page: Page) {}

	async goto() {
		await this.page.goto(LandingPage.URL);
	}
}
