---
title: Advice I Wish I'd Started My Dev Journey With
description: Not everyone follows the same path in a career in software development, but some advice is good for anybody getting started
published: 2021-06-04T20:23:39+0000
updated: 2023-11-08T04:37:03+0000
tags: ['Skills: Technical', 'Skills: Soft']
---

## Being an Uber-Technical Person is Not Required

I used to worry that because I'm not super well versed in how to write out algorithms
and data structures from memory that I could not build products with an impact. I
was convinced that the only types of people who could write good software were savants
who can recite sort algorithms by heart and write out any given data structure on
a whiteboard without pause. I'm sure that in FAANG companies or in architect roles
in general that this is perfectly normal and expected behavior, and I'm not trying
to diminish the importance of knowing your stuff. _It's incredibly important to design
algorithms and data structures well suited to the problem being solved_.

The encouragement I'm offering here is that even without a CS degree, and without
being able to formally write out algorithms or data structures off the top of my
head, I've been able to build and contribute meaningfully to products that have a
positive impact in peoples' lives. I've met some genius developers that are incredibly
technically brilliant people, but some can be difficult to work with at times because
of their technically oriented personalities and lack of social awareness. I've worked
with other devs who clearly know their stuff, but are less technical in personality
(that doesn't make them any less brilliant in their technical skills) and as a result
a little easier to get along with. Both types of people have a role in building software
and being part of an outstanding team.

I'd love to learn more about algorithms and data structures as my career progresses
to improve the products I build and take on more lofty challenges, but so far my
lack of formal training in those areas has not held me back from growing professionally
as a dev. Anytime I've needed to come up with a solution to a problem, I've been
able to do it and even been able to eek more performance out of old projects when
I realized where I'd make errors in judgment in the initial design. Aside from that,
most languages have pretty solid algorithms built-in for the most commonly encountered
problems like sorting and filtering, and data structures/models generally become
apparent based on the problem being solved.

The takeaway: _**Don't worry if you're not an uber-technical person, as long as you
can build things well and work with the best interests of your team in mind then
you're golden**_.

## There are no Silver Bullets/Panaceas

When you're first getting started, you want to make a good choice on things like
what language to learn, which tech stack to get familiar with and which tools to
use. You want to find something that will be useful for anything you're asked to
build, and will guarantee you job placement. The thing is - _you'll never get around
the fact that specific tools have been built around accomplishing specific tasks_.
You'll need to make these choices personal.

If you're interested in building things, you're much more likely to stick with learning
how to build software through the not-so-pleasant parts. Thus, I'd recommend against
_starting_ from the question of "What's hot in tech right now?" The real question
you need to answer is "What kind of things do I want to build?" Once you've answered
that honestly for yourself, you'll have a much easier time selecting a language and
frameworks that are geared toward building things you're interested in building.
For example, I have grown to love JavaScript/TypeScript over the years because I
primarily enjoy working on OS-agnostic web-based products. If I wanted to build console
games or work on embedded systems then my JS/TS skills wouldn't really equip me to
do that. If I decided to jump into a different area of products I'd be happy to learn
a new language, but when you're first starting out I'd recommend finding one or two
languages to focus on so you're able to start building more complex products and
get beyond mere tutorial following.

A caveat here is that if you're trying to get your foot in the door at your first
dev job, you should use tools that are widely adopted in your selected realm of interest.
For example, maybe you want to build user interfaces. I enjoy building web-based
user interfaces with Vue and prefer it over React, but if I were trying to get my
first job I'd probably focus more on learning React since it's more marketable.

The takeaway: _**There is no quintessentially "right" tool to get started with, only
the right tool(s) for the job you are trying to accomplish**_.

## Verbosity is Cheaper Than You Think

Engineers tend to be terse and to the point. There's not much gain from beating around
the bush, so doing things quickly and efficiently is just how we generally like to
operate. When I first started writing code, I thought this meant that minimalistic
variable names would be a carryover of this terseness, because some of the tutorials
I followed had short, non-descriptive variable names (sometimes just one letter).
However, as time has gone on, I've learned that having more descriptive variable
names (within reason) has been a boon to my ability to revisit old code and understand
what the purpose of a value is. In most cases, the compiled/transpiled code is going
to be minified or compressed in a way that obfuscates your variable names anyway.

It's beautiful that we live in a time where so much information is freely available
to learn how to write code, but the other side of that sword is that there are a
lot of people out there writing up tutorials that will teach people who are new to
development bad practices and habits. So _don't always take a tutorial as an example
of how to write clean, testable and maintainable code_. You'll have to learn that
from months and years of making mistakes and hating your former self for writing
gobbledygook that current you can't quickly interpret.

The takeaway: _**Treat your variable names as they are intended to be used - as code
words for values that will be read and understood by humans**_.

## Coding is Easy

![Confusion intensifies]()

Yes, that's right, I said it. Writing code is, at its heart, playing with Legos.
If you're just starting out, it can seem like learning a new language and building
things with it is incredibly hard, so I'm not trying to be discouraging here. What
I am trying to convey though is this: _an engineer or an architect role requires
a whole different level of understanding of software than mere coding/development
work entails_.

The truly hard parts about writing software are designing and architecting it. I
used to wonder why senior devs and engineers/architects seemed so nonchalant about
learning new programming languages. To me it seemed like a huge undertaking, when
I was just struggling to do some hello-worlding in any language at all. Here's the
thing: if you learn the fundamentals of what makes the difference between high quality
software and unmaintainable spaghetti code, then you'll be better equipped to build
things regardless of language or tooling. If you learn the basic principles of building
scaleable systems and data models, you can use that understanding for anything you
build. That is why senior devs, engineers and architects tend to take home progressively
thicker slices of bacon.

Once you've built enough things and are familiar with how variable assignment/usage,
loops, logic gates, etc. work, you can easily pick up on how those things are expressed
in any given coding language (especially considering [most modern languages share
a common ancestor: C++](http://rigaux.org/language-study/diagram-light.png)). In
some niche cases, you may need to have in depth understanding of a language to know
about more performant approaches to a problem, but for a lot of the things you build
the limiting factor is going to be how well designed your algorithm or data structure
is, which isn't entirely dependent on the language used.

Here's a couple of books I strongly recommend for any developer who would like to
write better code and understand working with data on a deeper level:

- [Clean Architecture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/B08X8H5G2J/ref=sr_1_1?crid=6HHKKFEIPNWA&dchild=1&keywords=clean+architecture&qid=1622836689&sprefix=clean+arch%2Caps%2C188&sr=8-1)
  by Robert C. Martin AKA Uncle Bob
- [Designing Data-Intensive Applications](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/B08VL1BLHB/ref=sr_1_1?crid=2ZKUTCB98MREW&dchild=1&keywords=designing+data-intensive+applications&qid=1622836714&s=audible&sprefix=designing+data%2Caudible%2C170&sr=1-1)
  by Martin Kleppman

The takeaway: _**It's more important to learn fundamental principles of writing quality
software and working with data than it is to learn about every nook and cranny of
a programming language**_.

## In Conclusion

As somewhat of an amalgamation of all the points above, I'd like to close with the
encouragement to any new devs that _**if you are a curious person who likes to build
things and solve complex problems, and you are open to continually learning new skills
and tools, you'll be able to get your foot in the door at some point and start taking
on even more responsibilities in that arena**_.

Now go get 'em 🤘
