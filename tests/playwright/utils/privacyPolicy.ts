import { expect } from '../extend';
import type { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/routes/(app)/home/HomePage';
import { PrivacyPolicyPage } from '../pages/routes/(app)/privacy-policy/PrivacyPolicy';
import { assertIsActiveBreadcrumb, assertIsInactiveBreadcrumb } from './breadcrumb';

/**
 * Asserts that the page has a working link to the privacy policy page
 *
 * Abstracted into this function to prevent circular dependencies between
 *   `PrivacyPolicyPage` and `BasePage`, even though it is tested on most pages
 *   in the app
 */
export async function assertHasPrivacyPolicyLink(pageInstance: BasePage) {
	await expect(pageInstance.privacyPolicyLink).toBeVisible();
	await pageInstance.privacyPolicyLink.click();
	await expect(pageInstance.page).toHaveURL(PrivacyPolicyPage.URL);

	const privacyPolicyPage = new PrivacyPolicyPage(pageInstance.page);
	await expect(privacyPolicyPage.page).toHaveURL(PrivacyPolicyPage.URL);
	const items = privacyPolicyPage.breadcrumbItems;
	expect(await items.count()).toBe(2);
	const firstItem = items.first();
	expect(await firstItem.innerText()).toBe('Home');
	await assertIsInactiveBreadcrumb(firstItem, { expectedHref: HomePage.URL });

	const lastItem = items.last();
	expect(await lastItem.innerText()).toBe('Privacy Policy');
	await assertIsActiveBreadcrumb(lastItem);
}
