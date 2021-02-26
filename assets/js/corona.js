const init_corona = function init_corona() {
  Highcharts.setOptions({
    chart: {
      style: {
        //fontFamily: 'Raleway',
        fontSize: '20px'
      }
    }
  });
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
    if (i == 0) {
      daily_cases.push(cases[i]);
    }
    else {
      daily_cases.push(cases[i] - cases[i-1])
    }
  }
  let incidences_7 = incidence(7, daily_cases);
  let repr_values = repr_value(daily_cases);
  draw_daily_cases_chart(cases, daily_cases, dates);
  draw_additional_chart(incidences_7, repr_values, dates);
};

const get_async_weekly_tests_callback = function get_async_weekly_tests_callback(callback_object) {
  let weekly_tests = callback_object.response.weekly_tests;
  let calendar_weeks = callback_object.response.calendar_weeks;
  let total_tests = [];
  for (let i=0; i < weekly_tests.length; i++) {
    if (i == 0) {
      total_tests.push(weekly_tests[i]);
    }
    else {
      total_tests.push(total_tests[i-1] + weekly_tests[i]);
    }
  }
  draw_weekly_tests_chart(weekly_tests, total_tests, calendar_weeks);
};

const get_async_daily_vaccinations_callback = function get_async_daily_vaccinations_callback(callback_object) {
  let primary_vaccinations = callback_object.response.primary_vaccinations;
  let secondary_vaccinations = callback_object.response.secondary_vaccinations;
  let dates = callback_object.response.dates;
  let total_vaccinations = []
  let percentage = []
  for (let i=0; i < primary_vaccinations.length; i++) {
    let t_vac = 0;
    for (let j=0; j <= i; j++) {
      t_vac+= primary_vaccinations[j] + secondary_vaccinations[j];
    }
    total_vaccinations.push(t_vac);
  }
  for (index in total_vaccinations) {
    p = parseFloat((total_vaccinations[index] / 83100000 * 100).toFixed(2));
    percentage.push(p);
  }
  draw_daily_vaccinations_chart(primary_vaccinations, secondary_vaccinations, total_vaccinations, percentage, dates);
}

const incidence = function incidence(span, cases) {
  var incidences = new Array();
  for (let i=0; i < cases.length; i++) {
    var temp_incidences = new Array();
    var inc = 0;
    for (let j=i; j>=0 && j >= i - span + 1; j--) {
      temp_incidences.push(cases[j]);
    }
    for (let x=0; x < temp_incidences.length; x++) {
      inc += temp_incidences[x];
      if (x == temp_incidences.length -1) {
        incidences.push(Number((inc / 831).toFixed(2)));
      }
    }
  }
  return incidences;
}

const repr_value = function(cases) {
  var repr = new Array();
  for (let i=0; i < cases.length; i++) {
    if (i == 0) {
      repr.push(0);
    }
    else {
      if (cases[i] == 0 || cases[i - 1 ] == 0) {
        repr.push(0);
      }
      else {
        repr.push(parseFloat((cases[i] / cases[i - 1]).toFixed(2)));
      }
    }
  }
  return repr;
}

function draw_daily_cases_chart(cases, daily_cases, dates) {
  var daily_cases_chart = Highcharts.chart('chart_corona_cases_germany', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Daily And Total Positive PCR Tests'
    },
    xAxis: {
      categories: dates
    },
    yAxis: [{
      title: {
        text: 'Daily Positive PCR Tests'
      }
    }, {
      title: {
        text: 'Total Positive PCR Tests'
      },
      opposite: true
    }],
    series: [{
      yAxis: 0,
      index: 1,
      name: 'Daily Positive PCR Tests',
      data: daily_cases
    }, {
      yAxis: 1,
      index: 0,
      name: 'Total Positive PCR Tests',
      data: cases
    }],
    credits: {
      enabled: false
    }
  });
}

function draw_additional_chart(incidences_7, repr_values, dates) {
  var incidence_chart = Highcharts.chart('chart_corona_additional_germany', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Incidence'
    },
    subtitle: {
      text: 'and R-Value'
    },
    xAxis: {
      categories: dates
    },
    yAxis: [{
      title: {
        text: 'Incidence'
      }
    }, {
      title: {
        text: 'R-Value'
      },
      opposite: true
    }],
    series: [{
      yAxis: 0,
      name: '7 day incidence',
      data: incidences_7
    }, {
      yAxis: 1,
      name: 'R-Value',
      data: repr_values
    }],
    credits: {
      enabled: false
    }
  });
}


function draw_weekly_tests_chart(weekly_tests, total_tests, calendar_weeks) {
  var weekly_tests_chart = Highcharts.chart('chart_corona_tests_germany', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Weekly And Total Performed PCR Tests'
    },
    subtitle: {
      text: 'updated on Wednesdays'
    },
    xAxis: {
      categories: calendar_weeks
    },
    yAxis: [{
      title: {
        text: 'Weekly PCR Tests'
      }
    }, {
      title: {
        text: 'Total PCR Tests'
      },
      opposite: true
    }],
    series: [{
      yAxis: 0,
      name: 'Weekly PCR Tests',
      data: weekly_tests
    }, {
      type: 'line',
      yAxis: 1,
      name: 'Total PCR Tests',
      data: total_tests
    }],
    credits: {
      enabled: false
    }
  });
}

function draw_daily_vaccinations_chart(primary_vaccinations, secondary_vaccinations, total_vaccinations, percentage, dates) {
  var weekly_tests_chart = Highcharts.chart('chart_corona_vaccinations_germany', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Daily And Total Vaccinations'
    },
    subtitle: {
      text: 'includes primary and secondary vaccinations'
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
      data: total_vaccinations,
      tooltip: {
        pointFormatter: function(){
          return '<span style="color:' + this.series.color + ';">&bull;</span>' + ' ' + this.series.name + ': ' + '<b>' + Highcharts.numberFormat(this.y, -1, ' ', ' ') + '</b>' + ': ' + percentage[this.x] + '%';
        }
      }
    }],
    credits: {
      enabled: false
    }
  });
}

new Init(init_corona);
