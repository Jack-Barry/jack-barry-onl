import { beforeEach, describe, expect, test } from 'vitest';
import { BlogPostSearchParams, PARAM_KEY_PAGE_NUMBER } from './BlogPostSearchParams';

describe('BlogPostSearchParams', () => {
	test('constructs expected search params by default', () => {
		const defaultParams = new BlogPostSearchParams();
		expect(defaultParams.asOptions).toStrictEqual({
			pageNumber: 1,
			previewsOnly: false,
			searchTerm: '',
			tags: []
		});
	});

	test('constructs expected search params from params', () => {
		const fromParams = new URLSearchParams();
		fromParams.set(PARAM_KEY_PAGE_NUMBER, '2');
		fromParams.append(BlogPostSearchParams.PARAM_KEY_TAGS, 'a');
		fromParams.append(BlogPostSearchParams.PARAM_KEY_TAGS, 'b');
		fromParams.set(BlogPostSearchParams.PARAM_KEY_SEARCH_TERM, 'hello');
		fromParams.set(BlogPostSearchParams.PARAM_KEY_PREVIEWS_ONLY, 'true');

		const params = new BlogPostSearchParams(fromParams);
		expect(params.asOptions).toStrictEqual({
			pageNumber: 2,
			previewsOnly: true,
			searchTerm: 'hello',
			tags: ['a', 'b']
		});
	});

	test('constructs expected search params from options', () => {
		const params = BlogPostSearchParams.fromOptions({
			pageNumber: 3,
			previewsOnly: true,
			searchTerm: 'hola',
			tags: ['b', 'a']
		});
		expect(params.asOptions).toStrictEqual({
			pageNumber: 3,
			previewsOnly: true,
			searchTerm: 'hola',
			tags: ['b', 'a']
		});
	});

	describe('allows updating params', () => {
		let baseParams: BlogPostSearchParams;

		beforeEach(() => {
			baseParams = BlogPostSearchParams.fromOptions({
				pageNumber: 2,
				previewsOnly: true,
				searchTerm: 'hello',
				tags: ['a', 'b']
			});
		});

		test('allows setting page number', () => {
			baseParams.setPageNumber(3);
			expect(baseParams.asOptions).toStrictEqual({
				pageNumber: 3,
				previewsOnly: true,
				searchTerm: 'hello',
				tags: ['a', 'b']
			});
		});

		test('allows setting previews only', () => {
			baseParams.setPreviewsOnly(false);
			expect(baseParams.asOptions).toStrictEqual({
				pageNumber: 2,
				previewsOnly: false,
				searchTerm: 'hello',
				tags: ['a', 'b']
			});
		});

		test('allows setting search term', () => {
			baseParams.setSearchTerm('hola');
			expect(baseParams.asOptions).toStrictEqual({
				pageNumber: 2,
				previewsOnly: true,
				searchTerm: 'hola',
				tags: ['a', 'b']
			});
		});

		test('allows setting tags', () => {
			baseParams.setTags(['b', 'c']);
			expect(baseParams.asOptions).toStrictEqual({
				pageNumber: 2,
				previewsOnly: true,
				searchTerm: 'hello',
				tags: ['b', 'c']
			});
		});
	});

	test('current returns expected search params', () => {
		const params = BlogPostSearchParams.fromOptions({
			pageNumber: 2,
			previewsOnly: true,
			searchTerm: 'hello',
			tags: ['a', 'b']
		});
		expect(params.asURLSearchParams.toString()).toBe(
			'pageNumber=2&searchTerm=hello&tags=a&tags=b&previewsOnly=true'
		);
	});
});
