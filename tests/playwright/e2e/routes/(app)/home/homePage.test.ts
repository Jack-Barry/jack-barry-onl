import { expect, test } from '../../../../extend';
import { BlogIndexPage } from '../../../../pages/routes/(app)/blog/BlogIndexPage';
import { BlogPostPage } from '../../../../pages/routes/(app)/blog/[uid]/BlogPostPage';
import { HomePage } from '../../../../pages/routes/(app)/home/HomePage';
import { getLatestBlogPost } from '../../../../utils/blogPosts';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../utils/privacyPolicyAccessibility';

assertPrivacyPolicyIsEasilyAccessible(HomePage.URL);

test.describe('home page features', () => {
  test.beforeEach(async ({ _homePage }) => {
    await _homePage.goto();
    await _homePage.privacy.setHasConsentedToCookies(true);
  });

  test('renders expected breadcrumbs', async ({ _homePage }) => {
    await _homePage.assertHasExpectedBreadcrumbs();
  });

  test('provides link to blog posts index', async ({ _homePage, _blogIndexPage }) => {
    await _homePage.links.allPosts().click();
    await expect(_homePage.page).toHaveURL(BlogIndexPage.buildUrl());
    await _blogIndexPage.assertHasExpectedBreadcrumbs();
  });

  test.describe('latest blog post', () => {
    test('provides link to latest blog post', async ({ page, _homePage }) => {
      const latestPost = getLatestBlogPost();
      const blogPostPage = new BlogPostPage(page, latestPost.uid);
      await _homePage.latestPost.link().click();
      await expect(_homePage.page).toHaveURL(blogPostPage.url);
    });
  });

  test('provides buttons for about sections', async ({ _homePage }) => {
    await expect(_homePage.aboutSection.careerButton()).toBeVisible();
    await expect(_homePage.aboutSection.personalButton()).toBeVisible();
  });
});
