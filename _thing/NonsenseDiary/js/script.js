var final_script = '', interim_transcript = '';
var start_timestamp;
var recog_timestamp, time;
var recognizing = false;
var recognition;
var theButton;
var pauseCount = 0;
var tmpString1 = '', tmpString2 = '';
var firstHappened = false, firstHappened2 = false;

function init() {

	theButton = document.getElementById("start_button");

	// Speech API
		if(!("webkitSpeechRecognition" in window)) {
			upgrade();
		} else {
			recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = "en-US";

			recognition.onstart = function() {
				recognizing = true;
			}

			recognition.onerror = function(event) {

				if(event.error == "no-speech"){
					console.log("error: no-speech");
				}
				if(event.error == "audio-capture") {
					console.log("error: audio-capture");
				}
				if(event.error == "not-allowed"){
					if(event.timeStamp - start_timestamp<100){
						console.log("error: info blocked");
					}else{
						console.log("error: info denied");
					}				
				}
			}

			recognition.onend = function(){
				recognizing = false;
				if(!final_script){
					console.log("!final_script");
					return;
				}
				console.log("recognition.onend");

			}

			recognition.onresult = function(event){
				var interim_transcript = '';
				// console.log(event.results);

				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if(event.results[i].isFinal){
						// console.log("isFinal");
						final_script += event.results[i][0].transcript;
					} else {
						interim_transcript += event.results[i][0].transcript;
					}
					// console.log(event.results[i][0].transcript);

					console.log(interim_transcript);
					console.log(event.timeStamp);
				};

				//display on the website
					// regular expression
					final_script = capitalize(final_script);
					// final_script = linebreak(final_script);

				final_span.innerHTML = final_script;
				interim_span.innerHTML = interim_transcript;

				// counting stuff
					recog_timestamp = event.timeStamp;

					// if(event.timeStamp - recog_timestamp>1000){
					// 	console.log("p a u s e .");
					// 	recog_timestamp = event.timeStamp;
					// }

			}
		}

	// Rita
		// var words = RiTa.tokenize("The elephant took a bite!")
		//    for (var i=0, j = words.length; i<j; i++) {
		//        console.log(words[i]);
		//    }

	// Swagger-js


	//
	animate();			
}

function animate() {
	requestAnimationFrame(animate);

	update();
}

function update() {


	if( recognizing && (time - recog_timestamp>1000) ) {
		pauseCount++;
		console.log("pause: " + pauseCount);

		// in the beginning
		// assign final_script to my_span
			if(final_script!='' && !firstHappened) {
				my_span.innerText = final_script;
				my_span.innerText += '\n';
				firstHappened = true;
				console.log("only once!");
			}

		// change line!
			tmpString1 = my_span.innerText.replace( /\r\n|\r|\n/gm, " ");	// remove line break
			// tmpString1 = my_span.innerHTML.replace( /<br\s*[\/]?>/gm, "");	// remove line break
			tmpString1 = tmpString1.replace( /^\s*|\s*$/g, "");		// remove white space

			console.log("my_span.innerText.replace result:" + tmpString1 + ".");
			console.log("current final_script:" + final_script + ".");

			// if(firstHappened && !firstHappened2){
			// 	tmpString1 += " ";
			// 	firstHappened2 = true;
			// }
			if(tmpString1==final_script) console.log("same!");

			tmpString2 = final_script.replace( tmpString1, "");
			tmpString2 = tmpString2.replace( /^\s*|\s*$/g, "");
			// console.log("script to add:" + tmpString2 + ".");

			if(tmpString2!=""){
				// my_span.innerHTML += " ";
				console.log("add tmpString2:" + tmpString2 + ".");
				var lChar = my_span.innerText.match(/.$/);
				// my_span.innerText = my_span.innerText.replace( /.$/, lChar + " " + tmpString2);
				my_span.innerText += tmpString2;
				my_span.innerText += '\n';

				console.log("new input!");
				console.log("my_span.innerText result:" + my_span.innerText + ".");
			}
		recog_timestamp = Date.now();
	}

	time = Date.now();

}

function startButton(event){
	// stop
	if(recognizing){
		console.log("final_script: " + final_script);
		recognition.stop();
		theButton.textContent = "start";
		return;
	}

	// restart
	final_script = "";
	recognition.start();
	theButton.textContent = "stop";

	start_timestamp = event.timeStamp;
	recog_timestamp = event.timeStamp;
	time = Date.now();
}

function startButton(event){
	// stop
	if(recognizing){
		console.log("final_script: " + final_script);
		recognition.stop();
		theButton.textContent = "start";
		return;
	}

	// restart
	final_script = "";
	recognition.start();
	theButton.textContent = "stop";

	start_timestamp = event.timeStamp;
	recog_timestamp = event.timeStamp;
	time = Date.now();
}