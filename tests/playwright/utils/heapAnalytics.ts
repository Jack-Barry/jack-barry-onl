import dayjs from 'dayjs';
import type { BrowserContext } from '@playwright/test';

type BrowserContextCookie = Parameters<BrowserContext['addCookies']>[0][number];

/** Builds mock Heap analytics user ID cookie to use for tests */
export function mockHeapAnalyticsCookie(): BrowserContextCookie {
	return {
		domain: 'localhost',
		path: '/',
		name: '_hp2_id.mock_heap_user_id',
		value: 'mockedHeapAnalyticsCookie',
		expires: dayjs().add(1, 'day').unix()
	};
}
