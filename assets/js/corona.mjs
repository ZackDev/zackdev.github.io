import { checkHTTPResponse, Init } from '/assets/js/main.mjs';

/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const initCorona = () => {
  const dailyCasesUrl = 'https://raw.githubusercontent.com/ZackDev/data/master/json/corona_germany_daily_cases.json';
  const weeklyTestsUrl = 'https://raw.githubusercontent.com/ZackDev/data/master/json/corona_germany_weekly_tests.json';
  const dailyVaccinationsUrl = 'https://raw.githubusercontent.com/ZackDev/data/master/json/corona_germany_daily_vaccinations.json';
  const dailyIcuoUrl = 'https://raw.githubusercontent.com/ZackDev/data/master/json/corona_germany_daily_icuo.json';
  const vaccinationsByVaccineUrl = 'https://raw.githubusercontent.com/ZackDev/data/master/json/corona_germany_vaccinations_by_vaccine.json';

  const fInit = {
    method: 'GET',
    cache: 'no-cache'
  }

  /** */
  fetch(dailyCasesUrl, fInit)
    .then(
      res => checkHTTPResponse(res),
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
      res => checkHTTPResponse(res),
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
      res => checkHTTPResponse(res),
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
      res => checkHTTPResponse(res),
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
      res => checkHTTPResponse(res),
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
  if (Array.isArray(callbackObject.data)) {
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
    drawIncidenceAndRValueChart(dataObj1);
  }
  else {
    console.log('callbackObject.data is not an array.')
  }
};

const getAsyncWeeklyTestsCallback = (callbackObject) => {
  console.log('weekly tests callback');

  if (Array.isArray(callbackObject.data)) {
    let initialValue = {
      calendarWeeks: [],
      weeklyTests: [],
      totalTests: []
    }

    const dataObj = callbackObject.data.reduce(function (p, c) {
      p.calendarWeeks.push(c.calendar_week)
      p.weeklyTests.push(c.weekly_tests)
      p.totalTests.push(c.total_tests)
      return p
    }, initialValue);

    drawWeeklyTestsChart(dataObj);
  }
  else {
    console.log('callbackObject.data is not an array.')
  }
};

const getAsyncDailyVaccinationsCallback = (callbackObject) => {
  console.log('daily vaccinations callback');
  console.log(callbackObject);
  if (Array.isArray(callbackObject.data)) {
    let initialValue = {
      dates: [],
      firstVaccinations: [],
      secondVaccinations: [],
      thirdVaccinations: [],
      fourthVaccinations: [],
      fifthVaccinations: [],
      sixthVaccinations: [],

      totalFirstVaccinations: [],
      totalSecondVaccinations: [],
      totalThirdVaccinations: [],
      totalFourthVaccinations: [],
      totalFifthVaccinations: [],
      totalSixthVaccinations: [],

      firstVaccinationsPercentage: [],
      secondVaccinationsPercentage: [],
      thirdVaccinationsPercentage: [],
      fourthVaccinationsPercentage: [],
      fifthVaccinationsPercentage: [],
      sixthVaccinationsPercentage: [],
    }
    const dataObj = callbackObject.data.reduce(function (p, c) {
      p.dates.push(c.date)
      p.firstVaccinations.push(c.first_vaccinations)
      p.secondVaccinations.push(c.second_vaccinations)
      p.thirdVaccinations.push(c.third_vaccinations)
      p.fourthVaccinations.push(c.fourth_vaccinations)
      p.fifthVaccinations.push(c.fifth_vaccinations)
      p.sixthVaccinations.push(c.sixth_vaccinations)

      p.totalFirstVaccinations.push(c.total_first_vaccinations)
      p.totalSecondVaccinations.push(c.total_second_vaccinations)
      p.totalThirdVaccinations.push(c.total_third_vaccinations)
      p.totalFourthVaccinations.push(c.total_fourth_vaccinations)
      p.totalFifthVaccinations.push(c.total_fifth_vaccinations)
      p.totalSixthVaccinations.push(c.total_sixth_vaccinations)

      p.firstVaccinationsPercentage.push(c.first_vaccinations_percentage)
      p.secondVaccinationsPercentage.push(c.second_vaccinations_percentage)
      p.thirdVaccinationsPercentage.push(c.third_vaccinations_percentage)
      p.fourthVaccinationsPercentage.push(c.fourth_vaccinations_percentage)
      p.fifthVaccinationsPercentage.push(c.fifth_vaccinations_percentage)
      p.sixthVaccinationsPercentage.push(c.sixth_vaccinations_percentage)
      return p

    }, initialValue)

    drawDailyVaccinationsChart(dataObj)
  }
  else {
    console.log('callbackObject.data is not an array.')
  }
};

const getAsyncDailyICUOCallback = (callbackObject) => {
  console.log('daily icuo callback');
  if (Array.isArray(callbackObject.data)) {
    let initialValue = {
      dates: [],
      freeICU: [],
      covidICU: [],
      covidICUInvasive: []
    }
    const dataObj = callbackObject.data.reduce(function (p, c) {
      p.dates.push(c.date)
      p.freeICU.push(c.free_icu)
      p.covidICU.push(c.covid_icu)
      p.covidICUInvasive.push(c.covid_icu_invasive)
      return p
    }, initialValue);

    drawDailyICUOChart(dataObj);
  }
  else {
    console.log('callbackObject.data is not an array.')
  }
};

const getAsyncVaccinationsByVaccineCallback = (callbackObject) => {
  console.log('vaccinations by vaccine callback');
  /**
    very simple, redundant check on data
    backend should dismiss zero length datasets
  **/
  if (Object.keys(callbackObject).length > 0) {
    drawVaccinationsByVaccineChart(callbackObject);
  }
  else {
    console.log(
      'corona.js',
      'getAsyncVaccinationsByVaccineCallback',
      'callbackObject has zero keys / no data',
    );
  }
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
    }
  });
}

