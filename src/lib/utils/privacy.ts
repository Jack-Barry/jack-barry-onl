import { browser } from '$app/environment';
import { checkUserDeletionStatus, deleteUserFromHeapAnalytics } from '$lib/api/client/heap';
import dayjs from 'dayjs';
import {
  LOCAL_STORAGE_KEY_COOKIES_CONSENT,
  LOCAL_STORAGE_KEY_COOKIES_DENY,
  LOCAL_STORAGE_KEY_DELETION_REQUEST_ID
} from './storage/constants';

export function consentToCookieUsage() {
  if (!browser) {
    return;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY_COOKIES_CONSENT, new Date().toISOString());
  localStorage.removeItem(LOCAL_STORAGE_KEY_DELETION_REQUEST_ID);
  localStorage.removeItem(LOCAL_STORAGE_KEY_COOKIES_DENY);
  window.location.reload();
}

export function userPreviouslyConsentedToCookieUsage() {
  if (!browser) {
    return;
  }

  const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY_COOKIES_CONSENT);
  if (!storedValue) {
    return;
  }

  const storedValueAsDayJsValue = dayjs(storedValue);
  if (!storedValueAsDayJsValue.isValid()) {
    return;
  }

  return storedValueAsDayJsValue.toDate();
}

export async function denyCookieUsage() {
  if (!browser) {
    return;
  }

  localStorage.removeItem(LOCAL_STORAGE_KEY_COOKIES_CONSENT);
  localStorage.setItem(LOCAL_STORAGE_KEY_COOKIES_DENY, 'true');
  const response = await deleteUserFromHeapAnalytics();
  if (response?.requestId) {
    localStorage.setItem(LOCAL_STORAGE_KEY_DELETION_REQUEST_ID, response.requestId);
  }
  window.location.reload();
}

export function userPreviouslyDeniedCookieUsage() {
  if (!browser) {
    return true;
  }

  const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY_COOKIES_DENY);
  if (storedValue?.toLowerCase() === 'true') {
    return true;
  }

  return false;
}

export function getTrackingDataDeletionRequestId() {
  if (!browser) {
    return;
  }

  return localStorage.getItem(LOCAL_STORAGE_KEY_DELETION_REQUEST_ID);
}

export async function checkTrackingDataDeletionStatus() {
  const requestId = getTrackingDataDeletionRequestId();
  if (!requestId) {
    return;
  }

  return await checkUserDeletionStatus(requestId);
}
