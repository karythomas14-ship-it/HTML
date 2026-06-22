const canvas =
    document.getElementById('board');

const ctx =
    canvas.getContext('2d');

const canvas1 =
    document.getElementById('board1');

const ctx1 =
    canvas1.getContext('2d');

const canvas2 =
    document.getElementById('board2');

const ctx2 =
    canvas2.getContext('2d');

let currentMode = 'solo';

let board;

let brick;

let gameInterval;

ctx.canvas.width = COLS * BLOCK_SIZE;

ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx1.canvas.width = COLS * BLOCK_SIZE;

ctx1.canvas.height = ROWS * BLOCK_SIZE;

ctx2.canvas.width = COLS * BLOCK_SIZE;

ctx2.canvas.height = ROWS * BLOCK_SIZE;

board = new Board(ctx, 'score');

board.drawBoard();

console.table(board.grid);
// in ra trạng thái của bảng
// trong console để kiểm tra