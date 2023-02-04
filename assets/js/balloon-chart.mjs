import { Init } from '/assets/js/main.mjs';

/* eslint-disable no-undef */

const initBalloonChart = () => {
    Highcharts.chart('chinese-balloon-chart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                colors: ['#AC0000'],
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}'
                }
            }
        },
        series: [{
            name: 'Balloons',
            data: [{
                name: 'Made In China',
                y: 2,
            }]
        }]
    });   
}

new Init(initBalloonChart)