import { test, expect } from '../extend';
import { HomePage } from '../pages/HomePage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicy';
import { assertHasPrivacyPolicyLink } from '../utils/privacyPolicy';

test('shows no breadcrumbs', async ({ _landingPage }) => {
	await _landingPage.goto();
	const items = _landingPage.breadcrumbItems;
	expect(await items.count()).toBe(0);
});

test('provides link to home page', async ({ page, _landingPage }) => {
	await _landingPage.goto();
	await _landingPage.enterSite();
	await expect(page).toHaveURL(HomePage.URL);
});

test('home page renders correct breadcrumbs when navigated to', async ({
	_homePage,
	_landingPage
}) => {
	await _landingPage.goto();
	await _landingPage.enterSite();
	await _homePage.assertHasExpectedBreadcrumbs();
});

test('renders link to privacy policy', async ({ _landingPage }) => {
	await _landingPage.goto();
	await assertHasPrivacyPolicyLink(_landingPage);
});

// test('renders cookies consent modal', async ({ _landingPage }) => {
// 	await _landingPage.goto();
// 	await expect(_landingPage.cookiesConsentModal).toBeVisible();
// });
