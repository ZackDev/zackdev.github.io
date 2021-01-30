---
title: How To Add Custom Entries To Gnome Applications
permalink: /how-to-add-custom-entries-to-gnome-applications.html
layout: default
tags: [linux, gnome, applications]
published: true
---
{% include image.html url="/assets/img/gnome-applications-screenshot.png" description="Screenshot Gnome Applications" %}

# Your favorite program is not listed in the Gnome Applications menu?

The entries displayed in the menu are defined in the `/usr/share/applications/` folder, where each applications meta data are defined separate .ini syntax style files.

The entry file contains at least the following information:
- `Name=<name>`
- `Type=Application`
- `Exec=<executable_path>`
- `Icon=<icon_path>`
- `Terminal=<true|false>`

Given the above example, the entry file, named `myapp.desktop`, for the custom application *MyApp* looks like this:

{% highlight ini %}
[Desktop Entry]
Name=MyApp
Type=Application
Exec=<path_to_my_app>/my_app
Icon=<path_to_icon>/my_app.icon
Terminal=false
{% endhighlight %}

There are more parameters like `keywords`, `categories`, `comments` etc. that influence how the program presents itself to the Gnome Applications Menu. Keywords lists a set of words with which the program can be searched, categories defines in which categories the program is listed. Comment gets displayed as text along the search result. All of the three mentioned parameters can be parameterized by a language code like `keywords[en_GB]=...` to define language specific keywords, categories, comments and additionally icons.
