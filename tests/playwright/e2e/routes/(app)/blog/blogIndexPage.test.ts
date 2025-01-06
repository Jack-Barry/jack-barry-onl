import { expect, test } from '../../../../extend';
import { BlogIndexPage } from '../../../../pages/routes/(app)/blog/BlogIndexPage';
import { BlogPostPage } from '../../../../pages/routes/(app)/blog/[uid]/BlogPostPage';
import { getLatestBlogPost } from '../../../../utils/blogPosts';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../utils/privacyPolicyAccessibility';

assertPrivacyPolicyIsEasilyAccessible(BlogIndexPage.buildUrl());

test('renders expected breadcrumbs', async ({ _blogIndexPage }) => {
  await _blogIndexPage.goto();
  await _blogIndexPage.assertHasExpectedBreadcrumbs();
});

test('read more button takes user to blog post', async ({ page, _blogIndexPage }) => {
  const latestPost = getLatestBlogPost();
  const blogPostPage = new BlogPostPage(page, latestPost.uid);
  await _blogIndexPage.goto();
  await _blogIndexPage.privacy.setHasConsentedToCookies();
  await _blogIndexPage.linkToBlogPost(latestPost.uid).click();
  await expect(page).toHaveURL(blogPostPage.url);
});
