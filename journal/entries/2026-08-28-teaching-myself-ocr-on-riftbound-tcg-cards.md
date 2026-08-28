---
title: "Teaching Myself OCR on Riftbound TCG Cards"
date: "2026-08-28"
description: "OCR, software that reads text out of a photo, was everywhere at my last job, but I'd never built one myself. I picked Riftbound, League of Legends' trading card game, to learn it from scratch, and ran into a second problem I didn't expect: not enough physical cards to test on."
tags:
  - Machine Learning
  - Computer Vision
project: "Riftbound Classifier"
projectUrl: "/projects/riftbound-classifier/"
---

OCR, optical character recognition, is software that reads printed words out of a photo, the same trick behind scanning a receipt into searchable text or a phone reading a license plate. It was everywhere at my last job. I used its output constantly and worked around its mistakes, but never built one myself. So for a side project I'd actually enjoy debugging at 11pm, I taught a program to recognize a Riftbound card, the League of Legends trading card game, from a photo, partly by having it read the card's printed name.

## Learning OCR by building one

The first decision wasn't the program's brain, it was where to point its eyes. Instead of guessing where the card's name sits, I cropped a bunch of cards and checked: always the same strip, roughly the middle third. Small decision, but it was mine this time, not something already decided before the work reached me.

Then I tuned the OCR tool's own settings, how hard it squints at blurry text, until it read a few more cards correctly without losing the ones it already got. Nothing dramatic. Still the first time I was the one turning the dials instead of filing a ticket.

## Then it made everything worse

I combined the OCR text with the program's other method, matching the photo against reference images, expecting two signals to beat one. Instead accuracy on real photos fell from about 93% to about 51%, basically a coin flip.

![Two bars showing real-photo accuracy dropping from 93% for image match alone to 51% once OCR is added](/assets/img/riftbound-ocr-accuracy-drop.svg)

The OCR reads looked fine individually. What was actually happening: a name that looks plausible, confident enough that my code trusts it, still wrong enough to override a correct image match, a mistake a person double-checking the same text would never make. I'd heard this failure described before. Watching it wreck my own numbers is what made it click.

## I don't own enough cards

Clean product photos are easy to find online. Real, messy phone photos are not, so I pulled real ones from eBay listings. That fixed coverage but left five to eight real photos per card, too few for the confidence-interval math most people default to, which assumes a decent pile of data. I ended up using the versions built for small samples instead: one for per-card accuracy, one for the overall estimate by resampling what little data I had, one for fairly comparing two model versions on the same photos. Without that, any accuracy number I reported would've been closer to a guess than a measurement.

## What's next

More real photos than eBay can give me, ideally cards in my own hand under my own phone camera. The OCR failure still bugs me too. I want to find out if it just needs a stricter trust threshold, or if fusing the two methods was the wrong idea from the start.
