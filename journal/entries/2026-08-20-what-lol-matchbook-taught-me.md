---
title: "What Building LoL Matchbook Taught Me"
date: "2026-08-20"
description: "Two weeks building a League of Legends app that gives instant matchup advice before your pick timer runs out, and what verifying my own work the hard way taught me."
tags:
  - LLM
  - Engineering
  - Side Project
project: "LoL Matchbook"
projectUrl: "/projects/lol-matchbook/"
---

I spent the last two weeks building LoL Matchbook, an app for League of Legends players that watches who you're about to play against and instantly gives you advice for that matchup, before the 30-second pick timer even runs out. It's the first project I've built truly start to finish: I had to figure out how to pull live data out of the game itself, then carry that all the way through to something a player actually sees on screen in time to be useful.

## The clock was the whole problem

Thirty seconds isn't long. If the app had to think up an answer in the moment, a player would still be staring at a loading spinner when the timer ran out. So I generate the advice ahead of time, for every matchup that actually comes up a lot, and just store the answers so the app can look one up instantly. The catch was scale. There are thousands of possible matchups, and generating advice for all of them up front would have taken months of computer time. The fix wasn't a faster computer, it was giving up on covering everything. Common matchups get pre-generated. Rare ones get filled in quietly in the background, the first time someone actually asks.

## Teaching a small model to know what it doesn't know

Part of this project uses a small AI model I trained myself, to answer the follow-up questions that can't be prepared ahead of time the way matchup advice can. Before I trained anything, I ran a few candidate models through the same test questions to see which one was even worth building on. Training it turned out to be the easy part. Testing it honestly was harder. It's simple enough to check whether a model gives correct answers. What's easy to miss is whether it knows when to say "I don't have good data for this" instead of just making something up with confidence. I built my tests around that specifically, plus one more thing: whether the training had quietly made the model worse at everything else while it got better at League of Legends.

The lesson that actually stuck with me was smaller than any of that, though. A training run reporting a lower error number doesn't prove the model learned anything. I only believed it once I'd directly compared the trained model against the original and could see something had really changed. Before this project I would have taken the training log at its word. Not anymore.

## Verify, don't assume

The habit that mattered most across the whole project was tracing problems back to their real cause instead of patching around them. More than once, something meant only for training snuck into the version meant to run for real users, and the fix came from tracing where it leaked in, not from hiding the symptom. Same with claims like "the packaged app works" or "this installs cleanly on Windows." I only believed those once I'd tried them myself, not because they sounded reasonable. That habit is the part of this project worth keeping, more than any specific tool I used to build it.

## What's next

Now I want to actually use it. I'm curious whether having this running next to real games changes how I play, or just confirms what I already know I do.
