import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicy';
import { BlogIndexPage } from './pages/blog/BlogIndexPage';

export type PlaywrightFixtures = {
	_blogIndexPage: BlogIndexPage;
	_homePage: HomePage;
	_landingPage: LandingPage;
	_privacyPolicyPage: PrivacyPolicyPage;
};

export const test = base.extend<PlaywrightFixtures>({
	_blogIndexPage: async ({ page }, use) => {
		const customPage = new BlogIndexPage(page);
		await customPage.init();
		await use(customPage);
	},

	_homePage: async ({ page }, use) => {
		const customPage = new HomePage(page);
		await customPage.init();
		await use(customPage);
	},

	_landingPage: async ({ page }, use) => {
		const customPage = new LandingPage(page);
		await customPage.init();
		await use(customPage);
	},

	_privacyPolicyPage: async ({ page }, use) => {
		const customPage = new PrivacyPolicyPage(page);
		await customPage.init();
		await use(customPage);
	}
});

export { expect } from '@playwright/test';
