import { apiPrismic } from '$lib/api/server/prismic.js'

export const prerender = true

export const load = async ({ fetch }) => {
  const privacyPolicy = await apiPrismic({ fetch }).privacyPolicy.get()

  return { privacyPolicy }
}