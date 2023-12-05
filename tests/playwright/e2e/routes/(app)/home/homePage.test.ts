import { BlogPostSearchParams } from '../../../../../../src/lib/api/common/prismic/BlogPostSearchParams';
import { expect, test } from '../../../../extend';
import { BlogIndexPage } from '../../../../pages/routes/(app)/blog/BlogIndexPage';
import { BlogPostPage } from '../../../../pages/routes/(app)/blog/[uid]/BlogPostPage';
import { HomePage } from '../../../../pages/routes/(app)/home/HomePage';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../utils/privacyPolicyAccessibility';

assertPrivacyPolicyIsEasilyAccessible(HomePage.URL);

test.describe('home page features', () => {
	test.beforeEach(async ({ _homePage }) => {
		await _homePage.goto();
		await _homePage.privacy.setHasConsentedToCookies(true);
	});

	test('renders expected breadcrumbs', async ({ _homePage }) => {
		await _homePage.assertHasExpectedBreadcrumbs();
	});

	test('provides link to blog posts index', async ({ _homePage, _blogIndexPage }) => {
		await _homePage.links.allPosts().click();
		await expect(_homePage.page).toHaveURL(BlogIndexPage.buildUrl());
		await _blogIndexPage.assertHasExpectedBreadcrumbs();
	});

	test.describe('latest blog post', () => {
		test('provides link to latest blog post', async ({ page, _homePage }) => {
			// TODO: make this value dynamic or based on stubbed data
			const blogPostPage = new BlogPostPage(page, 'algorithms-deque-using-doubly-linked-list');
			await _homePage.latestPost.link().click();
			await expect(_homePage.page).toHaveURL(blogPostPage.url);
		});

		test('clicking tags for latest blog post opens index filtered by tag', async ({
			page,
			_homePage
		}) => {
			await _homePage.latestPost.tags().first().click();
			await expect(page).toHaveURL(
				BlogIndexPage.buildUrl(BlogPostSearchParams.fromOptions({ tags: ['Skills: Technical'] }))
			);
		});
	});

	test('provides buttons for about sections', async ({ _homePage }) => {
		await expect(_homePage.aboutSection.careerButton()).toBeVisible();
		await expect(_homePage.aboutSection.personalButton()).toBeVisible();
	});
});
