import test, { expect, type Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { assertIsActiveBreadcrumb, assertIsInactiveBreadcrumb } from '../../../../utils/breadcrumb';
import { HomePage } from '../home/HomePage';

export class BlogIndexPage extends BasePage {
  private static URL = '/blog';

  static buildUrl() {
    return BlogIndexPage.URL;
  }

  constructor(public page: Page) {
    super(page);
  }

  goto = async () => {
    await this.page.goto(BlogIndexPage.buildUrl());
  };

  async assertHasExpectedBreadcrumbs() {
    const items = this.breadcrumbItems;
    await test.step('has breadcrumb for home', async () => {
      expect(await items.count()).toBe(2);
      const firstItem = items.first();
      expect(await firstItem.innerText()).toBe('Home');
      await assertIsInactiveBreadcrumb(firstItem, { expectedHref: HomePage.URL });
    });

    await test.step('has breadcrumb for blog', async () => {
      const lastItem = items.last();
      expect(await lastItem.innerText()).toBe('Blog');
      await assertIsActiveBreadcrumb(lastItem);
    });
  }

  linkToBlogPost(uid: string) {
    return this.page.getByTestId(`preview-link-to-blog-post-${uid}`);
  }
}
