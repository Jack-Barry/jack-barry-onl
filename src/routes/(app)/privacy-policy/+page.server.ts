export const prerender = true;

export async function load({ url, parent }) {

  const { breadcrumbs, privacyPolicy } = await parent()
  return {
    breadcrumbs: [
      ...breadcrumbs,
      { label: 'Privacy Policy', href: url.pathname }
    ],
    privacyPolicy
  };
}

