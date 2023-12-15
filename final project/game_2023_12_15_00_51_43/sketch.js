  let player;
    let bullets = [];
    let enemies = [];
    let enemyRows = 5;
    let enemyCols = 10;
    let level = 1;
    let score = 0;

    function setup() {
      createCanvas(800, 600);
      player = new Player();
      createEnemies();
    }

    function draw() {
      background(0);

      player.show();
      player.move();

      for (let bullet of bullets) {
        bullet.show();
        bullet.move();
        for (let enemy of enemies) {
          if (bullet.hits(enemy)) {
            bullets.splice(bullets.indexOf(bullet), 1);
            enemies.splice(enemies.indexOf(enemy), 1);
            score += 10;
          }
        }
      }

      for (let enemy of enemies) {
        enemy.show();
        enemy.move();
        if (enemy.y > height - 40) {
          gameOver();
        }
      }

      if (enemies.length === 0) {
        level++;
        createEnemies();
      }

      fill(255);
      textSize(20);
      text('Score: ' + score, 20, 30);
      text('Level: ' + level, 700, 30);
    }

    function keyPressed() {
      if (keyCode === 32) {
        bullets.push(new Bullet(player.x + 15, height - 20));
      }
    }

    function createEnemies() {
      enemies = [];
      for (let i = 0; i < enemyRows; i++) {
        for (let j = 0; j < enemyCols; j++) {
          enemies.push(new Enemy(j * 60 + 80, i * 40 + 40));
        }
      }
    }

    function gameOver() {
      noLoop();
      fill(255);
      textSize(32);
      text('Game Over', width / 2 - 100, height / 2);
      textSize(20);
      text('Your Score: ' + score, width / 2 - 80, height / 2 + 40);
    }

    class Player {
      constructor() {
        this.x = width / 2;
        this.y = height - 20;
      }

      show() {
        fill(0, 0, 255);
        rectMode(CENTER);
        rect(this.x, this.y, 30, 20);
      }

      move() {
        if (keyIsDown(LEFT_ARROW) && this.x > 15) {
          this.x -= 5;
        } else if (keyIsDown(RIGHT_ARROW) && this.x < width - 15) {
          this.x += 5;
        }
      }
    }

    class Bullet {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      show() {
        fill(255);
        noStroke();
        ellipse(this.x, this.y, 8, 8);
      }

      move() {
        this.y -= 5;
      }

      hits(enemy) {
        let d = dist(this.x, this.y, enemy.x, enemy.y);
        return d < 15;
      }
    }

    class Enemy {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 15;
      }

      show() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
      }

      move() {
        this.x += sin(frameCount * 0.05) * 2; // Add some horizontal oscillation
        this.y += 1;
      }
    }
