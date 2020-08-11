function init() {
  init_daily_cases();
  init_weekly_tests();
};

function init_daily_cases() {
  var http_request = new XMLHttpRequest();
  http_request.open("GET", "/assets/json/corona_germany_daily_cases.json", true);
  http_request.responseType = "json"
  http_request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var cases = this.response.cases;
      var dates = this.response.dates;
      draw_daily_cases_chart(cases, dates);
    }
  };
  http_request.send(null);
};

function init_weekly_tests() {
  var http_request = new XMLHttpRequest();
  http_request.open("GET", "/assets/json/corona_germany_weekly_tests.json", true);
  http_request.responseType = "json"
  http_request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var weekly_tests = this.response.weekly_tests;
      var calendar_weeks = this.response.calendar_weeks;
      draw_weekly_tests_chart(weekly_tests, calendar_weeks);
    }
  };
  http_request.send(null);
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
      }
    });
  }(cases, daily_cases));

  Chart.defaults.global.defaultFontFamily = "'Myriad Pro', 'Calibri', Helvetica, sans-serif";
  Chart.defaults.global.defaultFontSize = 16;

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

  Chart.defaults.global.defaultFontFamily = "'Myriad Pro', 'Calibri', Helvetica, sans-serif";
  Chart.defaults.global.defaultFontSize = 16;

  var cg = document.getElementById('chart_corona_tests_germany').getContext('2d');
  var total_infections_chart = new Chart(cg, {
    type: 'line',
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
