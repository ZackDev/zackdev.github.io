const init_atomic_elements = function init_atomic_elements() {
  let atomic_elements_data_url = '/assets/json/atomic_elements_data.json';
  async_request(atomic_elements_data_url, "json", get_atomic_elements_data_callback);
}

const get_atomic_elements_data_callback = function get_atomic_elements_data_callback(callback_object){
  let elements = callback_object.response.elements;
  let series = new Array();
  for (elem in elements) {
    let obj = new Object();
    obj.name = elements[elem]["name"];
    obj.data = new Array(elements[elem]["protons"], elements[elem]["atomic_weight"], elements[elem]["density"], elements[elem]["melting_point"], elements[elem]["boiling_point"], elements[elem]["specific_heat_capacity"], elements[elem]["electro_negativity"]);
    series.push(obj);
  }

  let series_json = JSON.parse(JSON.stringify(series))

  draw_atomic_elements_chart(series_json);
}

function draw_atomic_elements_chart(series){
  var atomic_chart = Highcharts.chart('atomic_elements_chart', {
    chart: {
      polar: true
    },
    title: {
      text: 'Atomic Elements Chart'
    },
    yAxis: {
      type: 'logarithmic'
    },
    xAxis: {
      categories: ["Protons", "Atomic Weight", "Density", "Melting Point", "Boiling Point", "Specific Heat Capacity", "Electro Negativity"]
    },
    series: series,
    credits: {
      enabled: false
    }
  });
}

init_array.push(init_atomic_elements);
