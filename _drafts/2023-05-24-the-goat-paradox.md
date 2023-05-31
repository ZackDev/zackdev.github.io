---
title: The Goat Paradox
tags: [coding, python]
published: true
---
Inspired by [YouTube - arteDE - Denken in Wahrscheinlichkeiten - Das Ziegenproblem](https://www.youtube.com/watch?v=CYQZ_GrJwLA)

The Goatparadox is a counter-intuitive, statistical phenomenon. Imagine a game show, where the player has to choose between 3 doors. A, B and C. Two contain a goat, one contains a Cadillac. The probability of winning the Cadillac is 1/3.

Here comes the twist. Instead of simply opening the chosen door, the moderator reveals one of the goats and gives the player the opportunity to choose again. That's one goat gone, while the remaining choices are either a goat or a Cadillac. One would assume, that the chance for winning the goat or the Cadillac is now 1/2 for each.

Mysteriously, the chance of winning the Cadillac increases to 2/3 if the player always rechooses again. Let's hack the code:

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
    print(results.count(True) / len(results))
    
{% endhighlight %}

The program defines the prizes `2x Goat and a Cadillac` as the list `prizes = [False, False, True]`, the number of games to be run is denoted by `cycles`, and the list named `results` where the result of each game is stored, from which the probability of winning the Cadillac is derived.

A copy of the list of prizes is passed `cycles` times to the `game(prizes)` function, simulating the game show:

- *\# initial player guess* - the player chooses a random prize, which is removed.
- *\# goat revealed by moderator* - one prize with a goat is removed.
- *\# prize choosen by player* - in this case the player always rechooses, which makes the last remaining element the choosen element.

Finally, the number of Cadillacs won, as a fraction of the total number of games played, is printed:

``` terminal
python3 goatparadox.py
0.6672
```

But why does the probability for C linger around 2/3? Let's break it down into the three possible cases from the starting configuration: the prizes `Goat Goat Cadillac`.

## Case 1:
- player chooses the first goat
- moderator reveals the other goat
- player wins the Cadillac

## Case 2:
- player chooses the second goat
- moderator reveals the first goat
- player wins the Cadillac

## Case 3:
- player chooses the Cadillac
- moderator reveals one of the goats
- player wins the goat

Noteable is that the moderator *always* reveals a goat, and that the third step: the player "selecting" a prize is unneeded, as it is the last available prize anyway.

## As a table:
Letter G is for goat, C for Cadillac. Bold letters are those prizes removed.

| step/case | case 1 | case 2 | case 3 |
| --- | --- | --- | --- | --- |
| step 1 | **G** G C | G **G** C | G G **C** |
| step 2 | **G** **G** C | **G** **G** C | G **G** **C** |

Overall, thats 2 times Cadillac and 1 Goat won, for a total of 3 games, yielding a probability of 2/3.