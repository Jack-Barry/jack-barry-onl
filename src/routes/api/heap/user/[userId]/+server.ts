import { HeapApi } from '$lib/api/server/heap.js';

export const prerender = false;

export async function DELETE({ fetch, params }) {
  const { userId } = params;
  const heapApi = new HeapApi(fetch);
  await heapApi.authorize();
  return await heapApi.deleteUser(userId);
}
