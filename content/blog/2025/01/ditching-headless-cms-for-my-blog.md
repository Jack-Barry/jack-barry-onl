---
title: 'Ditching Headless CMS for My Blog'
description: "I once believed that a headless CMS for my measly little blog was a good idea. I no longer do, and am glad I devolved things a bit back to good ol' plaintext Markdown files as the storage option for my content."
published: 2025-01-27T01:30:00+0000
tags: []
---

## Why Headless CMS to Begin With?

Several years ago when I set up my personal site, I opted to use a headless CMS
to store my content with the intention of keeping the content separate from the
presentation layer. This _seemed_ like a good idea at the time, but has since
turned out to be a big blocker on my desire to write new posts. It doesn't
matter which provider I went with, I think I'd have had similar pain points with
that setup eventually regardless.

## Challenges I Faced

Part of the problem was that in order to retrieve and present the content, I was
beholden to the platform's API and its changes. If they ever dropped support for
the way I was using my data, I'd have to scramble to update my code to accommodate
it, even if I hadn't published a new article in ages.

Another pain was the requirement to map certain content types to specific front-end
framework components meant that if I wanted to add a one-off little widget that would
easily be achieved with some inline HTML, I'd have to add that content type on the
platform, then create a component that would present it the way I wanted. Not to
mention that in order to preview an article, I'd have to not only be publishing drafts
on the platform via their tools, but would also have to either spin up a local special
instance of my site pointed at the drafts version of my content or even worse deploy
a new preview instance of the site to see how it's gonna look. 😑

This was not ideal for my site to be a platform for writing, and all that friction
was really starting to bum me out.

## What's Changed Since Then

In the years since I initially set things up this way, I've become a bigger fan
of simpler, yet more powerful tools. For instance, a while back [I made the
switch from VS Code to Neovim](https://jack.barry.onl/blog/going-full-nerd-why-and-how-i-switched-to-neovim).
I've also become much more fluent with Markdown to write docs and notes,
including the excellent [Obsidian](https://obsidian.md/) app, with bonus points that
I can easily edit those notes from the comfort of my terminal with Neovim. 🤓

With so much more fluid capabilities when I'm in my zone in Neovim, it's easier
to write and let ideas flow freely to a plaintext file than to be hung up on
trying to get my ideas and presentation to fit inside of the confines of a CMS
platform's constructs.

## What I Ended Up With

My new blog setup is not perfect or anything, but I really like it. There were
a couple of things I wanted (and got), which I'll expand upon a bit here.

I wanted to keep using [Svelte Kit](https://svelte.dev/docs/kit/introduction). I
have grown to really like Svelte, and still wanted to use it to build the
presentation layer for my site, vs. completely restarting with something like
[11ty](https://www.11ty.dev/). Ideally I just wanted to port all of my content
off of the CMS platform and into Markdown files, but still keep everything else
mostly the same.

I also wanted to be able to write plain Markdown files that I can preview without
spinning up a full blown dev server. The [`markdown-preview.nvim`](https://github.com/iamcco/markdown-preview.nvim)
plugin helps here. One slight hiccup here was how to get the paths to images in
the Markdown to work, but with some help from the [`remark`](https://github.com/remarkjs/remark)
and [`rehype`](https://github.com/rehypejs/rehype) tool set, I was able to easily
whip up a utility to rewrite the URLs at build time so that the generated app uses
correct paths. This utility just gets added to the processing chain with `.use`:

```typescript
/**
 * Allows for having local filesystem URLs in Markdown so that I can preview
 * those without spinning up full-blown SvelteKit app. This plugin just
 * rewrites the URLs so that the built app knows where to pull them from
 */
function replaceLocalImageUrls() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== 'element') {
        return;
      }

      if (node.tagName !== 'img') {
        return;
      }

      const localUrl = node.properties.src as string;
      const buildUrl = localUrl.replace(/^(\.\.\/)+static/, '');
      node.properties.src = buildUrl;
    });
  };
}
```

That's just one of many ways that this set of tools allows for taking complete
control of how Markdown gets rendered as HTML in the output. Having this level
of control is really nice - I can set things up exactly how I want to minimize
friction as I experience it.

There's still some things that I'd like to build out, like search, sort,
filtering and whatnot. For now it's a little overkill, I've got like 20-30ish
posts at the moment. But now that I've got a more streamlined way to write, that
number of articles will hopefully begin to grow. The nice thing is, I don't need
to get too fancy because there's no crazy SLAs I'm on the hook for with my
personal site. Likely what I'll end up with is just some scripts that compile
some JSON indices or maybe even a binary format that can be paired with something
like [Fuse](https://www.fusejs.io/) for fuzzy search and that'll be plenty.

## Conclusion

Not much to say here, this post is mostly just me taking advantage of the new
ease with which I can write. It was so much easier to do the editing in Neovim
than in a web WYSIWYG style interface. 🙂
