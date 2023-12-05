import test, { expect, type Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { assertIsActiveBreadcrumb, assertIsInactiveBreadcrumb } from '../../../../utils/breadcrumb';
import { HomePage } from '../home/HomePage';
import { BlogPostSearchParams } from '../../../../../../src/lib/api/common/prismic/BlogPostSearchParams';

export class BlogIndexPage extends BasePage {
	private static URL = '/blog';

	static buildUrl(searchParams: BlogPostSearchParams = new BlogPostSearchParams()) {
		searchParams.asURLSearchParams.delete('pageNumber');
		if (!Array.from(searchParams.asURLSearchParams.entries()).length) {
			return BlogIndexPage.URL;
		}

		return `${BlogIndexPage.URL}?${searchParams.asURLSearchParams.toString()}`;
	}

	constructor(public page: Page) {
		super(page);
	}

	goto = async (searchParams?: BlogPostSearchParams) => {
		await test.step(`going to ${BlogIndexPage.URL}`, async () => {
			const expectedUrl = BlogIndexPage.buildUrl(searchParams);
			await this.page.goto(expectedUrl);
			await expect(this.page).toHaveURL(new RegExp(BlogIndexPage.URL));

			if (searchParams?.asOptions.searchTerm) {
				await expect(this.page).toHaveURL(
					new RegExp(`searchTerm=${searchParams.asOptions.searchTerm.replaceAll(' ', '\\+')}`)
				);
			}

			if (searchParams?.asOptions.tags) {
				for (const tag of searchParams.asOptions.tags) {
					await expect(this.page).toHaveURL(new RegExp(`tags=${tag.replaceAll(' ', '\\+')}`));
				}
			}
		});
	};

	async assertHasExpectedBreadcrumbs() {
		const items = this.breadcrumbItems;
		await test.step('has breadcrumb for home', async () => {
			expect(await items.count()).toBe(2);
			const firstItem = items.first();
			expect(await firstItem.innerText()).toBe('Home');
			await assertIsInactiveBreadcrumb(firstItem, { expectedHref: HomePage.URL });
		});

		await test.step('has breadcrumb for blog', async () => {
			const lastItem = items.last();
			expect(await lastItem.innerText()).toBe('Blog');
			await assertIsActiveBreadcrumb(lastItem);
		});
	}

	linkToBlogPost(uid: string) {
		return this.page.getByTestId(`preview-link-to-blog-post-${uid}`);
	}

	loadMoreButton() {
		return this.page.getByRole('button', { name: 'Load More' });
	}

	allPostsLoadedIndicator(options: { withFilters?: boolean } = {}) {
		const { withFilters = false } = options;

		if (withFilters) {
			return this.page.getByText('All posts matching current filters have been loaded');
		}

		return this.page.getByText('All posts have been loaded');
	}

	readonly filters = {
		showFiltersButton: () => this.page.getByRole('button', { name: 'Show filters' }),
		hideFiltersButton: () => this.page.getByRole('button', { name: 'Hide filters' }),
		clearAllButton: () => this.page.getByRole('button', { name: 'Clear all filters' }),
		searchTermInput: () => this.page.getByPlaceholder('Search'),
		activeFiltersIndicator: async () => {
			if (await this.filters.showFiltersButton().isVisible()) {
				return this.filters.showFiltersButton().getByText('Filters are currently active');
			} else {
				return this.filters.hideFiltersButton().getByText('Filters are currently active');
			}
		},
		tags: {
			enableAllButton: () => this.page.getByRole('button', { name: 'Enable all tags' }),
			clearAllButton: () => this.page.getByRole('button', { name: 'Clear all tags' }),
			tagToggleButton: (tagName: string, position = 0) =>
				this.page.getByTestId(`toggle-tag-${tagName}`).nth(position)
		}
	};
}
