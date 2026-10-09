---
title: "MLOps Concepts"
date: "2026-10-09"
description: "I finished DataCamp's MLOps Concepts course. Not every ML system needs full automation, and the maturity levels help you pick how much."
tags:
  - Career
  - Machine Learning
---

I finished DataCamp's [MLOps Concepts](https://www.datacamp.com/) course, next after [Working with Llama 3](/journal/working-with-llama-3/) on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.

![MLOps Concepts course completion badge](/assets/img/datacamp_mlops_concepts_badge.png)

My biggest takeaway is that not everything needs automation. With so much talk about AI and automating everything, I assumed every MLOps setup should aim for level 3. Level 1 or level 2 can be the right call, depending on how complex the task is and what you want out of it.

## The lifecycle

The course split an ML project into design, development, deployment, and monitoring, and covered which roles own each phase. In design and development, the work starts with the business requirement and a key metric. Data quality gets checked next, and experiments get tracked so results can be reproduced.

## Deployment

This chapter covered runtime environments and containerization, then serving a model as a microservice behind an API. It finished with CI/CD pipelines and the different ways to roll a model out.

## Monitoring and maturity

Models degrade after they ship, so monitoring catches drift and retraining is the response. The maturity levels describe how much of that is automated. A higher level means more to build and more to maintain, so you want the level that fits the project.

My own [LoL Matchbook](/projects/lol-matchbook/) is a good example. It's a desktop app for one person, and its advice comes from a precomputed table that a background job refreshes. A full automated retraining and CI/CD pipeline would be a lot of machinery for that, and the lower levels are enough.

## What's next

More of the track.
