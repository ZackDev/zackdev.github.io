---
title: Corona Chart For Germany
tags: [corona, virus, germany, chart]
published: true
---
The following charts use publicly available data surrounding the SARS-CoV-2 virus. *Click and drag on the charts to select a specific range and zoom into the data.*

<div id="chart-corona-cases-germany"></div>
---
<div class="spacer"></div>
<div id="chart-corona-incidence-and-rvalue-germany"></div>
---
<div class="spacer"></div>
<div id="chart-corona-tests-germany"></div>
---
<div class="spacer"></div>
<div id="chart-corona-icuo-germany"></div>
---
<div class="spacer"></div>
<div id="chart-corona-vaccinations-germany"></div>
---
<div class="spacer"></div>
<div id="chart-corona-vaccinations-by-vaccine-germany"></div>

## Used Datasources
* COVID-19-Cases and Incidence: [CSSE Github Repository][1]. The day to day increase in cases is a calculation on that data.
* Weekly And Total Performed PCR Tests: [Robert Koch Institute (1)][2]
* Intensive Care Unit Occupancy: COVID-19 cases plus those which require invasive ventilation in comparison to free intensive care beds. Data source is the [DIVI-Intensivregister (www.intensivregister.de)][3]
* Daily And Total Vaccinations: [Robert Koch Institute (2)][4], Population: [Destatis][5]
* Vaccinations By Vaccine: [Robert Koch Institute (2)][4]


[1]: <https://github.com/CSSEGISandData/COVID-19> "COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University"
[2]: <https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Testzahlen-gesamt.xlsx?__blob=publicationFile> "Erfassung der SARS-CoV-2-Testzahlen in Deutschland"
[3]: <https://www.intensivregister.de> "DIVI-Intensivregister (www.intensivregister.de)"
[4]: <https://raw.githubusercontent.com/robert-koch-institut/COVID-19-Impfungen_in_Deutschland/master/Aktuell_Deutschland_Bundeslaender_COVID-19-Impfungen.csv> "COVID-19-Impfungen_in_Deutschland/Aktuell_Deutschland_Bundeslaender_COVID-19-Impfungen.csv"
[5]: <https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Bevoelkerungsstand/Tabellen/zensus-geschlecht-staatsangehoerigkeit-2021.html> "Bevölkerung nach Nationalität und Geschlecht 2021"

## Update 2021-02-14
Because the `7 Day Incidence` became a goalpost value for political decision makers, a chart is now available.

## Update 2021-08-24
New chart added since focus shifted from incidence to `Intensive Care Unit` metrics.

## Update 2021-08-30
Added pie chart that shows administered doses by vaccine name.

<script type="module" src="/assets/js/corona.mjs" />
