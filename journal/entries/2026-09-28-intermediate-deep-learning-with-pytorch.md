---
noteId: "52e92ed0bd4611f1a2a35fbe37f0b34d"
tags:
  - "Career"
title: "Intermediate Deep Learning with PyTorch"
date: "2026-09-28"
description: "I finished DataCamp's Intermediate Deep Learning with PyTorch course, moving past the fundamentals into CNNs, RNNs, and multi-input models."

---

I finished DataCamp's [Intermediate Deep Learning with PyTorch](https://www.datacamp.com/) course, the follow-up to [Introduction to Deep Learning with PyTorch](/journal/introduction-to-deep-learning-with-pytorch/).

![Intermediate Deep Learning with PyTorch course completion badge](/assets/img/datacamp_intermediate_pytorch_badge.png)

The intro course was tensors, layers, a training loop, the basics. This one adds convolutional networks for images, recurrent networks for sequences like time series or text, and models that take more than one input or spit out more than one output.

## Training stability, the part I used to gloss over

What stuck with me most was how much training stability depends on choices I used to skip past. Getting a model to run is easy. Getting it to train well, without the gradients blowing up or fading out on you, is not. I didn't expect something as small as which activation function you pick, or how you initialize the weights, to swing the outcome this much.

## A good CNN refresher

The convolutional network section was mostly review for me, but a useful one. Walking back through how a conv layer slides over an image, what pooling actually throws away, and why that structure beats a plain fully connected layer on image data, it was worth going through again.

## RNNs, LSTMs, and GRUs: when to use which

The recurrent section was newer territory. A plain RNN keeps a hidden state that carries information from one step in a sequence to the next, but that state degrades over longer sequences, it tends to forget what happened many steps back. LSTMs fix that with a separate cell state and a set of gates that decide what to keep, what to drop, and what to update, at the cost of more parameters and slower training. GRUs land in between: fewer gates than an LSTM, cheaper to train, close enough in accuracy for a lot of problems. The practical takeaway was less about the math and more about the tradeoff: reach for a GRU first if you want something lighter, reach for an LSTM when the sequence is long and the dependencies are harder to capture.

## Multiple inputs, multiple outputs

The last stretch covered models that don't fit the one-input-one-output shape I was used to. A multi-input model, like running an image through one branch and a category label through another before combining them, lets you fuse signals from different sources into a single prediction. A multi-output model does the reverse: one model, several predictions at once, which raises the question of how to weigh each output's loss against the others so the model doesn't neglect one in favor of the rest. I'll end up using multi-input models the most, since so many real-world problems come with more than one kind of input sitting right there.

Still a few courses left on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track. More on those soon.
