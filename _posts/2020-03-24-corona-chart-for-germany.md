---
title: Corona Chart For Germany
permalink: /corona-chart-for-germany.html
layout: default
tags: [corona, virus, germany]
published: true
---
The following charts use publicly available data surrounding the SARS-CoV-2 virus.

{% include corona.html %}

The total daily cases in the first chart is taken from the [CSSE Github Repository][1]. The day to day increase in cases is a calculation on that data.

7 Day Incidence Chart's data is also derived from the source above.

The third chart's weekly performed tests data comes from [Robert Koch Institute (1)][2].

The daily vaccinations data is also available from [Robert Koch Institute (2)][3].

[1]: <https://github.com/CSSEGISandData/COVID-19> "COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University"
[2]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Testzahlen-gesamt.xlsx?__blob=publicationFile> "Erfassung der SARS-CoV-2-Testzahlen in Deutschland"
[3]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile> "Tabelle mit den gemeldeten Impfungen bundesweit und nach Bundesland sowie nach STIKO-Indikation"

# Update 2021-02-14:
Because the *7 Day Incidence* became a goalpost value for political decision makers, a chart is now available.

# Update 2021-02-03:
Added another script: [daily vaccinations parser](/assets/code-examples/covid_daily_vaccinations_parser.py)

# Update 2021-01-31:
After updating the daily and weekly data-sets by hand, it was time to automate that process. Not only does it save time, it also removes the risk of error when transcribing the data.
The two separate scripts for can be downloaded below:
- [daily cases parser](/assets/code-examples/covid_daily_cases_parser.py)
- [weekly tests parser](/assets/code-examples/covid_weekly_tests_parser.py)
