import { test, expect } from '../extend';

test('test', async ({ page, _landingPage }) => {
	await _landingPage.goto();
	await expect(page.locator('#cookies-consent-modal')).toBeVisible();
	// await page.goto('http://localhost:5173/');
	// await page.getByRole('link', { name: 'Show me my options' }).click();
	// await page
	// 	.locator('section')
	// 	.filter({
	// 		hasText: "I'm a developer, not a data-harvesting megacorp or cash-strapped startup looking"
	// 	})
	// 	.locator('div')
	// 	.click();
});
