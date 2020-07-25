function init_ping(interval, target_url, target_div){
  target_div.html('');
  ping(target_url, target_div)
  setInterval(ping, interval, target_url, target_div);
}

function ping(target_url, target_div){
  var http_request = new XMLHttpRequest();
  target_url += '?r=' + Date.now(); /* prevent json file from getting cached */
  http_request.open("GET", target_url, true);
  http_request.responseType = "json";
  http_request.onreadystatechange = function () {
    var done = 4, ok = 200;
    if (http_request.readyState === done && http_request.status === ok) {
      let time_elapsed = Date.now() - now_ms;
      target_div.html('ping: ' + time_elapsed + 'ms');
    }
  };
  const now_ms = Date.now();
  http_request.send(null);
}

var interval = 1000;
var target_url = "https://zackdev.github.io/assets/json/dummy.json";
var target_div = $("#ping_output");

init_ping(interval, target_url, target_div);
