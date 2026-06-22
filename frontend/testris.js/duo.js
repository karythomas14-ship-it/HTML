let board1, board2;

let brick1, brick2;

let dualInterval;

function generateDualNewBrick() {
    currentMode = 'duo';

    currentSpeed = 1000;
    clearInterval(speedInterval);
    speedInterval = setInterval(
        speedUpDuo,
        SPEED_UP_INTERVAL
    );

    const ctx1 =
        document
        .getElementById('board1')
        .getContext('2d');

    const ctx2 =
        document
        .getElementById('board2')
        .getContext('2d');

    holdBrick1 = null;
    holdBrick2 = null;

    holdUsed1 = false;
    holdUsed2 = false;

    board1 = new Board(ctx1, 'score1');
    board2 = new Board(ctx2, 'score2');

    board1.reset();
    board2.reset();

    document.getElementById("diff1").innerText = "0";
    document.getElementById("diff2").innerText = "0";

    brick1 = new Brick(
        getRandomBrick(),
        board1,
        'p1'
    );

    brick2 = new Brick(
        getRandomBrick(),
        board2,
        'p2'
    );

    brick1.draw();
    brick2.draw();

    clearInterval(dualInterval);

    dualInterval = setInterval(() => {
        if (board1.isPlaying && !board1.gameOver) {
            brick1.moveDown();
        }

        if (board2.isPlaying && !board2.gameOver) {
            brick2.moveDown();
        }

        // ==========================================
        // 1. THÊM Ở ĐÂY: Vẽ đè sương mù liên tục theo nhịp rơi
        // ==========================================
        if (typeof applyFog === "function") {
            applyFog();
        }

        // ==========================================
        // 2. THÊM Ở ĐÂY: Cập nhật chênh lệch điểm liên tục
        // ==========================================
        updateScoreDifference();

    }, 1000);

    // Kích hoạt lại hệ thống thời gian bẫy tự động nếu có
    if (typeof startFogSystem === "function") {
        startFogSystem();
    }
}

document
    .getElementById('pauseDual')
    .addEventListener('click', () => {
        board1.isPlaying = false;
        board2.isPlaying = false;
        
        // Dừng bẫy sương mù tạm thời khi bấm dừng game (nếu muốn)
        if (typeof clearFogSystem === "function") clearFogSystem();
    });

document
    .getElementById('resumeDual')
    .addEventListener('click', () => {
        board1.isPlaying = true;
        board2.isPlaying = true;
        
        // Chạy lại hệ thống bẫy khi tiếp tục chơi
        if (typeof startFogSystem === "function") startFogSystem();
    });

document
    .getElementById('backMenuDual')
    .addEventListener('click', () => {
        if (typeof clearFogSystem === "function") clearFogSystem(); // Xóa bẫy khi về menu
        resetAllGames();
        dualGameScreen.style.display = "none";
        menuScreen.style.display = "flex";
    });

function updateScoreDifference(){

    if (!board1 || !board2) return;

    const diff =
        Math.abs(
            board1.score - board2.score
        );

    if(board1.score > board2.score){

        document.getElementById(
            "diff1"
        ).innerText = "+" + diff;

        document.getElementById(
            "diff2"
        ).innerText = "-" + diff;

    } else if(board2.score > board1.score){

        document.getElementById(
            "diff1"
        ).innerText = "-" + diff;

        document.getElementById(
            "diff2"
        ).innerText = "+" + diff;

    } else {

        document.getElementById(
            "diff1"
        ).innerText = "0";

        document.getElementById(
            "diff2"
        ).innerText = "0";
    }
}