import { test } from '../../../../extend';
import { BlogIndexPage } from '../../../../pages/routes/(app)/blog/BlogIndexPage';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../utils/privacyPolicyAccessibility';

test('renders expected breadcrumbs', async ({ _blogIndexPage }) => {
	await _blogIndexPage.goto();
	await _blogIndexPage.assertHasExpectedBreadcrumbs();
});

assertPrivacyPolicyIsEasilyAccessible(BlogIndexPage.URL);
