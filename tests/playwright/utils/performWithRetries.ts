import { pause } from '../../../src/lib/utils/pause';

/**
 * Performs an action with retries until it succeeds or maximum allowed retries
 *   have been exhausted
 */
export async function performWithRetries<T = void>(
	/** Function to invoke */
	fn: () => T | Promise<T>,
	options: {
		/** Max amount of times to retry `fn` */
		maxRetries?: number;
		/** Time to pause between retries */
		pauseMs?: number;
		/** String to print to console in front of errors that trigger a retry */
		warningPrefix?: string;
	} = {}
): Promise<T> {
	const { warningPrefix = 'performWithRetries errors', maxRetries = 3, pauseMs = 0 } = options;
	let retries = 0;
	let response: T | undefined;
	let hasPerformed = false;

	while (!hasPerformed) {
		try {
			response = await fn();
			hasPerformed = true;
		} catch (e) {
			if (retries >= maxRetries) {
				throw e;
			}

			console.warn(warningPrefix, e);
			retries++;
			await pause(pauseMs);
		}
	}

	return response as T;
}
