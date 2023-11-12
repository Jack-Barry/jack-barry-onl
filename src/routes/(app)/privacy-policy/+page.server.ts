import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = true;

export async function load({ url, fetch, parent }) {
  const privacyPolicy = await apiPrismic({ fetch }).privacyPolicy.get()

  const { breadcrumbs } = await parent()
  return {
    breadcrumbs: [
      ...breadcrumbs,
      { label: 'Privacy Policy', href: url.pathname }
    ],
    privacyPolicy
  };
}

