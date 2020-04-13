let mic, recorder, soundFile;

var RecordState = false;
var Color;
var duration = 3;
var startPoint = 0;


let gyroscope = new Gyroscope({frequency: 60});

gyroscope.addEventListener('reading', e => {
  console.log("Angular velocity along the X-axis " + gyroscope.x);
  console.log("Angular velocity along the Y-axis " + gyroscope.y);
  console.log("Angular velocity along the Z-axis " + gyroscope.z);
});
gyroscope.start();

function setup() {
    
    createCanvas(windowWidth, windowHeight);

    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    soundFile = new p5.SoundFile();

    Color = color(250, 250, 250);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {

    if (state) {
        RecordState = !RecordState;
    }
    if (RecordState) {
        recorder.record(soundFile);
        Color = color(255, 0, 0);
        startPoint = millis();

    }
    else {
        recorder.stop();
        Color = color(255, 255, 255);


    }
}
function mouseClicked(state){
console.log(state)
}
function mouseReleased() {
    if (soundFile.isLoaded() && !RecordState) {
        soundFile.loop();
        duration = soundFile.duration();
    }
}
function mouseMoved() {
    userStartAudio();
}
function draw() {

    background("#fab413");

    var Volume = mic.amplitude.volume;
    Graph(Volume, Color);

}

function Graph(Volume, Color) {
    push();
    noFill();
    strokeWeight(80 * Volume + 20);
    stroke(Color);
    ellipse(windowWidth / 2, windowHeight / 2, windowHeight / 3, windowHeight / 3);
    var start = 0;
    pop();
    push();

    var x = Math.cos(map(millis(), 0, duration * 1000, 0, 2 * PI)) * windowHeight / 4 + windowWidth / 2;
    var y = Math.sin(map(millis(),0, duration * 1000, 0, 2 * PI)) * windowHeight / 4 + windowHeight / 2;


    var x2 = Math.cos(- PI/2) * windowHeight / 4 + windowWidth / 2;
    var y2 = Math.sin(- PI/2) * windowHeight / 4 + windowHeight / 2;

    noFill();
    stroke(255);
    strokeWeight(5);
    ellipse(x, y, 20, 20);
    ellipse(x2, y2, 20, 20);
    pop();
}

