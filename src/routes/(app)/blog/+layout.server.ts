export const prerender = false;

export async function load({ parent }) {
  const { breadcrumbs } = await parent();

  return {
    breadcrumbs: [...breadcrumbs, { label: 'Blog', href: '/blog' }]
  };
}
