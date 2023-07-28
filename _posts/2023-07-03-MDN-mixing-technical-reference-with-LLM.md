---
title: MDN mixing technical reference with LLM
tags: [LLM, MDN]
published: true
---
The Mozilla Developer Network, started using Large Language Models to produce technical explanations for CSS provided by users.

LLMs though, don't understand causality, but rather know how to combine characters and words to generate text that statistically matches best as continuation of the starting sequence (usually a question).

While the internet is full of examples of the small multiplication table [1-10] x [1-10], a LLM would provide correct answers, without having learned the rules of multiplication, but solely because it has seen a specific sequence multiplications and results that are similar to the question. Further, it could perfectly cite the rules of multiplication, but fails if asked for the result of 6231 x -416.

What could possibly go wrong when MDN uses LLMs? [Users on GitHub have collected some examples!](https://github.com/mdn/yari/issues/9208)

## Howto get a message through when the conversation is locked:

{% include image.html url="/assets/img/mdn-ai-discussion-github.png" %}