function drawIncidenceAndRValueChart(dataObj) {
  Highcharts.chart('chart-corona-incidence-and-rvalue-germany', {
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
    }
  });
}

function drawWeeklyTestsChart(dataObj) {
  Highcharts.chart('chart-corona-tests-germany', {
    chart: {
      type: 'column',
      zoomType: 'x'
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
    }
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
      text: 'includes 1st to 6th vaccinations',
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
        text: 'Total Vaccinations',
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
      index: 0,
      legendIndex: 0,
      name: '1st Vaccinations',
      data: dataObj.firstVaccinations,
    }, {
      yAxis: 0,
      stack: 0,
      index: 1,
      legendIndex: 1,
      name: '2nd Vaccinations',
      data: dataObj.secondVaccinations,
    }, {
      yAxis: 0,
      stack: 0,
      index: 2,
      legendIndex: 2,
      name: '3rd Vaccinations',
      data: dataObj.thirdVaccinations,
    }, {
      yAxis: 0,
      stack: 0,
      index: 3,
      legendIndex: 3,
      name: '4th Vaccinations',
      data: dataObj.fourthVaccinations,
    }, {
      yAxis: 0,
      stack: 0,
      index: 4,
      legendIndex: 4,
      name: '5th Vaccinations',
      data: dataObj.fifthVaccinations,
    }, {
      yAxis: 0,
      stack: 0,
      index: 5,
      legendIndex: 5,
      name: '6th Vaccinations',
      data: dataObj.sixthVaccinations,
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 4,
      name: 'Total 1st Vaccinations',
      data: dataObj.totalFirstVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span class="highcharts-color-${this.colorIndex}">&#9679;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.firstVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 5,
      name: 'Total 2nd Vaccinations',
      data: dataObj.totalSecondVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span class="highcharts-color-${this.colorIndex}">&#9679;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.secondVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 6,
      name: 'Total 3rd Vaccinations',
      data: dataObj.totalThirdVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span class="highcharts-color-${this.colorIndex}">&#9679;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.thirdVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 7,
      name: 'Total 4th Vaccinations',
      data: dataObj.totalFourthVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span class="highcharts-color-${this.colorIndex}">&#9679;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.fourthVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 8,
      name: 'Total 5th Vaccinations',
      data: dataObj.totalFifthVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span class="highcharts-color-${this.colorIndex}">&#9679;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.fifthVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 9,
      name: 'Total 6th Vaccinations',
      data: dataObj.totalSixthVaccinations,
      tooltip: {
        pointFormatter() {
          return `<span class="highcharts-color-${this.colorIndex}">&#9679;</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, -1, ' ', ' ')}</b>: ${dataObj.sixthVaccinationsPercentage[this.x]}%</br>`;
        },
      },
    }],
    tooltip: {
      shared: true,
    }
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
    }
  });
}

function drawVaccinationsByVaccineChart(dataObj) {
  const data = [];
  var dosesAdministered = 0;
  for (let entry in dataObj) {
    let doses = dataObj[entry];
    data.push({
      name: entry,
      y: doses
    });
    dosesAdministered += doses;
  }
  Highcharts.chart('chart-corona-vaccinations-by-vaccine-germany', {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Vaccinations By Vaccine',
    },
    subtitle: {
      text: `Doses administered: ${Highcharts.numberFormat(dosesAdministered, 0)}`
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
      dataLabels: {
          enabled: true,
          padding: 0
      },
      data: data,
    }]
  });
}

new Init(initCorona);
