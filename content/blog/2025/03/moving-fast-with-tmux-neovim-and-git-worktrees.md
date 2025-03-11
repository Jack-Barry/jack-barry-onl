---
title: 'Moving Fast with Tmux, Neovim and Git Worktrees'
description: ''
published: 2025-03-08T01:30:00+0000
tags: []
---

A colleague of mine recently asked "How do you work so fast?" and while I was
flattered, I mostly just fumbled out an answer about how I'm comfortable with my
tools. I did feel like it would be helpful to explain some of the method to my
madness though. While the tools certainly help, there are also some thought
patterns that I feel help me switch between contexts more fluidly.

## Make Friends with Shell Scripting

I am not anti-GUI, but I am also not a fan of visually clicking around to get
something done _if_ that task can be automated. I keep a lot of stuff in my
`.zshrc`, which I track in a Git repo so that if my machine ever goes kaput I
don't lose all those goodies. It's the little things, like aliases to `cd` into
directories that I frequently use, or functions to safely clean up Git worktrees
that I no longer need, that make my terminal a comfortable place to work.

On that note, [Lazygit](https://github.com/jesseduffield/lazygit) is a wonderful
CLI that streamlines common Git operations, which I can't recommend enough. A
nifty feature is that you can wire up custom scripts in there, for example, I
have mine set up to prompt me for a ticket number any time I create a new Git
worktree. I haven't gotten around to it, but there's probably a way to have it
open up something like `commitizen` to help you format your commits. It makes
things like rebasing, cherry picking, rewording commits, etc. a breeze.

Sometimes a combination of GUI and scripting is ideal, like having a menu option
in macOS Finder to be able to decompress objects pulled down from S3 before
opening them locally. This way I can just open my Downloads folder and right
click to run a script against the targeted file, then open the transformed file
it generates in the same folder vs. diving into a terminal every time I want to
do that.

## Leverage Git Worktrees

Where I currently work, we wear a few hats. At any given time, I might be
working on a couple of tickets doing development work, performing QA on others,
or writing up new ones that require some investigation into current code. For
any given ticket, there may be several repositories that require changes to
implement a given feature completely, so it's common to be juggling several pull
requests for one ticket.

See, I used to do a lot of Git stashing, e.g.:

1. Work on something, get interrupted
2. `git add -a`
3. `git stash`
4. Switch to another branch
5. Install dependencies
6. Do the work in this context
7. Rinse lather repeat

However, this does not lend itself nicely to juggling several different repos in
the context of a single ticket against those same repos for other tickets.
[Git worktrees](https://git-scm.com/docs/git-worktree) to the rescue! The basic
idea as far as I understand it is that you create a worktree as a separate
directory on your machine, instead of having all of your branches live in the
same directory.

How I leverage this pattern is I start by creating a new directory for each
ticket I work on. Within the ticket directory, I'll create worktrees for each
relevant repository. Then, anytime I'm working on something related to a
specific ticket, I go to that directory and do all of my work in there. This
means that I can have multiple versions of the project one `cd` away, and don't
have to keep reinstalling dependencies every time I'm switching gears.

Of course this doesn't come for free. Once I'm done with a ticket, there's some
cleanup to do to remove worktrees. One way to do it would be to just blunt force
trauma them and `rm -rf` the ticket directory. I don't do this though, because I
want Git tooling to know when I've removed the worktree and no longer need the
branch associated with it. So I have some helpers written up to do all that for
me.

I get a productivity bonus from using Tmux and Neovim with this workflow,
because I can have a named Tmux session open, something like
`dev-ticket-123-new-shiny-feature` or `qa-ticket-321-some-bug-fix`. In that
session I can have several windows open into various repositories within the
ticket directory. With `tmux-continuum` for persistence of my Tmux sessions and
`persistence.nvim` baked into my Neovim config, if I have to reboot my machine I
can restore the state of a session and even of a given repo within that session
effortlessly. I keep some long-running "notes" and "alarm investigation"
sessions open at all times, and have various other ticket-based ephemeral
sessions open depending on what I'm working on. All that a context switch
requires for me is to shift over to one of my existing sessions.

## Configure the Hell Out of Your IDE

My choice of words here is very intentional - remove the _hell_ of development
work by configuring your IDE and becoming comfortable with how to let it do what
it's good at. If I haven't made it perfectly clear already, I hate friction when
trying to do my work. Regardless of if you're using VS Code or JetBrains or are
a Neovim masochist like me, it pays off to get used to the shortcuts that your
IDE provides. Navigating quickly to definitions, being able to find references
to a given variable, renaming variables, etc. are all the kinds of things pretty
much every IDE is gonna have a keyboard shortcut for or at least you can use
some kind of contextual dropdown menu to do this. If the global text-based
search is your way of finding things, it's time to make more use of what the IDE
is for.

It doesn't stop at coding either, most IDEs also have debugging utilities that
allow you to step through code, keep track of state of variables, and more. If
your only tool for debugging is to log things to console, it's going to severely
limit your ability to rapidly work through writing up code and corresponding
unit tests.

## Delegate to an AI When it Makes Sense To

Lastly, if you've got something like GitHub Copilot available, it can help
handle some of the "code monkey" tasks for you, so delegate that kind of thing
to it! It's generally pretty good at providing some decent autocompletion that
you can tweak after the fact vs. writing _everything_ from scratch. Sometimes
pulling it up to ask questions like "how do I do XYZ in _this_ language?" can
give you a boost. For example, I am not a bash/zsh wizard, but usually know the
_logic_ I'm trying to implement, so this a big part of how I get my shell
scripts and helper functions written up.

## Conclusion

I've spent a lot of time thinking about how to remove as much friction as
possible between my thoughts and what's on screen. I've tried my best to pick
tools that get out of the way and let me _get shit done_. Hopefully some of what
I've written here will help you on your developer's journey. Cheers.
