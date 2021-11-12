---
title: The Latest Mars Images
layout: default
tags: [mars, weather, NASA]
published: true
archived: true
---

# Ever wanted to know how it looks like on `Mars` ?

<div id="perseverance-image"></div>

A random image from the latest images shot by the rover `Perseverance` is presented above. It is retrieved through the [Mars Rover Photos API][1].

<s>The weather data is obtained through [InSight: Mars Weather Service API][1] which provides data collected by the `InSight Lander` on the surface or Mars.</s>

<div id="weather-table-wrap"></div>

[1]: <https://api.nasa.gov/> "NASA Open APIs"

# Update 2021-11-12
Retrieval and display of weather data has been disabled. The `Insight's` weather data remains incomplete and unusable.

# Notes:
* the weather data is not always available or complete
* both machines, lander and robot, are not on the same location
* the data-sets retrieved do not necessarily share the same date
* the API-key `DEMO_KEY` is rate-limited by IP address

<script type="text/javascript" src="/assets/js/mars.js" />
