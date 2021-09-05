setOutput("0");

function getHistory() {
	/**
	 * Returns a string representing the history.
	 * @returns {string}
	 */
	return document.getElementById("history-value").innerText;
}

function setHistory(newValue) {
	/**
	 * Sets a new value to the history.
	 * @param {string} newValue
	 */
	document.getElementById("history-value").innerText = newValue;
}

function getOutput() {
	/**
	 * Returns a string representing the output.
	 * @returns {string}
	 */
	return document.getElementById("output-value").innerText;
}

function setOutput(newValue) {
	/**
	 * Sets a new value to the output.
	 * @param {string} newValue
	 */
	if (newValue == "") {
		document.getElementById("output-value").innerText = newValue;
	} else {
		document.getElementById("output-value").innerText = getFormattedNumber(newValue);
	}
}

function getFormattedNumber(stringNumber) {
	/**
	 * Transforms a string like "123456" into its formatted version "123,456"
	 * @param {string} stringNumber
	 * @return {string}
	 */
	 if (stringNumber == "-") {
	 	return "";
	 }
	var integerNumber = Number(stringNumber);
	return integerNumber.toLocaleString("en");
}

function reverseNumberFormat(stringNumber) {
	/**
	 * Transforms a string like "1,241,300" into its unformatted integer version 1241300
	 * @param {string} stringNumber
	 * @return {string}
	 */
	return Number(stringNumber.replace(/,/g,''));
}

var operatorsList = document.getElementsByClassName("operator");
for (var i = 0; i < operatorsList.length; i++) {
	operatorsList[i].addEventListener("click", function() {
		if (this.id == "clear") {
			setHistory("");
			setOutput("0");
		} else if (this.id == "backspace") {
			var output = reverseNumberFormat(getOutput()).toString();
			if (output.length == 1 || output.length == 2 && output[0] == "-") {
				setOutput("0");
			} else {
				var newOutput = output.substring(0, output.length - 1);
				setOutput(newOutput);
			}
		} else {
			var output = reverseNumberFormat(getOutput());
			var history = getHistory();
			history = history + output;
			if (this.id == "=") {
				var result = eval(history);
				setHistory("");
				setOutput(result);
			} else {
				history = history + this.id;
				setHistory(history);
				setOutput("0");
			}
		}

	})
}

var numbersList = document.getElementsByClassName("number");
for (var i = 0; i < numbersList.length; i++) {
	numbersList[i].addEventListener("click", function() {
		var output = reverseNumberFormat(getOutput()); // output = integer
		if (output != NaN) {
			// output is a number
			output = output + this.id; // output = string
			setOutput(output);
		}
	})
}

