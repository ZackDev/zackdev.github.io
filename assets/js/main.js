// asynchronous http request to provided url
// passes response object to callback_function
const async_request = function async_request(url, type, callback_function) {
  let http_request = new XMLHttpRequest();
  http_request.open("GET", url, true);
  http_request.responseType = type;
  http_request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callback_function(this);
    }
  };
  http_request.send(null);
};

const resize_content = function resize_content() {
  var footer_height = $("#footer_wrap").height();
  var header_height = $("#header_wrap").height();
  var window_height = $(window).height();
  $('#main_content_wrap').css('min-height', window_height - header_height - footer_height + 'px');
}

const init_highcharts = function init_highcharts() {
  Highcharts.setOptions({
    /*
    chart: {
      style: {
        fontFamily: 'Raleway',
        fontSize: '40'
      }
    }
    */
  });
}

class Init {
  static function_array = new Array();
  static run() {
    for (let f in Init.function_array) {
      Init.function_array[f]();
    }
  }
  constructor(func) {
    if (typeof func === 'function') {
      Init.function_array.push(func);
      console.log('Init: ' + func + ' added.');
    }
  }
}

class Tacho {
  constructor(initial_value, target_value, step_value, step_speed, dynamic_speed, target_div, prefix, suffix) {
    this.initial_value = initial_value;
    this.target_value = target_value;
    this.step_value = step_value;
    this.step_speed = step_speed;
    this.dynamic_speed = dynamic_speed;
    this.target_div = target_div;
    this.prefix = prefix;
    this.suffix = suffix;
    this.direction = "";
    this.numsteps = 0;
    if (this.initial_value < this.target_value) {
      this.numsteps = (this.target_value - this.initial_value) / this.step_value;
      this.direction = "increase";
    }
    else if (this.initial_value > this.target_value) {
      this.numsteps = (this.initial_value - this.target_value) / this.step_value;
      this.direction = "decrease";
    }
    try {
      this.target_div = document.getElementById(target_div);
    }
    catch(error){
      console.log(error.message);
    }
  }
  run(){
    for (let i=0; i<=this.numsteps; i++) {
      this.step_speed = this.step_speed * this.dynamic_speed;
      let timeout = i * this.step_speed;
      setTimeout(function(){
        let value = 0;
        if (i == this.numsteps) {
          value = this.target_value;
        }
        else if (i < this.numsteps) {
          if (this.direction === "increase") {
            value = this.initial_value + this.step_value * i;
          }
          else if (this.direction === "decrease") {
            value = this.initial_value - this.step_value * i;
          }
        }
        this.target_div.innerHTML = this.prefix + value + this.suffix;
      }.bind(this), timeout);
    }
  }
}

new Init(resize_content);
new Init(init_highcharts);

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    Init.run();
  }
};
