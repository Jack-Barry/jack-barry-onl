import { LOCAL_STORAGE_KEY_COOKIES_CONSENT } from '../../../../src/lib/utils/storage/constants';
import { test, expect } from '../../extend';
import { HomePage } from '../../pages/routes/(app)/home/HomePage';
import { PrivacyPolicyPage } from '../../pages/routes/(app)/privacy-policy/PrivacyPolicy';
import { assertHasPrivacyPolicyLink } from '../../utils/privacyPolicy';

test('shows no breadcrumbs', async ({ _landingPage }) => {
	await _landingPage.goto();
	const items = _landingPage.breadcrumbItems;
	expect(await items.count()).toBe(0);
});

test('provides link to home page', async ({ page, _homePage, _landingPage }) => {
	await _landingPage.goto();
	await _landingPage.enterSite();
	await expect(page).toHaveURL(HomePage.URL);
	await _homePage.assertHasExpectedBreadcrumbs();
});

test('renders link to privacy policy', async ({ _landingPage }) => {
	await _landingPage.goto();
	await assertHasPrivacyPolicyLink(_landingPage);
});

test.describe('when user has not acknowledged privacy policy', () => {
	test('renders cookies consent modal', async ({ _landingPage }) => {
		await _landingPage.goto();
		await expect(_landingPage.cookiesConsentModal.locator()).toBeVisible();
	});

	test('user consents to cookies when clicking the close button', async ({ _landingPage }) => {
		await _landingPage.goto();
		await _landingPage.cookiesConsentModal.buttons.close().click();
		await expect(_landingPage.cookiesConsentModal.locator()).not.toBeVisible();
		const storage = await _landingPage.readLocalStorage();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
	});

	test('user consents to cookies when clicking the OK button', async ({ _landingPage }) => {
		await _landingPage.goto();
		await _landingPage.cookiesConsentModal.buttons.acknowledge().click();
		await expect(_landingPage.cookiesConsentModal.locator()).not.toBeVisible();
		const storage = await _landingPage.readLocalStorage();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
	});

	test('user is shown privacy policy when asking for more info', async ({ _landingPage }) => {
		await _landingPage.goto();
		await _landingPage.cookiesConsentModal.buttons.goToPrivacyPolicy().click();
		await expect(_landingPage.cookiesConsentModal.locator()).not.toBeVisible();
		await expect(_landingPage.page).toHaveURL(PrivacyPolicyPage.URL);
		// Automatic consent happens because they have navigated to the privacy policy page
		const storage = await _landingPage.readLocalStorage();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
	});
});

test.describe('when user has previously consented to cookies', () => {
	test('does not render cookies consent modal', async ({ _landingPage }) => {
		await _landingPage.goto();
		await _landingPage.privacy.setHasConsentedToCookies();
		await _landingPage.assertDoesNotShowCookiesConsentModal();
	});
});

test.describe('when user has previously denied cookies', () => {
	test('does not render cookies consent modal', async ({ _landingPage }) => {
		await _landingPage.goto();
		await _landingPage.privacy.setHasConsentedToCookies(false);
		await _landingPage.assertDoesNotShowCookiesConsentModal();
	});
});
