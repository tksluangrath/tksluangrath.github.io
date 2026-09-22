---
title: "Jev and the Case for Structured, Confident Outputs"
date: "2026-09-22"
description: "TypeSafe AI's Jev skips free-text generation for structured values with calibrated confidence scores. I want to see how it handles something with clear right and wrong moves: chess."
tags:
  - LLM
---

I ran into [TypeSafe AI's post introducing System One models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) this week and I'm still turning it over. The pitch: skip free-text generation, which can hallucinate, and have the model output a structured value with a calibrated confidence score attached. Their founder put the gap in plain terms: models have been "superhuman at chat for years," so where's all the automation? I think that's a fair question. A model that's great in a chat window isn't automatically useful glued into a pipeline.

## Structured output beats a generated string

A normal LLM call in an agentic pipeline still hands you back a string, and you're trusting the model got the format, the types, and the facts right. Jev instead returns a structured value that can't have a type error, because of how it's built, plus a confidence score that's actually calibrated: higher confidence means higher accuracy, not the overconfident guessing most LLMs do. For anything gating a decision in a pipeline, that beats parsing JSON and hoping for the best.

## RLCD instead of RLHF or RLVR

What makes this work is the training. Most LLMs today are tuned with RLHF, human preference, or RLVR, verified rewards on tasks with a checkable answer. TypeSafe is using something they call Reinforcement Learning for Calibrated Decisions, optimizing directly for honest probabilities instead of what a rater or reward model happens to like. You're not training the model to give answers people approve of. You're training it to know how sure it should be.

## Why this matters outside of chat

The numbers are what make this feel practical instead of academic: 70-500ms end to end versus 3 to 329 seconds for frontier models on comparable tasks, and output tokens cheap enough to be free. If that holds up under real use, a calibrated structured decision at that speed and cost is a genuinely different tool than a chat completion. Useful anywhere you need a fast, trustworthy decision instead of a paragraph.

## What's next

I've been watching people try Jev out this week, and I want to test it on something with a real right and wrong answer instead of something subjective. Chess seems like the move: legal moves, a clear evaluation, no arguing about whether the model was right. I want to see what a structured, confidence-scored model actually does when a move is either legal or it isn't.
