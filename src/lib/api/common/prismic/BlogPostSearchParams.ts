import { boolFromString } from '$lib/utils/boolean';

/** Options that can be transmitted via query string parameters to the API */
export type BlogPostSearchOptions = {
	/** Page number to fetch */
	pageNumber: number;
	/** Search term to use */
	searchTerm: string;
	/** Tags to filter by */
	tags: string[];
	/**
	 * Response should include minimal data to present previews (not the entire
	 *   article contents)
	 */
	previewsOnly: boolean;
};

/** Param key used for page number throughout the app */
export const PARAM_KEY_PAGE_NUMBER = 'pageNumber';

/**
 * Allows translation between query string parameters in URL and options object
 *   used by API for blog post searches
 */
export class BlogPostSearchParams {
	static PARAM_KEY_SEARCH_TERM = 'searchTerm';
	static PARAM_KEY_TAGS = 'tags';
	static PARAM_KEY_PREVIEWS_ONLY = 'previewsOnly';
	static PARAM_KEY_PAGE_NUMBER = PARAM_KEY_PAGE_NUMBER;

	constructor(private _searchParams = new URLSearchParams()) {}

	static fromOptions(options: Partial<BlogPostSearchOptions>) {
		const searchParams = new BlogPostSearchParams();
		searchParams.setPageNumber(options.pageNumber);
		searchParams.setSearchTerm(options.searchTerm);
		searchParams.setTags(options.tags);
		searchParams.setPreviewsOnly(options.previewsOnly);
		return searchParams;
	}

	public get asURLSearchParams() {
		return this._searchParams;
	}

	/** Updates page number value in search params */
	public setPageNumber(pageNumber = 1) {
		this._searchParams.set(BlogPostSearchParams.PARAM_KEY_PAGE_NUMBER, pageNumber.toString());
	}

	/** Updates search term value in search params */
	public setSearchTerm(searchTerm: string = '') {
		if (searchTerm) {
			this._searchParams.set(BlogPostSearchParams.PARAM_KEY_SEARCH_TERM, searchTerm);
		} else {
			this._searchParams.delete(BlogPostSearchParams.PARAM_KEY_SEARCH_TERM);
		}
	}

	/** Updates tag value(s) in search params */
	public setTags(tags: string[] = []) {
		this._searchParams.delete(BlogPostSearchParams.PARAM_KEY_TAGS);
		tags.forEach((t) => {
			this._searchParams.append(BlogPostSearchParams.PARAM_KEY_TAGS, t);
		});
	}

	/** Updates previews only value in search params */
	public setPreviewsOnly(previewsOnly = false) {
		if (previewsOnly) {
			this._searchParams.set(BlogPostSearchParams.PARAM_KEY_PREVIEWS_ONLY, 'true');
		} else {
			this._searchParams.delete(BlogPostSearchParams.PARAM_KEY_PREVIEWS_ONLY);
		}
	}

	/** Translates search params into options object that can be consumed by API */
	public get asOptions(): BlogPostSearchOptions {
		const pageNumberRaw = this._searchParams.get(BlogPostSearchParams.PARAM_KEY_PAGE_NUMBER);
		const pageNumber = parseInt(pageNumberRaw || '1');
		const searchTerm = this._searchParams.get(BlogPostSearchParams.PARAM_KEY_SEARCH_TERM) || '';
		const tags = this._searchParams.getAll(BlogPostSearchParams.PARAM_KEY_TAGS);
		const previewsOnly = boolFromString(
			this._searchParams.get(BlogPostSearchParams.PARAM_KEY_PREVIEWS_ONLY)
		);

		return { pageNumber: isNaN(pageNumber) ? 1 : pageNumber, searchTerm, tags, previewsOnly };
	}
}
