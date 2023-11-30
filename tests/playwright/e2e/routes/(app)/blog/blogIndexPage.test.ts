import { BlogPostSearchParams } from '../../../../../../src/lib/api/common/prismic/BlogPostSearchParams';
import { expect, test } from '../../../../extend';
import { BlogIndexPage } from '../../../../pages/routes/(app)/blog/BlogIndexPage';
import { BlogPostPage } from '../../../../pages/routes/(app)/blog/[uid]/BlogPostPage';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../utils/privacyPolicyAccessibility';

assertPrivacyPolicyIsEasilyAccessible(BlogIndexPage.buildUrl());

test('renders expected breadcrumbs', async ({ _blogIndexPage }) => {
	await _blogIndexPage.goto();
	await _blogIndexPage.assertHasExpectedBreadcrumbs();
});

test('handles searchTerm and tags query string params on load', async ({ _blogIndexPage }) => {
	await _blogIndexPage.goto(
		BlogPostSearchParams.fromOptions({ tags: ['Home Life'], searchTerm: 'tacos' })
	);
	await _blogIndexPage.privacy.setHasConsentedToCookies();
	expect(await _blogIndexPage.filters.activeFiltersIndicator()).toBeAttached();
	await _blogIndexPage.filters.showFiltersButton().click();
	await expect(_blogIndexPage.filters.searchTermInput()).toHaveValue('tacos');
	await expect(_blogIndexPage.filters.tags.tagToggleButton('Home Life')).toHaveClass(
		new RegExp('btn-primary')
	);
});

test('search term in query string follows user input', async ({ _blogIndexPage }) => {
	await _blogIndexPage.goto();
	await _blogIndexPage.privacy.setHasConsentedToCookies();
	await test.step('initializes with no active filters', async () => {
		expect(await _blogIndexPage.filters.activeFiltersIndicator()).not.toBeAttached();
		await expect(_blogIndexPage.filters.searchTermInput()).not.toBeVisible();
	});

	await test.step('user can enter search term value', async () => {
		await _blogIndexPage.filters.showFiltersButton().click();
		await expect(_blogIndexPage.filters.searchTermInput()).toBeVisible();
		await _blogIndexPage.filters.searchTermInput().fill('test');
		await expect(_blogIndexPage.page).toHaveURL(
			BlogIndexPage.buildUrl(BlogPostSearchParams.fromOptions({ searchTerm: 'test' }))
		);
		expect(await _blogIndexPage.filters.activeFiltersIndicator()).toBeAttached();
	});

	await test.step('user can clear search term value', async () => {
		await _blogIndexPage.filters.searchTermInput().clear();
		await expect(_blogIndexPage.page).toHaveURL(BlogIndexPage.buildUrl());
		expect(await _blogIndexPage.filters.activeFiltersIndicator()).not.toBeAttached();
	});
});

test('selected tags in query string follow user selections', async ({ _blogIndexPage }) => {
	await _blogIndexPage.goto();
	await _blogIndexPage.privacy.setHasConsentedToCookies();

	await test.step('initializes with no active filters', async () => {
		await expect(_blogIndexPage.filters.tags.clearAllButton()).not.toBeVisible();
		await expect(_blogIndexPage.filters.tags.enableAllButton()).not.toBeVisible();
		await _blogIndexPage.filters.showFiltersButton().click();
		await expect(_blogIndexPage.filters.tags.clearAllButton()).toBeVisible();
		await expect(_blogIndexPage.filters.tags.clearAllButton()).toBeDisabled();
		await expect(_blogIndexPage.filters.tags.enableAllButton()).toBeVisible();
		await expect(_blogIndexPage.filters.tags.enableAllButton()).toBeEnabled();
		await expect(_blogIndexPage.filters.tags.tagToggleButton('Home Life')).toHaveClass(
			new RegExp('btn-outline-primary')
		);
	});

	await test.step('user can select a tag to filter by', async () => {
		await _blogIndexPage.filters.tags.tagToggleButton('Home Life').click();
		await expect(_blogIndexPage.page).toHaveURL(
			BlogIndexPage.buildUrl(BlogPostSearchParams.fromOptions({ tags: ['Home Life'] }))
		);
		await expect(_blogIndexPage.filters.tags.clearAllButton()).toBeEnabled();
		await expect(_blogIndexPage.filters.tags.enableAllButton()).toBeEnabled();
		await expect(_blogIndexPage.filters.tags.tagToggleButton('Home Life')).toHaveClass(
			new RegExp('btn-primary')
		);
	});

	await test.step('user can clear a selected tag', async () => {
		await _blogIndexPage.filters.tags.tagToggleButton('Home Life').click();
		await expect(_blogIndexPage.page).toHaveURL(BlogIndexPage.buildUrl());
		await expect(_blogIndexPage.filters.tags.clearAllButton()).toBeDisabled();
		await expect(_blogIndexPage.filters.tags.enableAllButton()).toBeEnabled();
		await expect(_blogIndexPage.filters.tags.tagToggleButton('Home Life')).toHaveClass(
			new RegExp('btn-outline-primary')
		);
	});
});

test('read more button takes user to blog post', async ({ page, _blogIndexPage }) => {
	// TODO make this dynamic
	const uid = 'algorithms-deque-using-doubly-linked-list';
	const blogPostPage = new BlogPostPage(page, uid);
	await _blogIndexPage.goto();
	await _blogIndexPage.privacy.setHasConsentedToCookies();
	await _blogIndexPage.linkToBlogPost(uid).click();
	await expect(page).toHaveURL(blogPostPage.url);
});

test('user can load more posts if available', async ({ _blogIndexPage }) => {
	await _blogIndexPage.goto();
	await _blogIndexPage.privacy.setHasConsentedToCookies();

	await test.step('more posts are initially available', async () => {
		await expect(_blogIndexPage.loadMoreButton()).toBeVisible();
		await expect(_blogIndexPage.allPostsLoadedIndicator()).not.toBeAttached();
		expect(await _blogIndexPage.page.getByText('Read more').count()).toBe(10);
	});

	await test.step('clicking load more fetches more posts', async () => {
		await _blogIndexPage.loadMoreButton().click();
		await expect(_blogIndexPage.loadMoreButton()).not.toBeAttached();
		await expect(_blogIndexPage.allPostsLoadedIndicator()).toBeAttached();
		expect(await _blogIndexPage.page.getByText('Read more').count()).toBeGreaterThan(10);
	});
});
