function init() {
  let daily_cases_url = "/assets/json/corona_germany_daily_cases.json";
  let weekly_tests_url = "/assets/json/corona_germany_weekly_tests.json";
  let daily_vaccinations_url = "/assets/json/corona_germany_daily_vaccinations.json"
  async_request(daily_cases_url, "json", get_async_daily_cases_callback);
  async_request(weekly_tests_url, "json", get_async_weekly_tests_callback);
  async_request(daily_vaccinations_url, "json", get_async_daily_vaccinations_callback);
};

const get_async_daily_cases_callback = function get_async_daily_cases_callback(callback_object) {
  let cases = callback_object.response.cases;
  let dates = callback_object.response.dates;
  let daily_cases = [];
  let previous_cases = 0;
  for (let i=0; i < cases.length; i++) {
    daily_cases.push(cases[i] - previous_cases);
    previous_cases = cases[i];
  }
  draw_daily_cases_chart(cases, daily_cases, dates);
};

const get_async_weekly_tests_callback = function get_async_weekly_tests_callback(callback_object) {
  let weekly_tests = callback_object.response.weekly_tests;
  let calendar_weeks = callback_object.response.calendar_weeks;
  draw_weekly_tests_chart(weekly_tests, calendar_weeks);
};

const get_async_daily_vaccinations_callback = function get_async_daily_vaccinations_callback(callback_object) {
  let primary_vaccinations = callback_object.response.primary_vaccinations;
  let secondary_vaccinations = callback_object.response.secondary_vaccinations;
  let dates = callback_object.response.dates;
  let total_vaccinations = []
  for (let i=0; i < primary_vaccinations.length; i++) {
    let t_vac = 0;
    for (let j=0; j <= i; j++) {
      t_vac+= primary_vaccinations[j] + secondary_vaccinations[j];
    }
    total_vaccinations.push(t_vac);
  }
  draw_daily_vaccinations_chart(primary_vaccinations, secondary_vaccinations, total_vaccinations, dates);
}

function draw_daily_cases_chart(cases, daily_cases, dates) {
  var daily_cases_chart = Highcharts.chart('chart_corona_cases_germany', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Positive PCR Tests'
    },
    xAxis: {
      categories: dates
    },
    yAxis: [{
      title: {
        text: 'Daily Cases'
      }
    }, {
      title: {
        text: 'Total Cases'
      },
      opposite: true
    }],
    series: [{
      yAxis: 0,
      index: 1,
      name: 'Daily',
      data: daily_cases
    }, {
      yAxis: 1,
      index: 0,
      name: 'Total',
      data: cases
    }],
    credits: {
      enabled: false
    }
  });
}


function draw_weekly_tests_chart(weekly_tests, calendar_weeks) {
  var weekly_tests_chart = Highcharts.chart('chart_corona_tests_germany', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Weekly Tests'
    },
    xAxis: {
      categories: calendar_weeks
    },
    yAxis: {
      title: {
        text: 'Weekly Tests'
      }
    },
    series: [{
      name: 'Tests',
      data: weekly_tests
    }],
    credits: {
      enabled: false
    }
  });
}

function draw_daily_vaccinations_chart(primary_vaccinations, secondary_vaccinations, total_vaccinations, dates) {
  var weekly_tests_chart = Highcharts.chart('chart_corona_vaccinations_germany', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Vaccinations'
    },
    xAxis: {
      categories: dates
    },
    yAxis: [{
      title: {
        text: 'Daily Vaccinations'
      }
    }, {
      title: {
        text: 'Total Vaccinations'
      },
      opposite: true
    }],
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [{
      yAxis: 0,
      stack: 0,
      index: 1,
      name: 'Primary Vaccinations',
      data: primary_vaccinations
    }, {
      yAxis: 0,
      stack: 0,
      index: 0,
      name: 'Secondary Vaccinations',
      data: secondary_vaccinations
    }, {
      type: 'line',
      yAxis: 1,
      name: 'Total Vaccinations',
      data: total_vaccinations
    }],
    credits: {
      enabled: false
    }
  });
}

init();
