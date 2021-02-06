function init() {
  Chart.defaults.global.defaultFontFamily = "Raleway";
  Chart.defaults.global.defaultFontSize = 20;
  let daily_cases_url = "/assets/json/corona_germany_daily_cases.json";
  let weekly_tests_url = "/assets/json/corona_germany_weekly_tests.json";
  let daily_vaccinations_url = "/assets/json/corona_germany_daily_vaccinations.json"
  async_request(daily_cases_url, "json", get_async_daily_cases_callback);
  async_request(weekly_tests_url, "json", get_async_weekly_tests_callback);
  async_request(daily_vaccinations_url, "json", get_async_daily_vaccinations_callback);
};

const get_async_daily_cases_callback = function get_async_daily_cases_callback(callback_object) {
  let cases = callback_object.response.cases;
  let dates = callback_object.response.dates;
  let daily_cases = [];
  let last_cases = 0;
  for (let i=0; i < cases.length; i++) {
    if (cases[i] > 0 && last_cases > 0) {
      daily_cases.push(cases[i] - last_data);
      last_data = cases[i];
    }
    else if (cases[i] === 0) {
      daily_cases.push(last_data)
    }
  }
  draw_daily_cases_chart(cases, daily_cases, dates);
};

const get_async_weekly_tests_callback = function get_async_weekly_tests_callback(callback_object) {
  let weekly_tests = callback_object.response.weekly_tests;
  let calendar_weeks = callback_object.response.calendar_weeks;
  draw_weekly_tests_chart(weekly_tests, calendar_weeks);
};

const get_async_daily_vaccinations_callback = function get_async_daily_vaccinations_callback(callback_object) {
  let vaccinations = callback_object.response.vaccinations;
  let dates = callback_object.response.dates;
  let total_vaccinations = []
  for (let i=0; i < vaccinations.length; i++) {
    let t_vac = 0;
    for (let j=0; j <= i; j++) {
      t_vac+= vaccinations[j];
    }
    total_vaccinations.push(t_vac);
  }
  draw_daily_vaccinations_chart(vaccinations, total_vaccinations, dates);
}

function draw_daily_cases_chart(cases, daily_cases, dates) {
  var cg = document.getElementById('chart_corona_cases_germany').getContext('2d');
  var total_infections_chart = new Chart(cg, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'total positive PCR tests',
        backgroundColor: 'rgb(00, 144, 255)',
        borderColor: 'rgb(00, 144, 255)',
        data: cases,
        fill: false,
        yAxisID: 'total-y-axis'
      },{
        label: 'daily positive PCR tests',
        backgroundColor: 'rgb(46, 46, 46)',
        borderColor: 'rgb(46, 46, 46)',
        data: daily_cases,
        fill: true,
        yAxisID: 'daily-y-axis',
        type: 'bar'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          id: 'total-y-axis',
          type: 'linear',
          position: 'left',
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'total positive PCR tests',
            fontColor: 'rgb(00, 144, 255)'
          }
        },{
          id: 'daily-y-axis',
          type: 'linear',
          position: 'right',
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'daily positive PCR tests',
            fontColor: 'rgb(46, 46, 46)'
          }
        }]
      }
    }
  });
};

function draw_weekly_tests_chart(weekly_tests, calendar_weeks) {
  var cg = document.getElementById('chart_corona_tests_germany').getContext('2d');
  var total_infections_chart = new Chart(cg, {
    type: 'bar',
    data: {
      labels: calendar_weeks,
      datasets: [{
        label: 'weekly performed PCR tests',
        backgroundColor: 'rgb(00, 144, 255)',
        borderColor: 'rgb(00, 144, 255)',
        data: weekly_tests,
        fill: false,
        yAxisID: 'weekly-tests-y-axis'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          id: 'weekly-tests-y-axis',
          type: 'linear',
          position: 'right',
          gridLines: {
            display: true
          },
          scaleLabel: {
            display: true,
            labelString: 'weekly performed PCR tests',
            fontColor: 'rgb(00, 144, 255)'
          }
        }]
      }
    }
  });
};

function draw_daily_vaccinations_chart(vaccinations, total_vaccinations, dates) {
  var cg = document.getElementById('chart_corona_vaccinations_germany').getContext('2d');
  var daily_vaccinations_chart = new Chart(cg, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        label: 'daily performed vaccinations',
        backgroundColor: 'rgb(00, 200, 0)',
        borderColor: 'rgb(00, 200, 0)',
        data: vaccinations,
        fill: false,
        yAxisID: 'daily-vaccinations-y-axis'
      }, {
        label: 'total performed vaccinations',
        backgroundColor: 'rgb(00, 144, 255)',
        borderColor: 'rgb(00, 144, 255)',
        data: total_vaccinations,
        fill: false,
        yAxisID: 'total-vaccinations-y-axis',
        type: 'line'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          id: 'daily-vaccinations-y-axis',
          type: 'linear',
          position: 'left',
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'daily performed vaccinations',
            fontColor: 'rgb(00, 200, 0)'
          }
        }, {
          id: 'total-vaccinations-y-axis',
          type: 'linear',
          position: 'right',
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'total performed vaccinations',
            fontColor: 'rgb(00, 144, 255)'
          }
        }]
      }
    }
  });
};

init();
