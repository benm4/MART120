let player;
let obstacles = [];
let nonMovingObstacle;
let exit;

function setup() {
  createCanvas(600, 400);
  player = createPlayer(width / 2, height / 2);
  exit = createExit(width - 30, height - 30);

  // Add initial moving obstacles
  for (let i = 0; i < 5; i++) {
    obstacles.push(createRandomMovingObstacle());
  }
}

function draw() {
  background(220);

  movePlayer();
  drawPlayer();

  moveObstacles();
  drawObstacles();

  drawExit();
  drawExitLabel(); // Added label

  // Check if the player reached the exit
  if (checkExit()) {
    textSize(32);
    fill(0, 255, 0);
    text("Congratulations! You won!", width / 4, height / 2);
  }
}

function createPlayer(x, y) {
  return {
    x,
    y,
    width: 20,
    height: 20,
    color: color(0, 0, 255),
    speed: 5
  };
}

function drawPlayer() {
  fill(player.color);
  rect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
  if (keyIsDown(UP_ARROW) && player.y > 0) {
    player.y -= player.speed;
  }
  if (keyIsDown(DOWN_ARROW) && player.y < height - player.height) {
    player.y += player.speed;
  }
  if (keyIsDown(LEFT_ARROW) && player.x > 0) {
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) && player.x < width - player.width) {
    player.x += player.speed;
  }
}

function createRandomMovingObstacle() {
  return {
    x: random(width),
    y: random(height),
    width: random(10, 30),
    height: random(10, 30),
    speedX: random(-2, 2),
    speedY: random(-2, 2),
    color: color(random(255), random(255), random(255))
  };
}

function moveObstacles() {
  for (let obstacle of obstacles) {
    obstacle.x += obstacle.speedX;
    obstacle.y += obstacle.speedY;

    // Wrap around the canvas if obstacle leaves the screen
    if (obstacle.x > width) {
      obstacle.x = 0 - obstacle.width;
    } else if (obstacle.x < 0 - obstacle.width) {
      obstacle.x = width;
    }

    if (obstacle.y > height) {
      obstacle.y = 0 - obstacle.height;
    } else if (obstacle.y < 0 - obstacle.height) {
      obstacle.y = height;
    }
  }
}

function drawObstacles() {
  for (let obstacle of obstacles) {
    fill(obstacle.color);
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }

  // Draw non-moving obstacle
  if (nonMovingObstacle) {
    fill(nonMovingObstacle.color);
    rect(
      nonMovingObstacle.x,
      nonMovingObstacle.y,
      nonMovingObstacle.width,
      nonMovingObstacle.height
    );
  }
}

function createExit(x, y) {
  return {
    x,
    y,
    width: 20,
    height: 20,
    color: color(255, 255, 0)
  };
}

function drawExit() {
  fill(exit.color);
  rect(exit.x, exit.y, exit.width, exit.height);
}

function drawExitLabel() {
  textSize(16);
  fill(0);
  text("Exit", exit.x - 25, exit.y - 10);
}

function checkExit() {
  return (
    player.x < exit.x + exit.width &&
    player.x + player.width > exit.x &&
    player.y < exit.y + exit.height &&
    player.y + player.height > exit.y
  );
}

function mouseClicked() {
  // Add non-moving obstacle at the mouse click position
  nonMovingObstacle = createObstacle(
    mouseX,
    mouseY,
    20,
    20,
    0,
    color(128, 0, 128)
  );
}

function keyPressed() {
  // Add random moving obstacle
  if (key === " ") {
    obstacles.push(createRandomMovingObstacle());
  }
}
