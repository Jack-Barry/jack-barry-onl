import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { assertIsActiveBreadcrumb } from '../utils/breadcrumb';

export class HomePage extends BasePage {
	static URL = '/home';

	constructor(public page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto(HomePage.URL);
	}

	async assertHasExpectedBreadcrumbs() {
		const items = this.breadcrumbItems;
		expect(await items.count()).toBe(1);
		const firstItem = items.first();
		expect(await firstItem.innerText()).toBe('Home');
		await assertIsActiveBreadcrumb(firstItem);
	}

	readonly links = {
		latestPost: () => this.page.getByRole('link', { name: 'Read more' }),
		allPosts: () => this.page.getByRole('link', { name: 'See all blog posts' })
	};
}
