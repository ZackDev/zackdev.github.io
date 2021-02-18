var dot = ".";  /*Morse code for dot */
var dash = "-";  /*Morse code for dash */
var short_pause = "s"; /*Code for short */
var long_pause = "l"; /*Code for pause */

var morse_map = new Map();

/* literal key, morse value */
morse_map.set("A", [dot,dash]);
morse_map.set("B", [dash,dot,dot,dot]);
morse_map.set("C", [dash,dot,dash,dot]);
morse_map.set("D", [dash,dot,dot]);
morse_map.set("E", [dot]);
morse_map.set("F", [dot,dot,dash,dot]);
morse_map.set("G", [dash,dash,dot]);
morse_map.set("H", [dot,dot,dot,dot]);
morse_map.set("I", [dot,dot]);
morse_map.set("J", [dot,dash,dash,dash]);
morse_map.set("K", [dash,dot,dash]);
morse_map.set("L", [dot,dash,dot,dot]);
morse_map.set("M", [dash,dash]);
morse_map.set("N", [dash,dot]);
morse_map.set("O", [dash,dash,dash]);
morse_map.set("P", [dot,dash,dash,dot]);
morse_map.set("Q", [dash,dash,dot,dash]);
morse_map.set("R", [dot,dash,dot]);
morse_map.set("S", [dot,dot,dot]);
morse_map.set("T", [dash]);
morse_map.set("U", [dot,dot,dash]);
morse_map.set("V", [dot,dot,dot,dash]);
morse_map.set("W", [dot,dash,dash]);
morse_map.set("X", [dash,dot,dot,dash]);
morse_map.set("Y", [dash,dot,dash,dash]);
morse_map.set("Z", [dash,dash,dot,dot]);

/* numerical key, morse value */
morse_map.set("0", [dash,dash,dash,dash,dash]);
morse_map.set("1", [dot,dash,dash,dash,dash]);
morse_map.set("2", [dot,dot,dash,dash,dash]);
morse_map.set("3", [dot,dot,dot,dash,dash]);
morse_map.set("4", [dot,dot,dot,dot,dash]);
morse_map.set("5", [dot,dot,dot,dot,dot]);
morse_map.set("6", [dash,dot,dot,dot,dot]);
morse_map.set("7", [dash,dash,dot,dot,dot]);
morse_map.set("8", [dash,dash,dash,dot,dot]);
morse_map.set("9", [dash,dash,dash,dash,dot]);

/* padding key, unit t as value */
morse_map.set("short_pause", short_pause);
morse_map.set(" ", long_pause);

/* reverse map for morse_to_text */
var reverse_map = new Map();
for (let [key, value] of morse_map) {
  reverse_map.set(value.toString().replace(new RegExp(/,/g),""), key);
}
console.log(reverse_map);

function draw_morse(morse){
  var output = $("#morse_output");
  output.html("");
  for (let i=0; i<morse.length; i++){
    if (morse[i] === dot || morse[i] === dash){
      output.html(output.html() + morse[i]);
    }
    else if (morse[i] === short_pause){
      output.html(output.html() + "&nbsp;");
    }
    else if (morse[i] === long_pause){
      output.html(output.html() + "&nbsp;&nbsp;&nbsp;");
    }
  }
}

function draw_text(text){
  let output = $("#text_output");
  output.html("");
  output.html(text);
}

function alphanum_to_morse(alphanum){
  let array_morse = new Array();
  for (let i=0; i<alphanum.length; i++){
    let values = morse_map.get(alphanum[i]);
    for (let j=0; j<values.length; j++){
      array_morse.push(values[j]);
    }
    if (i < alphanum.length - 1){
      if (alphanum[i+1] !== " " && alphanum[i] !== " "){
        array_morse.push(morse_map.get("short_pause"));
      }
    }
  }
  draw_morse(array_morse);
}

function morse_to_alphanum(morse){
  let array_morse = morse.split(" ");
  let array_text = new Array();
  for (let i=0; i<array_morse.length; i++){
    array_text.push(reverse_map.get(array_morse[i]));
  }
  draw_text(array_text);
}

function on_text_input(){
  let str_input = $("#text_input").val();
  let str_regex = new RegExp("[A-Z0-9 ]+","g");
  str_input = str_input.toUpperCase();
  str_output = "";
  let array = [...str_input.matchAll(str_regex)];
  for (let i=0; i<array.length; i++){
    str_output = str_output + array[i];
  }
  $("#text_input").val(str_output);
  alphanum_to_morse(str_output);
}

function on_morse_input(){
  let str_input = $("#morse_input").val();
  let input_array = str_input.split(" ");
  let str_output = "";
  console.log(reverse_map.keys());
  for (let i=0; i<input_array.length; i++){
    if (i < input_array.length -1 && reverse_map.has(input_array[i]) === true) {
      str_output = str_output + input_array[i] + " ";
    }
    else if (i == input_array.length -1){
      for (let [key, value] of reverse_map){
        if (key.startsWith(input_array[i]) === true) {
          str_output = str_output + input_array[i];
          break;
        }
      }
    }
  }
  $("#morse_input").val(str_output);
  morse_to_alphanum(str_output);
}
