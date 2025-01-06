---
title: Using Trello Automation for Recurring Goals Tracking
description: Trello has some really great tools available to help you stay on target for your personal and professional goals, especially if you've already broken down your goals into recurring, actionable tasks that you can take to get closer to your objectives.
published: 2024-02-12T01:37:40+0000
updated: 2024-02-12T01:39:17+0000
tags: ['Skills: Soft']
---

I haven't been as goal-oriented as I'd like to be over the past few years, but chose
to make some changes to my approach for 2024. I fumbled around a bit to get a setup
for keeping track of goals in a sane way, but have been using a setup in Trello with
their automation tooling for the past month or so and it has been working well so
I wanted to share it for anyone else trying to get on top of their own recurring
goals.

## How my Trello Board is Set Up

### Columns

I have several "To Do" columns for each recurrence timeframe. In my case, I have
the following columns:

- To Do: Daily
- To Do: Weekly
- To Do: Monthly
- To Do: Bi-Monthly

I also have a "To Do: Annual" column with one-time, big goals for the year, e.g.
"Run in the International 10K." These columns all provide a place for seeing the
current iteration of a goal.

The other two columns in my board are "Done" and "Templates." "Done" is pretty self-explanatory,
once I've finished something, it goes there, regardless of which timeframe it falls
under.

_All_ recurring goals have a template card in the "Templates" column. I'll explain
how I use a combination of the _Card Repeater_ power-up and Trello's built-in Automation
rules to automate placing copies of the templates into the appropriate columns and
setting their due dates.

### Automation

One thing I wanted to keep to a minimum when setting up all this goal tracking was
generating extra overhead devoted to keeping track of things. It would de-incentivize
making progress on goals because I'd loathe having to go in and do a bunch of maintenance
tasks just to get to what I'm really trying to do. Thus, I tried to leverage as much
automation here as possible.

#### Using Card Repeater to Populate To Do Columns

I'll explain how this works using the "Daily" tasks, but the same logic will apply
for any other timeframe. With the _Card Repeater_ power-up enabled, create a card
in the _Templates_ column with the info you want to display for the goal. Do _not_
set a due date on the template card.

Adjust the _Card Repeater_ settings for the card so that it repeats every day at
12:00 AM, or select every week if you want it to repeat on certain days. For example,
my weekly goals will repeat every Monday at 12:00 AM.

Make sure it targets the column, and click save. Now, you have a card that will automatically
show up in the intended column at your selected intervals.

#### Using Automation to Add Due Dates

Trello has some great automation built in. You can have it take care of setting the
due date on new cards that get added into each column. Some example rules I have
in my board:

- when a card is added to list _"To Do: Daily"_ by anyone, set due date _today at
  11:59 pm_
- when a card is added to list _"To Do: Weekly"_ by anyone, set due date the _next
  sunday at 11:59 pm_

I won't delve into the specifics of setting up these rules, as I trust you're capable
enough to manage that.

#### Using Automation to Move Cards to "Done"

This is pretty straightforward, but very nifty. If you've already got automation
that adds the due dates to your recurring cards, you have a checkbox to click that
indicates you've finished the task. If you flag it as complete, it's "Done," right?
So just move it to that column automatically:

- when the due date is marked as complete in a card by anyone, move the card to the top of list "Done"

## Conclusion

Some of the goals I have for 2024 are lofty. Others may have more ambitious goals
than mine, but I'm competing with former Jack Barry and that's it. And for me, this
system of tracking goals has been helping me keep focused as time has gone on - both
providing a target to hit as well as seeing an increasingly larger catalog of "shit
that I got done."

Hopefully this quick outline of my Trello setup can help you, either directly or
by giving you some inspiration to set up your own system for goal tracking and follow-through.
Feel free to reach out to me if this has helped you get more organized or if you
have some tips on how to better leverage the same tools.
