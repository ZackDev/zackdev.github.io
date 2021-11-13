import { Album } from './image-selector.js';

const initMars = () => {
  // disabled insight weather
  //$('#weather-table-wrap').attr('style', 'display:flex;');

  $('#perseverance-image').addClass('image-wrap');

  let insightApiUrl = 'https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=DEMO_KEY';
  let marsPhotosApiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=DEMO_KEY';
  
  // disabled insight weather
  /*
  asyncRequest(insightApiUrl, 'json', false)
    .then(
      resolve => insightCallback(resolve),
      reject => console.log(reject)
    );
  */

  asyncRequest(marsPhotosApiUrl, 'json', false)
    .then(
      resolve => photosCallback(resolve),
      reject => console.log(reject)
    );
  /* for debugging w/o using the API */
  /*
  insightCallback(
    {
      "response" : {
        "sol_keys" : []
      }
    }
  );
  */
}

const insightCallback = (callbackObject) => {
  let weatherData = callbackObject.response;
  let latestSol = weatherData.sol_keys.sort().pop();

  let wVal = new Map();
  let noVal = 'n/a';

  if (latestSol) {
    let solWeather = weatherData[latestSol];

    let tmp = solWeather.AT;
    let hws = solWeather.HWS;
    let pre = solWeather.PRE;
    let wd = solWeather.WD;

    if (tmp) {
      let tmpMnF = parseFloat(tmp.mn).toFixed(2);
      let tmpMxF = parseFloat(tmp.mx).toFixed(2);
      let tmpMnC = ((parseFloat(tmp.mn) - 32) / 1.8).toFixed(2);
      let tmpMxC = ((parseFloat(tmp.mx) - 32) / 1.8).toFixed(2);
      wVal.set('tmp', [tmpMnF, tmpMxF, tmpMnC, tmpMxC]);
    }

    if (hws) {
      let hwsMn = parseFloat(hws.mn).toFixed(2);
      let hwsMx = parseFloat(hws.mx).toFixed(2);
      wVal.set('hws', [hwsMn, hwsMx]);
    }

    if (pre) {
      let preMn = parseFloat(pre.mn).toFixed(2);
      let preMx = parseFloat(pre.mx).toFixed(2);
      wVal.set('pre', [preMn, preMx]);
    }

    if (wd) {
      let wdir = wd.most_common.compass_point;
      wVal.set('wdir', wdir);
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

  let rawTableStr =
    `<table style="margin:auto;" class="data-table";">
      <tr>
        <th>temperature</th>
        <th>pressure</th>
        <th>wind direction: ${wVal.has('wdir') ? wVal.get('wdir') : noVal}</th>
      </tr>
      <tr>
        <td>
          <table class="data-table";>
            <tr>
              <th>°F</th>
              <th>°C</th>
            </tr>
            <tr>
              <td>
                <table class="data-table";>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${wVal.has('tmp') ? wVal.get('tmp')[0] : noVal}</td>
                    <td>${wVal.has('tmp') ? wVal.get('tmp')[1] : noVal}</td>
                  </tr>
                </table>
              </td>
              <td>
                <table class="data-table";>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${wVal.has('tmp') ? wVal.get('tmp')[2] : noVal}</td>
                    <td>${wVal.has('tmp') ? wVal.get('tmp')[3] : noVal}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table class="data-table";>
            <tr>
              <th>pa</th>
            </tr>
            <tr>
              <td>
                <table class="data-table";>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${wVal.has('pre') ? wVal.get('pre')[0] : noVal}</td>
                    <td>${wVal.has('pre') ? wVal.get('pre')[1] : noVal}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table class="data-table";>
            <tr>
              <th>m/s</th>
            </tr>
            <tr>
              <td>
                <table class="data-table";>
                  <tr>
                    <th>min</th>
                    <th>max</th>
                  </tr>
                  <tr>
                    <td>${wVal.has('hws') ? wVal.get('hws')[0] : noVal}</td>
                    <td>${wVal.has('hws') ? wVal.get('hws')[1] : noVal}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
  $('#weather-table-wrap').html(rawTableStr);
}

const photosCallback = (callbackObject) => {
  let photos = callbackObject.response.latest_photos;
  let a = new Album("album-container");
  for (let photo of photos) {
    a.addImage(photo.img_src);
  }
  /*
  if (photos.length > 0) {
    let rndPhoto = photos[Math.floor(Math.random() * photos.length)];
    let imgUrl = rndPhoto.img_src;
    let credits = 'NASA/JPL-Caltech';
    let rName = rndPhoto.rover.name;
    let cName = rndPhoto.camera.full_name;
    let eDate = rndPhoto.earth_date;

    let figure = $('<figure></figure>');
    figure.addClass('img');

    let img = $('<img></img>');
    img.attr('src' , imgUrl);

    let caption = $('<figcaption></figcaption>');
    caption.html(`--${credits} ${rName} ${cName} ${eDate}`);

    figure.append(img);
    figure.append(caption);

    $('#perseverance-image').append(figure);
  }
  */
}


new Init(initMars);
