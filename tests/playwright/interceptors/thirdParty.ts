import { test, type Page } from '@playwright/test';
import { mockHeapAnalyticsCookie } from '../utils/heapAnalytics';

export async function interceptHeapAnalytics(page: Page) {
	await page.route('**/cdn.heapanalytics.com/js/**', async (route) => {
		await test.step('intercepting Heap Analytics', async () => {
			await page.context().addCookies([mockHeapAnalyticsCookie()]);
			return await route.fulfill();
		});
	});
}
