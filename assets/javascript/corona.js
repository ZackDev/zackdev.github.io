var http_request = new XMLHttpRequest();
http_request.open("GET", "/assets/json/corona_germany_daily_cases.json", true);
http_request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json_response = JSON.parse(this.responseText);
    var cases = json_response.cases;
    var dates = json_response.dates;
    draw_chart(cases, dates);
  }
};
http_request.send(null);

function draw_chart(cases, dates) {
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

  var cg = document.getElementById('chart_corona_germany').getContext('2d');
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
}
