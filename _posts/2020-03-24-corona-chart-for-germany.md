---
title: Corona Chart For Germany
permalink: /corona-chart-for-germany.html
layout: default
tags: [corona, virus, germany, chart]
published: true
archived: false
---
The following charts use publicly available data surrounding the SARS-CoV-2 virus.

# Positive Polymerase Chain Reaction Tests

{% include div.html name="chart_corona_cases_germany" %}

The total daily cases in the first chart is taken from the [CSSE Github Repository][1]. The day to day increase in cases is a calculation on that data.

# Incidence And Reproduction Rate

{% include div.html name="chart_corona_additional_germany" %}

Incidence Chart's data is also derived from the data above. *Incidence* describes the cumulative cases for a population of 100.000 over a defined time span. In this case, the time-span is 7 days.

*Reproduction Rate* describes the speed at which the virus propagates. Here it is measured on a day-to-day basis, dividing the *nth* by the *n-1th* daily cases. The chart itself has some spikes with values above 10 in it. This is due to fact that data gathering and processing is a bit slower at the weekends, resulting in ~~higher numbers on Mondays~~ delayed reporting of this data, usually being accumulated on Mondays and finally made available on Tuesdays.

# Weekly PCR Tests

{% include div.html name="chart_corona_tests_germany" %}

The third chart's data plainly lists the weekly performed PCR tests. Again, the data-source is the [Robert Koch Institute (1)][2].

# Vaccinations

{% include div.html name="chart_corona_vaccinations_germany" %}

The daily vaccinations data is also available from [Robert Koch Institute (2)][3]. It is split into two types of vaccinations, named primary and secondary vaccinations. There is no distinction by vaccine.

[1]: <https://github.com/CSSEGISandData/COVID-19> "COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University"
[2]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Testzahlen-gesamt.xlsx?__blob=publicationFile> "Erfassung der SARS-CoV-2-Testzahlen in Deutschland"
[3]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile> "Tabelle mit den gemeldeten Impfungen bundesweit und nach Bundesland sowie nach STIKO-Indikation"

# Update 2021-02-14
Because the *7 Day Incidence* became a goalpost value for political decision makers, a chart is now available.

# Update 2021-02-03
Added another script: [daily vaccinations parser](/assets/code-examples/covid_daily_vaccinations_parser.py)

# Update 2021-01-31
After updating the daily and weekly data-sets by hand, it was time to automate that process. Not only does it save time, it also removes the risk of error when transcribing the data.
The two separate scripts for can be downloaded below:
- [daily cases parser](/assets/code-examples/covid_daily_cases_parser.py)
- [weekly tests parser](/assets/code-examples/covid_weekly_tests_parser.py)

{% include javascript.html src="/assets/js/corona.js" %}
