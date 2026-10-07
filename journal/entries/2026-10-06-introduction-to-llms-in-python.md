---
title: "Introduction to LLMs in Python"
date: "2026-10-06"
description: "I finished DataCamp's Introduction to LLMs in Python course. LLMs come with real challenges, and evaluation matters because model performance can make or break production."
tags:
  - Career
  - LLM
---

I finished DataCamp's [Introduction to LLMs in Python](https://www.datacamp.com/) course, next after [Responsible AI Data Management](/journal/responsible-ai-data-management/) on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.

![Introduction to LLMs in Python course completion badge](/assets/img/datacamp_intro_llms_python_badge.png)

What I'm taking away is how many challenges come with using an LLM. Evaluation is how you find them before production does, and in production model performance can play a big part in whether the thing works at all.

## The lifecycle and the fine-tuning plan

An LLM starts with pre-training, which produces a foundation model. Fine-tune that foundation model and you get the fine-tuned model. The fine-tuning itself followed one plan every time: set the training plan, build the trainer, train, check the loss, predict, save.

## Two ways to fine-tune

Full fine-tuning updates every weight in the model. Partial fine-tuning updates only some of them. The course also covered transfer learning, which reuses what a model already learned for a new task, and n-shot learning, where you show the model a few examples (or one, or none) instead of retraining it.

## Evaluation

This was the chapter I got the most out of. The Hugging Face `evaluate` library had a metric for each kind of task: perplexity for how well a model predicts text, BLEU and METEOR for translation, ROUGE for summaries, and exact match (EM) for questions with one right answer. A different metric tells you something different about the same model, so picking one is part of the evaluation.

The course also covered safeguarding. Toxicity checks whether a model produces harmful text, and regard checks whether it talks about different groups with different sentiment. Both tie back to the bias work in [Responsible AI Data Management](/journal/responsible-ai-data-management/). A model can score fine on BLEU or ROUGE and still say things you wouldn't want to ship.

## What's next

[Working with Llama 3](/journal/working-with-llama-3/).
