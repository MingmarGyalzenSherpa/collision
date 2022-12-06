import { generateRandom } from "./helper.js";
import { balls, ballsCount, speedLimit } from "./config.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Ball {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 4;
  }

  generate() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }

  collision() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    } else if (
      this.y + this.radius > canvas.height ||
      this.y - this.radius < 0
    ) {
      this.dy = -this.dy;
    }
  }
}

generateRandom(speedLimit);

for (let i = 0; i < ballsCount; i++) {
  let x = generateRandom(canvas.width);
  let y = generateRandom(canvas.height);
  let dx = generateRandom(speedLimit, false);
  let dy = generateRandom(speedLimit, false);

  let ball = new Ball(x, y, dx, dy);
  balls.push(ball);
}

function collisionBetweenBalls() {
  balls.forEach((ball, i) => {
    balls.forEach(function (nextBall, j) {
      if (ball.x > nextBall.x || ball.x < nextBall.x) {
        ball.dx = -ball.dx;
      } else if (ball.y > nextBall.y || ball.y < nextBall.y) {
        ball.dy = -ball.dy;
      }
    });
  });
}

balls.forEach((ball) => console.log(ball));
console.log(typeof balls[0].x);
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
