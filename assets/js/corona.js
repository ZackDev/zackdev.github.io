/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const initCorona = () => {
  const dailyCasesUrl = '/assets/json/corona_germany_daily_cases.json';
  const weeklyTestsUrl = '/assets/json/corona_germany_weekly_tests.json';
  const dailyVaccinationsUrl = '/assets/json/corona_germany_daily_vaccinations.json';
  const dailyIcuoUrl = '/assets/json/corona_germany_daily_icuo.json';
  const vaccinationsByVaccineUrl = '/assets/json/corona_germany_vaccinations_by_vaccine.json';

  const fInit = {
    method: 'GET',
    cache: 'no-cache'
  }

  /** */
  fetch(dailyCasesUrl, fInit)
  .then(
    res => checkResponse(res),
    rej => console.log(rej))
  .then(
    res => res.json(),
    rej => console.log(rej)
  )
  .then(
    res => getAsyncDailyCasesCallback(res),
    rej => console.log(rej)
  );

  /** */
  fetch(weeklyTestsUrl, fInit)
  .then(
    res => checkResponse(res),
    rej => console.log(rej))
  .then(
    res => res.json(),
    rej => console.log(rej)
  )
  .then(
    res => getAsyncWeeklyTestsCallback(res),
    rej => console.log(rej)
  );

  /** */
  fetch(dailyVaccinationsUrl, fInit)
  .then(
    res => checkResponse(res),
    rej => console.log(rej))
  .then(
    res => res.json(),
    rej => console.log(rej)
  )
  .then(
    res => getAsyncDailyVaccinationsCallback(res),
    rej => console.log(rej)
  );

  /** */
  fetch(dailyIcuoUrl, fInit)
  .then(
    res => checkResponse(res),
    rej => console.log(rej))
  .then(
    res => res.json(),
    rej => console.log(rej)
  )
  .then(
    res => getAsyncDailyICUOCallback(res),
    rej => console.log(rej)
  );

  /** */
  fetch(vaccinationsByVaccineUrl, fInit)
  .then(
    res => checkResponse(res),
    rej => console.log(rej))
  .then(
    res => res.json(),
    rej => console.log(rej)
  )
  .then(
    res => getAsyncVaccinationsByVaccineCallback(res),
    rej => console.log(rej)
  );

};

const getAsyncDailyCasesCallback = (callbackObject) => {
  console.log('daily cases callback');
  const cases = callbackObject.cases;
  const dates = callbackObject.dates;
  const dailyCases = [];
  for (let i = 0; i < cases.length; i += 1) {
    if (i === 0) {
      dailyCases.push(cases[i]);
    } else {
      dailyCases.push(cases[i] - cases[i - 1]);
    }
  }
  const incidences7 = incidence(7, dailyCases);
  const reprValues = reprValue(dailyCases);
  const smoothedReprValues = smoothByRange(7, reprValues);
  const dataObj0 = {
    cases,
    dailyCases,
    dates,
  };
  const dataObj1 = {
    incidences7,
    reprValues,
    smoothedReprValues,
    dates,
  };
  drawDailyCasesChart(dataObj0);
  drawAdditionalChart(dataObj1);
};

const getAsyncWeeklyTestsCallback = (callbackObject) => {
  console.log('weekly tests callback');
  const weeklyTests = callbackObject.weekly_tests;
  const calendarWeeks = callbackObject.calendar_weeks;
  const totalTests = [];
  for (let i = 0; i < weeklyTests.length; i += 1) {
    if (i === 0) {
      totalTests.push(weeklyTests[i]);
    } else {
      totalTests.push(totalTests[i - 1] + weeklyTests[i]);
    }
  }
  const dataObj = {
    weeklyTests,
    totalTests,
    calendarWeeks,
  };
  drawWeeklyTestsChart(dataObj);
};

const getAsyncDailyVaccinationsCallback = (callbackObject) => {
  console.log('daily vaccinations callback');
  const primaryVaccinations = callbackObject.primary_vaccinations;
  const secondaryVaccinations = callbackObject.secondary_vaccinations;
  const boosterVaccinations = callbackObject.booster_vaccinations;
  const dates = callbackObject.dates;
  const totalPrimaryVaccinations = [];
  const primaryVaccinationsPercentage = [];
  const totalSecondaryVaccinations = [];
  const secondaryVaccinationsPercentage = [];
  const totalBoosterVaccinations = [];
  const populationGermany = 83121363;
  for (let i = 0; i < primaryVaccinations.length; i += 1) {
    let tVac = 0;
    for (let j = 0; j <= i; j += 1) {
      tVac += primaryVaccinations[j];
    }
    totalPrimaryVaccinations.push(tVac);
  }
  for (let i = 0; i < totalPrimaryVaccinations.length; i += 1) {
    p = parseFloat(((totalPrimaryVaccinations[i] / populationGermany) * 100).toFixed(2));
    primaryVaccinationsPercentage.push(p);
  }
  for (let i = 0; i < secondaryVaccinations.length; i += 1) {
    let tVac = 0;
    for (let j = 0; j <= i; j += 1) {
      tVac += secondaryVaccinations[j];
    }
    totalSecondaryVaccinations.push(tVac);
  }
  for (let i = 0; i < totalSecondaryVaccinations.length; i += 1) {
    p = parseFloat(((totalSecondaryVaccinations[i] / populationGermany) * 100).toFixed(2));
    secondaryVaccinationsPercentage.push(p);
  }
  for (let i = 0; i < boosterVaccinations.length; i += 1) {
    let tVac = 0;
    for (let j = 0; j <= i; j += 1) {
      tVac += boosterVaccinations[j];
    }
    totalBoosterVaccinations.push(tVac);
  }
  const dataObj = {
    primaryVaccinations,
    secondaryVaccinations,
    boosterVaccinations,
    totalPrimaryVaccinations,
    primaryVaccinationsPercentage,
    totalSecondaryVaccinations,
    secondaryVaccinationsPercentage,
    totalBoosterVaccinations,
    dates,
  };
  drawDailyVaccinationsChart(dataObj);
};

