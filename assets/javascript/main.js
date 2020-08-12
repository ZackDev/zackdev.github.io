const get_async_json = function get_async_json(url, callback) {
  let http_request = new XMLHttpRequest();
  http_request.open("GET", url, true);
  http_request.responseType = "json"
  http_request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callback(this);
    }
  };
  http_request.send(null);
};
