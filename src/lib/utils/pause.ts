/** Waits for provided number of `ms` before continuing */
export async function pause(ms: number) {
  await new Promise<void>((res) => setTimeout(res, ms));
}
