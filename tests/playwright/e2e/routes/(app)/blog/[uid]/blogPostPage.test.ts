import { BlogPostPage } from '../../../../../pages/routes/(app)/blog/[uid]/BlogPostPage';
import { assertPrivacyPolicyIsEasilyAccessible } from '../../../../../utils/privacyPolicyAccessibility';

// TODO: make this value dynamic or based on stubbed data
assertPrivacyPolicyIsEasilyAccessible(
	BlogPostPage.buildUrl('algorithms-deque-using-doubly-linked-list')
);
