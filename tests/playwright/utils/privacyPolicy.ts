import { expect } from '@playwright/test';
import type { BasePage } from '../pages/BasePage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicy';
import { assertIsActiveBreadcrumb, assertIsInactiveBreadcrumb } from './breadcrumb';
import { HomePage } from '../pages/HomePage';

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

	const items = pageInstance.breadcrumbItems;
	expect(await items.count()).toBe(2);
	const firstItem = items.first();
	expect(await firstItem.innerText()).toBe('Home');
	await assertIsInactiveBreadcrumb(firstItem, { expectedHref: HomePage.URL });

	const lastItem = items.last();
	expect(await lastItem.innerText()).toBe('Privacy Policy');
	await assertIsActiveBreadcrumb(lastItem);
}
