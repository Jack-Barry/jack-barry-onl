import { expect, type Locator } from '@playwright/test';

export async function assertIsInactiveBreadcrumb(
  locator: Locator,
  options: { expectedHref: string }
) {
  const { expectedHref } = options;
  const anchor = locator.locator('a');
  expect(await anchor.getAttribute('href')).toMatch(expectedHref);
  expect(await locator.getAttribute('class')).not.toMatch('active');
}

export async function assertIsActiveBreadcrumb(locator: Locator) {
  const anchor = locator.locator('a');
  await expect(anchor).not.toBeAttached();
  expect(await locator.getAttribute('class')).toMatch('active');
}
