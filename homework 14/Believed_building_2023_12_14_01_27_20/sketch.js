let player;
let obstacles = [];
let exit;

function setup() {
  createCanvas(600, 400);
  player = createPlayer(width / 2, height / 2);
  exit = createExit(width - 30, height - 30);

  // Create initial obstacles
  for (let i = 0; i < 5; i++) {
    createRandomObstacle();
  }
}

function draw() {
  background(220);

  movePlayer();
  drawPlayer();

  moveObstacles();
  drawObstacles();

  drawExit();

  // Check if the player reached the exit
  if (checkExit()) {
    displayWinMessage();
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

function drawPlayer() {
  fill(player.color);
  rect(player.x, player.y, player.width, player.height);
}

function createRandomObstacle() {
  let obstacle = {
    x: random(width),
    y: random(height),
    width: random(10, 30),
    height: random(10, 30),
    color: color(random(255), random(255), random(255)),
    speedX: random(-2, 2),
    speedY: random(-2, 2)
  };
  obstacles.push(obstacle);
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
  // Draw the word "Exit" above the exit
  fill(exit.color);
  rect(exit.x, exit.y, exit.width, exit.height);
  textSize(16);
  fill(0);
  textAlign(CENTER);
  text("Exit", exit.x + exit.width / 2, exit.y - 5);
}

function checkExit() {
  return (
    player.x < exit.x + exit.width &&
    player.x + player.width > exit.x &&
    player.y < exit.y + exit.height &&
    player.y + player.height > exit.y
  );
}

function displayWinMessage() {
  textSize(32);
  fill(0, 255, 0);
  text("Congratulations! You win!", width / 4, height / 2);
}

function mouseClicked() {
  // Create a non-moving obstacle at the mouse click position
  createRandomObstacle();
}

