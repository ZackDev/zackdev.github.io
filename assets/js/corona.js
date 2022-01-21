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
  const dates = [];
  const cases = [];
  const dailyCases = [];
  const incidences7 = [];
  const reprValues = [];
  const smoothedReprValues = [];

  const data = callbackObject.data;
  data.forEach(e => {
    dates.push(e.date)
    cases.push(e.totalcases);
    dailyCases.push(e.dailycases);
    incidences7.push(e.incidence);
    reprValues.push(e.rrate);
    smoothedReprValues.push(e.rratesmoothed);
  });

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
  const calendarWeeks = [];
  const weeklyTests = [];
  const totalTests = [];

  const data = callbackObject.data;
  data.forEach(e => {
    calendarWeeks.push(e.calendar_week);
    weeklyTests.push(e.weekly_tests);
    totalTests.push(e.total_tests);
  })

  const dataObj = {
    calendarWeeks,
    weeklyTests,
    totalTests,
  };

  drawWeeklyTestsChart(dataObj);
};

const getAsyncDailyVaccinationsCallback = (callbackObject) => {
  console.log('daily vaccinations callback');
  const dates = [];
  const primaryVaccinations = [];
  const secondaryVaccinations = [];
  const boosterVaccinations = [];
  const totalPrimaryVaccinations = [];
  const primaryVaccinationsPercentage = [];
  const totalSecondaryVaccinations = [];
  const secondaryVaccinationsPercentage = [];
  const totalBoosterVaccinations = [];
  const boosterVaccinationsPercentage = [];

  const data = callbackObject.data;
  data.forEach(e => {
    dates.push(e.date);
    primaryVaccinations.push(e.primary_vaccinations);
    secondaryVaccinations.push(e.secondary_vaccinations);
    boosterVaccinations.push(e.booster_vaccinations);
    totalPrimaryVaccinations.push(e.total_primary_vaccinations);
    totalSecondaryVaccinations.push(e.total_secondary_vaccinations);
    totalBoosterVaccinations.push(e.total_booster_vaccinations);
    primaryVaccinationsPercentage.push(e.primary_vaccinations_percentage);
    secondaryVaccinationsPercentage.push(e.secondary_vaccinations_percentage);
    boosterVaccinationsPercentage.push(e.booster_vaccinations_percentage);
  });

  const dataObj = {
    dates,
    primaryVaccinations,
    secondaryVaccinations,
    boosterVaccinations,
    totalPrimaryVaccinations,
    totalSecondaryVaccinations,
    totalBoosterVaccinations,
    primaryVaccinationsPercentage,
    secondaryVaccinationsPercentage,
    boosterVaccinationsPercentage,
  };

  drawDailyVaccinationsChart(dataObj);
};

const getAsyncDailyICUOCallback = (callbackObject) => {
  const dates = [];
  const freeICU = [];
  const covidICU = [];
  const covidICUInvasive = [];

  const data = callbackObject.data;
  data.forEach(e => {
    dates.push(e.date);
    freeICU.push(e.free_icu);
    covidICU.push(e.covid_icu);
    covidICUInvasive.push(e.covid_icu_invasive);
  });

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
      tooltip: {
        pointFormatter() {
          return `<span style="color:${this.series.color};">&bull;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.boosterVaccinationsPercentage[this.x]}%</br>`;
        },
      },
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
