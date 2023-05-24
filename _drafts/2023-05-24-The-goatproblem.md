---
title: The Goatproblem
tags: [coding, python]
published: true
---
# You haven't understood it if you can't code it #1

The Goatproblem is a statistical phenomenon. Imagine a gameshow, where you can choose between 3 doors. A, B and C. Two contain a goat, one contains a Cadillac. The probability for winning the Cadillac is 1/3.

Here comes the twist. Instead of simply opening the chosen door, the moderator reveals one of the goats and gives you the opportunity to rechoose. That's one goat gone, while the remaining choices are either a goat or a Cadillac. One would assume, that the chance for winning the goat or the Cadillac is now 1/2 for each.

Mysteriously, the chance for winning the Cadillac increases to 2/3 if you always rechoose the door. Let's hack in the code:

``` python
import random


def rechoose(a):
    # initial user guess
    a.pop(random.randint(0, len(a) - 1))

    # goat revealed by moderator
    a.pop(a.index('G'))

    # item rechosen by user
    ur = a.pop(-1)

    if ur == 'C':
        return True
    else:
        return False


if __name__ == '__main__':
    arr = ['G', 'G', 'C']
    cycles = 1000
    results = []
    [results.append(rechoose(arr.copy())) for i in range(cycles)]
    print(results.count(True) / (len(results)))
```

The program defines the 3 doors as the list `arr = ['G', 'G', 'C']`, the number of games to run is denoted by `cycles` and the list named `results` to store the results, from which the probability to win the Cadillac is derived.

A copy of the array of doors is passed `cycles` times to the `rechoose` function, simulating the gameshow:

1. initial user guess - the user chooses a random door, which he doesn't take, gets removed.
2. goat revealed by the moderator - one door with a goat is removed.
3. item choosen by user - in this case the user always rechooses, which makes the last remaining element the choosen element.
4. the result, Cadillac or not, gets returned.

Finally, the amount of Cadillacs won, in comparison to the total games played, gets printed to the console:

``` terminal
python3 goat.py
0.6672
```

