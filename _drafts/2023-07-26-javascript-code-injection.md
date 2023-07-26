---
title: Is there a way to prevent javascript code injection?
tags: [coding, javascript]
published: true
---
Lately I've been playing around with two tools, to rewrite the content of websites, namely bending links [https://github.com/ZackDev/tm-nitter-first](https://github.com/ZackDev/tm-nitter-first):

* **Violentmonkey**: [https://violentmonkey.github.io](https://violentmonkey.github.io) injecting code into clientside html
* **MutationObserver**: [https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) observing and notifying about DOM-changes

Nice to have at first sight, but what about this, a MutationOberser injected into a website asking for login details...

{% highlight html %}
<form id="loginform">
    <input id="name" type="text"></input>
    <input id="password" type="text"></input>
</form>
{% endhighlight %}

{% highlight javascript %}
const mo = new MutationObserver(
    (mr, ob) => {
        /* send mr.target.value to ... */
    });
mo.observe(document.getElementById('loginform'), {
    attributes:true, attributeList:['value']
    });
{% endhighlight %}

... raising the title question. And are there elements or functions of a website which make detection of code injection impossible?

Any type of pure clientside detection technique can be bypassed simply by saving the page onto your harddrive and remove the essential parts with an editor. If the code resides in the html document itself. Or the code which fetches the the code-to-inject from other sources like:

* fields of a cookie
* other URLs
* src attribute of images
* any attribute of DOM elements
* etc

