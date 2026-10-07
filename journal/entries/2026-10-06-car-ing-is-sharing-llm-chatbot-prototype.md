---
title: "Car-ing is Sharing LLM Chatbot Prototype"
date: "2026-10-06"
description: "A DataCamp project I did after Introduction to LLMs in Python: prototyping a car dealership chatbot that runs five tasks with pre-trained Hugging Face models."
tags:
  - Career
  - LLM
---

After [Introduction to LLMs in Python](/journal/introduction-to-llms-in-python/) I did a DataCamp project called Car-ing is Sharing, where I played the AI developer for a car sales and rental company that wanted a chatbot prototype. It had to take text and handle a few tasks using pre-trained Hugging Face models.

## What I built

All five tasks ran on a small set of car reviews, one Hugging Face `pipeline` each:

- Sentiment classification with DistilBERT
- Translation of the first two sentences of a review into Spanish with a Helsinki-NLP model
- Question answering with MiniLM ("What did he like about the brand?")
- Summarization of the last review with BART

## How it did

I used the evaluation metrics from the course to score it. Sentiment classification got 80% accuracy and an F1 of 0.86 on five reviews, which is a tiny sample. The translation scored a BLEU of 0.78 against a reference. The question answering pulled "ride quality, reliability" out of the review. The summary read fine, though it was cut off mid-sentence because I capped it at 55 tokens.

## What I took from it

Each task was only a few lines once I picked the right model, so most of the work was choosing one and checking its output instead of trusting it. It was also the first time I used the metrics from the course on something I built myself.
