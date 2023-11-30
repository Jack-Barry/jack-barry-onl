import { browser } from '$app/environment';
import { goto } from '$app/navigation';

/**
 * Applies `next` search params to browser URL if they do not match what's already
 *   there
 */
export async function applyParamsToUrl(next: URLSearchParams) {
	if (browser) {
		await goto('?' + next.toString());
	}
}

function paramsAreEqual(paramsA: URLSearchParams, paramsB: URLSearchParams) {
	const paramsAEntries = Array.from(paramsA.entries());
	const paramsBEntries = Array.from(paramsB.entries());

	console.log(JSON.stringify({ paramsAEntries, paramsBEntries }));

	if (paramsAEntries.length !== paramsBEntries.length) {
		return false;
	}

	for (const [paramAKey, paramAValue] of paramsAEntries) {
		const hasMatchInB = paramsBEntries.some(
			([paramBKey, paramBValue]) => paramAKey === paramBKey && paramAValue === paramBValue
		);

		if (!hasMatchInB) {
			return false;
		}
	}

	return true;
}
