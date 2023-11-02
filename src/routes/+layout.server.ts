export const prerender = 'auto';

export const load = async (args) => {
	const { pathname } = args.url;

	return {
		pathname
	};
};
