import '../scss/index.scss';
// import bootstrap stuff as needed here
import { createClient } from '$lib/prismicio';

export const prerender = true;

export async function load() {
	const client = createClient();

	const page = await client.getSingle('home_page');

	return {
		page
	};
}
