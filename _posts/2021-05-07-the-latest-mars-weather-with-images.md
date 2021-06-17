---
title: The Latest Mars Weather With Images
layout: default
tags: [mars, weather, NASA]
published: true
archived: false
---

# Ever wanted to know how the weather is like on `Mars` ?

The weather data is obtained through [InSight: Mars Weather Service API][1] which provides data collected by the `InSight Lander` on the surface or Mars.

{% include div.html name="weather_table_wrap" %}

{% include div.html name="perseverance_image" %}

As addition, a random image from the latest images shot by the rover `Perseverance` is presented above. It is retrieved through the [Mars Rover Photos API][1].

[1]: <https://api.nasa.gov/> "NASA Open APIs"

# Notes:
* the weather data is not always available or complete
* both machines, lander and robot, are not on the same location
* the data-sets retrieved do not necessarily share the same date
* the API-key `DEMO_KEY` is rate-limited by IP address

{% include javascript.html src="/assets/js/mars.js" %}
