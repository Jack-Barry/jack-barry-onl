<script lang="ts">
	import RedditSvg from 'bootstrap-icons/icons/reddit.svg?component';
	import DiscordSvg from 'bootstrap-icons/icons/discord.svg?component';
	import GithubSvg from 'bootstrap-icons/icons/github.svg?component';
	import LinkedinSvg from 'bootstrap-icons/icons/linkedin.svg?component';
	import CopyrightSvg from 'bootstrap-icons/icons/c-circle.svg?component';
	import SocialLink from './SocialLink.svelte';

	let socialIcons = [
		{ Icon: LinkedinSvg, href: 'https://www.linkedin.com/in/jackbarryonl/' },
		{ Icon: GithubSvg, href: 'https://github.com/Jack-Barry' },
		{ Icon: DiscordSvg, href: 'https://discordapp.com/users/1084591417680199730' },
		{ Icon: RedditSvg, href: 'https://www.reddit.com/user/JackBarryOnl' }
	];
</script>

<!-- Padding to account for fixed footer -->
<div class="py-5" />
<div class="pt-4 bg-body shadow vw-100 fixed-bottom">
	<div class="d-flex flex-column align-items-center gap-1">
		<div class="mx-auto">
			<ul class="list-unstyled d-flex gap-5 mb-0">
				{#each socialIcons as socialIcon}
					<li>
						<SocialLink href={socialIcon.href} Icon={socialIcon.Icon} />
					</li>
				{/each}
			</ul>
		</div>
		<div class="mb-1 d-flex align-items-center" style="font-size:0.6rem;">
			<CopyrightSvg transform="scale(0.6)" />
			<span>{new Date().getFullYear()} All rights reserved.</span>
		</div>
	</div>
</div>
