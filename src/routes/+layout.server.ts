import { IS_TEST } from '$env/static/private';

export const prerender = true;

export const load = async () => {
  const isTestEnv = IS_TEST.toLowerCase() === 'true';

  return {
    isTestEnv
  };
};
