import { expect, test } from '../../../../extend';
import { BlogIndexPage } from '../../../../pages/routes/(app)/blog/BlogIndexPage';
import { HomePage } from '../../../../pages/routes/(app)/home/HomePage';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../utils/privacyPolicyAccessibility';

test('renders expected breadcrumbs', async ({ _homePage }) => {
	await _homePage.goto();
	await _homePage.assertHasExpectedBreadcrumbs();
});

test('provides link to blog posts index', async ({ _homePage, _blogIndexPage }) => {
	await _homePage.goto();
	await _homePage.links.allPosts().click();
	await expect(_homePage.page).toHaveURL(BlogIndexPage.URL);
	await _blogIndexPage.assertHasExpectedBreadcrumbs();
});

assertPrivacyPolicyIsEasilyAccessible(HomePage.URL);
