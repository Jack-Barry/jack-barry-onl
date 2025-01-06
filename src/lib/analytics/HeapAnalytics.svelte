<script module lang="ts">
  /* eslint-disable */
  // Base script available here: https://developers.heap.io/docs/web#base-installation
  import { browser } from '$app/environment';
  import { PUBLIC_HEAP_ID } from '$env/static/public';
  import { userPreviouslyDeniedCookieUsage } from '$lib/utils/privacy';

  const userAllowsAnalytics = !userPreviouslyDeniedCookieUsage();

  if (browser && !!PUBLIC_HEAP_ID) {
    // @ts-expect-error
    (window.heap = window.heap || []),
      // @ts-expect-error
      (heap.load = function (e, t) {
        // @ts-expect-error
        (window.heap.appid = e), (window.heap.config = t = t || {});
        var r = document.createElement('script');
        (r.type = 'text/javascript'),
          (r.async = !0),
          (r.src = 'https://cdn.heapanalytics.com/js/heap-' + e + '.js');
        var a = document.getElementsByTagName('script')[0];
        // @ts-expect-error
        a.parentNode.insertBefore(r, a);
        for (
          // @ts-expect-error
          var n = function (e) {
              return function () {
                // @ts-expect-error
                heap.push([e].concat(Array.prototype.slice.call(arguments, 0)));
              };
            },
            p = [
              'addEventProperties',
              'addUserProperties',
              'clearEventProperties',
              'identify',
              'resetIdentity',
              'removeEventProperty',
              'setEventProperties',
              'track',
              'unsetEventProperty'
            ],
            o = 0;
          o < p.length;
          o++
        )
          // @ts-expect-error
          heap[p[o]] = n(p[o]);
      });

    if (userAllowsAnalytics) {
      // @ts-expect-error
      heap.load(PUBLIC_HEAP_ID, { secureCookie: true });
    }
  }
</script>
