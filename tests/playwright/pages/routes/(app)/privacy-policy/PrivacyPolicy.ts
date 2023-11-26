import { expect, type Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';

export class PrivacyPolicyPage extends BasePage {
	static URL = '/privacy-policy';

	constructor(public page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto(PrivacyPolicyPage.URL);
		await expect(this.page).toHaveURL(PrivacyPolicyPage.URL);
	}

	get toggleAllowAnalyticsTracking() {
		return this.page.getByLabel('Allow anonymous analytics tracking');
	}
}
