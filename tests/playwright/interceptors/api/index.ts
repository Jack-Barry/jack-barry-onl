import type { Page } from '@playwright/test';

export async function interceptApiHeapUserDelete(page: Page) {
  await page.route('**/api/heap/user/*', async (route) => {
    if (route.request().method() === 'DELETE') {
      return await route.fulfill({ json: { requestId: 'mock_delete_heap_user_request_id' } });
    }
  });
}