const getAsyncDailyICUOCallback = (callbackObject) => {
  const dates = callbackObject.dates;
  const freeICU = callbackObject.free_icu;
  const covidICU = callbackObject.covid_icu;
  const covidICUInvasive = callbackObject.covid_icu_invasive;

  const dataObj = {
    dates,
    freeICU,
    covidICU,
    covidICUInvasive,
  };

  drawDailyICUOChart(dataObj);
};

const getAsyncVaccinationsByVaccineCallback = (callbackObject) => {
  const modernaCount = callbackObject.Moderna;
  const astrazenecaCount = callbackObject.AstraZeneca;
  const janssenCount = callbackObject.Janssen;
  const comirnatyCount = callbackObject.Comirnaty;

  const dataObj = {
    moderna: modernaCount,
    astrazeneca: astrazenecaCount,
    janssen: janssenCount,
    comirnaty: comirnatyCount,
  };

  drawVaccinationsByVaccineChart(dataObj);
};

const incidence = (span, cases) => {
  const incidences = [];
  for (let i = 0; i < cases.length; i += 1) {
    const tempIncidences = [];
    let inc = 0;
    for (let j = i; j >= 0 && j >= i - span + 1; j -= 1) {
      tempIncidences.push(cases[j]);
    }
    for (let x = 0; x < tempIncidences.length; x += 1) {
      inc += tempIncidences[x];
      if (x === tempIncidences.length - 1) {
        incidences.push(Number((inc / 831).toFixed(2)));
      }
    }
  }
  return incidences;
};

const smoothByRange = (span, dataset) => {
  const smoothedArray = [];
  for (let i = 0; i < dataset.length; i += 1) {
    const tempSmoothed = [];
    let smoothed = 0;
    for (let j = i; j >= 0 && j >= i - span + 1; j -= 1) {
      tempSmoothed.push(dataset[j]);
    }
    for (let x = 0; x < tempSmoothed.length; x += 1) {
      smoothed += tempSmoothed[x];
      if (x === tempSmoothed.length - 1) {
        smoothedArray.push(Number((smoothed / tempSmoothed.length).toFixed(2)));
      }
    }
  }
  return smoothedArray;
};

const reprValue = (cases) => {
  // calculates the reproduction value r = n / n-1
  // starting at i=1, avoids division by zero
  const repr = [];
  repr.push(0);
  for (let i = 1; i < cases.length; i += 1) {
    if (cases[i] === 0 || cases[i - 1] === 0) {
      repr.push(0);
    } else {
      const rate = cases[i] / cases[i - 1];
      repr.push(parseFloat(rate.toFixed(2)));
    }
  }
  return repr;
};

function drawDailyCasesChart(dataObj) {
  Highcharts.chart('chart-corona-cases-germany', {
    chart: {
      type: 'column',
      zoomType: 'x',
    },
    title: {
      text: 'COVID-19 Cases',
    },
    xAxis: {
      categories: dataObj.dates,
      crosshair: true,
    },
    yAxis: [{
      title: {
        text: 'Daily',
      },
    }, {
      title: {
        text: 'Total',
      },
      opposite: true,
    }],
    series: [{
      yAxis: 0,
      index: 1,
      name: 'Daily',
      data: dataObj.dailyCases,
    }, {
      yAxis: 1,
      index: 0,
      name: 'Total',
      data: dataObj.cases,
      type: 'line',
    }],
    tooltip: {
      shared: true,
    },
    credits: {
      enabled: false,
    },
  });
}

