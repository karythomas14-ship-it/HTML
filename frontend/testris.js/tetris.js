const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

let particleAnimationId;
let gameStartTime = 0; // Biến lưu mốc thời gian bắt đầu trận đấu
const BACKEND_URL = "http://localhost:3000/api"; // Endpoint kết nối đến Backend Node.js của bạn

class ExplosionParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 1.2) * 8;
    this.life = 45;
    this.color = color;
    this.size = Math.random() * 4 + 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.08;
    this.life--;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life / 45;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
}

class Board {
  constructor(ctx, scoreId) {
    this.ctx = ctx;
    this.scoreId = scoreId;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;
    this.particles = [];
  }

  generateWhiteBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
  }

  reset() {
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.combo = 0;
    this.gameOver = false;
    this.isPlaying = true;
    document.getElementById(this.scoreId).innerHTML = this.score;
    this.drawBoard();
  }

  async handleGameOver() {
    this.gameOver = true;
    this.isPlaying = false;
    
    // Gọi hàm đồng bộ dữ liệu kết thúc game lên Backend Server
    await saveGameResultToServer(this.score);
    
    showGameOverModal("GAME OVER", "You are out of moves!", this.score);
  }

  drawCell(xAxis, yAxis, colorId) {
    if (typeof isFogActive !== 'undefined' && isFogActive) return;

    const color = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
    const x = xAxis * BLOCK_SIZE;
    const y = yAxis * BLOCK_SIZE;

    // Empty Cell
    if (colorId === WHITE_COLOR_ID) {
        this.ctx.fillStyle = "rgba(8,18,30,0.95)";
        this.ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.strokeStyle = "rgba(255,255,255,0.04)";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        return;
    }

    // Block
    this.ctx.save();
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 10;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x + 2, y + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
    this.ctx.shadowBlur = 0;
    this.ctx.strokeStyle = "rgba(255,255,255,0.25)";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x + 2, y + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
    this.ctx.restore();
  }

  drawBoard() {
    if (typeof isFogActive !== 'undefined' && isFogActive) {
        this.ctx.clearRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        if (typeof applyFog === "function") {
            applyFog();
        }
        return; 
    }

    this.ctx.save();
    this.ctx.shadowColor = "#00bfff";
    this.ctx.shadowBlur = 20;
    this.ctx.strokeStyle = "rgba(0,191,255,.25)";
    this.ctx.strokeRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    this.ctx.restore();
    
    this.ctx.clearRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

    // Background Board
    this.ctx.fillStyle = "#08111D";
    this.ctx.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

    this.drawGrid();

    for (let row = 0; row < this.grid.length; row++) {
        for (let col = 0; col < this.grid[0].length; col++) {
            this.drawCell(col, row, this.grid[row][col]);
        }
    }
  }

  async handleCompleteRows() {
    const completedRows = [];
    for (let row = 0; row < ROWS; row++) {
      if (this.grid[row].every((cell) => cell !== WHITE_COLOR_ID)) {
        completedRows.push(row);
      }
    }
    if (completedRows.length > 0) {
      await this.playLineClearEffect(completedRows);
    }

    this.spawnParticles(completedRows);

    const latestGrid = this.grid.filter((row) =>
      row.some((col) => col === WHITE_COLOR_ID),
    );

    const clearedRows = ROWS - latestGrid.length;

    if (clearedRows > 0) {
      const newRows = Array.from({ length: clearedRows }, () =>
        Array(COLS).fill(WHITE_COLOR_ID),
      );

      this.grid = [...newRows, ...latestGrid];

      let points = 0;

      switch (clearedRows) {
        case 1: points = 40; break;
        case 2: points = 100; break;
        case 3: points = 300; break;
        case 4: points = 1200; break;
      }

      if (this.checkPerfectClear()) {
        points += 1000;
        showPerfectClearEffect();
        spawnFloatingScore(1000, 200, 150);
      }

      this.handleScore(points, 200, 200);
      showLineText(clearedRows);

           if (this.checkPerfectClear()) {

              showSpecialText(
                  "ALL CLEAR"
              );

              setTimeout(() => {

                  showSpecialText(
                      "⭐ LEGENDARY ⭐"
                  );

              }, 800);
          }
          
            if (this.combo >= 2) {

                showComboCounter(
                    "COMBO x" + this.combo
                );
            }
            }
            else {

                this.combo = 0;
            }
            }
  

  handleScore(newScore, x = 0, y = 0) {
    this.score += newScore;
    document.getElementById(this.scoreId).innerText = this.score;
    if (currentMode === "duo") {
      updateScoreDifference();
    }
    addScore(newScore, x, y);
  }

  async playLineClearEffect(rows) {
    rows.forEach((row) => {
      for (let col = 0; col < COLS; col++) {
        this.drawCell(col, row, WHITE_COLOR_ID);
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  spawnParticles(rows) {
    rows.forEach((row) => {
      for (let col = 0; col < COLS; col++) {
        const colorId = this.grid[row][col];
        if (colorId === WHITE_COLOR_ID) continue;
        for (let i = 0; i < 15; i++) {
          this.particles.push(
            new ExplosionParticle(
              col * BLOCK_SIZE + BLOCK_SIZE / 2,
              row * BLOCK_SIZE + BLOCK_SIZE / 2,
              "#ffb300",
            ),
          );
        }
      }
    });
  }

  updateParticles() {
    this.particles = this.particles.filter((particle) => particle.life > 0);

    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(this.ctx);
    });

    if (typeof isFogActive !== 'undefined' && isFogActive && typeof applyFog === "function") {
        applyFog();
    }
  }

  checkPerfectClear() {
    return this.grid.every((row) =>
      row.every((cell) => cell === WHITE_COLOR_ID),
    );
  }

  drawGrid() {
    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;

    for(let r = 0; r <= ROWS; r++){
        this.ctx.beginPath();
        this.ctx.moveTo(0, r * BLOCK_SIZE);
        this.ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
        this.ctx.stroke();
    }

    for(let c = 0; c <= COLS; c++){
        this.ctx.beginPath();
        this.ctx.moveTo(c * BLOCK_SIZE, 0);
        this.ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        this.ctx.stroke();
    }
  }
}

class Brick {
  constructor(id, targetBoard, playerType) {
    this.id = id;
    this.board = targetBoard;
    this.playerType = playerType;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0;
    this.colPos = 3;
    this.rowPos = 0;
    this.colorId = Math.floor(Math.random() * (COLOR_MAPPING.length - 1));
  }

  draw() {
    this.board.drawBoard();
    
    if (typeof isFogActive !== 'undefined' && isFogActive) return;

    this.drawGhost();

    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          this.board.drawCell(
            col + this.colPos,
            row + this.rowPos,
            this.colorId,
          );
        }
      }
    }
  }

  drawGhost() {
    let ghostRow = this.rowPos;
    while (
      !this.checkCollision(
        ghostRow + 1,
        this.colPos,
        this.layout[this.activeIndex],
      )
    ) {
      ghostRow++;
    }
    const ctx = this.board.ctx;
    ctx.save();
    ctx.globalAlpha = 0.15;
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          ctx.fillStyle = COLOR_MAPPING[this.colorId];

          ctx.fillRect(
            (col + this.colPos) * BLOCK_SIZE + 2,
            (row + ghostRow) * BLOCK_SIZE + 2,
            BLOCK_SIZE - 4,
            BLOCK_SIZE - 4
          );
          ctx.strokeRect(
            (col + this.colPos) * BLOCK_SIZE,
            (row + ghostRow) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE,
          );
        }
      }
    }
    ctx.restore();
  }

  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          this.board.drawCell(
            col + this.colPos,
            row + this.rowPos,
            WHITE_COLOR_ID,
          );
        }
      }
    }
  }

  moveLeft() {
    if (this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) return;
    this.clear();
    this.colPos--;
    this.draw();
  }

  moveRight() {
    if (this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) return;
    this.clear();
    this.colPos++;
    this.draw();
  }

  async moveDown() {
    if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
      this.clear();
      this.rowPos++;
      this.draw();
      return;
    }

    await this.handleLanded();
    if (this.board.gameOver) return;
    if (currentMode === "solo") {
      const nextData = generateNextPiece();
      brick = new Brick(nextData.id, board, "solo");
      brick.colorId = nextData.colorId;
      brick.draw();
    } else {
      if (this.playerType === "p1") {
        brick1 = new Brick(getRandomBrick(), board1, "p1");
        brick1.draw();
      } else {
        brick2 = new Brick(getRandomBrick(), board2, "p2");
        brick2.draw();
      }
    }
  }

  rotate() {
    if (this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) return;
    this.clear();
    this.activeIndex = (this.activeIndex + 1) % 4;
    this.draw();
  }

  async hardDrop() {
    let droppedRows = 0;
    while (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
      this.rowPos++;
      droppedRows++;
    }
    this.board.handleScore(droppedRows);

    this.draw();
    await this.handleLanded();
    
    if (this.board.gameOver) return;

    if (currentMode === "solo") {
      const nextData = generateNextPiece();
      brick = new Brick(nextData.id, board, "solo");
      brick.colorId = nextData.colorId;
      brick.draw();
    } else {
      if (this.playerType === "p1") {
        brick1 = new Brick(getRandomBrick(), board1, "p1");
        brick1.draw();
      } else {
        brick2 = new Brick(getRandomBrick(), board2, "p2");
        brick2.draw();
      }
    }
  }

  checkCollision(nextRow, nextCol, nextLayout) {
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID) {
          let newRow = row + nextRow;
          let newCol = col + nextCol;

          if (
            newCol < 0 ||
            newCol >= COLS ||
            newRow >= ROWS ||
            (newRow >= 0 && this.board.grid[newRow][newCol] !== WHITE_COLOR_ID)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  async handleLanded() {
    if (this.rowPos <= 0) {
      this.board.gameOver = true;
      this.board.isPlaying = false;
      
      if (currentMode === "solo") {
        clearInterval(gameInterval);
        await saveGameResultToServer(this.board.score);
        showGameOverModal("GAME OVER", "You lost!", this.board.score);
      } else {
        clearInterval(dualInterval);
        await saveGameResultToServer(Math.max(board1.score, board2.score)); // Lưu điểm cao nhất ở chế độ đấu đôi
        const winner = this.playerType === "p1" ? "Player 2" : "Player 1";
        showGameOverModal(
          "GAME OVER", 
          `${winner} has won!`, 
          `P1: ${board1.score} - P2: ${board2.score}`
        );
      }
      return;
    }

    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          this.board.grid[row + this.rowPos][col + this.colPos] = this.colorId;
        }
      }
    }

    await this.board.handleCompleteRows();
    this.board.drawBoard();

    if (currentMode === "solo") {
      holdUsed = false;
    } else {
      if (this.playerType === "p1") holdUsed1 = false;
      if (this.playerType === "p2") holdUsed2 = false;
    }
  }
}

