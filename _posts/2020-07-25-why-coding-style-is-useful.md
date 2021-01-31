---
title: Why Coding Style Is Useful
permalink: /why-coding-style-is-useful.html
layout: default
tags: [coding, style, python]
published: true
---
One of the skills a developer should have is a sense for readable code. Not just for oneself, but also for other developers working on or with the same code. I won't get into design patterns here, they contribute to the architecture e.g. maintenance and extend-ability of a program, not necessarily to it's readability.

A consistent coding style makes code recognizable across different functions, classes, modules and possible programs at different times. Let's have a look at the following example code that doesn't apply any coding style:

{% highlight python linenos %}
#unstructured code
import turtle
import time
import math

class BasicMath():

    def operation(self,x,y,operator):
        if operator == '+':
          return self.add(x, y)

    def __del__(self):
        pass

    def add(self,x, y):
        return x+y

    def __init__(self):
        pass

{% endhighlight %}

For a better understanding how an applied coding style to the above piece of code looks like, have a look at the same code below. You may notice that it is better readable, like a well structured text.

{% highlight python linenos %}
#structured code
import turtle, time, math

class BasicMath:

    def __init__(self):
        pass

    def operation(self, x, y, operator):
        if operator == '+':
          return self._add(x, y)

    def _add(self, x, y):
        return x + y

    def __del__(self):
        pass

{% endhighlight %}


# Coding Style Guidelines:
The following guidelines are grouped by where in the Python code they apply, namely imports, classes, functions & methods and variables & parameters.
* In general, names you give to classes, variables etc. should tell the user their intention.

## Imports:
For imports, use two separate lines at the beginning of the Python file.
* group imports into two sections, one for known modules, the second for custom module imports

## Classes:
Class definitions and their instantiation are easily recognizable and distinguishable from variables or functions within the code.
* use first letter capitalization for classes
* define init(self) and del(self) at the start and end of the class body
* define public methods after init(self)
* private methods follow public methods
* keep a line spacing of two lines between classes
* use brackets only if class inherits from other classes

## Functions & Methods:
The same reasoning as for classes applies to functions and methods. Distinguishable from other forms of code and their scope is well defined.
* name in lower case letters
* code follows the function definition without a blank line
* separate function names which consist of multiple words by an underscore
* private names are denoted with preceding underscore
* have a line spacing of one line between functions

## Variables & Parameters:
* name in lower case letters
* use underscore for separation of variables names which consist of multiple words
* private names start with the underscore

Following coding style guidelines makes it easier to read when accessing it at a later point in time. Less complicated to navigate when it comes to making additions. Easier to use within a program when class names, methods and variables tell you what they are doing without having to guess or to do tedious backtracking.
