import { test, expect } from '../../extend';
import { HomePage } from '../../pages/routes/(app)/home/HomePage';
import { LandingPage } from '../../pages/routes/LandingPage';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../utils/privacyPolicyAccessibility';

assertPrivacyPolicyIsEasilyAccessible(LandingPage.URL);

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
