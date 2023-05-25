---
title: The Goatparadox
tags: [coding, python]
published: true
---
Inspired by [YouTube - arteDE - Denken in Wahrscheinlichkeiten - Das Ziegenproblem](https://www.youtube.com/watch?v=CYQZ_GrJwLA)

The Goatparadox is a statistical phenomenon. Imagine a gameshow, where the player can choose between 3 doors. A, B and C. Two contain a goat, one contains a Cadillac. The probability for winning the Cadillac is 1/3.

Here comes the twist. Instead of simply opening the chosen door, the moderator reveals one of the goats and gives the player the opportunity to rechoose. That's one goat gone, while the remaining choices are either a goat or a Cadillac. One would assume, that the chance for winning the goat or the Cadillac is now 1/2 for each.

Mysteriously, the chance for winning the Cadillac increases to 2/3 if the player always rechoose the door. Let's hack the code:

{% highlight python linenos %}
import random


def game(prizes):
    # initial player guess
    prizes.pop(random.randint(0, len(prizes) - 1))

    # goat revealed by moderator
    prizes.pop(prizes.index(False))

    # item rechosen by player
    return prizes.pop(-1)


if __name__ == '__main__':
    prizes = [False, False, True]
    cycles = 100000
    results = []
    [results.append(game(prizes.copy())) for _ in range(cycles)]
    print(results.count(True) / (len(results)))
    
{% endhighlight %}

The program defines the prizes `2x Goat and a Cadillac` as the list `prizes = [False, False, True]`, the number of games to run is denoted by `cycles` and the list named `results` to store each of the results, from which the probability to win the Cadillac is derived.

A copy of the list of prizes is passed `cycles` times to the `game(prizes)` function, simulating the gameshow:

1. initial player guess - the player chooses a random prize, which he doesn't take, gets removed.
2. goat revealed by moderator - one prize with a goat is removed.
3. prize choosen by player - in this case the player always rechooses, which makes the last remaining element the choosen element.

Finally, the Cadillacs won, as fraction of the total games played, gets printed:

``` terminal
python3 goatparadox.py
0.6672
```

But why does the probability for C linger around 2/3? Let's break it down to the three cases possible from the starting configuration: the prizes `Goat Goat Cadillac`.

## Case 1:
1. player chooses the first goat
2. moderator reveals the other goat

## Case 2:
1. player chooses the second goat
2. moderator reveals the first goat

## Case 3:
1. player chooses the Cadillac
2. moderator reveals one of the goats

## As a table:
Letter G is for goat, C for Cadillac. Bold letters are those prizes removed.

| step/case | case 1 | case 2 | case 3 |
| --- | --- | --- | --- | --- |
| step 1 | **G** G C | G **G** C | G G **C** |
| step 2 | **G** **G** C | **G** **G** C | G **G** **C** |

Overall, thats 2 times Cadillac and 1 Goat won, for obviously 3 games, yielding the probability of 2/3.