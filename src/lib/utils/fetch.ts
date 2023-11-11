import type { PageLoadEvent } from '../../routes/$types';

export async function fetchJson(
	customFetch: PageLoadEvent['fetch'],
	...args: Parameters<typeof customFetch>
) {
	const response = await customFetch(...args);
	return await response.json();
}
