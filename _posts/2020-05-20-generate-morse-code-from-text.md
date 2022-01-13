---
title: Generate Morse Code From Text
tags: [coding, morse]
published: true
archived: true
---
Use the following input to translate your text into a visual representation of Morse code. The input only accepts alphanumeric values and vice versa. See [Wikipedia Morse Code](https://en.wikipedia.org/wiki/Morse_code) for more information.

<div>
	<label for="text-input">Text-To-Morse</label>
	<input id="text-input" name="text-input" type="text" oninput="onTextInput();">
	<p id="morse-output" class="word-wrap"></p>
	<label for="morse-input">Morse-To-Text</label>
	<input id="morse-input" name="morse-input" type="text" oninput="onMorseInput();">
	<p id="text-output" class="word-wrap"></p>
</div>

<script type="text/javascript" src="/assets/js/morse.js" />
