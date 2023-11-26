<script context="module">
	// Base script available here: https://developers.heap.io/docs/web#base-installation
	import { browser } from '$app/environment';
	import { PUBLIC_HEAP_ID } from '$env/static/public';
	import { userPreviouslyDeniedCookieUsage } from '$lib/utils/privacy';

	const userAllowsAnalytics = !userPreviouslyDeniedCookieUsage();

	if (browser && !!PUBLIC_HEAP_ID) {
		(window.heap = window.heap || []),
			(heap.load = function (e, t) {
				(window.heap.appid = e), (window.heap.config = t = t || {});
				var r = document.createElement('script');
				(r.type = 'text/javascript'),
					(r.async = !0),
					(r.src = 'https://cdn.heapanalytics.com/js/heap-' + e + '.js');
				var a = document.getElementsByTagName('script')[0];
				a.parentNode.insertBefore(r, a);
				for (
					var n = function (e) {
							return function () {
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
					heap[p[o]] = n(p[o]);
			});

		if (userAllowsAnalytics) {
			heap.load(PUBLIC_HEAP_ID, { secureCookie: true });
		}
	}
</script>
