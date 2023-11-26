import { LOCAL_STORAGE_KEY_COOKIES_CONSENT } from '../../../src/lib/utils/storage/constants';
import { expect, test } from '../extend';
import { PrivacyPolicyPage } from '../pages/routes/(app)/privacy-policy/PrivacyPolicy';
import { assertHasPrivacyPolicyLink } from './privacyPolicy';

export function assertPrivacyPolicyIsEasilyAccessible(url: string) {
	test.describe(`page at '${url}' provides user access to privacy settings`, () => {
		test.beforeEach(async ({ _basePage }) => {
			await _basePage.page.goto(url);
		});

		test('renders link to privacy policy', async ({ _basePage }) => {
			await assertHasPrivacyPolicyLink(_basePage);
		});

		test.describe('when user has not acknowledged privacy policy', () => {
			test('renders cookies consent modal', async ({ _basePage }) => {
				await expect(_basePage.cookiesConsentModal.locator()).toBeVisible();
			});

			test('user consents to cookies when clicking the close button', async ({ _basePage }) => {
				await _basePage.cookiesConsentModal.buttons.close().click();
				await expect(_basePage.cookiesConsentModal.locator()).not.toBeVisible();
				const storage = await _basePage.readLocalStorage();
				expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
			});

			test('user consents to cookies when clicking the OK button', async ({ _basePage }) => {
				await _basePage.cookiesConsentModal.buttons.acknowledge().click();
				await expect(_basePage.cookiesConsentModal.locator()).not.toBeVisible();
				const storage = await _basePage.readLocalStorage();
				expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
			});

			test('user is shown privacy policy when asking for more info', async ({ _basePage }) => {
				await _basePage.cookiesConsentModal.buttons.goToPrivacyPolicy().click();
				await expect(_basePage.cookiesConsentModal.locator()).not.toBeVisible();
				await expect(_basePage.page).toHaveURL(PrivacyPolicyPage.URL);
				// Automatic consent happens because they have navigated to the privacy policy page
				const storage = await _basePage.readLocalStorage();
				expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
			});
		});

		test.describe('when user has previously consented to cookies', () => {
			test('does not render cookies consent modal', async ({ _basePage }) => {
				await _basePage.privacy.setHasConsentedToCookies();
				await _basePage.assertDoesNotShowCookiesConsentModal();
			});
		});

		test.describe('when user has previously denied cookies', () => {
			test('does not render cookies consent modal', async ({ _basePage }) => {
				await _basePage.privacy.setHasConsentedToCookies(false);
				await _basePage.assertDoesNotShowCookiesConsentModal();
			});
		});
	});
}
