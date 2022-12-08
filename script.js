import { generateRandom } from "./helper.js";
import { colors, balls, ballsCount, speedLimit } from "./config.js";

const quantity = document.querySelector("#quantity");
const btn = document.getElementById("btn");
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
  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      if (i == j) continue;
      if (
        //for horizontal collision
        balls[i].x + balls[i].radius > balls[j].x - balls[j].radius &&
        balls[i].x + balls[i].radius < balls[j].x + balls[j].radius &&
        balls[i].y > balls[j].y - balls[j].radius &&
        balls[i].y < balls[j].y + balls[j].radius
      ) {
        balls[i].dx = -balls[i].dx;
        balls[j].dx = -balls[j].dx;
        console.log("collided");
      } else if (
        //for vertical collision
        balls[i].y + balls[i].radius > balls[j].y - balls[j].radius &&
        balls[i].y + balls[i].radius < balls[j].y + balls[j].radius &&
        balls[i].x > balls[j].x - balls[j].radius &&
        balls[i].x < balls[j].x + balls[j].radius
      ) {
        balls[i].dy = -balls[i].dy;
        balls[j].dy = -balls[j].dy;
      }
    }
  }
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
