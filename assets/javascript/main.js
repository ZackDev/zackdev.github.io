/* reusable javascript @ zackdev.github.io */
const get_async_json = function get_async_json(url, callback_function) {
  let http_request = new XMLHttpRequest();
  http_request.open("GET", url, true);
  http_request.responseType = "json"
  http_request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callback_function(this);
    }
  };
  http_request.send(null);
};
