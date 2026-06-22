let currentSpeed = 1000;
const MIN_SPEED = 100;
const SPEED_STEP = 200;
const SPEED_UP_INTERVAL = 20000;
let speedInterval;
function speedUpSolo() {
  if (currentSpeed > MIN_SPEED) {
    currentSpeed -= SPEED_STEP;
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      if (!board.gameOver && board.isPlaying) {
        brick.moveDown();
      }
    }, currentSpeed);
  }
}

function speedUpDuo() {
  if (currentSpeed > MIN_SPEED) {
    currentSpeed -= SPEED_STEP;
    clearInterval(dualInterval);
    dualInterval = setInterval(() => {
      if (board1.isPlaying && !board1.gameOver) {
        brick1.moveDown();
      }
      if (board2.isPlaying && !board2.gameOver) {
        brick2.moveDown();
      }
    }, currentSpeed);
  }
}
