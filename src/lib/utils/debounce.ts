import { derived, get, writable, type Writable } from 'svelte/store';

/**
 * Provides a writable `liveInputValue` that can be bound to an input, along with
 *   a `debouncedInputValue` that can be used for network requests and such
 */
export function useDebouncedInput(
	options: {
		defaultValue?: string | null;
		debounceMs?: number;
	} = {}
) {
	const { defaultValue, debounceMs = 300 } = options;

	const liveInputValue = writable<string>(defaultValue || '');
	const debounceTimer = writable<NodeJS.Timeout>();
	const debouncedInputValue = derived<Writable<string>, string>(
		liveInputValue,
		($liveInputValue, set) => {
			const timer = get(debounceTimer);
			if (timer) {
				clearTimeout(timer);
			}

			debounceTimer.set(
				setTimeout(() => {
					set($liveInputValue);
				}, debounceMs)
			);
		}
	);

	return { liveInputValue, debouncedInputValue: debouncedInputValue || '' };
}
