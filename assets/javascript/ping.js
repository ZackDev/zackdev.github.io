function init_ping(interval, target_url, target_div){
  target_div.html('');
  ping(target_url, target_div)
  setInterval(ping, interval, target_url, target_div);
};

function ping(target_url, target_div){
  var http_request = new XMLHttpRequest();
  target_url += '?r=' + Date.now(); /* prevent json file from getting cached */
  http_request.open("GET", target_url, true);
  http_request.responseType = "json";
  http_request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let time_elapsed = Date.now() - now_ms;
      target_div.html('ping: ' + time_elapsed + 'ms');
    }
  };
  const now_ms = Date.now();
  http_request.send(null);
};

function init() {
  let interval = 3000;
  let target_url = "/assets/json/dummy.json";
  let target_div = $("#ping_output");

  init_ping(interval, target_url, target_div);
};

init();
