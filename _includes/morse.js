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
morse_map.set("K", [dot,dash]);
morse_map.set("L", [dash,dot,dash]);
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

function draw_morse(morse){
  var output = $("#morse_code");
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

function alphanum_to_morse(alphanum){
  var array_morse = new Array();
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

function on_morse_input(){
  let str_input = $("#morse_input").val();
  let str_regex = new RegExp("[A-Z0-9 ]+");
  str_input = str_input.toUpperCase();
  str_output = "";
  let array = [...str_input.matchAll(str_regex)];
  for (let i=0; i<array.length; i++){
    str_output = str_output + array[i];
  }
  $("#morse_input").val(str_output);
  alphanum_to_morse(str_output);
}
