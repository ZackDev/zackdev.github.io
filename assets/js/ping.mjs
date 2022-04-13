import { Init } from '/assets/js/main.mjs';

const ping = (targetUrl, dataset) => {
  let fInit = {
    method: 'GET',
    cache: 'no-cache'
  }

  let sentAt = Date.now();
  fetch(targetUrl, fInit)
    .then(r => r.json())
    .then(d => {
      let receivedAt = Date.now()
      let timeElapsed = receivedAt - sentAt;
      dataset.addPoint([new Date(receivedAt).toLocaleString(), timeElapsed], true, false);
    })
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
      text: `updated every ${parseFloat(interval / 1000).toFixed(2)} seconds`
    },
    xAxis: [{
      crosshair: true,
      allowDecimals: false,
    }],
    yAxis: [{
      title: {
        text: 'Milliseconds'
      },
      crosshair: true
    }],
    series: [{
      name: 'Ping In Milliseconds'
    }]
  });
}

const initPing = () => {
  let interval = 3000;
  let targetUrl = "/assets/json/dummy.json";
  let chart = initChart(interval);
  /* ping instantly for first datapoint, then with periodic interval */
  ping(targetUrl, chart.series[0])
  setInterval(ping, interval, targetUrl, chart.series[0]);
};

new Init(initPing);
