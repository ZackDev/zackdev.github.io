---
title: Unicode confusables
tags: [Unicode]
published: true
---
Unicode is a space for the multitude of the world's languages' symbols used by humans and computers.

While all symbols formally differ, some, *the confusables*, only differ marginally, when displayed on a screen or printed, depdending on the font used. Given the huge space for symbols Unicode provides, one may think of it as 1337-speak squared.

Let's take the x from the latin alphabet and see if there are similar looking symbols. Luckily, [https://home.unicode.org/](https://home.unicode.org/) [provides a tool](https://util.unicode.org/UnicodeJsps/confusables.jsp?a=x&r=None), checking for confusables.

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| x | ᕁ | 𝓍 | 𝙭 | х | 𝐱 | 𝗑 | x | 𝑥 | 𝘅 | ⤬ | ᙮ | ⨯ | 𝕩 | 𝖝 | × | 𝔁 | 𝚡 | x | ｘ | ⅹ | 𝔵 | ᕽ | 𝒙 | 𝘹 |

Usually, computers work with the number associated with a specific symbol. And all the numbers above differ.

> x is not x is not x. **Huh?**

# What is there to do with the confusables?

* webform fuzzing, or the person dealing with the input
* phishing
* <input type="text" size="5">

Additionally to the confusables, Unicode provides a rich set of symbols, available for its users, where many everyday symbols (&#x1F506; &#x1F5B0;  &#x1F355; &#x1F30C;) can be found and used instead of creating new ones.
