let selectedShape = 'square';
let shapes = [];
let progressBarWidth = 0;
let startTime;
let squareButton;
let triangleButton;
let circleButton;
let tryAgainTextVisible = false;
let wellDoneTextVisible = false;
let squareCount, circleCount, triangleCount;
let initialDisplay = true;

function setup() {
  createCanvas(400, 400);
  background(220);
  noFill();
  stroke(0);

  // Generate random starting numbers for each shape
  squareCount = floor(random(1, 21));   // Random number between 1 and 20
  triangleCount = floor(random(1, 21)); // Random number between 1 and 20
  circleCount = floor(random(1, 21));   // Random number between 1 and 20

  // Create buttons for shape selection
  createShapeButtons();

  // Start the timer
  startTime = millis();
}

function draw() {
  // Draw the progress bar
  drawProgressBar();

  if (!tryAgainTextVisible && !wellDoneTextVisible) {
    // Draw the shapes if tryAgainText and wellDoneText are not visible
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      strokeWeight(1); // Set stroke weight to 1 for shapes
      if (shape.type === 'square') {
        fill(255, 0, 0); // Red
        stroke(0); // Black stroke
        rect(shape.x, shape.y, 30, 30);
      } else if (shape.type === 'triangle') {
        fill(0, 0, 255); // Blue
        stroke(0); // Black stroke
        triangle(shape.x, shape.y, shape.x + 30, shape.y, shape.x + 15, shape.y - 30);
      } else if (shape.type === 'circle') {
        fill(0, 255, 0); // Green
        stroke(0); // Black stroke
        ellipse(shape.x, shape.y, 30, 30);
      }
    }
  }

  // Display "well done" text if the counts are matched
  if (squareCount === 0 && triangleCount === 0 && circleCount === 0) {
    displayWellDoneText();
  } else if (progressBarWidth >= width && !tryAgainTextVisible) {
    tryAgainTextVisible = true;
    displayTryAgainText();
  }

  // Display the starting numbers only at the beginning
  if (initialDisplay) {
    displayStartingNumbers();
    initialDisplay = false;
  }
}

function displayStartingNumbers() {
  // Display the starting numbers with the "Orbitron" font
  fill(0);
  textSize(16);
  textAlign(LEFT);
  textFont("Orbitron");
  text(`Square: ${squareCount}`, 10, 20);
  text(`Triangle: ${triangleCount}`, 10, 40);
  text(`Circle: ${circleCount}`, 10, 60);
}

function displayWellDoneText() {
  fill(0, 255, 0); // Text color (green)
  textSize(24);
  textAlign(CENTER, CENTER);
  textFont("Orbitron");
  text('Well Done', width / 2, height / 2);
  wellDoneTextVisible = true;
}

function displayTryAgainText() {
  fill(255, 0, 0); // Text color (red)
  textSize(24);
  textAlign(CENTER, CENTER);
  textFont("Orbitron");
  text('Try Again', width / 2, height / 2);
}

function createShapeButtons() {
  // Create buttons for shape selection below the canvas, centered
  let buttonWidth = 80;
  let buttonHeight = 30;
  let canvasCenterX = width / 2;
  let buttonSpacing = 20;

  squareButton = createButton('Square');
  squareButton.position(canvasCenterX - buttonWidth - buttonSpacing, height + 10);
  squareButton.mousePressed(function () {
    if (!wellDoneTextVisible) {
      selectedShape = 'square';
      tryAgainTextVisible = false;
    }
  });

  triangleButton = createButton('Triangle');
  triangleButton.position(canvasCenterX - buttonWidth / 2, height + 10);
  triangleButton.mousePressed(function () {
    if (!wellDoneTextVisible) {
      selectedShape = 'triangle';
      tryAgainTextVisible = false;
    }
  });

  circleButton = createButton('Circle');
  circleButton.position(canvasCenterX + buttonSpacing + 5, height + 10);
  circleButton.mousePressed(function () {
    if (!wellDoneTextVisible) {
      selectedShape = 'circle';
      tryAgainTextVisible = false;
    }
  });
}

function checkButtonClicked(button, x, y, w, h) {
  // Check if the mouse is inside the button
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function drawProgressBar() {
  // Calculate the progress based on time
  let currentTime = millis();
  let elapsed = currentTime - startTime;
  progressBarWidth = map(elapsed, 0, 15000, 0, width); // Extended to 15 seconds

  // Draw the progress bar
  noStroke();
  fill(50, 150, 200); // Progress bar color
  rect(0, height - 10, progressBarWidth, 10);
}

function mousePressed() {
  if (!wellDoneTextVisible) {
    if (checkButtonClicked(squareButton, squareButton.x, squareButton.y, squareButton.width, squareButton.height)) {
      selectedShape = 'square';
      tryAgainTextVisible = false;
    } else if (checkButtonClicked(triangleButton, triangleButton.x, triangleButton.y, triangleButton.width, triangleButton.height)) {
      selectedShape = 'triangle';
      tryAgainTextVisible = false;
    } else if (checkButtonClicked(circleButton, circleButton.x, circleButton.y, circleButton.width, circleButton.height)) {
      selectedShape = 'circle';
      tryAgainTextVisible = false;
    } else if (mouseY < height) {
      // Create a shape with the selected type and mouse position
      let newShape = {
        type: selectedShape,
        x: mouseX,
        y: mouseY,
      };

      // Add the shape to the array
      shapes.push(newShape);

      // Decrease the corresponding shape count
      if (selectedShape === 'square') {
        squareCount--;
      } else if (selectedShape === 'triangle') {
        triangleCount--;
      } else if (selectedShape === 'circle') {
        circleCount--;
      }
    }
  }
}
