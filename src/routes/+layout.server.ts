import { IS_TEST } from '$env/static/private';
import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = true;

export const load = async ({ fetch }) => {
	const isTestEnv = IS_TEST.toLowerCase() === 'true';
	const privacyPolicy = await apiPrismic({ fetch }).privacyPolicy.get();

	return {
		isTestEnv,
		privacyPolicy
	};
};
