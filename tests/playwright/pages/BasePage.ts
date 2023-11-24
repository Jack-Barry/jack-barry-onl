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

	/** Returns key-value store of everything currently in `window.localStorage` */
	async readLocalStorage() {
		return await this.page.evaluate(() => {
			const current: Record<string, string> = {};
			const count = window.localStorage.length;
			for (let i = 0; i < count; i++) {
				const key = window.localStorage.key(i);
				if (!key) {
					continue;
				}

				const value = window.localStorage.getItem(key);
				if (!value) {
					continue;
				}

				current[key] = value;
			}
			return current;
		});
	}

	readonly privacy = {
		/**
		 * Mocks the state reached when user acknowledges privacy policy
		 *
		 * Refer to `src/lib/utils/privacy.ts`
		 */
		setHasConsentedToCookies: async (hasConsented = true) => {
			await this.page.evaluate(() => {
				if (hasConsented) {
					window.localStorage.setItem('user_approved_cookies_usage', new Date().toISOString());
				} else {
					window.localStorage.setItem('user_denies_cookies_usage', 'true');
				}
			});
		}
	};
}
