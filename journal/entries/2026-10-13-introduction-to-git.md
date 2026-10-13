---
title: "Introduction to Git"
date: "2026-10-13"
description: "I finished DataCamp's Introduction to Git course: creating repos, staging and committing, reading a project's history, and undoing mistakes."
tags:
  - Career
  - Engineering
---

I finished DataCamp's [Introduction to Git](https://www.datacamp.com/) course, next after [Software Engineering Principles in Python](/journal/software-engineering-principles-in-python/) on the [Associate AI Engineer for Data Scientists](/journal/practicing-unsupervised-learning-in-python/) track.

![Introduction to Git course completion badge](/assets/img/datacamp_intro_git_badge.png)

I already use Git for this site and my other projects. The course gave me the underlying model. Mistakes also stop being scary once you know how to undo them.

## Repos and commits

The course started in the shell with a check of the Git version, then created repos, both from scratch and by converting an existing project. Saving work takes two steps: add a file to the staging area, then commit it.

## How Git stores things

Git stores a project as blobs (file contents), trees (folders), and commits. That's why you can compare the project at two points in time and see what changed, who changed it, and when.

## Reading the history

I learned to look back through a repo's history. That includes the full log, the history of one file, and commits filtered by date, plus a way to limit the view when the log gets long. `git diff` compares versions, including staged files and the second most recent commit.

## Undoing changes

The last part covered unstaging a file and reverting a commit. If I can go back to an earlier state, I can try things in a project without worrying about breaking it.

## What's next

One more course left on the Associate AI Engineer for Data Scientists track.