function generateNewBrick() {
  brick = new Brick(getRandomBrick(), board, "solo");
  brick.draw();
}

// ===== API HỖ TRỢ: Tăng số lượt chơi (Số lần vào game) lên Backend =====
async function trackPlayCount() {
  console.log("TRACK PLAY COUNT RUNNING");
  gameStartTime = Date.now();
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.log("NO TOKEN");
    return;
  }
  try {
    const response = await fetch(`${BACKEND_URL}/stats/increment-play-count`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log("STATUS:", response.status);
  } catch (error) {
    console.error(error);
  }
}

// ===== API HỖ TRỢ: Gửi điểm và thời gian chơi đồng bộ lên SQL Server =====
async function saveGameResultToServer(finalScore) {
  const token = localStorage.getItem("userToken");
  if (!token) return;

  const gameEndTime = Date.now();
  const durationInSeconds = Math.floor((gameEndTime - gameStartTime) / 1000); // Quy đổi thành số giây chơi thực tế

  try {
    // 1. Gửi điểm số lên scoreRoutes.js để cập nhật bảng xếp hạng
    await fetch(`${BACKEND_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        username: localStorage.getItem("currentUser"),
        score: finalScore
      })
    });

    // 2. Gửi thời gian chơi lên statsRoutes.js để cộng dồn vào SQL Server
    await fetch(`${BACKEND_URL}/stats/duration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ duration: durationInSeconds })
    });

    console.log("Đã đồng bộ thành công dữ liệu Điểm, Thời gian chơi lên Database!");
    
    // Tải lại bảng xếp hạng trực tuyến mới nhất từ Backend
    if (typeof renderLeaderboard === "function") {
        renderLeaderboard();
    }
  } catch (error) {
    console.error("Lỗi khi gửi kết quả trận đấu lên Server:", error);
  }
}

