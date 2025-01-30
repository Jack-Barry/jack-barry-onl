export const prerender = true;

export async function load({ parent }) {
  const { breadcrumbs } = await parent();

  return {
    breadcrumbs: [...breadcrumbs, { label: 'Projects', href: '/projects' }]
  };
}
