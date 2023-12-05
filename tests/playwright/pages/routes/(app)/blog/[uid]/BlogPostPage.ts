import { expect, type Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import {
	assertIsActiveBreadcrumb,
	assertIsInactiveBreadcrumb
} from '../../../../../utils/breadcrumb';
import { HomePage } from '../../home/HomePage';
import { BlogIndexPage } from '../BlogIndexPage';

export class BlogPostPage extends BasePage {
	private static URL_PREFIX = '/blog/';
	static buildUrl(uid: string) {
		return BlogPostPage.URL_PREFIX + uid;
	}

	constructor(
		public page: Page,
		public uid: string
	) {
		super(page);
	}

	get url() {
		return BlogPostPage.buildUrl(this.uid);
	}

	async goto() {
		await this.page.goto(this.url);
		await expect(this.page).toHaveURL(this.url);
	}

	async assertHasExpectedBreadcrumbs() {
		const items = this.breadcrumbItems;
		expect(await items.count()).toBe(3);
		const firstItem = items.first();
		expect(await firstItem.innerText()).toBe('Home');
		await assertIsInactiveBreadcrumb(firstItem, { expectedHref: HomePage.URL });

		const secondItem = items.nth(1);
		expect(await secondItem.innerText()).toBe('Blog');
		await assertIsInactiveBreadcrumb(secondItem, { expectedHref: BlogIndexPage.buildUrl() });

		const lastItem = items.last();
		expect(await lastItem.innerText()).toBe('Post');
		await assertIsActiveBreadcrumb(lastItem);
	}

	readonly filters = {
		// visibilityToggle: () =>
		// clearAllButton: () =>
		// searchTermInput: () =>
		// tags: () =>
		// clearTagsButton: () =>
	};
}
