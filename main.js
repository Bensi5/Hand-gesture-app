Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_qulaity: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
Prediction1 = "";

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}
console.log("ml5 version=" + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ymUuCEyq4/model.json", modelLoaded);
function modelLoaded() {
    console.log("model is loaded")
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "the  prediction is " + Prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, getResult);
}

function getResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        Prediction1= results[0].label;
        speak()
        if (Prediction1 == "Amazing") {
            document.getElementById("result_emoji").innerHTML = "&#128076;";

    if(Prediction1=="Best"){
        document.getElementById("result_emoji").innerHTML="&#128077";
    }
    if(Prediction1=="Loser"){
     document.getElementById("result_emoji").innerHTML="&#128078";
    }
    if(Prediction1=="Victory"){
        document.getElementById("result_emoji").innerHTML="&#128078";
    }
        }
    }
}