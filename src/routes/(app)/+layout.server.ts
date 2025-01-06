export const prerender = true;

export const load = async () => {
  return { breadcrumbs: [{ label: 'Home', href: '/home' }] };
};
