---
title: "Practicing Unsupervised Learning in Python"
date: "2026-09-12"
description: "Second stop on the way to DataCamp's Associate AI Engineer track: clustering, hierarchical clustering, PCA, and NMF, with no labels to check my work against."
tags:
  - Machine Learning
  - Career
---

I finished DataCamp's [Unsupervised Learning in Python](https://www.datacamp.com/) course, the second course on the way to the [Associate AI Engineer for Data Scientists](/journal/practicing-supervised-learning-with-scikit-learn/) track. Clustering, hierarchical clustering, PCA, and NMF were all familiar ground from grad school. Working through them again in scikit-learn, exercise by exercise, was the point.

![Unsupervised Learning in Python course completion badge](/assets/img/datacamp_unsupervised_learning_badge.png)

## There's no label to check yourself against

Supervised learning has an answer key, the labels tell you when you're wrong. Clustering doesn't. You pick k, look at the result, and ask whether it's actually meaningful or just k points scattered by an algorithm that will always produce k of something. That's a different kind of judgment call than anything in the supervised course, and it's the part I paid the most attention to this time around.

## PCA and NMF do different things with the same-sounding goal

Both reduce dimensions. PCA rotates the data toward directions of maximum variance, and the resulting components can come out negative and hard to read as anything real. NMF keeps everything non-negative, so the pieces it finds add up like actual parts, topics in a document, components in an image. Redoing the exercises side by side made the difference land in a way it hadn't just from reading about it.

## What's next

More of this track. Supervised and unsupervised learning were the two courses I'd already touched in grad school, so they went fast. What comes after is likely to be less familiar.
