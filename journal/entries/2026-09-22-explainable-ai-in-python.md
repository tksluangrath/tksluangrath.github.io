---
title: "Explainable AI in Python"
date: "2026-09-22"
description: "I finished DataCamp's Explainable AI in Python course, working through SHAP, LIME, and permutation importance to pry open models that don't explain themselves."
tags:
  - Career
---

I finished DataCamp's [Explainable AI in Python](https://www.datacamp.com/) course, next after [Unsupervised Learning in Python](/journal/practicing-unsupervised-learning-in-python/) and [Introduction to Deep Learning with PyTorch](/journal/introduction-to-deep-learning-with-pytorch/) on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.

![Explainable AI in Python course completion badge](/assets/img/datacamp_explainable_ai_badge.png)

## Why bother with this one

A decision tree will tell you why it made a call. You can trace the exact splits. An LLM won't. It's a black box: millions of parameters spit out an answer with nothing telling you how it got there. That's fine when nothing's riding on it. It stops being fine once these models start deciding things like hiring, lending, or medical triage, and somebody has to be able to explain the call. This course was about the tools for prying that open.

## Model-specific vs. model-agnostic

Explainability splits into two camps. Model-specific methods lean on the structure of the model itself: feature importance from a random forest, coefficients from a linear model. Model-agnostic methods, SHAP and LIME, don't care what's inside. They poke the model from the outside, perturb an input, watch how the output moves, and attribute the change to specific features. The agnostic tools are the ones worth actually learning. They work the same whether you're staring at a random forest or a neural net.

## Local beats global, most of the time

The other split that stuck with me was global versus local. Global explainability asks what the model cares about overall. Local asks why it made this one prediction, for this one input. SHAP and LIME are both built for the local question, showing which features pushed a single prediction up or down, whether you're working with tables, text, or images. In production, local is almost always the question that matters. Nobody's asking "what does this model generally care about." They're asking "why did it flag this specific loan application."

## Explaining generative models

The last section pointed the same instinct at chat-based generative AI: chain-of-thought to surface a model's reasoning, self-consistency checks to gauge how confident an answer actually is. Calibrated confidence keeps showing up for me this week, in this course and in what I read about [Jev's approach to it](/journal/jev-and-the-case-for-structured-confident-outputs/).

## What's next

More of the track. Explainability is easy to skip until a stakeholder asks you to justify a model's output, and then it's the only thing that matters.
