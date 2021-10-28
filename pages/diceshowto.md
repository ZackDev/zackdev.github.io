---
title: dices howto
layout: default
permalink: /dices-howto.html
published: true
---
The [Dices UI](/2021/10/28/roll-some-dices.html) consists of three elements.

# <img src="/assets/img/icons/newdice.svg" style="height:20px;width:20px"/> - A row containing premade dices.
Here you can see the available types of dices. Click on an existing type (e.g. D6) to create a new dice and put it into the bucket.

# <img src="/assets/img/icons/bucket.svg" style="height:20px;width:20px"/> - Another row representing the bucket.
Click on the bucket icon to roll the dices. Rolled dices get removed from the bucket and added to the table. Dices can also be removed from the bucket by clicking on the dice.

# <img src="/assets/img/icons/table.svg" style="height:20px;width:20px"/> - The final row presenting the rolled dices.
The table simply displays the rolled dices with the resulting roll. To clean the table, click the table icon.

# Not Yet Implemented:
* add custom dice funtionality (create a new type of dice by specifying a name and it's eyes)
* add save/load functionality for custom dices (using `browser.storage`)