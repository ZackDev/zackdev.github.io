const init_mars = () => {

  $('#weather_table_wrap').attr('style', 'display:flex;');

  $('#perseverance_image').addClass('image_wrap');

  let insight_api_url = 'https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=DEMO_KEY';
  let mars_photos_api_url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=DEMO_KEY';

  async_request(insight_api_url, 'json', false)
    .then(
      resolve => insight_callback(resolve),
      reject => console.log(reject)
    );

  async_request(mars_photos_api_url, 'json', false)
    .then(
      resolve => photos_callback(resolve),
      reject => console.log(reject)
    );
  /* for debugging w/o using the API */
  /*
  insight_callback(
    {
      "response" : {
        "sol_keys" : []
      }
    }
  );
  */
}

const insight_callback = (callback_object) => {
  let weather_data = callback_object.response;
  let latest_sol = weather_data.sol_keys.sort().pop();

  let w_val = new Map();
  let def_val = 'undef.';

  if (latest_sol) {
    let sol_weather = weather_data[latest_sol];

    let tmp = sol_weather.AT;
    let hws = sol_weather.HWS;
    let pre = sol_weather.PRE;
    let wd = sol_weather.WD;

    if (tmp) {
      let tmp_mn_f = parseFloat(tmp.mn).toFixed(2);
      let tmp_mx_f = parseFloat(tmp.mx).toFixed(2);
      let tmp_mn_c = ((parseFloat(tmp.mn) - 32) / 1.8).toFixed(2);
      let tmp_mx_c = ((parseFloat(tmp.mx) - 32) / 1.8).toFixed(2);
      w_val.set('tmp', [tmp_mn_f, tmp_mx_f, tmp_mn_c, tmp_mx_c]);
    }

    if (hws) {
      let hws_mn = parseFloat(hws.mn).toFixed(2);
      let hws_mx = parseFloat(hws.mx).toFixed(2);
      w_val.set('hws', [hws_mn, hws_mx]);
    }

    if (pre) {
      let pre_mn = parseFloat(pre.mn).toFixed(2);
      let pre_mx = parseFloat(pre.mx).toFixed(2);
      w_val.set('pre', [pre_mn, pre_mx]);
    }

    if (wdir) {
      let wdir = wd.most_common.compass_point;
      w_val.set('wdir', wdir);
    }
  }

  /*
    TMP, HWS, and PRE are each stored in an object containing
    av  (average)
    mn  (minimum)
    mx  (maximum)
    ct  (number of sensor-data fetches)


    TMP values in Fahrenheit
    HWS values in m/s
    PRS values in pa
    all except ct

    WD contains objects of the following type
    compass_degrees     (cardinal and intercardinal point in degrees e.g. 225)
    compass_point       (name of the above inter-cardinal point e.g. SW)
    compass_right       (0-vector x, range -1..1)
    compass_up          (0-vector y, range -1..1)
    ct                  (number of sensor-data fetches)
  */

  let raw_table_str =
    `<table style="margin:auto;">
      <tr>
        <th>temperature</th>
        <th>pressure</th>
        <th>wind direction: ${w_val.has('wdir') ? w_val.get('wdir') : 'n/a'}</th>
      </tr>
      <tr>
        <td>
          <table>
            <tr>
              <th>°F</th>
              <th>°C</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${w_val.has('tmp') ? w_val.get('tmp')[0] : 'n/a'}</td>
                    <td>${w_val.has('tmp') ? w_val.get('tmp')[1] : 'n/a'}</td>
                  </tr>
                </table>
              </td>
              <td>
                <table>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${w_val.has('tmp') ? w_val.get('tmp')[2] : 'n/a'}</td>
                    <td>${w_val.has('tmp') ? w_val.get('tmp')[3] : 'n/a'}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table>
            <tr>
              <th>pa</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${w_val.has('pre') ? w_val.get('pre')[0] : 'n/a'}</td>
                    <td>${w_val.has('pre') ? w_val.get('pre')[1] : 'n/a'}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table>
            <tr>
              <th>m/s</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${w_val.has('hws') ? w_val.get('hws')[0] : 'n/a'}</td>
                    <td>${w_val.has('hws') ? w_val.get('hws')[1] : 'n/a'}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
  $('#weather_table_wrap').html(raw_table_str);
}

const photos_callback = (callback_object) => {
  let photos = callback_object.response.latest_photos;
  photos = photos.filter(photo => photo.camera.name !== 'SHERLOC_WATSON');

  if (photos.length > 0) {
    let rnd_photo = photos[Math.floor(Math.random() * photos.length)];
    let img_url = rnd_photo.img_src;
    let credits = 'NASA/JPL-Caltech';
    let r_name = rnd_photo.rover.name;
    let c_name = rnd_photo.camera.full_name;
    let e_date = rnd_photo.earth_date;

    let figure = $('<figure></figure>');
    figure.addClass('img');

    let img = $('<img></img>');
    img.attr('src' , img_url);

    let caption = $('<figcaption></figcaption>');
    caption.html(`--${credits} ${r_name} ${c_name} ${e_date}`);

    figure.append(img);
    figure.append(caption);

    $('#perseverance_image').append(figure);
  }
}


new Init(init_mars);
