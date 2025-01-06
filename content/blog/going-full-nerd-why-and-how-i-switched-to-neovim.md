---
title: 'Going Full Nerd: Why and How I Switched to Neovim'
description: In an article that nobody asked for, I explain why and how I switched from VS Code to Neovim as my primary text editor and IDE.
published: 2024-06-22T01:04:17+0000
updated: 2024-06-22T13:03:28+0000
tags: ['Development']
---

I recently decided to go full nerd, ditching my preferred IDE of several years, VS
Code, in favor of the terminal-based editor Neovim. 🤓 In this article (where I play
the role of an influencer writing something that nobody asked for and publishing
it for all to see), I'll explain why I made the change. Additionally, I'll share
some insights from my journey, aiming to help others who might be considering a similar
switch avoid some of the pitfalls I encountered.

## Why Bother?

Some engineers are passionate about their tools, while others couldn't care less.
If you're in the latter group, you're probably baffled by my choice to write a whole
gosh darned article about this and you're free to bail out now 🪂. For the former,
you understand the allure of trying shiny new things, but switching tools requires
more than just curiosity. I boiled down my decision to move from VS Code to Neovim
to a few key factors, which I'll elaborate on later in this post:

- Performance and immediate visual feedback
- Version-controlled configuration and customization
- Preference for CLI tools over GUIs
- Vanity: my desire to feel like a wizard 🧙‍♂️

### Performance

I've been using VS Code for a few years now, and it's been... fine 😐. It's free,
widely used and documented. Although configuring it can be painful at times, it has
decent tools for debugging. Basically, I can get my work done with it, even if it's
not my favorite tool in the world. It rubs me a weird way (and not a _good_ weird
way) that it's an Electron app.

As I've progressed in my career, I've desired to spend more time _thinking_ and solving
problems than actually sitting down and slinging the codified solution. To that end,
I want minimal friction between the thoughts flowing from my brain to my fingertips
to the screen in front of me. On more than several occasions while using VSC, I've
noticed a considerable lag between the time I hit a key and the time I see the reaction
I'm anticipating on the screen. It becomes agonizingly frustrating to have to pump
the brakes on a train of thought every few seconds while solving a problem. This
is where VSC began to fall short for me. I wanted the tool to get out of the way
of my ability to think freely, but it was unrelenting.

I presumed that a terminal-based application would likely provide the least amount
of friction and the most portability. I had already been using Vim keybindings in
VSC to navigate in files, so I figured why not give Neovim a try? My rationale is
that it's basically Vim plus all the features of an IDE (that I would need, anyway).
I'll get into it more later in this post, but in short, Neovim is snappy, can be
configured to lazy load plugins just-in-time, and has ultimately been much smoother
for me on the performance front. Aside from getting accustomed to moving around via
keyboard instead of mouse, the amount of friction between my thoughts and their appearance
on my monitor is drastically lower than it was before.

### Configuration and Customization

There's quite a bit of customization available in VS Code, but there are limitations.
For example you can't control _everything_ about how the main window and its panes
are laid out, which version of Node it uses to run plugin tooling, or set different
font sizes for the file explorer vs. the editor window (last I checked). I have a
big second monitor that's my primary window into dev-world, but screen real estate
is still valuable and I like to decide _**exactly**_ what is on my screen and _where_
it should be. In Neovim, the world is your oyster. You can hack away at your config
to your heart's content and lay everything out exactly as you want it. Combine this
with Tmux and your terminal will bend its knee to you.

Moreover, the entirety of your Neovim config can be plopped into a Git repository
that you can take with you everywhere you go. I know, VSC has settings sync, which
is kind of nice. However, I have encountered issues with it occasionally when I'd
move between machines and have some "unsyncable" setting, leading to some frustrating
debugging of my tools. I much prefer saving my settings in a Git repo, complete with
commit messages and code comments explaining why I changed a setting at some point.
I can even have branches of that repo for my personal and work machines.

This config as a repo approach extends beyond Neovim. I like to store my terminal
config, Tmux settings, regular Vim settings, `.zshrc`, `.gitconfig`, you name it!
When I get a new machine, I can get back to the interesting parts of development
within a few hours, instead of piecing together my dev environment by hand for an
entire day.

### CLI > GUI

Even when using VS Code for text editing, there are very few parts of the GUI itself
that I care for. The main selling point for me was the Git diffing and branch visualization,
but I would always drop down into the terminal window to actually make commits and
do rebases and whatnot. It's just so much easier for me to deal with, having amassed
several Git aliases over the years that make routine tasks more pleasant.

