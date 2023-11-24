import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = true;
export const csr = false;

export async function load({ fetch }) {
	const homePage = await apiPrismic({ fetch }).homePage.get();

	return { homePage };
}
