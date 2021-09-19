const dot = '.'; /* Morse code for dot */
const dash = '-'; /* Morse code for dash */
const shortPause = 's'; /* Code for short */
const longPause = 'l'; /* Code for pause */

const morseMap = new Map();
const reverseMap = new Map();

/* literal key, morse value */
morseMap.set('A', [dot, dash]);
morseMap.set('B', [dash, dot, dot, dot]);
morseMap.set('C', [dash, dot, dash, dot]);
morseMap.set('D', [dash, dot, dot]);
morseMap.set('E', [dot]);
morseMap.set('F', [dot, dot, dash, dot]);
morseMap.set('G', [dash, dash, dot]);
morseMap.set('H', [dot, dot, dot, dot]);
morseMap.set('I', [dot, dot]);
morseMap.set('J', [dot, dash, dash, dash]);
morseMap.set('K', [dash, dot, dash]);
morseMap.set('L', [dot, dash, dot, dot]);
morseMap.set('M', [dash, dash]);
morseMap.set('N', [dash, dot]);
morseMap.set('O', [dash, dash, dash]);
morseMap.set('P', [dot, dash, dash, dot]);
morseMap.set('Q', [dash, dash, dot, dash]);
morseMap.set('R', [dot, dash, dot]);
morseMap.set('S', [dot, dot, dot]);
morseMap.set('T', [dash]);
morseMap.set('U', [dot, dot, dash]);
morseMap.set('V', [dot, dot, dot, dash]);
morseMap.set('W', [dot, dash, dash]);
morseMap.set('X', [dash, dot, dot, dash]);
morseMap.set('Y', [dash, dot, dash, dash]);
morseMap.set('Z', [dash, dash, dot, dot]);

/* numerical key, morse value */
morseMap.set('0', [dash, dash, dash, dash, dash]);
morseMap.set('1', [dot, dash, dash, dash, dash]);
morseMap.set('2', [dot, dot, dash, dash, dash]);
morseMap.set('3', [dot, dot, dot, dash, dash]);
morseMap.set('4', [dot, dot, dot, dot, dash]);
morseMap.set('5', [dot, dot, dot, dot, dot]);
morseMap.set('6', [dash, dot, dot, dot, dot]);
morseMap.set('7', [dash, dash, dot, dot, dot]);
morseMap.set('8', [dash, dash, dash, dot, dot]);
morseMap.set('9', [dash, dash, dash, dash, dot]);

/* padding key, unit t as value */
morseMap.set('shortPause', shortPause);
morseMap.set(' ', longPause);

/* reverse map for morse_to_text */

morseMap.forEach((value, key) => {
  reverseMap.set(value.toString().replace(new RegExp(/,/g), ''), key);
});

function drawMorse(morse) {
  const output = $('#morse_output');
  output.html('');
  for (let i = 0; i < morse.length; i += 1) {
    if (morse[i] === dot || morse[i] === dash) {
      output.html(output.html() + morse[i]);
    } else if (morse[i] === shortPause) {
      output.html(`${output.html()}&nbsp;`);
    } else if (morse[i] === longPause) {
      output.html(`${output.html()}&nbsp;&nbsp;&nbsp;`);
    }
  }
}

function drawText(text) {
  const output = $('#text_output');
  output.html('');
  output.html(text);
}

function alphanumToMorse(alphanum) {
  const arrayMorse = [];
  for (let i = 0; i < alphanum.length; i += 1) {
    const values = morseMap.get(alphanum[i]);
    for (let j = 0; j < values.length; j += 1) {
      arrayMorse.push(values[j]);
    }
    if (i < alphanum.length - 1) {
      if (alphanum[i + 1] !== ' ' && alphanum[i] !== ' ') {
        arrayMorse.push(morseMap.get('shortPause'));
      }
    }
  }
  drawMorse(arrayMorse);
}

function morseToAlphanum(morse) {
  const arrayMorse = morse.split(' ');
  const arrayText = [];
  for (let i = 0; i < arrayMorse.length; i += 1) {
    arrayText.push(reverseMap.get(arrayMorse[i]));
  }
  drawText(arrayText);
}

// EXPL: called by morse.html: text_input.oninput()
// eslint-disable-next-line no-unused-vars
function onTextInput() {
  let strInput = $('#text_input').val();
  const strRegex = new RegExp('[A-Z0-9 ]+', 'g');
  strInput = strInput.toUpperCase();
  let strOutput = '';
  const array = [...strInput.matchAll(strRegex)];
  for (let i = 0; i < array.length; i += 1) {
    strOutput += array[i];
  }
  $('#text_input').val(strOutput);
  alphanumToMorse(strOutput);
}

// EXPL: called by morse.html: morse_imput.oninput()
// eslint-disable-next-line no-unused-vars
function onMorseInput() {
  const strInput = $('#morse_input').val();
  const inputArray = strInput.split(' ');
  let strOutput = '';
  for (let i = 0; i < inputArray.length; i += 1) {
    if (i < inputArray.length - 1 && reverseMap.has(inputArray[i]) === true) {
      strOutput = `${strOutput} ${inputArray[i]} `;
    } else if (i === inputArray.length - 1) {
      // EXPL: break; doesn't work with Map.forEach(...)
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of reverseMap) {
        if (key.startsWith(inputArray[i]) === true) {
          strOutput += inputArray[i];
          break;
        }
      }
    }
  }
  $('#morse_input').val(strOutput);
  morseToAlphanum(strOutput);
}
