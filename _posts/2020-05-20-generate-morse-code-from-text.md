---
title: Generate Morse Code From Text
tags: [coding, morse]
published: true
archived: true
---
Use the following input to translate your text into a visual representation of Morse code. The input only accepts alphanumeric values and vice versa. See [Wikipedia Morse Code](https://en.wikipedia.org/wiki/Morse_code) for more information.

<div id="morse-wrap">
	<label for="text-input">Text-To-Morse</label>
	<input name="text-input" id="text-input" class="fg-medium-grey bg-light-grey" type="text" oninput="onTextInput();">
	<div id="morse-output" class="word-wrap"></div>
	<label for="morse-input">Morse-To-Text</label>
	<input name="morse-input" id="morse-input"  class="fg-medium-grey bg-light-grey" type="text" oninput="onMorseInput();">
	<div id="text-output" class="word-wrap"></div>
</div>

<script type="text/javascript" src="/assets/js/morse.js" />
