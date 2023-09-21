prediction1 = "";
prediction2 = "";

Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takesnapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="capture_img" src="' + data_uri + '"/>';
  });
}

console.log("ml5 version =", ml5.version);
classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/Mz4bwjAEv/model.json",
  modelLoaded
);

function modelLoaded() {
  console.log("modelLoaded");
}

function speak() {
  var synth = window.speechSynthesis;
  prediction1 = "The first prediction is - " + prediction1;
  prediction2 = "The second prediction is - " + prediction2;
  var utterThis = new SpeechSynthesisUtterance(prediction1 + prediction2);
  synth.speak(utterThis);
}

function image() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}

function gotResult(error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
    document.getElementById("object").innerHTML = result[0].label;
    document.getElementById("accuracy").innerHTML =
      (result[0].confidence * 100).toFixed(2) + "%";
    if (gesture == "amazing") {
      document.getElementById("result_object_gesture_icon").innerHTML = "👌";
    } else if (gesture == "victory") {
      document.getElementById("result_object_gesture_icon").innerHTML = "✌️";
    } else if (gesture == "best") {
      document.getElementById("result_object_gesture_icon").innerHTML = "👍";
    }
    speak();
  }
}
