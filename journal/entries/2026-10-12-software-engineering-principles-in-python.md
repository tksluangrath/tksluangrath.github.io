---
title: "Software Engineering Principles in Python"
date: "2026-10-12"
description: "I finished DataCamp's Software Engineering Principles in Python course. Without a traditional computer science background, these fundamentals fill a real gap, and MLOps builds on them."
tags:
  - Career
  - Engineering
---

I finished DataCamp's [Software Engineering Principles in Python](https://www.datacamp.com/) course, next after [MLOps Concepts](/journal/mlops-concepts/) on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.

![Software Engineering Principles in Python course completion badge](/assets/img/datacamp_software_engineering_python_badge.png)

I don't come from a traditional computer science background, so learning the fundamentals of software development mattered to me. This course teaches them. Paired with MLOps, they're what I need to build models that are ready for production.

## Style and packages

The course opened with PEP 8, Python's style conventions, and `pycodestyle` to check my code against them. After that came how packages work, installing one with `pip`, and reading its documentation.

## Writing my own package

The main project was a Python package for text analytics. I learned the minimum a package needs and how to name it. Adding a `requirements.txt` and a `setup.py` made it portable, so someone else can install it the way they'd install NumPy or pandas.

## Classes and inheritance

The package grew through classes. I wrote a class with non-public methods, then used inheritance to build child and grandchild classes instead of copying code. That's the DRY principle: don't repeat yourself.

## Maintainability

The last chapter was about keeping the package usable later: docstrings, readable names, and refactoring for readability. It also covered unit tests with `doctest` and `pytest`, and documenting classes for Sphinx.

## What's next

More of the track.
