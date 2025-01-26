<script lang="ts">
  import JbLogoSvg from '$lib/assets/jb-logo.svg?raw';
  const decodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(JbLogoSvg)}`;
  console.log({ decodedSvg });

  interface Props {
    title: string | undefined;
    subtitle: string | undefined;
  }

  let { title, subtitle }: Props = $props();
</script>

<div class="wrapper">
  <div class="text-section">
    <h1>{title}</h1>
    {#if subtitle}
      <hr />
      <h2>{subtitle}</h2>
    {/if}
  </div>
  <div class="logo-wrapper">
    <img class="logo" alt="Logo SVG" src={decodedSvg} />
  </div>
</div>

<style lang="scss">
  .wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: 4vw;
    background: rgb(255, 255, 255);
    background: linear-gradient(315deg, rgba(245, 249, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .text-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h1 {
      text-align: center;
      font-size: 64px;
    }

    h2 {
      text-align: center;
      font-size: 54px;
    }

    hr {
      width: 80vw;
      margin: 1vh;
      border: 2px solid hsl(22, 55%, 20%);
      opacity: 1;
    }
  }

  .logo-wrapper {
    display: flex;
    justify-content: center;
  }

  .logo {
    height: 16vh;
    width: 39.375vh;
  }
</style>
