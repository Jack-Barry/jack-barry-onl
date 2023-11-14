<script context="module" lang="ts">
	import classNames from 'classnames';
	import { browser } from '$app/environment';

	let Modal = writable<typeof import('bootstrap').Modal | undefined>();
	if (browser) {
		import('bootstrap/js/dist/modal').then((module) => {
			Modal.set(module.default);
		});
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let modalId: string;
	export let showOnLoad: boolean = false;
	export let dialogClass: string = '';

	let modalInstance: import('bootstrap').Modal | undefined;
	$: if ($Modal) {
		modalInstance = new $Modal(document.getElementById(modalId) as Element);
		if (modalInstance && showOnLoad) {
			modalInstance.show();
		}
	}

	export function hideModal() {
		if (modalInstance) {
			modalInstance.hide();
		}
	}

	export function toggleModal() {
		if (modalInstance) {
			modalInstance.toggle();
		}
	}
</script>

<div id={modalId} class="modal fade" tabindex="-1">
	<div class={classNames('modal-dialog', dialogClass)}>
		<div class="modal-content">
			<slot />
		</div>
	</div>
</div>
