const checkHTTPResponse = (response) => {
  if (response.ok && response.status === 200) {
    return Promise.resolve(response);
  }
  else {
    return Promise.reject(`error: url ${response.url}, ok: ${response.ok}, status: ${response.status}`);
  }
}

const resizeContent = () => {
  let footerHeight = document.getElementById("footer-wrap").getBoundingClientRect().height
  let headerHeight = document.getElementById("header-wrap").getBoundingClientRect().height
  let windowHeight = window.innerHeight
  let minHeight = windowHeight - headerHeight - footerHeight
  if (minHeight > 0) {
    document.getElementById("main-content-wrap").style.minHeight = minHeight + 'px'
  }
}

const initHighcharts = () => {
  Highcharts.setOptions({
    chart: {
      styledMode: true
    },
    credits: {
      enabled: false,
    }
  });
}

class Init {
  static functionArray = new Array();
  static run() {
    for (let f of Init.functionArray) {
      f();
    }
  }
  constructor(func) {
    if (typeof func === 'function') {
      Init.functionArray.push(func);
    }
    else {
      console.log("Init - constructor: parameter is not a function.")
    }
  }
}

class Tacho {
  constructor(initialValue, targetValue, stepValue, stepSpeed, dynamicSpeed, targetDiv, prefix, suffix) {
    this.initialValue = initialValue;
    this.targetValue = targetValue;
    this.stepValue = stepValue;
    this.stepSpeed = stepSpeed;
    this.dynamicSpeed = dynamicSpeed;
    this.targetDiv = targetDiv;
    this.prefix = prefix;
    this.suffix = suffix;
    this.direction = "";
    this.numsteps = 0;
    if (this.initialValue < this.targetValue) {
      this.numsteps = (this.targetValue - this.initialValue) / this.stepValue;
      this.direction = "increase";
    }
    else if (this.initialValue > this.targetValue) {
      this.numsteps = (this.initialValue - this.targetValue) / this.stepValue;
      this.direction = "decrease";
    }
    try {
      this.targetDiv = document.getElementById(targetDiv);
    }
    catch(error){
      console.log(error.message);
    }
  }
  run(){
    for (let i=0; i<=this.numsteps; i++) {
      this.stepSpeed = this.stepSpeed * this.dynamicSpeed;
      let timeout = i * this.stepSpeed;
      setTimeout(function(){
        let value = 0;
        if (i == this.numsteps) {
          value = this.targetValue;
        }
        else if (i < this.numsteps) {
          if (this.direction === "increase") {
            value = this.initialValue + this.stepValue * i;
          }
          else if (this.direction === "decrease") {
            value = this.initialValue - this.stepValue * i;
          }
        }
        this.targetDiv.innerHTML = this.prefix + value + this.suffix;
      }.bind(this), timeout);
    }
  }
}

new Init(resizeContent);
new Init(initHighcharts);

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    Init.run();
  }
};
