---
title: coding style
layout: default
published: true
list: true
---
One of the skills a developer should have is a sense for readable code. Not just for oneself, but also for other developers working on the same code. I won't get into design patterns here, they contribute to the architecture e.g. maintenance and extend-ability of a program, not necessarily to it's readability.
A consistent coding style makes code recognizable across different functions, classes, modules and possible programs at different times. The following guidelines are the ones I use for, not only, but also for Python programs.
Let's have a look at the following example code that doesn't apply any coding style:

```python
import turtle
import time
import math

class exampleclass():

    def DoSomething(self):
        pass


    def __del__(self):
        pass

    def Doprivate(self):
        pass
    def __init__(self):
        self.DoSomething()
        self.Doprivate()
```

For a better understanding how an applied coding style to the above piece of code looks like, have a look at the following code. Though the code doesn't do anything, you may notice that it is better readable, like a well structured text.

```python
import turtle, time, math

class ExampleClass:
    def __init__(self):
        self.do_something()
        self._do_private()

    def __del__(self):
        pass

    def do_something(self):
        pass

    def _do_private(self):
        pass
```
