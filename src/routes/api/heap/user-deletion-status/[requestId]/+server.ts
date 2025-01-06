import { HeapApi } from '$lib/api/server/heap.js';

export const prerender = false;

export async function GET({ fetch, params }) {
  const { requestId } = params;
  if (!requestId) {
    return new Response('requestId required', { status: 400 });
  }

  const heapApi = new HeapApi(fetch);
  await heapApi.authorize();
  return await heapApi.getDeletionRequestStatus(requestId);
}
