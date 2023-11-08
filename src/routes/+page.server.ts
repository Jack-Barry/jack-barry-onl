import { createClient } from '$lib/prismicio';
import '../scss/index.scss';
// import bootstrap stuff as needed here

export const prerender = true;

export async function load({ fetch }) {
	const prismicClient = createClient({ fetch });
	const page = await prismicClient.getSingle('home_page');

	return {
		page
	};
}
