import { BlogPostPage } from '../../../../../pages/routes/(app)/blog/[uid]/BlogPostPage';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../../utils/privacyPolicyAccessibility';
import { getLatestBlogPost } from '../../../../../utils/blogPosts';

assertPrivacyPolicyIsEasilyAccessible(BlogPostPage.buildUrl(getLatestBlogPost().uid));
