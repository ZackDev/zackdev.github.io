---
title: Traps And Pitfalls Of Biased Thinking
tags: [psychology, biases]
published: true
archived: true
---
A bias is a preconceived way of thinking that affects our everyday life. Not implicitly faulty, because biases strengthen group cohesion and have a stabilizing effect on our inner world, they have a great amount of influence on how we act. Let's have a look at some biases.

# Automation Bias
> A proclivity to value information resulting from automated processes more than those from other sources.

# Confirmation Bias
> The tendency to seek for information that corresponds with our acquired mindset.

This bias is responsible for filter bubbles. One looks for information that confirms his or her views on a specific topic. Contradicting information gets rejected blindly, almost automatically.

# Hindsight Bias
> The rationalization of an event after it occurred.

An indication for this bias is when one experiences *I've known it before*, but didn't act on it. Maybe there was conflicting information, that made it unclear or too risky to adjust. The rationalization's direction is backwards.

# Repetition Bias
> Projecting past experiences into the future.

One overgeneralized mode of thinking to avoid possible negative events or repeat possible positive events in the future by projecting the outcome of past events.

# Group-think Bias
> Goes along with the confirmation bias, it applies to one's group.

A bias dominated by group cohesion. To operate successfully as a group, there needs to be a cohesion in the form of shared values and goals. But this mechanic also leads to it's downfall because *Group Think* limits the bandwidth of ideas.

# Authority Bias
> The alignment of one's way of thinking with that of the authority.

Herein lies a tendency to trust information that is presented by an authority more than that of an actor with less authority. If the authority over-arches into other domains, or the authority becomes corrupt, the bias leads to faulty decisions.

# Sunk Cost Fallacy
> Overvaluation of past investment.

Sticking to a project that has already consumed a notable amount of investment, be it time, money or emotions, simply because the investment made makes it hard to cancel that project, even if it is bound to become non-profitable or a loss.

# Illusory Pattern Perception
> The arrangement of coincidences into a pattern.

Though patterns provide a shortcut in dealing with the complexity of life, namely an extraction of relevant mechanisms into something one can handle, there is also the pitfall of finding patterns where there are none. I'm oversimplifying here, but to get the point across consider the following output of a program [1, 1, 1, 1] and try to guess what the next element would be. Given only the output from above, you'll easily come to the conclusion that the next element is also [1].

Let's have a look at the program or generator that produces the output.

{% highlight python linenos %}
import random

def random_pattern(x):
    values = [-1, 1]
    output = []
    [output.append(random.choice(values)) for i in range(x)]
    print(output)


if __name__ == '__main__':
    random_pattern(4)
{% endhighlight %}

Line 4 defines the values that are chosen at random and appended to the output at line 6. Only by chance it happened that there are only positive 1s in the previous output. The next run's output could be [1, -1, -1, 1].

A play on the bias above is the `Texas Sharpshooter Fallacy`. This fallacy in thinking is self-induced and bluntly goes like this:

A man practices by shooting at his barn in Texas. Most of the shots randomly hit the barn but some cluster around a specific area. The alleged *Texas Sharpshooter* then draws a circle around the cluster and claims being talented at handling guns. *While the Illusory Pattern Perception emerges from a wrong perception, the TSF emerges from willingly drawing wrong conclusions.*

# Positivity Bias
The tendency to positivize circumstances, with `Negativity Bias` as it's counterpart. Best described with the following meme:
{% include image.html url="/assets/img/this-is-fine.jpeg" description="<a href='https://i.imgur.com/2sOw7GL.jpeg'>https://i.imgur.com/2sOw7GL.jpeg</a>" %}

# Conclusion
Though one may be convinced that his or her decision making process is purely rational, biases distort thinking. By being aware of those biases, one maintains his ability of critical thinking.

See [Wikipedia List Of Cognitive Biases](https://en.wikipedia.org/wiki/List_of_cognitive_biases) for a more exhaustive list.
