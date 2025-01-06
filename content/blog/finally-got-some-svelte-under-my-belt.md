---
title: Finally Got Some Svelte Under My Belt
description: After working with Vue and React the past several years, I finally got to try out Svelte and SvelteKit while rewriting my personal site. Svelte is a really nice framework and I look forward to using it for more projects in the future.
published: 2023-12-07T02:35:42+0000
updated: 2023-12-07T02:35:42+0000
tags: ['Skills: Technical', 'Language: JavaScript', 'Frameworks: Svelte']
---

It's been quite a journey from the first iteration of my blog to where it is today.
When I was a younger and more naive developer, I bet on Vue primarily because I didn't
want to support one of my least favorite megacorps, job prospects be damned. I eventually
succumbed to the pressures of tooling inadequacy, trading in my "stick it to the
man" ethos for a more pragmatic "I don't like the company behind it but the tools
are nice" approach using React and NextJS. Alas, React still never quite sat right
with me. I grew restless. I heard murmurings of "Svelte" and the siren's song of
developers living on the edge, crafting their web apps with this strange new framework
and gushing over how refreshing it was to work with after having lived through the
past several years of new-framework-every-month hell.

Over the past year or so I have also been on a quest to conquer monorepo tooling,
which has been an exercise in futility for me personally. Though the tools show a
lot of promise, a constant churn of updates every day and shifts in paradigms constantly
sweeping me off my feet have led me to abandon my grandiose dreams of "one repo to
rule them all" and return to a simpler time, a time when one repo did its job well
for a few months before being abandoned and forgotten about, rather than never getting
off the ground at all while I fight to get the tools and configs all just so.

The convergence of these two paths brought me to the current iteration of my blog
realized in all the compile-time glory of Svelte and SvelteKit. I must say, I now
understand all the aforementioned gushing over it and I've come to appreciate several
aspects of this framework.

## No Virtual DOM

The absence of a virtual DOM in Svelte seemed merely to be an implementation detail
of the framework to me, something that would have no implications for my simple app,
before I got my hands dirty with it. Unlike other frameworks that build a full duplicate
representation of the DOM as a way to reduce unnecessary updates to the actual DOM
on re-renders, Svelte _directly manipulates it_. This unique approach allows for
the seamless integration of existing libraries without the need for framework-specific
dependencies, which is incredibly refreshing. For example, I plopped Bootstrap into
this project without any extra framework dependencies to make it play nice, even
with some of the Bootstrap JS being utilized for modals and such.

## Compile Time Benefits

As I've progressed as a developer, I've come to appreciate the take I once shrugged
off from a much more experienced engineer with whom my initial interaction went something
like:

_"Hey, nice to meet you! I work mostly in Node and JavaScript."
"I don't like JavaScript, uncompiled languages are too slow," he said contemptuously.
"Uuuuhhhhh, I'm so new to this I don't really even know what that means..."_

That last bit I thought to myself so as not to look like a complete dumbass to this
new mentor. However, as time has gone on, I've come around to appreciating his point
of view. Since then, I've become a huge advocate for TypeScript over JavaScript to
at least have _some_ amount of "compile time" checking in the wild wild west of web
dev. I also started learning a big boy language (Rust) and hot damn is it nice to
have a compiled language in the ol' toolbelt.

All that to say, I've at a point in my career where I value Svelte's "compile time"
approach to app development. Unlike frameworks with the virtual DOM where updates
are heavily dealt with while the app runs, Svelte transforms components into intelligent
code upfront that will efficiently update the real DOM at runtime.

## New Challenges and Opportunities

Vue has Nuxt. React has Next. Svelte has SvelteKit. They all offer some variety of
the server side rendering and/or static site generation, folder based routing, and
more. Maybe partly due to lack of experience, I found these concepts very hard to
fully grasp in my time with Nuxt and Next. It was always fuzzy to me where the server
side of the app ended and the client side began. I'd heard the hip new buzzword "hydration"
thrown around but didn't really understand it. Thanks to SvelteKit's excellent documentation
and their straightforward approach to setting up routes, I get it now.

![Frank from It's Always Sunny in Philadelphia saying "Oh my God, I Get It"](../../static/images/blog/finally-got-some-svelte-under-my-belt/oh-my-god-i-get-it.gif)

As far as I understand it, "hydration" is a flowery way of saying "serve prerendered
content to the client, then _hydrate_ the app by attaching event listeners in the
browser." For every route in a SvelteKit app, you can have one or more of several
types of files (read [their docs](https://kit.svelte.dev/docs/routing) for more complete
info, the following is just a succinct recap)...

### `+layout`

This code is used for all routes nested inside of the folder it lives in. The `+layout.server.ts`
file will only run on the server, whereas `+layout.ts` runs on the server during
prerendering and also on the client as part of hydration. The `+layout.svelte` file
is used to provide the markup used for the UI which can be shared across several
routes.

### `+page`

This code is used for a specific page. Similar to layout, `+page.server.ts` only
runs server-side, whereas `+page.ts` runs server side as well as part of hydration.
The `+page.svelte` file is used to provide markup for this page.

And that's pretty much it, aside from some folder name convention trickery. Dead
simple. It's intuitive when the contents of a given file will run and what purpose
they serve. I can finally wrap my head around what belongs server side in a `+layout.server.ts`
or `+page.server.ts` file (e.g. custom endpoints for fetching data from a third party
API using an API key that should never make its way to the browser) vs. what needs
to be in a `+layout.ts` or `+page.ts` file for the client side/hydratable part of
the app (e.g. initializing a [TanStack query](https://tanstack.com/query/latest/docs/svelte/overview)
context).

## Conclusion

Rebuilding my personal site with Svelte and SvelteKit has made me a fanboy. This
nifty framework's unique features, compile-time advantages, and clarity in development
have made the process enjoyable while also broadening my understanding of web app
development in general.
