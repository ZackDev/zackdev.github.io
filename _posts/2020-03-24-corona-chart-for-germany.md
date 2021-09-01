---
title: Corona Chart For Germany
layout: default
tags: [corona, virus, germany, chart]
published: true
archived: false
---
The following charts use publicly available data surrounding the SARS-CoV-2 virus. *Click and drag on the charts to select a specific range and zoom into the data.*

{% include div.html name="chart_corona_cases_germany" %}

{% include div.html name="chart_corona_additional_germany" %}

{% include div.html name="chart_corona_tests_germany" %}

{% include div.html name="chart_corona_icuo_germany" %}

{% include div.html name="chart_corona_vaccinations_germany" %}

{% include div.html name="chart_corona_vaccinations_by_vaccine_germany" %}

# Used Datasources
* COVID-19-Cases and Incidence: [CSSE Github Repository][1]. The day to day increase in cases is a calculation on that data.

* Weekly And Total Performed PCR Tests: [Robert Koch Institute (1)][2]

* Intensive Care Unit Occupancy: COVID-19 cases which require invasive ventilation in comparison to the beds that are free. Data source is the [DIVI-Intensivregister (www.intensivregister.de)][4]

* Daily And Total Vaccinations: [Robert Koch Institute (2)][3]

* Vaccinations By Vaccine: [Robert Koch Institute (3)][5]


[1]: <https://github.com/CSSEGISandData/COVID-19> "COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University"
[2]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Testzahlen-gesamt.xlsx?__blob=publicationFile> "Erfassung der SARS-CoV-2-Testzahlen in Deutschland"
[3]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile> "Tabelle mit den gemeldeten Impfungen bundesweit und nach Bundesland sowie nach STIKO-Indikation"
[4]: <https://www.intensivregister.de> "DIVI-Intensivregister (www.intensivregister.de)"
[5]: <https://raw.githubusercontent.com/robert-koch-institut/COVID-19-Impfungen_in_Deutschland/master/Aktuell_Deutschland_Bundeslaender_COVID-19-Impfungen.csv> "COVID-19-Impfungen_in_Deutschland/Aktuell_Deutschland_Bundeslaender_COVID-19-Impfungen.csv"

# Update 2021-02-14
Because the `7 Day Incidence` became a goalpost value for political decision makers, a chart is now available.

# Update 2021-08-24
New chart added since focus shifted from incidence to `Intensive Care Unit` metrics.

# Update 2021-08-30
Added pie chart that shows administered doses by vaccine name.

{% include javascript.html src="/assets/js/corona.js" %}
