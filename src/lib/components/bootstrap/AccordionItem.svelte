<script module lang="ts">
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  let Collapse = writable<typeof import('bootstrap').Collapse | undefined>();
  if (browser) {
    import('bootstrap/js/dist/collapse').then((module) => {
      Collapse.set(module.default);
    });
  }
</script>

<script lang="ts">
  interface Props {
    parentId: string;
    id: string;
    title: string;
    bodyClass?: string;
    children?: import('svelte').Snippet;
  }

  let { parentId, id, title, bodyClass = '', children }: Props = $props();
</script>

<div class="accordion-item">
  <h2 class="accordion-header">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#{id}"
      aria-expanded="false"
      aria-controls={id}
    >
      {title}
    </button>
  </h2>
  <div {id} class="accordion-collapse collapse" data-bs-parent="#{parentId}">
    <div class:accordion-body={true} class={bodyClass}>
      {@render children?.()}
    </div>
  </div>
</div>
