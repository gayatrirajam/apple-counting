x = 0;
y = 0;

var screen_width = 0;
var screen_height = 0;
var apple = "";
var draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var speak_data = "";
var recognition = new SpeechRecognition();
var to_number = "";

function preload(){
  apple = loadImage('apple.png');
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas=createCanvas(screen_width, screen_height-150);
  canvas.position(0, 150);
}
 
recognition.onresult = function(event) {
  content = event.results[0][0].transcript;
 to_number = Number(content);
 if(Number.isInteger(to_number)){
  document.getElementById("status").innerHTML = "Started drawing apple...";
  draw_apple = "set";
  console.log(event);
 }
 else{
  document.getElementById("status").innerHTML = "The speech has not been recognised as a number. Please try again.";
 }
    document.getElementById("status").innerHTML = "The speech has been recognized as: " + content;

}

function draw() {
  if(draw_apple == "set"){
    for(var i = 1; i <= to_number; i++)
    {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number;
    draw_apple = "";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
function clear_canvas(){
  clear();
}
