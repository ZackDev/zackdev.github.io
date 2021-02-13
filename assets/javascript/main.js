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
