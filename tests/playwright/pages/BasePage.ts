import type { Page } from '@playwright/test';

export class BasePage {
	constructor(public page: Page) {}

	get breadcrumb() {
		return this.page.getByLabel('breadcrumb');
	}

	get breadcrumbItems() {
		const breadcrumb = this.breadcrumb;
		const orderedList = breadcrumb.locator('ol > li');
		return orderedList;
	}

	get cookiesConsentModal() {
		return this.page.locator('#cookies-consent-modal');
	}

	get privacyPolicyLink() {
		return this.page.getByRole('link', { name: 'Privacy policy' });
	}
}
