import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/svelte/kit';
import type { CreateClientConfig } from '@prismicio/svelte/kit';
import { PRISMIC_ACCESS_TOKEN } from '$env/static/private';
import config from '../../slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig['routes'] = [
	// Examples:
	// {
	// 	type: "homepage",
	// 	path: "/",
	// },
	// {
	// 	type: 'blog_post',
	// 	path: '/blog/:uid'
	// }
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = ({ cookies, ...config }: CreateClientConfig = {}) => {
	const client = prismic.createClient(repositoryName, {
		accessToken: PRISMIC_ACCESS_TOKEN,
		routes,
		...config
	});

	enableAutoPreviews({ client, cookies });

	return client;
};
