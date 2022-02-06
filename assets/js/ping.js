const runPing = (interval, targetUrl, dataset) => {
  ping(targetUrl, dataset)
  setInterval(ping, interval, targetUrl, dataset);
};

const ping = (targetUrl, dataset) => {
  let fInit = {
    method: 'GET',
    cache: 'no-cache'
  }

  let sentAt = Date.now();
  fetch(targetUrl, fInit)
    .then(r => r.json())
    .then(d => {
      let timeElapsed = Date.now() - sentAt;
      dataset.addPoint(timeElapsed, true, false);
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
