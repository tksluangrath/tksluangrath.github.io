---
title: "Working with Llama 3"
date: "2026-10-07"
description: "I finished DataCamp's Working with Llama 3 course. Controlling model output through parameters, roles, and prompt structure is what finally clicked."
tags:
  - Career
  - LLM
---

I finished DataCamp's [Working with Llama 3](https://www.datacamp.com/) course, next after [Introduction to LLMs in Python](/journal/introduction-to-llms-in-python/) on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.

![Working with Llama 3 course completion badge](/assets/img/datacamp_working_with_llama_3_badge.png)

The part I got the most clarity on is controlling model output, and what goes into an effective prompt. Before this I treated a response as whatever the model happened to give me. The course showed me where I can change it.

## Running Llama locally

The course used `llama-cpp-python` to run Llama 3 on my own machine, send it a chat, and pull the text out of the response object. Calling it locally made it feel like a function I could tune.

## Controlling the output

Parameters like temperature change how predictable or creative the response is, so the same model can handle customer support answers and creative copy with different settings. Chat roles split a conversation into system, user, and assistant messages. The system message sets the model's behavior before the user says anything, and a multi-turn conversation works by passing the whole message history back in each time.

## What goes into a prompt

Structure mattered as much as the parameters. Llama expects its prompt in a particular format, and few-shot prompting, where you include a few worked examples, got me the answer format I wanted more reliably than instructions alone.

## Structured output

The last chapter was getting JSON back instead of free text, first by asking for it and then by specifying a JSON schema, so the response can go straight into an automated workflow. I also built a conversational class that keeps its own history, for both single-turn and multi-turn chats. I'd call that the point where the model became something I could build on.

## What's next

More of the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.
