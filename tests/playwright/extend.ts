import { test as base } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';

type PlaywrightFixtures = {
	_landingPage: LandingPage;
};

export const test = base.extend<PlaywrightFixtures>({
	_landingPage: async ({ page }, use) => {
		const customPage = new LandingPage(page);
		await use(customPage);
	}
});

export { expect } from '@playwright/test';
