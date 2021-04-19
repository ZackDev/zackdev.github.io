function run_ping(interval, target_url, dataset){
  ping(target_url, dataset)
  setInterval(ping, interval, target_url, dataset);
};

function ping(target_url, dataset){
  var http_request = new XMLHttpRequest();
  target_url += '?r=' + Date.now(); /* prevent json file from getting cached */
  http_request.responseType = "json";
  http_request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let time_elapsed = Date.now() - now_ms;
        dataset.addPoint(time_elapsed, true, false);
      }
      else {
        console.log('ping.js: request completed with status code: ' + this.status);
      }
    }
  };
  http_request.open("GET", target_url, true);
  const now_ms = Date.now();
  http_request.send(null);
};

const init_chart = (interval, target_url) => {
  let chart = Highcharts.chart('ping_chart', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Round Trip Time'
      },
      subtitle: {
        text: `updated every ${interval/1000} seconds`
      },
      xAxis: [{
        crosshair: true,
        allowDecimals: false
      }],
      yAxis: [{
        title: {
          text: 'Milliseconds'
        },
        crosshair: true
      }],
      series: [{
        name: 'Ping In Milliseconds'
      }],
      credits: {
        enabled: false
      }
  });
  run_ping( interval, target_url, chart.series[0]);
}


const init_ping = function init_ping() {
  let interval = 3000;
  let target_url = "/assets/json/dummy.json";
  init_chart(interval, target_url);
};

new Init(init_ping);
