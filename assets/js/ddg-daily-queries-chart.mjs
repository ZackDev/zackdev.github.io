import { checkHTTPResponse, Init } from '/assets/js/main.mjs';

/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const initDDGQueries = () => {
    const dailyQueriesUrl = 'https://raw.githubusercontent.com/ZackDev/data/master/json/daily_queries_ddg.json';

    const fInit = {
        method: 'GET',
        cache: 'no-cache'
    }

    /** */
    fetch(dailyQueriesUrl, fInit)
        .then(
            res => checkHTTPResponse(res),
            rej => console.log(rej))
        .then(
            res => res.json(),
            rej => console.log(rej)
        )
        .then(
            res => drawDDGDailyQueriesChart(res),
            rej => console.log(rej)
        );
}

function drawDDGDailyQueriesChart(dataObj) {
    Highcharts.chart('chart-ddg-daily-queries', {
        chart: {
            type: 'column',
            zoomType: 'x',
        },
        title: {
            text: 'DuckDuckGo Daily Queries',
        },
        xAxis: {
            categories: dataObj.dates,
        },
        series: [{
            name: "queries",
            data: dataObj.queries,
        }],
        tooltip: {
            shared: true,
        }
    });
}

new Init(initDDGQueries);
