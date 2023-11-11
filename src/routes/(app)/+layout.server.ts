import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = true;

export const load = async ({ fetch }) => {
	const allTags = await apiPrismic({ fetch }).tags.get();

	return { allTags };
};
