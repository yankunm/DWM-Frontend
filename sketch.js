let inputImg;
let historySlider, fpsSlider;

let groundTruthVid;
let generatedVid;
let showGeneratedVid = false; // Flag to control visibility of generated video

function preload() {
  inputImg = loadImage('image.png');
}

function setup() {
  createCanvas(800, 400);
  background(30);

  // Create interactive sliders
  historySlider = createSlider(1, 6, 4);
  historySlider.position(20, 300);

  fpsSlider = createSlider(1, 20, 7);
  fpsSlider.position(20, 360);

  initButton();

  groundTruthVid = createVideo("robot.mp4");
  groundTruthVid.size(400, 400);
  groundTruthVid.volume(0);
  groundTruthVid.loop();
  groundTruthVid.hide(); // hides the html video loader

  generatedVid = createVideo("robot.mp4");
  generatedVid.size(400, 400);
  generatedVid.volume(0);
  generatedVid.loop();
  generatedVid.hide(); // hides the html video loader
  drawTitle();
  drawVideoPanels();
  drawSlidersTitles();
}

function draw() {
  drawGroudTruthVideo();

  // Only draw the generated video if the flag is true
  if (showGeneratedVid) {
    drawGeneratedVideo();
  }
}

function drawGroudTruthVideo() {
  let img1 = groundTruthVid.get();
  let videoWidth = 200; // Adjust the width of the video
  let videoHeight = 150; // Adjust the height of the video
  image(img1, 285, 80, videoWidth, videoHeight); // Adjust the position and size of the video

  fill(255);
  textSize(40);
  counter = nf(groundTruthVid.time(), 0, 2); // first argument is decimal places to the left (use zero to default to places necessary)
  text(counter, 10, 430);
}

function drawGeneratedVideo() {
  let img2 = generatedVid.get();
  let videoWidth = 200; // Adjust the width of the video
  let videoHeight = 150; // Adjust the height of the video
  image(img2, 545, 80, videoWidth, videoHeight); // Adjust the position and size of the video

  fill(255);
  textSize(40);
  counter = nf(generatedVid.time(), 0, 2); // first argument is decimal places to the left (use zero to default to places necessary)
  text(counter, 10, 430);
}

// Title and Description
function drawTitle() {
  fill(255, 165, 0);
  textSize(20);
  text("ECE 487 Duke World Model", 20, 30);

  fill(200);
  textSize(14);
  text("Diffusion Forcing Transformer", 20, 50);
}

// Video Panels
function drawVideoPanels() {
  image(inputImg, 20, 80, 200, 150);
  fill(255);
  textSize(12);
  text("Input Image", 85, 250);
  text("Ground Truth Video", 330, 250);
  text("Generated Video", 600, 250);
}

// Sliders
function drawSlidersTitles() {
  fill(200);
  textSize(12);
  text("History Guidance Scale ", 20, 290);
  text("FPS ", 20, 350);
}

// Button Actions
function initButton() {
  button = createButton('Generate Video');
  button.position(10, height + 10);

  button.style('background-color', 'red'); // Set background color
  button.style('color', 'white'); // Set text color
  button.style('padding', '10px 20px'); // Set padding
  button.style('font-size', '16px'); // Set font size
  button.style('font-family', 'Arial, sans-serif'); // Set font family
  button.style('border', 'none'); // Remove border
  button.style('border-radius', '5px'); // Add border radius

  // Set up mouseOver and mouseOut events for the button
  button.mouseOver(onHover);
  button.mouseOut(onHoverOut);

  // Use the button to show the generated video and reset it to start
  button.mousePressed(() => {
    // Toggle the flag to show/hide the generated video
    showGeneratedVid = !showGeneratedVid;

    // If showing the generated video, reset it to the beginning
    if (showGeneratedVid) {
      generatedVid.time(0);  // Reset video to start
      groundTruthVid.time(0);
      generatedVid.play();   // Play the video from the beginning
    }

    console.log("Generating video with:");
    console.log("History Guidance Scale:", historySlider.value());
    console.log("FPS:", fpsSlider.value());
  });
}

// Hover effects for the button
function onHover() {
  button.style('background-color', '#ff5733'); // Set hover background color
}

function onHoverOut() {
  button.style('background-color', 'red'); // Set initial background color
}
