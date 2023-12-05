import { expect, type Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { assertIsActiveBreadcrumb } from '../../../../utils/breadcrumb';

export class HomePage extends BasePage {
	static URL = '/home';

	constructor(public page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto(HomePage.URL);
		await expect(this.page).toHaveURL(HomePage.URL);
	}

	async assertHasExpectedBreadcrumbs() {
		const items = this.breadcrumbItems;
		expect(await items.count()).toBe(1);
		const firstItem = items.first();
		expect(await firstItem.innerText()).toBe('Home');
		await assertIsActiveBreadcrumb(firstItem);
	}

	readonly links = {
		allPosts: () => this.page.getByRole('link', { name: 'See all blog posts' })
	};

	readonly latestPost = {
		link: () => this.page.getByRole('link', { name: 'Read more' }),
		tags: () => this.page.getByTestId('toggle-tag-Skills: Technical')
	};

	readonly aboutSection = {
		careerButton: () => this.page.getByRole('button', { name: 'Career' }),
		personalButton: () => this.page.getByRole('button', { name: 'Personal' })
	};
}
