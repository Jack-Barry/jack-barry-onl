import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicy';

type PlaywrightFixtures = {
	_homePage: HomePage;
	_landingPage: LandingPage;
	_privacyPolicyPage: PrivacyPolicyPage;
};

export const test = base.extend<PlaywrightFixtures>({
	_homePage: async ({ page }, use) => {
		const customPage = new HomePage(page);
		await use(customPage);
	},
	_landingPage: async ({ page }, use) => {
		const customPage = new LandingPage(page);
		await use(customPage);
	},
	_privacyPolicyPage: async ({ page }, use) => {
		const customPage = new PrivacyPolicyPage(page);
		await use(customPage);
	}
});

export { expect } from '@playwright/test';
