import { test as base } from '@playwright/test';
import { HomePage } from './pages/routes/(app)/home/HomePage';
import { LandingPage } from './pages/routes/LandingPage';
import { PrivacyPolicyPage } from './pages/routes/(app)/privacy-policy/PrivacyPolicy';
import { BlogIndexPage } from './pages/routes/(app)/blog/BlogIndexPage';
import { BasePage } from './pages/BasePage';

export type PlaywrightFixtures = {
	_basePage: BasePage;
	_blogIndexPage: BlogIndexPage;
	_homePage: HomePage;
	_landingPage: LandingPage;
	_privacyPolicyPage: PrivacyPolicyPage;
};

export const test = base.extend<PlaywrightFixtures>({
	_basePage: async ({ page }, use) => {
		const customPage = new BasePage(page);
		await customPage.init();
		await use(customPage);
	},

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
