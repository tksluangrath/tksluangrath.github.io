---
title: "Introduction to Testing in Python"
date: "2026-10-14"
description: "I finished DataCamp's Introduction to Testing in Python course, the last one on the Associate AI Engineer for Data Scientists track. It covered pytest, fixtures, four types of tests, and unittest."
tags:
  - Career
  - Engineering
---

I finished DataCamp's [Introduction to Testing in Python](https://www.datacamp.com/) course, next after [Introduction to Git](/journal/introduction-to-git/) and the last one on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.

![Introduction to Testing in Python course completion badge](/assets/img/datacamp_intro_testing_python_badge.png)

It follows [Software Engineering Principles in Python](/journal/software-engineering-principles-in-python/), which introduced `pytest` and `doctest` at the end of its maintainability chapter. This course goes much deeper. It also connects to [MLOps Concepts](/journal/mlops-concepts/), since tests are how you check that a program or data pipeline works before it goes to production.

## Writing tests with pytest

I wrote my first test suite and used `pytest.raises` to check that code fails the right way. I ran tests from the command line, including by keyword. Markers handled the awkward cases: `xfail` for a test that is expected to fail, and conditional skips for tests that shouldn't run everywhere.

## Fixtures

A fixture holds the setup a test needs, like prepared data, so each test doesn't repeat it. I used `@pytest.fixture`, chained fixtures so one builds on another, and set some to run automatically with `autouse`. Teardowns clean up after a test finishes.

## Four types of tests

The course separated unit, feature, integration, and performance tests. A unit test covers one small piece, like a factorial function. A feature test covers a whole feature, like an aggregation with `sum`. Integration tests check that parts work together, as in reading a file, and performance tests time things like finding an element or looping over a list.

## unittest

The last chapter covered the same ideas in `unittest`: assertion methods, the command-line interface, and fixtures. It ended with practical examples, including testing an energy data pipeline.

## What's next

That was the last course on the track.
