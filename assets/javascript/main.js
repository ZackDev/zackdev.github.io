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

const int_to_dotted = function int_to_dotted(number) {
  var str = number.toString().split("").reverse();
  var output = new Array();
  for (let i=0; i < str.length; i++) {
    if (i > 0 && i % 3 == 0) {
      output.push('.');
    }
    output.push(str[i]);
  }
  return output.reverse().join("");
};
