import test, { expect, type Page } from '@playwright/test';

import { pause } from '../../../src/lib/utils/pause';
import { interceptHeapAnalytics } from '../interceptors/thirdParty';
import { interceptApiHeapUserDelete } from '../interceptors/api';
import { mockHeapAnalyticsCookie } from '../utils/heapAnalytics';
import dayjs from 'dayjs';

export class BasePage {
	constructor(public page: Page) {}

	/** Sets up basic endpoint mocks */
	async init() {
		await interceptHeapAnalytics(this.page);
		await interceptApiHeapUserDelete(this.page);
	}

	get breadcrumb() {
		return this.page.getByLabel('breadcrumb');
	}

	get breadcrumbItems() {
		const breadcrumb = this.breadcrumb;
		const orderedList = breadcrumb.locator('ol > li');
		return orderedList;
	}

	readonly cookiesConsentModal = {
		locator: () => this.page.locator('#cookies-consent-modal'),
		buttons: {
			close: () => this.cookiesConsentModal.locator().getByLabel('Close'),
			goToPrivacyPolicy: () =>
				this.cookiesConsentModal.locator().getByRole('link', { name: 'Show me my options' }),
			acknowledge: () =>
				this.cookiesConsentModal.locator().getByRole('button', { name: "OK, that's fine" })
		}
	};

	get privacyPolicyLink() {
		return this.page.getByRole('link', { name: 'Privacy policy' });
	}

	async assertDoesNotShowCookiesConsentModal() {
		await pause(2000); // give modal time to pop up
		await expect(this.cookiesConsentModal.locator()).not.toBeVisible();
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

	/** Returns key-value store of current cookies */
	async readCookies() {
		return await this.page.context().cookies();
	}

	readonly privacy = {
		/**
		 * Mocks the state reached when user acknowledges privacy policy
		 *
		 * Refer to `src/lib/utils/privacy.ts`
		 */
		setHasConsentedToCookies: async (hasConsented = true) => {
			await test.step(`${
				hasConsented ? 'consenting to' : 'denying'
			} analytics cookies`, async () => {
				await this.page.waitForLoadState('domcontentloaded');

				if (hasConsented) {
					// set mock cookie and local storage values
					await this.page.context().addCookies([mockHeapAnalyticsCookie()]);
					await this.page.evaluate(() => {
						// have to use hard-coded strings here
						window.localStorage.removeItem('user_denies_cookies_usage');
						window.localStorage.setItem('user_approved_cookies_usage', new Date().toISOString());
					});
				} else {
					// clear cookies and local storage values
					await this.page.evaluate(() => {
						// have to use hard-coded strings here
						window.localStorage.removeItem('user_approved_cookies_usage');
						window.localStorage.setItem('user_denies_cookies_usage', 'true');
					});
					await this.page.context().clearCookies();
				}

				await this.page.reload();
			});
		},

		/** Returns the cookie used for Heap analytics */
		heapAnalyticsCookie: async () => {
			const cookies = await this.readCookies();
			const matchingCookie = cookies.find(({ name }) => name.startsWith('_hp2_id.'));
			if (matchingCookie?.expires || 0 > dayjs().unix()) {
				return matchingCookie;
			}
		}
	};
}
