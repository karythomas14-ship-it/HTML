let fogInterval; 
let fogTimeout;  
let isFogActive = false; 
const FOG_DURATION = 3000;  
const FOG_COOLDOWN = 20000; 
function applyFog() {
    if (!isFogActive) return;

    const drawFogOnCanvas = (targetCtx) => {
        if (!targetCtx || !targetCtx.canvas) return;
        
        const targetCanvas = targetCtx.canvas;

      
        targetCtx.fillStyle = "rgba(12, 25, 41, 0.96)"; 
        targetCtx.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
        
        
        targetCtx.fillStyle = "#00bfff";
        targetCtx.font = "bold 24px 'Press Start 2P', sans-serif"; 
        targetCtx.textAlign = "center";
        targetCtx.textBaseline = "middle"; 
        
        targetCtx.fillText("FOG!", targetCanvas.width / 2, targetCanvas.height / 2);
    };

    if (currentMode === 'solo' && typeof board !== 'undefined' && board && board.isPlaying) {
        drawFogOnCanvas(board.ctx);
    } else if (currentMode === 'duo') {
        if (typeof board1 !== 'undefined' && board1 && board1.isPlaying) drawFogOnCanvas(board1.ctx);
        if (typeof board2 !== 'undefined' && board2 && board2.isPlaying) drawFogOnCanvas(board2.ctx);
    }
}

function triggerFogTrap() {
    isFogActive = true;
    
    if (currentMode === 'solo' && typeof board !== 'undefined' && board) {
        board.drawBoard();
    } else if (currentMode === 'duo') {
        if (typeof board1 !== 'undefined' && board1) board1.drawBoard();
        if (typeof board2 !== 'undefined' && board2) board2.drawBoard();
    }

    clearTimeout(fogTimeout);
    fogTimeout = setTimeout(() => {
        isFogActive = false;
        if (currentMode === 'solo' && typeof board !== 'undefined' && board) {
            board.drawBoard();
            if (typeof brick !== 'undefined' && brick) brick.draw();
        } else if (currentMode === 'duo') {
            if (typeof board1 !== 'undefined' && board1) { board1.drawBoard(); if (typeof brick1 !== 'undefined' && brick1) brick1.draw(); }
            if (typeof board2 !== 'undefined' && board2) { board2.drawBoard(); if (typeof brick2 !== 'undefined' && brick2) brick2.draw(); }
        }
    }, FOG_DURATION);
}

function startFogSystem() {
    clearInterval(fogInterval);
    isFogActive = false;
    fogInterval = setInterval(() => {
        if (currentMode === 'solo' && typeof board !== 'undefined' && board && board.isPlaying && !board.gameOver) {
            triggerFogTrap();
        } else if (currentMode === 'duo' && ((typeof board1 !== 'undefined' && board1 && board1.isPlaying) || (typeof board2 !== 'undefined' && board2 && board2.isPlaying))) {
            triggerFogTrap();
        }
    }, FOG_COOLDOWN);
}

function clearFogSystem() {
    clearInterval(fogInterval);
    clearTimeout(fogTimeout);
    isFogActive = false;
}
