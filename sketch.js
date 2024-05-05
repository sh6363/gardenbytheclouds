let customfont;
let data; //variable for json data
let speakBttn; //variable for speak button
let answer = ""; //variable for the answer from the chatbot

let mic, micLevel; //to get the loudness of sound
let botVoice = new p5.Speech(),
  myRec = new p5.SpeechRec('en-US');
// let port;
let connectBtn;
let stopListeningBtn;
let stopListening = false;
let w = 0; 

//load the JSON file
function preload() {
  data = loadJSON("chatbots.json");
  light = loadSound("blink.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  speakBttn = createButton("START");
  speakBttn.size(100, 30);
  speakBttn.position(width / 2 - speakBttn.width / 2, height / 2);
 speakBttn.mousePressed(startListening); //callback to let the chatbot respond
  console.log("Out");
  textAlign(CENTER);
  rectMode(CENTER);
  console.log(data);

}


function draw(){
  background("RosyBrown");
  fill("Khaki");
  textSize(20);
  textFont('Georgia',50)
  text("COMPLIMENT\n BOT", width / 2, height/3);
  //display the lamp
  text(answer, width / 2, (height / 3) * 2, width - 20);
  stroke(150);
  fill(128);
  rect(width/2,25,15,100);
  fill(128,64)
  ellipse(width/2,100,50,50);
  
  if (w == 1) {
    writeSerial("1");
    w = 0;
  }
     
  if (w == 1) {
    stroke(150);
    fill(255,255,0);
    rect(width/2,25,15,100);
    fill(255,255)
    ellipse(width/2,100,50,50)
    light.play();
    setTimeout(stopSound,1500);
    
  
  }
}
function stopSound(){
  light.stop();
  
}
function startListening(){
  console.log("I am listening");
  mic.start();
  myRec.start();
  myRec.onEnd = function recEnded(){
    getAudioContext().state = "stopped";
    
  };
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
  myRec.onResult = answerMe;
}

function answerMe() {
  console.log("In answer me");
  //prepare the input string for analysis
  let inputStr = myRec.resultString;
  inputStr = inputStr.toLowerCase();
  console.log(inputStr);

  //loop through the answers array and match responses to triggers
  loop1: for (let i = 0; i < data.brain.length; i++) {
    w = 0; // Reset w to false for each brain object
    for (let j = 0; j < data.brain[i].triggers.length; j++) {
      if (inputStr.indexOf(data.brain[i].triggers[j]) !== -1) {
        w = 1;
        // writeSerial("1");
        break; // No need to continue checking if a trigger word is found
    }
  }
  if (w) {
    break loop1; // Exit the loop if a trigger word is found
  }
}
  
console.log(w);
  myRec.stop(); //stop the recognition when there is an answer
 // botVoice.speak(answer);
}

function keyTyped() {
  if (keyCode == ENTER) {
    setUpSerial();
  }
  
  if (key === 'h') {
    w = 1;
  }
}