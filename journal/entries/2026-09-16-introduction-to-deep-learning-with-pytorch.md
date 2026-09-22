---
title: "Introduction to Deep Learning with PyTorch"
date: "2026-09-16"
description: "I finished DataCamp's Introduction to Deep Learning with PyTorch course, a refresher on the neural network fundamentals I first learned in grad school."
tags:
  - Career
---

I finished DataCamp's [Introduction to Deep Learning with PyTorch](https://www.datacamp.com/) course. I first learned the basics of deep learning and PyTorch during my Master's program: tensors, linear layers, activation functions, backpropagation. This course was a chance to go through those fundamentals again from scratch, exercise by exercise, instead of only seeing them inside a larger class project.

![Introduction to Deep Learning with PyTorch course completion badge](/assets/img/datacamp_pytorch_badge.png)

## Rebuilding a neural network from tensors up

The course starts with PyTorch tensors and works up through linear layers, activation functions, and loss functions before getting to a full training loop. None of it was new to me, but walking through it in order, one layer at a time, reinforced how the pieces fit together: why a hidden layer needs weights and biases, why ReLU exists to avoid vanishing gradients, why cross-entropy is the right loss for classification instead of MSE.

## The training loop is where the theory becomes real

Writing the training loop, forward pass, loss calculation, backward pass, optimizer step, was the most useful part of the refresher. In grad school I understood gradient descent conceptually. Typing out `loss.backward()` and `optimizer.step()` by hand, and watching a model's loss actually drop over epochs, made the mechanics concrete again in a way that reading about it doesn't.

## What's next

This course extends the track I started with [Supervised Learning with scikit-learn](/journal/refreshing-supervised-learning-with-scikit-learn/) and [Unsupervised Learning in Python](/journal/practicing-unsupervised-learning-in-python/), moving me further along DataCamp's [Associate AI Engineer for Data Scientists](https://app.datacamp.com/learn/career-tracks/associate-ai-engineer-for-data-scientists) track.
