import { expect, type Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { assertIsActiveBreadcrumb, assertIsInactiveBreadcrumb } from '../../../../utils/breadcrumb';
import { HomePage } from '../home/HomePage';

export class BlogIndexPage extends BasePage {
	static URL = '/blog';

	constructor(public page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto(BlogIndexPage.URL);
		await expect(this.page).toHaveURL(BlogIndexPage.URL);
	}

	async assertHasExpectedBreadcrumbs() {
		const items = this.breadcrumbItems;
		expect(await items.count()).toBe(2);
		const firstItem = items.first();
		expect(await firstItem.innerText()).toBe('Home');
		await assertIsInactiveBreadcrumb(firstItem, { expectedHref: HomePage.URL });

		const lastItem = items.last();
		expect(await lastItem.innerText()).toBe('Blog');
		await assertIsActiveBreadcrumb(lastItem);
	}

	readonly links = {
		latestPost: () => this.page.getByRole('link', { name: 'Read more' }),
		allPosts: () => this.page.getByRole('link', { name: 'See all blog posts' })
	};
}
