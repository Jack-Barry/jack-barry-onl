<script lang="ts">
  import CopyrightSvg from 'bootstrap-icons/icons/c-circle.svg?component';
  import DiscordSvg from 'bootstrap-icons/icons/discord.svg?component';
  import GithubSvg from 'bootstrap-icons/icons/github.svg?component';
  import LinkedinSvg from 'bootstrap-icons/icons/linkedin.svg?component';
  import RedditSvg from 'bootstrap-icons/icons/reddit.svg?component';
  import StackOverflowSvg from 'bootstrap-icons/icons/stack-overflow.svg?component';
  import type { Component } from 'svelte';
  import type { SVGAttributes } from 'svelte/elements';

  import { page } from '$app/state';
  import SocialLink from './SocialLink.svelte';

  const socialIcons: {
    Icon: Component<SVGAttributes<SVGSVGElement>>;
    href: string;
  }[] = [
    { Icon: LinkedinSvg, href: 'https://www.linkedin.com/in/jackbarryonl/' },
    { Icon: GithubSvg, href: 'https://github.com/Jack-Barry' },
    { Icon: StackOverflowSvg, href: 'https://stackoverflow.com/users/5072076/jack-barry' },
    { Icon: DiscordSvg, href: 'https://discordapp.com/users/1084591417680199730' },
    { Icon: RedditSvg, href: 'https://www.reddit.com/user/JackBarryOnl' }
  ];
  let isLandingPage = $derived(page.route.id === '/');
</script>

<!-- Padding to account for fixed footer -->
<div class="py-5"></div>
<div class="bg-body shadow vw-100 fixed-bottom" class:pt-4={!isLandingPage}>
  <div class="d-flex flex-column align-items-center gap-1">
    {#if !isLandingPage}
      <!-- <div transition:scale class="mx-3 mx-sm-auto d-flex gap-2 align-items-center"> -->
      <div class="mx-3 mx-sm-auto d-flex gap-2 align-items-center">
        <ul class="list-unstyled d-flex gap-5 mb-0 flex-wrap align-items-center">
          {#each socialIcons as socialIcon (socialIcon.href)}
            <li>
              <SocialLink href={socialIcon.href} Icon={socialIcon.Icon} />
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    <div class="mb-1 d-flex align-items-center fs-fine-print gap-2">
      <div class="d-flex align-items-center">
        <CopyrightSvg transform="scale(0.6)" />
        <span>{new Date().getFullYear()} All rights reserved.</span>
      </div>
      <a href="/privacy-policy">Privacy policy</a>
    </div>
  </div>
</div>