_But_, as I delved deeper into terminal tooling, I found [Lazygit](https://github.com/jesseduffield/lazygit)
and [`git-delta`](https://github.com/dandavison/delta), which offer everything I
liked about the GUI experience and more. I can use the command line to interact with
Git, but Lazygit also provides some really nice keyboard shortcuts for pushing, pulling,
rebasing, merging, etc. I don't have to click a mouse to move between my text editor
and a terminal window (I know there's keyboard shortcuts in VSC for moving between
panes too 🤫). In Neovim, I just hit `\gg`, and I'm looking at my Git tools, including
a side-by-side diff of my current changes. I can hit `a` to stage all my current
changes (or space bar to stage specific files), `c` to start writing my commit, then
`Enter` to finalize it. I hit `P` and it's pushed. When I'm done I hit `q` and the
Lazygit window goes away, out of my face. It's not taking up valuable real estate,
yet it's more instantly available to me than Git conveniences ever were in VSC.

It's not just Git though. I recently discovered [Hurl](https://hurl.dev/) after getting
fed up with how _**involved**_ the process of setting up to run Postman was 🥵. I
don't really need a web account to fire off `cURL` requests, but I do like having
a way to store and run them on the fly. Hurl fits this use case nicely - a CLI tool
that allows me to easily store my `cURL` requests, write assertions, and more. As
I edit my `.hurl` files in Neovim I can hit `\hr` to run them and see the result
(with some custom keybindings, of course). The feedback loop is shortened, and I'm
a happy guy!

The list goes on. CLI tools are much easier to fine-tune to your use case than their
GUI equivalents, and for me, this power is worth the lack of a fancy visual interface
with clickable buttons.

### Wizardry

To be completely honest I am a vain person in some regards, in this case my desire
to dazzle my peers with my wizard level mastery of technology.

![Wizard pondering his
orb](../../static/images/blog/going-full-nerd-why-and-how-i-switched-to-neovim/wizard-pondering-orb.jpg)

As much orb pondering as I may do I will never be as in command of tech as most of
my peers, but it's fun to pretend. Using key bindings to move around in text files
and manipulate terminal windows makes me feel more capable as an engineer somehow.
"Fake it 'til you make it," as they say.

## How I Made the Switch

"OK, do you're a dork for a bunch of CLI tools - so am I. But how do you get over
the initial hump without wasting a bunch of time?" you ask.

To which I respond, "I did waste a lot of time getting over that initial hump, but
I'll try to save you some of that by sharing what worked and what didn't."

### Learning Vim and Tmux

These tools have been crucial to my movement away from a GUI based IDE. Vim/Neovim
is what I use for text editing, and Tmux for session/window/pane management. The
combination of these allows me to quickly pop open panes to run various CLI tools
in while working on projects.

I may have had a slight head start here, as I've been using Vim keybindings to move
around in files for years. However, it wasn't until I picked up a copy of [Practical
Vim by Drew Neil](https://www.amazon.com/dp/1680501275) that I began to truly appreciate
how much text-editing power is built into Vim, let alone Neovim. From that book I
learned a ton of new tricks for navigating, making edits, as well as how to leverage
macros, registers and the quickfix list. Admittedly I'm not yet in the habit of using
them every day, but I know I can reach for them when I need some truly awesome raw
power.

At the same time that I picked up Practical Vim, I got a copy of [Tmux 2 by Brian
Hogan](https://www.amazon.com/dp/1680502212). You may not need a book to get all
of this information, but I, for one, digest topics more readily in book format than
when I read a bunch of disparate blog posts and StackOverflow answers. Your mileage
may vary. I'd actually never used Tmux before, but have quickly grown accustomed
to having a different "sessions" that I can quickly move between throughout my day
depending on my current context, e.g. "admin", "dev", "qa", and "experiments." That
way I can quickly get whatever I was working on in one context out of my face without
having to minimize/maximize windows or hunt around for the window I had a file open.
In my "dev" session I can have several windows to move between while working in various
areas of a code base.

Granted, there are alternative tools to Tmux for window/pane management which I'll
touch on later, but I'm sticking with it for now since it fits its niche incredibly
well.

### Neovim Configuration: A Double Edged Sword

Initially, I wanted to have complete control and awareness of my Neovim configuration.
Funny enough, there are projects that come up called "Neovim from Scratch" that will
actually have you use a [starter config](https://github.com/LunarVim/Neovim-from-scratch)
instead of actually building it from scratch 🙃 I tried following some tutorials
on YouTube. Some were helpful and actually explained things, others seemed to be
more style than substance, explaining what to add into the config but not really
explaining _why_.

After trying and bailing on those a few times, I finally threw in the towel and looked
for an out-of-the-box config that might fit my style. I wanted something that would
make it easier to wrangle in all those keybindings! There are several major "starter
configs" out there, I'll cover a few.

- I got a weird vibe from [NvChad](https://nvchad.com/), it seemed like the goal
  there was to make Neovim look and feel like VS Code... why!? From my perspective,
  some of the benefits of Neovim go out the window if it tries to be a clone of VS
  Code.
- [LazyVim](https://www.lazyvim.org/) seemed like the most widespread and well supported,
  focusing more on setting up Neovim to let its strengths shine. So I tried it out
  and I have been pretty happy with it. If you decide to go this route, rest assured
  that their docs are pretty easy to follow.
- There's also [LunarVim](https://www.lunarvim.org/) and [AstroVim](https://astronvim.com/),
  which I didn't know about until after reaching for LazyVim. However, I've read
  some commentary suggesting they may lock you into weird patterns of extending and
  customizing configuration, so I haven't bothered with trying them.

Great, so now I had my Neovim config going, and was able to do a little bit of light
customization to fit my needs.

### Reaching for a More Modern Terminal Emulator

Remember how I was geeking out earlier about how Neovim reduces the "time from thought
to screen?" Well it turns out that we can take this even further by using a more
modern, snappy and responsive terminal emulator. I won't delve too deep here, but
I'd been using [iTerm](https://iterm2.com/) for _years_ without many complaints.
However, while venturing into this weird new world of terminal nerdery, I decided
to give [Kitty](https://sw.kovidgoyal.net/kitty/) a shot. Long story short: it's
a big improvement!

A few things I like about Kitty:

- It's noticeably more responsive than iTerm, likely because it leverages GPU for
  rendering, along with other modern fanciness to reduce rendering bottlenecks.
- It's incredibly easy to get [Nerd Fonts](https://www.nerdfonts.com/) working, and
  they look great. (I'd had some issues and some not-so-great looking font rendering
  happening in iTerm.)
- The entirety of configuration can be saved to a `~/.config/kitty/kitty.conf` file,
  making it version-controllable.
- It runs on macOS _and_ Linux. I'm mostly on macOS, but it's nice to know that if
  I wanted to go deeper down the nerd rabbit hole I could move over to Linux and
  still have muh tools.

As I mentioned before, there are alternatives to Tmux for window and pane management.
Kitty has its own window and pane management tooling baked in, but since I'd already
figured out how to handle these with Tmux I decided to just roll with it. Maybe someday
I'll decide to switch over to Kitty's tools, but for now, it's just one more paradigm
to adopt I didn't have the mental stamina for.

### Bringing it All Together

Here's a synopsis of several key points above along with a few more pointers for
anyone looking to take the plunge into terminal wizardry. If you want to see my configurations
for some ideas, I keep it all in [this repo](https://github.com/Jack-Barry/jb_cfg),
and feel free to reach out with any questions.

1. **Wrap your head around Vim basics first.** You might try plowing through _Practical
   Vim_ like I did, or maybe `vimtutor` will be enough for you. The key is to understand
   the core functionality of Vim before reaching for a bunch of plugins to get other
   things done.
2. **Get yourself a modern terminal emulator and configure it with a Nerd Font that
   you like.** I like [JetBrains Mono](https://www.programmingfonts.org/#jetbrainsmono),
   but to each their own.
3. **Depending on your terminal emulator, you may not need Tmux.** Whichever tool
   you use, get comfortable with the shortcuts for managing windows and panes using
   your keyboard.
4. [**Start storing your config files in a bare Git repo**](https://www.atlassian.com/git/tutorials/dotfiles),
   so that you can take your configs to new machines easily, and can also roll back
   changes if you screw something up.
5. **Try out LazyVim before trying to roll your own config entirely from scratch.**
   They've done a great job of handling a ton of grunt work. Don't be too proud to
   use this and take a peek into the source to understand how they did it.
6. **If using LazyVim, use their `LazyExtras` command to install extras.** I tried
   adding them manually to the Lua config files, but it didn't seem to work as well
   as when just using the `LazyExtras` menu to install things. 🤷🏻‍♂️

## Conclusion

I hope you found my long-winded tale of this journey I've embarked on. I likely spent
more time writing this up than the amount of time I'll ever save based on performance
gains from going all-in on keyboard control of my machine 😛

Jokes aside, with a decent configuration for Neovim and a slick new terminal that
gives me instantaneous feedback for every keystroke, I've enjoyed the ability to
more seamlessly move between projects and manipulate my environment without moving
my hands off the keyboard. I was skeptical that it would make all that much of a
difference, but it's removing a lot of friction in my day-to-day work. It's not just
writing code - I can quickly move between my Tmux sessions for "dev", "admin" and
"QA" work without having to hunt around for windows. The keyboard shortcuts are becoming
more ingrained in muscle memory, so with that hurdle out of the way I feel more in
command of my machine.

If you're Neovim-curious I'd encourage you to give it a shot. Hey, if this smooth-brain
can do it, anyone can!

![Smooth brain Yoda meme](../../static/images/blog/going-full-nerd-why-and-how-i-switched-to-neovim/yoda-smooth-brain.jpg)
