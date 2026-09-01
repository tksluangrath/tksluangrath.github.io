---
title: "What a Real Forecasting Problem Taught Me"
date: "2026-09-01"
description: "I wrote a policy paper on Northern Virginia's data centers built on other people's numbers. I wanted my own, and a real dataset to actually get good at forecasting on instead of a textbook one. Here's what that taught me."
tags:
  - Machine Learning
  - Engineering
project: "NoVA Data Center Water Forecasting"
projectUrl: "/projects/nova-water-forecasting/"
---

Earlier this year I wrote a policy paper arguing that responsible AI frameworks ignore the land, water, and power grids under a data center, using the Digital Gateway fight in Prince William County as the case. That paper leaned on other people's numbers. I wanted my own, and a real problem to actually get good at forecasting on instead of a clean textbook dataset: how much water does Northern Virginia's data center corridor use, and where is that heading through 2030. A few things stuck with me more than the forecast itself.

## Check what a number actually measures, not just where it comes from

My first instinct was to grab the obvious government dataset and start modeling. Good thing I checked it first: one county's numbers were roughly 2.5 times too high, because that dataset was counting a whole region's water, not what the county itself actually used. The convenient number and the right number aren't always the same one, and that's worth confirming before anything downstream depends on it.

## A model reporting success doesn't mean it found something real

One of my models converged cleanly on every run, no warnings. I only realized it hadn't actually learned anything meaningful when I checked the confidence behind its answer instead of just whether it finished. "It ran without errors" and "it's right" turned out to be two completely different claims, and I'd been treating them as one.

## Publish the failure, not just the part that worked

The forecast itself turned out solid. The uncertainty around it didn't, not by a wide margin. I could have shipped the confident-looking version and let it pass. I labeled it honestly instead, because a forecast that admits what it doesn't know is more useful than one that fakes certainty it hasn't earned.

## A good aggregate score can still be hiding a blind spot

A flag I built scored well overall, but that score turned out to be doing zero work for half of what it was supposed to cover. It looked fine until I split it apart by the thing it was actually meant to distinguish. Now that's a habit: never trust one number for a whole population without checking whether it holds up in the pieces.

## What's next

More real, messy data to test these instincts on again. The lesson I keep relearning is the same one every time: check things myself instead of trusting that a pipeline running clean means it's telling the truth.
