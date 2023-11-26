import { pause } from '../../../src/lib/utils/pause';
import {
	LOCAL_STORAGE_KEY_COOKIES_CONSENT,
	LOCAL_STORAGE_KEY_COOKIES_DENY
} from '../../../src/lib/utils/storage/constants';
import { expect, test } from '../extend';

test('does not prompt user for cookies consent if navigated to directly', async ({
	_privacyPolicyPage
}) => {
	await _privacyPolicyPage.goto();
	await pause(2000); // give modal time to pop up
	await expect(_privacyPolicyPage.cookiesConsentModal.locator()).not.toBeVisible();
});

test('automatically consents to cookie usage when navigated to directly', async ({
	_privacyPolicyPage
}) => {
	await _privacyPolicyPage.goto();
	const storage = await _privacyPolicyPage.readLocalStorage();
	expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
});

test('user can opt out of cookie usage if they previously opted in', async ({
	_privacyPolicyPage
}) => {
	await _privacyPolicyPage.goto();
	await _privacyPolicyPage.privacy.setHasConsentedToCookies();

	await test.step('verify base state is opted in', async () => {
		const storage = await _privacyPolicyPage.readLocalStorage();
		await expect(_privacyPolicyPage.toggleAllowAnalyticsTracking).toBeChecked();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_DENY]).toBeUndefined();
		const analyticsCookie = await _privacyPolicyPage.privacy.heapAnalyticsCookie();
		expect(analyticsCookie).toBeDefined();
	});

	await test.step('verify toggle sets browser to opted out state', async () => {
		await _privacyPolicyPage.toggleAllowAnalyticsTracking.click();
		await expect(_privacyPolicyPage.toggleAllowAnalyticsTracking).not.toBeChecked();
		const storage = await _privacyPolicyPage.readLocalStorage();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toBeUndefined();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_DENY]).toBe('true');
		const analyticsCookie = await _privacyPolicyPage.privacy.heapAnalyticsCookie();
		expect(analyticsCookie).toBeUndefined();
	});
});

test('user can opt into cookie usage if they previously opted out', async ({
	_privacyPolicyPage
}) => {
	await _privacyPolicyPage.goto();
	await _privacyPolicyPage.privacy.setHasConsentedToCookies(false);

	await test.step('verify base state is opted out', async () => {
		const storage = await _privacyPolicyPage.readLocalStorage();
		await expect(_privacyPolicyPage.toggleAllowAnalyticsTracking).not.toBeChecked();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_DENY]).toBe('true');
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toBeUndefined();
		const analyticsCookie = await _privacyPolicyPage.privacy.heapAnalyticsCookie();
		expect(analyticsCookie).toBeUndefined();
	});

	await test.step('verify toggle sets browser to opted in state', async () => {
		await _privacyPolicyPage.toggleAllowAnalyticsTracking.click();
		await expect(_privacyPolicyPage.toggleAllowAnalyticsTracking).toBeChecked();
		const storage = await _privacyPolicyPage.readLocalStorage();
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_CONSENT]).toStrictEqual(expect.any(String));
		expect(storage[LOCAL_STORAGE_KEY_COOKIES_DENY]).toBeUndefined();
		const analyticsCookie = await _privacyPolicyPage.privacy.heapAnalyticsCookie();
		expect(analyticsCookie).toBeDefined();
	});
});
