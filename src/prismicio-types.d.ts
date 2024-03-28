// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type AboutPageDocumentDataSlicesSlice = never;

/**
 * Content for About Page documents
 */
interface AboutPageDocumentData {
	/**
	 * Site Info field in *About Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about_page.site_info
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	site_info: prismic.RichTextField;

	/**
	 * Career field in *About Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about_page.career
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	career: prismic.RichTextField;

	/**
	 * Personal field in *About Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about_page.personal
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	personal: prismic.RichTextField;

	/**
	 * Slice Zone field in *About Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<AboutPageDocumentDataSlicesSlice>;
}

/**
 * About Page document from Prismic
 *
 * - **API ID**: `about_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<AboutPageDocumentData>,
	'about_page',
	Lang
>;

type BlogPostDocumentDataBodySlice =
	| BlogPostImageSlice
	| EditNoticeSlice
	| CodeBlockSlice
	| BlogPostSectionSlice;

/**
 * Content for Blog Post documents
 */
interface BlogPostDocumentData {
	/**
	 * Slice Zone field in *Blog Post*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	body: prismic.SliceZone<BlogPostDocumentDataBodySlice> /**
	 * Meta Title field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: blog_post.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_title: prismic.KeyTextField;

	/**
	 * Meta Description field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: blog_post.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Blog Post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
	Simplify<BlogPostDocumentData>,
	'blog_post',
	Lang
>;

type HomePageDocumentDataSlicesSlice = never;

/**
 * Content for Home Page documents
 */
interface HomePageDocumentData {
	/**
	 * Welcome Message field in *Home Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.welcome_message
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	welcome_message: prismic.RichTextField;

	/**
	 * Slice Zone field in *Home Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<HomePageDocumentDataSlicesSlice> /**
	 * Meta Title field in *Home Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: home_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_title: prismic.KeyTextField;

	/**
	 * Meta Description field in *Home Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: home_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Image field in *Home Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Home Page document from Prismic
 *
 * - **API ID**: `home_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomePageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<HomePageDocumentData>,
	'home_page',
	Lang
>;

type PrivacyPolicyDocumentDataSlicesSlice = PrivacyPolicyModalContentSlice | PrivacyPolicySlice;

/**
 * Content for Privacy Policy documents
 */
interface PrivacyPolicyDocumentData {
	/**
	 * Slice Zone field in *Privacy Policy*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<PrivacyPolicyDocumentDataSlicesSlice> /**
	 * Meta Description field in *Privacy Policy*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: privacy_policy.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Title field in *Privacy Policy*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: privacy_policy.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Privacy Policy document from Prismic
 *
 * - **API ID**: `privacy_policy`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PrivacyPolicyDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<PrivacyPolicyDocumentData>,
	'privacy_policy',
	Lang
>;

export type AllDocumentTypes =
	| AboutPageDocument
	| BlogPostDocument
	| HomePageDocument
	| PrivacyPolicyDocument;

/**
 * Primary content in *BlogPostImage → Primary*
 */
export interface BlogPostImageSliceDefaultPrimary {
	/**
	 * Image field in *BlogPostImage → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post_image.primary.image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for BlogPostImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogPostImageSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<BlogPostImageSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *BlogPostImage*
 */
type BlogPostImageSliceVariation = BlogPostImageSliceDefault;

/**
 * BlogPostImage Shared Slice
 *
 * - **API ID**: `blog_post_image`
 * - **Description**: BlogPostImage
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogPostImageSlice = prismic.SharedSlice<
	'blog_post_image',
	BlogPostImageSliceVariation
>;

/**
 * Primary content in *BlogPostContentSection → Primary*
 */
export interface BlogPostSectionSliceDefaultPrimary {
	/**
	 * Content field in *BlogPostContentSection → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post_section.primary.content
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for BlogPostContentSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: BlogPostSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogPostSectionSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<BlogPostSectionSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *BlogPostContentSection*
 */
type BlogPostSectionSliceVariation = BlogPostSectionSliceDefault;

/**
 * BlogPostContentSection Shared Slice
 *
 * - **API ID**: `blog_post_section`
 * - **Description**: BlogPostSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogPostSectionSlice = prismic.SharedSlice<
	'blog_post_section',
	BlogPostSectionSliceVariation
>;

/**
 * Primary content in *BlogPostCodeSnippet → Primary*
 */
export interface CodeBlockSliceDefaultPrimary {
	/**
	 * language field in *BlogPostCodeSnippet → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: shell
	 * - **API ID Path**: code_block.primary.language
	 * - **Documentation**: https://prismic.io/docs/field#select
	 */
	language: prismic.SelectField<
		| 'shell'
		| 'javascript'
		| 'typescript'
		| 'powershell'
		| 'yaml'
		| 'java'
		| 'rust'
		| 'go'
		| 'python',
		'filled'
	>;

