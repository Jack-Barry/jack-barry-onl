import { fetchJson as fetchJsonGeneric } from '$lib/utils/fetch';

export async function fetchJson(...args: Parameters<typeof fetch>) {
	return await fetchJsonGeneric(fetch, ...args);
}
