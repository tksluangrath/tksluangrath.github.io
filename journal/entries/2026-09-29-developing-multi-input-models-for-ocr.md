---
noteId: "15980240bd4611f1a2a35fbe37f0b34d"
tags:
  - "Career"
title: "Developing Multi-Input Models for OCR"
date: "2026-09-29"
description: "I finished DataCamp's Developing Multi-Input Models for OCR project, building a PyTorch model that classifies scanned insurance IDs as primary or secondary."

---

I finished DataCamp's [Developing Multi-Input Models for OCR](https://www.datacamp.com/) project, the hands-on follow-up to [Intermediate Deep Learning with PyTorch](/journal/intermediate-deep-learning-with-pytorch/).

The premise: a fictional insurance company digitizing old claim documents needs its scanned IDs sorted into primary or secondary. The model gets two inputs at once, the scanned image and the insurance type (home, life, auto, health, other), runs each through its own small network, then combines them to make the call. I wrote the model class, picked the optimizer and loss function, and trained the whole thing.

The exercises in the course felt separate from each other while I was doing them. Putting it all into one working model made them click as a sequence instead of a pile of disconnected steps.
