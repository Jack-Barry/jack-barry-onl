<script module lang="ts">
  import classNames from 'classnames';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  let Modal = writable<typeof import('bootstrap').Modal | undefined>();
  if (browser) {
    import('bootstrap/js/dist/modal').then((module) => {
      Modal.set(module.default);
    });
  }
</script>

<script lang="ts">
  interface Props {
    modalId: string;
    showOnLoad?: boolean;
    dialogClass?: string;
    children?: import('svelte').Snippet;
  }

  let { modalId, showOnLoad = false, dialogClass = '', children }: Props = $props();

  let modalInstance: import('bootstrap').Modal | undefined;
  $effect(() => {
    if (!$Modal) {
      return;
    }

    modalInstance = new $Modal(document.getElementById(modalId) as Element);
    if (showOnLoad) {
      modalInstance.show();
    }
  });

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
      {@render children?.()}
    </div>
  </div>
</div>
