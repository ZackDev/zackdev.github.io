var my_JSON_object;
var http_request = new XMLHttpRequest();

function init(interval, target_url, target_div){
  setInterval(ping, interval, target_url, target_div);
}

function ping(target_url, target_div){
  target_url += '?r=' + Date.now();
  http_request.open("GET", target_url, true);
  http_request.responseType = "json";
  http_request.onreadystatechange = function () {
    var done = 4, ok = 200;
    if (http_request.readyState === done && http_request.status === ok) {
      my_JSON_object = http_request.response;
      let time_elapsed = Date.now() - now_ms;
      target_div.html(time_elapsed);
      console.log(Date.now() - now_ms);
      console.log(http_request.readyState + " " + http_request.status);
      console.log(my_JSON_object);
    }
    else {
      console.log(http_request.readyState + " " + http_request.status);
    }
  };
  const now_ms = Date.now();
  http_request.send(null);
}