function drawAdditionalChart(dataObj) {
  Highcharts.chart('chart-corona-additional-germany', {
    chart: {
      type: 'line',
      zoomType: 'x',
    },
    title: {
      text: 'Incidence',
    },
    subtitle: {
      text: 'and R-Value',
    },
    xAxis: {
      categories: dataObj.dates,
      crosshair: true,
    },
    yAxis: [{
      title: {
        text: 'Incidence',
      },
    }, {
      title: {
        text: 'R-Value',
      },
      opposite: true,
    }],
    series: [{
      yAxis: 0,
      name: '7 day incidence',
      data: dataObj.incidences7,
    }, {
      yAxis: 1,
      name: 'R-Value (smoothed)',
      data: dataObj.smoothedReprValues,
    }, {
      yAxis: 1,
      color: 'rgb(155, 155, 155)',
      visible: false,
      name: 'R-Value (raw)',
      data: dataObj.reprValues,
    }],
    tooltip: {
      shared: true,
    },
    credits: {
      enabled: false,
    },
  });
}

function drawWeeklyTestsChart(dataObj) {
  Highcharts.chart('chart-corona-tests-germany', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Weekly And Total Performed PCR Tests',
    },
    subtitle: {
      text: 'updated on Wednesdays',
    },
    xAxis: {
      categories: dataObj.calendarWeeks,
      crosshair: true,
    },
    yAxis: [{
      title: {
        text: 'Weekly PCR Tests',
      },
    }, {
      title: {
        text: 'Total PCR Tests',
      },
      opposite: true,
    }],
    series: [{
      yAxis: 0,
      name: 'Weekly PCR Tests',
      data: dataObj.weeklyTests,
    }, {
      type: 'line',
      yAxis: 1,
      name: 'Total PCR Tests',
      data: dataObj.totalTests,
    }],
    tooltip: {
      shared: true,
    },
    credits: {
      enabled: false,
    },
  });
}

function drawDailyVaccinationsChart(dataObj) {
  Highcharts.chart('chart-corona-vaccinations-germany', {
    chart: {
      type: 'column',
      zoomType: 'x',
    },
    title: {
      text: 'Daily And Total Vaccinations',
    },
    subtitle: {
      text: 'includes primary and secondary vaccinations',
    },
    xAxis: {
      categories: dataObj.dates,
      crosshair: true,
    },
    yAxis: [{
      title: {
        text: 'Daily Vaccinations',
      },
    }, {
      title: {
        text: 'Total Primary And Secondary Vaccinations',
      },
      opposite: true,
    }],
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    series: [{
      yAxis: 0,
      stack: 0,
      index: 2,
      legendIndex: 0,
      name: 'Primary Vaccinations',
      data: dataObj.primaryVaccinations,
    }, {
      yAxis: 0,
      stack: 0,
      index: 1,
      legendIndex: 1,
      name: 'Secondary Vaccinations',
      data: dataObj.secondaryVaccinations,
    }, {
      yAxis: 0,
      stack: 0,
      index: 0,
      legendIndex: 2,
      name: 'Booster Vaccinations',
      data: dataObj.boosterVaccinations,
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 3,
      name: 'Total Primary Vaccinations',
      data: dataObj.totalPrimaryVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span style="color:${this.series.color};">&bull;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.primaryVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 4,
      name: 'Total Secondary Vaccinations',
      data: dataObj.totalSecondaryVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span style="color:${this.series.color};">&bull;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.secondaryVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 5,
      name: 'Total Booster Vaccinations',
      data: dataObj.totalBoosterVaccinations,
    }],
    tooltip: {
      shared: true,
    },
    credits: {
      enabled: false,
    },
  });
}

function drawDailyICUOChart(dataObj) {
  Highcharts.chart('chart-corona-icuo-germany', {
    chart: {
      type: 'column',
      zoomType: 'x',
    },
    title: {
      text: 'Intensive Care Unit',
    },
    subtitle: {
      text: 'free and occupied with COVID-19 patients',
    },
    xAxis: {
      categories: dataObj.dates,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: 'free and occupied',
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    series: [{
      yAxis: 0,
      stack: 0,
      index: 2,
      legendIndex: 0,
      name: 'free',
      data: dataObj.freeICU,
    }, {
      yAxis: 0,
      stack: 0,
      index: 1,
      legendIndex: 1,
      name: 'COVID',
      data: dataObj.covidICU,
    }, {
      yAxis: 0,
      stack: 0,
      index: 0,
      legendIndex: 2,
      name: 'COVID invasive',
      data: dataObj.covidICUInvasive,
    }],
    tooltip: {
      shared: true,
    },
    credits: {
      enabled: false,
    },
  });
}

function drawVaccinationsByVaccineChart(dataObj) {
  Highcharts.chart('chart-corona-vaccinations-by-vaccine-germany', {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Vaccinations By Vaccine',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.2f} %',
        },
      },
    },
    series: [{
      name: 'doses',
      colorByPoint: true,
      data: [
        {
          name: 'Moderna',
          y: dataObj.moderna,
        }, {
          name: 'Comirnaty',
          y: dataObj.comirnaty,
        }, {
          name: 'AstraZeneca',
          y: dataObj.astrazeneca,
        }, {
          name: 'Janssen',
          y: dataObj.janssen,
        },
      ],
    }],
    credits: {
      enabled: false,
    },
  });
}

new Init(initCorona);
