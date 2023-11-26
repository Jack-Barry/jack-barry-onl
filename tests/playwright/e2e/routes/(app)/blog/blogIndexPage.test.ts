import { test } from '../../../../extend';

test('renders expected breadcrumbs', async ({ _blogIndexPage }) => {
	await _blogIndexPage.goto();
	await _blogIndexPage.assertHasExpectedBreadcrumbs();
});
