import { allCookies, expireCookie } from '$lib/utils/cookies';

type Cookies = Record<string, string>;

/**
 * Issues request to delete a user using Heap API, then removes corresponding cookies
 *   and reloads browser to shut off the analytics script
 */
export async function deleteUserFromHeapAnalytics(): Promise<{ requestId: string } | void> {
	const cookies = allCookies();
	const userId = getUserId(cookies);
	let response;
	if (userId) {
		response = await (await fetch(`/api/heap/user/${userId}`, { method: 'DELETE' })).json();
	}
	removeHeapCookies(cookies);
	return response;
}

/** Issues request to check user deletion status */
export async function checkUserDeletionStatus(
	requestId: string
): Promise<{ status: string } | void> {
	return await (await fetch(`/api/heap/user-deletion-status/${requestId}`)).json();
}

function getUserId(cookies: Cookies) {
	return getUserIdCookieId(cookies)?.split('.').at(-1);
}

function removeHeapCookies(cookies: Cookies) {
	const cookieForUserId = getUserIdCookieId(cookies);
	const cookieForSession = getSessionCookieId(cookies);
	const replayCookieIds = getReplayCookieIds(cookies);

	if (cookieForUserId) {
		expireCookie(cookieForUserId);
	}

	if (cookieForSession) {
		expireCookie(cookieForSession);
	}

	replayCookieIds.forEach((id) => {
		expireCookie(id);
	});
}

function getUserIdCookieId(cookies: Cookies) {
	return Object.keys(cookies).find((k) => k.startsWith('_hp2_id.'));
}

function getSessionCookieId(cookies: Cookies) {
	return Object.keys(cookies).find((k) => k.startsWith('_hp2_ses_props.'));
}

function getReplayCookieIds(cookies: Cookies) {
	return Object.keys(cookies).filter((k) => k.startsWith('userty.core.'));
}
