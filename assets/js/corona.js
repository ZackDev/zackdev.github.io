const init_corona = () => {
  let daily_cases_url = "/assets/json/corona_germany_daily_cases.json";
  let weekly_tests_url = "/assets/json/corona_germany_weekly_tests.json";
  let daily_vaccinations_url = "/assets/json/corona_germany_daily_vaccinations.json";

  async_request(daily_cases_url, "json", true)
    .then(
      resolve => get_async_daily_cases_callback(resolve),
      reject => console.log(reject)
    );

  async_request(weekly_tests_url, "json", true)
    .then(
      resolve => get_async_weekly_tests_callback(resolve),
      reject => console.log(reject)
    );

  async_request(daily_vaccinations_url, "json", true)
    .then(
      resolve => get_async_daily_vaccinations_callback(resolve),
      reject => console.log(reject)
    );
};

const get_async_daily_cases_callback = (callback_object) => {
  console.log('daily cases callback');
  let cases = callback_object.response.cases;
  let dates = callback_object.response.dates;
  let daily_cases = [];
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
  let smoothed_repr_values = smooth_by_range(7, repr_values);
  let data_obj_0 = {
    cases: cases,
    daily_cases: daily_cases,
    dates: dates
  }
  let data_obj_1 = {
    incidences_7: incidences_7,
    repr_values: repr_values,
    smoothed_repr_values: smoothed_repr_values,
    dates: dates
  }
  draw_daily_cases_chart(data_obj_0);
  draw_additional_chart(data_obj_1);
};

const get_async_weekly_tests_callback = (callback_object) => {
  console.log('weekly tests callback');
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
  let data_obj = {
    weekly_tests: weekly_tests,
    total_tests: total_tests,
    calendar_weeks: calendar_weeks
  }
  draw_weekly_tests_chart(data_obj);
};

const get_async_daily_vaccinations_callback = (callback_object) => {
  console.log('daily vaccinations callback');
  let primary_vaccinations = callback_object.response.primary_vaccinations;
  let secondary_vaccinations = callback_object.response.secondary_vaccinations;
  let dates = callback_object.response.dates;
  let total_primary_vaccinations = [];
  let primary_vaccinations_percentage = [];
  let total_secondary_vaccinations = [];
  let secondary_vaccinations_percentage = [];
  for (let i=0; i < primary_vaccinations.length; i++) {
    let t_vac = 0;
    for (let j=0; j <= i; j++) {
      t_vac+= primary_vaccinations[j];
    }
    total_primary_vaccinations.push(t_vac);
  }
  for (index in total_primary_vaccinations) {
    p = parseFloat((total_primary_vaccinations[index] / 83100000 * 100).toFixed(2));
    primary_vaccinations_percentage.push(p);
  }
  for (let i=0; i < secondary_vaccinations.length; i++) {
    let t_vac = 0;
    for (let j=0; j <= i; j++) {
      t_vac+= secondary_vaccinations[j];
    }
    total_secondary_vaccinations.push(t_vac);
  }
  for (index in total_secondary_vaccinations) {
    p = parseFloat((total_secondary_vaccinations[index] / 83100000 * 100).toFixed(2));
    secondary_vaccinations_percentage.push(p);
  }
  let data_obj = {
    primary_vaccinations: primary_vaccinations,
    secondary_vaccinations: secondary_vaccinations,
    total_primary_vaccinations: total_primary_vaccinations,
    primary_vaccinations_percentage: primary_vaccinations_percentage,
    total_secondary_vaccinations: total_secondary_vaccinations,
    secondary_vaccinations_percentage: secondary_vaccinations_percentage,
    dates: dates
  }
  draw_daily_vaccinations_chart(data_obj);
}

const incidence = (span, cases) => {
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

const smooth_by_range = (span, dataset) => {
  var smoothed_array = new Array();
  for (let i=0; i < dataset.length; i++) {
    var temp_smoothed = new Array();
    var smoothed = 0;
    for (let j=i; j>=0 && j >= i - span +1; j--) {
      temp_smoothed.push(dataset[j]);
    }
    for (let x=0; x < temp_smoothed.length; x++) {
      smoothed += temp_smoothed[x];
      if (x == temp_smoothed.length -1) {
        smoothed_array.push(Number((smoothed / temp_smoothed.length ).toFixed(2)));
      }
    }
  }
  return smoothed_array;
}

const repr_value = (cases) => {
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

function draw_daily_cases_chart(data_obj) {
  var daily_cases_chart = Highcharts.chart('chart_corona_cases_germany', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Daily And Total Positive PCR Tests'
    },
    xAxis: {
      categories: data_obj.dates,
      crosshair: true
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
      data: data_obj.daily_cases
    }, {
      yAxis: 1,
      index: 0,
      name: 'Total Positive PCR Tests',
      data: data_obj.cases,
      type: 'line'
    }],
    tooltip: {
      shared: true
    },
    credits: {
      enabled: false
    }
  });
}

function draw_additional_chart(data_obj) {
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
      categories: data_obj.dates,
      crosshair: true
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
      data: data_obj.incidences_7
    }, {
      yAxis: 1,
      name: 'R-Value (smoothed)',
      data: data_obj.smoothed_repr_values
    }, {
      yAxis: 1,
      color: 'rgb(155, 155, 155)',
      visible: false,
      name: 'R-Value (raw)',
      data: data_obj.repr_values
    }],
    tooltip: {
      shared: true
    },
    credits: {
      enabled: false
    }
  });
}


function draw_weekly_tests_chart(data_obj) {
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
      categories: data_obj.calendar_weeks,
      crosshair: true
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
      data: data_obj.weekly_tests
    }, {
      type: 'line',
      yAxis: 1,
      name: 'Total PCR Tests',
      data: data_obj.total_tests
    }],
    tooltip: {
      shared: true
    },
    credits: {
      enabled: false
    }
  });
}

function draw_daily_vaccinations_chart(data_obj) {
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
      categories: data_obj.dates,
      crosshair: true
    },
    yAxis: [{
      title: {
        text: 'Daily Vaccinations'
      }
    }, {
      title: {
        text: 'Total Primary And Secondary Vaccinations'
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
      legendIndex: 0,
      name: 'Primary Vaccinations',
      data: data_obj.primary_vaccinations
    }, {
      yAxis: 0,
      stack: 0,
      index: 0,
      legendIndex: 1,
      name: 'Secondary Vaccinations',
      data: data_obj.secondary_vaccinations
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 2,
      name: 'Total Primary Vaccinations',
      data: data_obj.total_primary_vaccinations,
      tooltip: {
        pointFormatter: function(){
          return '<span style="color:' + this.series.color + ';">&bull;</span>' + ' ' + this.series.name + ': ' + '<b>' + Highcharts.numberFormat(this.y, -1, ' ', ' ') + '</b>' + ': ' + data_obj.primary_vaccinations_percentage[this.x] + '%</br>';
        }
      }
    }, {
      type: 'line',
      yAxis: 1,
      legendIndex: 3,
      name: 'Total Secondary Vaccinations',
      data: data_obj.total_secondary_vaccinations,
      tooltip: {
        pointFormatter: function(){
          return '<span style="color:' + this.series.color + ';">&bull;</span>' + ' ' + this.series.name + ': ' + '<b>' + Highcharts.numberFormat(this.y, -1, ' ', ' ') + '</b>' + ': ' + data_obj.secondary_vaccinations_percentage[this.x] + '%</br>';
        }
      }
    }],
    tooltip: {
      shared: true
    },
    credits: {
      enabled: false
    }
  });
}

new Init(init_corona);
