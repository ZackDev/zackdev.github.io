var dates = ['27.1.2020','28.1.2020','29.1.2020','30.1.2020','31.1.2020','1.2.2020','2.2.2020','3.2.2020','4.2.2020','5.2.2020','6.2.2020','7.2.2020','8.2.2020','9.2.2020','10.2.2020','11.2.2020','12.2.2020','13.2.2020','14.2.2020','15.2.2020','16.2.2020','17.2.2020','18.2.2020','19.2.2020','20.2.2020','21.2.2020','22.2.2020','23.2.2020','24.2.2020','25.2.2020','26.2.2020','27.2.2020','28.2.2020','29.2.2020','1.3.2020','2.3.2020','3.3.2020','4.3.2020','5.3.2020','6.3.2020','7.3.2020','8.3.2020','9.3.2020','10.3.2020','11.3.2020','12.3.2020','13.3.2020','14.3.2020','15.3.2020','16.3.2020','17.3.2020','18.3.2020','19.3.2020','20.3.2020','21.3.2020','22.3.2020','23.3.2020','24.3.2020','25.3.2020','26.3.2020','27.3.2020','28.3.2020','29.3.2020','30.3.2020','31.3.2020','1.4.2020','2.4.2020','3.4.2020','4.4.2020','5.4.2020','6.4.2020','7.4.2020','8.4.2020','9.4.2020','10.4.2020','11.4.2020','12.4.2020','13.4.2020','14.4.2020','15.4.2020','16.4.2020','17.4.2020','18.4.2020','19.4.2020','20.4.2020','21.4.2020','22.4.2020','23.4.2020','24.4.2020','25.4.2020','26.4.2020','27.4.2020','28.4.2020','29.4.2020','30.4.2020','1.5.2020','2.5.2020','3.5.2020','4.5.2020','5.5.2020','6.5.2020','7.5.2020','8.5.2020','9.5.2020','10.5.2020','11.5.2020','12.5.2020','13.5.2020','14.5.2020','15.5.2020','16.5.2020','17.5.2020','18.5.2020','19.5.2020','20.5.2020','21.5.2020','22.5.2020','23.5.2020','24.5.2020','25.5.2020','26.5.2020','27.5.2020','28.5.2020','29.5.2020','30.5.2020','31.5.2020','1.6.2020','2.6.2020','3.6.2020','4.6.2020','5.6.2020','6.6.2020','7.6.2020','8.6.2020','9.6.2020'];
var cases = [1,4,4,4,5,8,10,12,12,12,12,13,13,14,14,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17,27,46,48,79,130,159,196,262,482,670,799,1040,1176,1457,1908,2078,3675,4585,5795,7272,9257,12327,15320,19848,22213,24873,29056,32986,37323,43938,50871,57695,62095,66885,71808,77872,84794,91159,96092,100123,103374,107663,113296,118181,122171,124908,127854,130072,131359,134753,137698,141397,143342,145184,147065,148291,150648,153129,154999,156513,157770,158758,159912,161539,163009,164077,164967,165664,166152,167007,168162,169430,170588,171324,171879,172576,173171,174098,174478,175233,175752,176369,176551,177778,178473,179021,179710,179986,180328,180600,181200,181524,182196,182922,183189,183410,183594,183879,184121,184472,184924,185450,185750,186109,186506];

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
