function init() {
  Chart.defaults.global.defaultFontFamily = "'Myriad Pro', 'Calibri', Helvetica, sans-serif";
  Chart.defaults.global.defaultFontSize = 16;
  let daily_cases_url = "/assets/json/corona_germany_daily_cases.json";
  let weekly_tests_url = "/assets/json/corona_germany_weekly_tests.json";
  get_async_json(daily_cases_url, get_async_daily_cases_callback);
  get_async_json(weekly_tests_url, get_async_weekly_tests_callback);
};

const get_async_daily_cases_callback = function get_async_daily_cases_callback(callback_object) {
  let cases = callback_object.response.cases;
  let dates = callback_object.response.dates;
  draw_daily_cases_chart(cases, dates);
};

const get_async_weekly_tests_callback = function get_async_weekly_tests_callback(callback_object) {
  let weekly_tests = callback_object.response.weekly_tests;
  let calendar_weeks = callback_object.response.calendar_weeks;
  draw_weekly_tests_chart(weekly_tests, calendar_weeks);
};

function draw_daily_cases_chart(cases, dates) {
  var daily_cases = [1];
  (function (c, d) {
    var last_data = 0;
    c.forEach(function(n){
      if (n > 0 && last_data > 0){
        d.push(n - last_data);
        last_data = n;
      } else if (n > 0){
        last_data = n;
      } else if (n === 0){
        d.push(n);
      }
    });
  }(cases, daily_cases));

  var cg = document.getElementById('chart_corona_cases_germany').getContext('2d');
  var total_infections_chart = new Chart(cg, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'total infections',
        backgroundColor: 'rgb(00, 144, 255)',
        borderColor: 'rgb(00, 144, 255)',
        data: cases,
        fill: false,
        yAxisID: 'total-y-axis'
      },{
        label: 'daily infections',
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
            labelString: 'total infections',
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
            labelString: 'daily infections',
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
        label: 'weekly tests',
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
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'weekly tests',
            fontColor: 'rgb(00, 144, 255)'
          }
        }]
      }
    }
  });
};

init();
