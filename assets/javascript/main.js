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

const tacho = function tacho(initial_value, target_value, step_value, step_speed, dynamic_speed, target_div, prefix, suffix) {
  let numsteps = 0;
  let direction = "";
  if (initial_value < target_value) {
    numsteps = (target_value - initial_value) / step_value;
    direction = "increase";
  }
  else if (initial_value > target_value) {
    numsteps = (initial_value - target_value) / step_value;
    direction = "decrease;"
  }
  for (let i=0; i<=numsteps; i++) {
    step_speed = step_speed * dynamic_speed;
    let timeout = i * step_speed;
    setTimeout(function(){
      let value = 0;
      if (direction === "increase") {
        value = initial_value + step_value * i;
      }
      else if (direction === "decrease") {
        value = initial_value - step_value * i;
      }
      $(target_div).html(prefix + value + suffix);
    }, timeout);
  }
};
