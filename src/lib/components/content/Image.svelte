<script lang="ts">
  interface Props {
    src: string | null | undefined;
    alt: string | null | undefined;
    width?: string | null | undefined;
  }

  let { src, alt, width }: Props = $props();
</script>

<div class="d-flex align-items-center my-3">
  <img class="img-fluid mx-auto" {src} {alt} {width} />
</div>
