import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = true;

export async function load({ fetch }) {
	const homePage = await apiPrismic({ fetch }).homePage.get();

	return { homePage };
}
