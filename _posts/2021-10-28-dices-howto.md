---
title: dices howto
layout: default
tags: [howto]
published: true
archived: true
---
The [Dices UI]({% post_url 2021-10-28-roll-some-dices %}) consists of four elements.

# <img src="/assets/img/icons/newdice.svg" style="height:20px;width:20px"/> - A row containing premade dices.
Here you can see the available types of dices. Click on an existing type (e.g. D6) to create a new dice and put it into the bucket. Clicking in the icon to the left opens a form where you can create new types of dices.

# <img src="/assets/img/icons/bucket.svg" style="height:20px;width:20px"/> - Another row representing the bucket.
Click on the bucket icon to roll the dices. Rolled dices get removed from the bucket and added to the table. Dices can also be removed from the bucket by clicking on the dice.

# <img src="/assets/img/icons/table.svg" style="height:20px;width:20px"/> - The final row presenting the rolled dices.
The table simply displays the rolled dices with the resulting roll. To clean the table, click the table icon.

# the 'create new dice' element
Is for creating new dices. Here you can specify a name for the new dice and it's eyes. Enter a value for name and multiple eyes via the `add eyes` button. Single eyes can be removed by clicking on them. Finally press `create dice` to add a dice type to the list of available dices.

# Not Yet Implemented:
* prevent new dice types from overwriting existing types with the same name
* add save/load functionality for custom dices using `browser.storage`
* add the option to select a specific dice type set from a list of sets like D&D games