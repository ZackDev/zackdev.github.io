const runPing = (interval, targetUrl, dataset) => {
  ping(targetUrl, dataset)
  setInterval(ping, interval, targetUrl, dataset);
};

const ping = (targetUrl, dataset) => {
  let httpRequest = new XMLHttpRequest();
  targetUrl += '?r=' + Date.now(); /* prevent json file from getting cached */
  httpRequest.responseType = "json";
  httpRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let timeElapsed = Date.now() - nowMs;
        dataset.addPoint(timeElapsed, true, false);
      }
      else {
        console.log('ping.js: request completed with status code: ' + this.status);
      }
    }
  };
  httpRequest.open("GET", targetUrl, true);
  let nowMs = Date.now();
  httpRequest.send(null);
};

const initChart = (interval) => {
  return Highcharts.chart('ping-chart', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Round Trip Time'
      },
      subtitle: {
        text: `updated every ${parseFloat(interval/1000).toFixed(2)} seconds`
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
}


const initPing = () => {
  let interval = 3000;
  let targetUrl = "/assets/json/dummy.json";
  let chart = initChart(interval);
  runPing( interval, targetUrl, chart.series[0]);
};

new Init(initPing);
