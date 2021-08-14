Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_qulaity: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

Prediction1 = "";
Prediction2 = "";

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}
console.log("ml5 version=" + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/sOikyj2JJ/model.json", modelLoded);

function modelLoded() {
    console.log("model  is loaded");

}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is " + Prediction1;
    speak_data_2 = "And the second prediction is " + Prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, getResult);
}

function getResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        speak();
        if (Prediction1 == "Happy") {
            document.getElementById("result_emoji").innerHTML = "&#128522";
        }
        if (Prediction1 == "Sad") {
            document.getElementById("result_emoji").innerHTML = "&#128532";
        }
        if (Prediction1 == "Angry") {
            document.getElementById("result_emoji").innerHTML = "&#128548";
        }
        if (Prediction1 == "crying") {
            document.getElementById("result_emoji").innerHTML = "&#128546";
        }

        if (Prediction2 == "Happy") {
            document.getElementById("result_emoji2").innerHTML = "&#128522";
        }
        if (Prediction2 == "Sad") {
            document.getElementById("result_emoji2").innerHTML = "&#128532";
        }
        if (Prediction2 == "Angry") {
            document.getElementById("result_emoji2").innerHTML = "&#128548";
        }
        if (Prediction2 == "crying") {
            document.getElementById("result_emoji2").innerHTML = "&#128546";
        }
    }
}