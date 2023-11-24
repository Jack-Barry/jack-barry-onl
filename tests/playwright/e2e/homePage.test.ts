import { test } from '../extend';

test('renders expected breadcrumbs', async ({ _homePage }) => {
	await _homePage.goto();
	await _homePage.assertHasExpectedBreadcrumbs();
});
