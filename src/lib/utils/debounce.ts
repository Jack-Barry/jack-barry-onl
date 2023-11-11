import { derived, get, writable, type Writable } from "svelte/store";

export function useDebouncedInput(options: {
  defaultValue?: string, debounceMs?: number
} = {}) {
  const { defaultValue = '', debounceMs = 300 } = options
  const liveInputValue = writable(defaultValue)
  const debounceTimer = writable<NodeJS.Timeout>()
  const debouncedInputValue = derived<Writable<string>, string>(liveInputValue, ($liveInputValue, set) => {
    const timer = get(debounceTimer)
    if (timer) {
      clearTimeout(timer)
    }

    debounceTimer.set(setTimeout(() => {
      set($liveInputValue)
    }, debounceMs))
  })

  return { liveInputValue, debouncedInputValue }
}