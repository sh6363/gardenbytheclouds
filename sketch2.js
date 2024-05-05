// let w = false;
let w;
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

//load the JSON file
function preload() {
  data = loadJSON("chatbots.json");
  light = loadSound("blink.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  //button to start speaking
  speakBttn = createButton("START");
  speakBttn.size(100, 30);
  speakBttn.position(width / 2 - speakBttn.width / 2, height / 2);
 speakBttn.mousePressed(startListening); //callback to let the chatbot respond
  textAlign(CENTER);
  rectMode(CENTER);
  console.log(data);
  
  // port = createSerial();
  // let usedPorts = usedSerialPorts();
  // if (usedPorts.length > 0){
  //   port.open(usedPorts[0], 9600);
 // }
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80,200);
//  connectBtn.mousePressed(connectBtnClick);
  
  stopListeningBtn = createButton('Stop Listening');
  stopListeningBtn.position(80,250);
//  stopListeningBtn.mousePressed(stopListeningBtnClick);

  // Create the textbox
  inputBox = createInput();
  inputBox.position(80, 300); 
  inputBox.attribute('autofocus', 'true');
  // Call function when Enter key is pressed in the input box
//  inputBox.changed(checkInput);
}


function textDisplay() //display text in the starting
{
text("PRESS SPACE TO START SERIAL PORT", width/2 - 109, height/2 - 5);
}

function draw() {
  
  if (serialActive) //if serial is active
{
text("connected", width/2 - 27, height/2 - 5); //tell the user that it is connected
text("Drag the mouse horizontally to change brighthess", width/2 - 130, height/2 + 15); //give instructions on how to control brightness
}
  
  
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
   
 
   
  if (w == true) {
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
  

function startListening() {
  //start mic
  mic.start();

  //start recognition
  myRec.start();

 //turn listening to true 
  myRec.onEnd = function recEnded() {
   
  
  }; //when it ends, turning listening to false

  //resumes audio context
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
  //set up recognition callback, what happens when there is a word recognized
  myRec.onResult = answerMe;
}

function answerMe() {
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
        writeSerial(w);
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






function keyTyped() //built in function
{
  if (keyCode == ENTER) {
    setUpSerial(); //setup the serial
  }
    
}

//callback function
function readSerial(data){
  let sendToArduino = w; //add the next line to dimness counter
 //write serial and send to arduino
  writeSerial(w);
}