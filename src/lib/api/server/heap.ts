import { HEAP_API_KEY, HEAP_APP_ID } from '$env/static/private';
import type { RequestEvent } from '../../../routes/$types';

const BASIC_AUTH_HEADERS = {
  Authorization: 'Basic  ' + Buffer.from(`${HEAP_APP_ID}:${HEAP_API_KEY}`).toString('base64')
};

export class HeapApi {
  private _token: string;

  constructor(private _fetch: RequestEvent['fetch']) {
    this._token = '';
  }

  private get _requestHeaders() {
    return {
      Authorization: `Bearer ${this._token}`,
      'Content-Type': 'Application/json'
    };
  }

  async authorize() {
    // TODO: Skip authorize if token is still valid
    const authResponse = await this._fetch('https://heapanalytics.com/api/public/v0/auth_token', {
      headers: BASIC_AUTH_HEADERS,
      method: 'POST'
    });
    const authResponseJson = await authResponse.json();
    this._token = authResponseJson.access_token;
  }

  async deleteUser(userId: string) {
    const deletionRequestResponse = await (
      await fetch('https://heapanalytics.com/api/public/v0/user_deletion', {
        headers: this._requestHeaders,
        method: 'POST',
        body: JSON.stringify({
          users: [{ user_id: userId }]
        })
      })
    ).json();
    return new Response(
      JSON.stringify({ requestId: deletionRequestResponse.deletion_request_id }),
      { status: 200 }
    );
  }

  async getDeletionRequestStatus(requestId: string) {
    const statusResponse = await (
      await fetch('https://heapanalytics.com/api/public/v0/deletion_status/' + requestId, {
        headers: this._requestHeaders
      })
    ).json();
    return new Response(JSON.stringify({ status: statusResponse.status }), { status: 200 });
  }
}
