import { pause } from '../../../src/lib/utils/pause';
import { expect, test } from '../extend';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicy';

test('does not prompt user for cookies consent if navigated to directly', async ({
	_privacyPolicyPage
}) => {
	await _privacyPolicyPage.goto();
	await pause(2000); // give modal time to pop up
	await expect(_privacyPolicyPage.cookiesConsentModal).not.toBeVisible();
});

test('automatically consents to cookie usage when navigated to directly', async ({
	_privacyPolicyPage
}) => {
	await _privacyPolicyPage.goto();
	await expect(_privacyPolicyPage.page).toHaveURL(PrivacyPolicyPage.URL);
	const storage = await _privacyPolicyPage.readLocalStorage();
	expect(storage.user_approved_cookies_usage).toStrictEqual(expect.any(String));
});