	/**
	 * Code field in *BlogPostCodeSnippet → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: code_block.primary.code
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	code: prismic.RichTextField;
}

/**
 * Default variation for BlogPostCodeSnippet Slice
 *
 * - **API ID**: `default`
 * - **Description**: CodeBlock
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CodeBlockSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<CodeBlockSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *BlogPostCodeSnippet*
 */
type CodeBlockSliceVariation = CodeBlockSliceDefault;

/**
 * BlogPostCodeSnippet Shared Slice
 *
 * - **API ID**: `code_block`
 * - **Description**: CodeBlock
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CodeBlockSlice = prismic.SharedSlice<'code_block', CodeBlockSliceVariation>;

/**
 * Primary content in *BlogPostEditNotice → Primary*
 */
export interface EditNoticeSliceDefaultPrimary {
	/**
	 * Edit Time field in *BlogPostEditNotice → Primary*
	 *
	 * - **Field Type**: Timestamp
	 * - **Placeholder**: *None*
	 * - **API ID Path**: edit_notice.primary.edit_time
	 * - **Documentation**: https://prismic.io/docs/field#timestamp
	 */
	edit_time: prismic.TimestampField;

	/**
	 * Edit Notes field in *BlogPostEditNotice → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: edit_notice.primary.edit_notes
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	edit_notes: prismic.RichTextField;
}

/**
 * Default variation for BlogPostEditNotice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EditNoticeSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<EditNoticeSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *BlogPostEditNotice*
 */
type EditNoticeSliceVariation = EditNoticeSliceDefault;

/**
 * BlogPostEditNotice Shared Slice
 *
 * - **API ID**: `edit_notice`
 * - **Description**: EditNotice
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EditNoticeSlice = prismic.SharedSlice<'edit_notice', EditNoticeSliceVariation>;

/**
 * Primary content in *PrivacyPolicy → Primary*
 */
export interface PrivacyPolicySliceDefaultPrimary {
	/**
	 * policy field in *PrivacyPolicy → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.primary.policy
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	policy: prismic.RichTextField;
}

/**
 * Default variation for PrivacyPolicy Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PrivacyPolicySliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<PrivacyPolicySliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *PrivacyPolicy*
 */
type PrivacyPolicySliceVariation = PrivacyPolicySliceDefault;

/**
 * PrivacyPolicy Shared Slice
 *
 * - **API ID**: `privacy_policy`
 * - **Description**: PrivacyPolicy
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PrivacyPolicySlice = prismic.SharedSlice<'privacy_policy', PrivacyPolicySliceVariation>;

/**
 * Primary content in *PrivacyPolicyModalContent → Primary*
 */
export interface PrivacyPolicyModalContentSliceDefaultPrimary {
	/**
	 * Policy Notice field in *PrivacyPolicyModalContent → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy_modal_content.primary.policy_notice
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	policy_notice: prismic.RichTextField;
}

/**
 * Default variation for PrivacyPolicyModalContent Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PrivacyPolicyModalContentSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<PrivacyPolicyModalContentSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *PrivacyPolicyModalContent*
 */
type PrivacyPolicyModalContentSliceVariation = PrivacyPolicyModalContentSliceDefault;

/**
 * PrivacyPolicyModalContent Shared Slice
 *
 * - **API ID**: `privacy_policy_modal_content`
 * - **Description**: PrivacyPolicyModalContent
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PrivacyPolicyModalContentSlice = prismic.SharedSlice<
	'privacy_policy_modal_content',
	PrivacyPolicyModalContentSliceVariation
>;

declare module '@prismicio/client' {
	interface CreateClient {
		(
			repositoryNameOrEndpoint: string,
			options?: prismic.ClientConfig
		): prismic.Client<AllDocumentTypes>;
	}

	namespace Content {
		export type {
			AboutPageDocument,
			AboutPageDocumentData,
			AboutPageDocumentDataSlicesSlice,
			BlogPostDocument,
			BlogPostDocumentData,
			BlogPostDocumentDataBodySlice,
			HomePageDocument,
			HomePageDocumentData,
			HomePageDocumentDataSlicesSlice,
			PrivacyPolicyDocument,
			PrivacyPolicyDocumentData,
			PrivacyPolicyDocumentDataSlicesSlice,
			AllDocumentTypes,
			BlogPostImageSlice,
			BlogPostImageSliceDefaultPrimary,
			BlogPostImageSliceVariation,
			BlogPostImageSliceDefault,
			BlogPostSectionSlice,
			BlogPostSectionSliceDefaultPrimary,
			BlogPostSectionSliceVariation,
			BlogPostSectionSliceDefault,
			CodeBlockSlice,
			CodeBlockSliceDefaultPrimary,
			CodeBlockSliceVariation,
			CodeBlockSliceDefault,
			EditNoticeSlice,
			EditNoticeSliceDefaultPrimary,
			EditNoticeSliceVariation,
			EditNoticeSliceDefault,
			PrivacyPolicySlice,
			PrivacyPolicySliceDefaultPrimary,
			PrivacyPolicySliceVariation,
			PrivacyPolicySliceDefault,
			PrivacyPolicyModalContentSlice,
			PrivacyPolicyModalContentSliceDefaultPrimary,
			PrivacyPolicyModalContentSliceVariation,
			PrivacyPolicyModalContentSliceDefault
		};
	}
}
