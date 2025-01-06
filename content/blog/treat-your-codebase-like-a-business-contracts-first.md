---
title: 'Treat Your Codebase Like a Business: Contracts First!'
description: It's very tempting to jump into a project and start coding right away, but ultimately your project, tests, and sanity will benefit from establishing application logic and contracts up front.
published: 2020-03-19T15:59:24+0000
updated: 2023-11-08T04:37:38+0000
---

## The Problem

Often times when jumping into a new project, I'm so giddy to be building something
and excited to write the code that I let that all-too-familiar thought take over:
"I don't need to plan this out too much, it's just a simple little module." 🙄

After about a week of building, it starts to become evident that the lack of planning
is not panning out so well - functions need more information to do their thing than
anticipated, object shapes are changing with almost every line of code added, and
those tests are pretty much useless because they're breaking and need changing too.
🥵

## A Solution

A good way to avoid this whole nightmarish scenario is to treat your codebase like
a business. What I mean by this: in the business world, companies don't start work
on projects until the contracts and expectations have all been cleared up and agreed
to. In your project, those contracts and expectations are your object shapes and
application logic. In the business world this means that companies don't waste time
and resources on projects that provide no fruit, and in your project this means you
don't waste time adding functions or objects that will be of little benefit as the
project grows and transforms.

## The Process

Here's the process that I'm starting to use when building out new projects. It's
not dogmatic, but hopefully you will find these suggestions helpful when jumping
into your next project, however large or small.

### Hammer Out the Application Logic

One of the biggest mistakes you can make when coding is not having a **clear** understanding
of _what_ you are building. First and foremost, think through the problem you are
trying to solve. Ultimately an application is always an algorithm of some sort -
a piece of software that will accept various inputs and provide outputs accordingly.
As much as possible, break down in human readable terms what inputs your application
will need and what the outputs will be. Avoid the urge to "plan that simple part
out later," and ensure that everyone on the team understands the architecture choices
as a whole.

### Plan and Write Your Types and Interfaces

Once you understand the application logic and have more concrete expectations for
your inputs and outputs, you can write up some "contracts." If you're using a strongly
typed language, you're at a huge advantage here. (If you're not using a strongly
typed language, _then freaking use one_! 🤬 Jokes aside, you may find it useful to
write template objects at this point if you are not using a strongly typed language.)

As you walk through the process of writing up your types and interfaces, function
types, etc. you will inevitably find some places where your architecture and object
shape choices need some adjustments. _That's a great thing_. 🙌🏼 This translates
to our business world analogy: if you write up a contract that won't work for the
parties involved, you can just revise it until it does satisfy everyone's needs.
Similarly in your codebase, if you write up these contracts first and realize something's
just not going to work then you can revise it before writing the actual code. 📝➡️🧑‍💻

Rinse, lather, repeat. Keep iterating over your minimum viable product contracts
until they make sense and will allow your application to do its thing. 🚀

### Use Your Established Application Logic and Contracts for TDD

At this point, you get to jump into building your project and know what each piece
of it needs to accomplish. Knowing these things up front makes writing your unit
tests much more effective because you will be writing tests against the application
logic's needs and won't fall into the trap of just writing tests that prove your
function does what you wrote it to do regardless of whether or not it provides value
to the project as a whole.

### Bonus Points: Analyze Your Codebase Frequently

As you embark on building your project, you're going to find places where functions
get long and messy and hard to read. With good solid unit tests in place, you'll
be able to refactor your monolithic functions into more focused ones and also be
able to subdivide huge files into a more sane directory structure. 📂

## Final Thoughts

This approach is helpful for establishing a solid codebase that doesn't implement
a bunch of dead code, and for saving you time in the long run for projects that need
to be maintained by yourself and others. Treating your codebase like a business allows
you to work more efficiently and effectively, and get that cash money.

![Kenny Powers saying "Dollar dollar bills y'all"](../../static/images/blog/treat-your-codebase-like-a-business-contracts-first/dollar-dollar-bills-yall.gif)