function startGame() {
  currentMode = "solo"; 

  displayedScore = 0;
  scoreTarget = 0;
  updateScoreUI(0);

  currentSpeed = 1000;
  clearInterval(speedInterval);
  speedInterval = setInterval(speedUpSolo, SPEED_UP_INTERVAL);

  holdBrick = null;
  holdUsed = false;
  updateHoldUI();
  clearInterval(gameInterval);
  nextBrickId = null;
  generateNextPiece();
  board.reset();

  // Gọi hàm đếm số lượt vào chơi lên server backend
  trackPlayCount();

  function particleLoop() {
    if (!board) return;
  
    if (typeof isFogActive !== 'undefined' && !isFogActive) {
        if (brick) {
          brick.draw();
        }
        board.updateParticles();
    } else {
        board.ctx.clearRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        if (typeof applyFog === "function") {
            applyFog();
        }
    }
    particleAnimationId = requestAnimationFrame(particleLoop);
  }

  cancelAnimationFrame(particleAnimationId);
  particleLoop();

  nextBrickId = getRandomBrick();
  updateNextUI();
  const nextData = generateNextPiece();
  brick = new Brick(nextData.id, board, "solo");
  brick.colorId = nextData.colorId;
  brick.draw();
  
  gameInterval = setInterval(() => {
    if (!board.gameOver && board.isPlaying) {
      brick.moveDown();
    }
  }, currentSpeed);
  
  if (typeof startFogSystem === "function") {
      startFogSystem();
  }
}

function resetAllGames() {
  cancelAnimationFrame(particleAnimationId);

  clearInterval(gameInterval);
  clearInterval(dualInterval);
  clearInterval(speedInterval);
  
  if (typeof clearFogSystem === "function") {
      clearFogSystem();
  }

  // HOLD
  holdBrick = null;
  holdBrick1 = null;
  holdBrick2 = null;

  updateHoldUI();

  holdUsed = false;
  holdUsed1 = false;
  holdUsed2 = false;

  // SOLO
  board.gameOver = false;
  board.isPlaying = false;
  brick = null;

  // DUO
  board1 = null;
  board2 = null;
  brick1 = null;
  brick2 = null;
  currentMode = "solo";

  nextBrickId = getRandomBrick();
  nextBrickId = null;
  updateNextUI();
}

document.getElementById("pause").addEventListener("click", () => {
  if (board) {
    board.isPlaying = false;
  }
});

document.getElementById("resume").addEventListener("click", () => {
  if (board && !board.gameOver) {
    board.isPlaying = true;
  }
});

