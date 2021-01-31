---
title: Corona Chart For Germany
permalink: /corona-chart-for-germany.html
layout: default
tags: [corona, virus, germany]
published: true
---
The following chart uses [chart.js](https://www.chartjs.org/) to display the total number (blue line) of confirmed SARS-CoV-2 cases for Germany, as tested with the PCR test. The daily increase (black bars) shows the day to day increase in cases.

The second chart is showing the weekly performed tests for the SARS-CoV-2 virus. The displayed data lags behind two days, because they get officially published on the week's following Wednesdays.

{% include corona.html %}

The total daily cases in the first chart is taken from the [CSSE Github Repository][1] repository. The day to day increase in cases is a calculation on that data.
The second chart's weekly performed tests data comes from [Robert Koch Institute][2].

[1]: <https://github.com/CSSEGISandData/COVID-19> "COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University"
[2]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Testzahlen-gesamt.xlsx?__blob=publicationFile> "Erfassung der SARS-CoV-2-Testzahlen in Deutschland"

# Update 2021-01-31:
After updating the daily and weekly data-sets by hand, it was time to automate that process. Not only does it save time, it also removes the risk of error when transcribing the data.
The two separate scripts for can be downloaded below:
- [daily cases parser](/assets/code-examples/covid_daily_cases_parser.py)
- [weekly tests parser](/assets/code-examples/covid_weekly_tests_parser.py)
