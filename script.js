import { generateRandom } from "./helper.js";
import { colors, balls, ballsCount, speedLimit } from "./config.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Ball {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 4;
    this.color = colors[generateRandom(colors.length, false)];
  }

  generate() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }

  collision() {
    //for corners
    if (
      (this.x - this.radius < 0 &&
        (this.y - this.radius < 0 || this.y + this.radius > canvas.height)) ||
      (this.x + this.radius > canvas.width &&
        (this.y - this.radius < 0 || this.y + this.radius > canvas.height))
    ) {
      this.dx = -this.dx;
      this.dy = -this.dy;
    }
    //for edges
    else if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    } else if (
      this.y + this.radius > canvas.height ||
      this.y - this.radius < 0
    ) {
      this.dy = -this.dy;
    }
  }
}

for (let i = 0; i < ballsCount; i++) {
  let x = generateRandom(canvas.width);
  let y = generateRandom(canvas.height);
  let dx = generateRandom(speedLimit, false);
  let dy = generateRandom(speedLimit, false);

  let ball = new Ball(x, y, dx, dy);
  balls.push(ball);
}

function collisionBetweenBalls() {
  balls.forEach((ball) => {
    balls.forEach((nextBall) => {
      if (
        //for horizontal collision
        ball.x + ball.radius > nextBall.x - nextBall.radius &&
        ball.x + ball.radius < nextBall.x + nextBall.radius &&
        ball.y > nextBall.y - nextBall.radius &&
        ball.y < nextBall.y + nextBall.radius
      ) {
        ball.dx = -ball.dx;
        nextBall.dx = -nextBall.dx;
        console.log("collided");
      } else if (
        //for vertical collision
        ball.y + ball.radius > nextBall.y - nextBall.radius &&
        ball.y + ball.radius < nextBall.y + nextBall.radius &&
        ball.x > nextBall.x - nextBall.radius &&
        ball.x < nextBall.x + nextBall.radius
      ) {
        ball.dy = -ball.dy;
        nextBall.dy = -nextBall.dy;
      }
    });
  });
}

function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.generate();

    ball.move();
    ball.collision();
  });

  collisionBetweenBalls();
  requestAnimationFrame(init);
}

init();
