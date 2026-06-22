let KEY_CODES = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    HOLD: 'ShiftLeft',
    DROP: 'Space'
};

let KEY_CODES_P1 = {
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    UP: 'KeyW',
    DOWN: 'KeyS',
    HOLD: 'KeyQ',
    DROP: 'KeyE'
};

let KEY_CODES_P2 = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    HOLD: 'ShiftRight',
    DROP: 'Space'
};

document.addEventListener('keydown', (e) => {
    if (currentMode === 'solo') {
        if (board && board.isPlaying && !board.gameOver) {
            switch (e.code) {
                case KEY_CODES.LEFT:
                    brick.moveLeft();
                    break;

                case KEY_CODES.RIGHT:
                    brick.moveRight();
                    break;

                case KEY_CODES.DOWN:
                    brick.moveDown();
                    break;

                case KEY_CODES.UP:
                    brick.rotate();
                    break;

                case 'Space':
                    brick.hardDrop();
                    break;

                // HOLD SOLO
                case 'ShiftLeft':
                    holdSolo();
                    break;
            }
            if (isFogActive) {
                applyFog();
            }
        }

    } else {
        // Player 1 (A-S-D-W)
        if (board1 && board1.isPlaying && !board1.gameOver) {
            switch (e.code) {

                case KEY_CODES_P1.LEFT:
                    brick1.moveLeft();
                    break;

                case KEY_CODES_P1.RIGHT:
                    brick1.moveRight();
                    break;

                case KEY_CODES_P1.DOWN:
                    brick1.moveDown();
                    break;

                case KEY_CODES_P1.UP:
                    brick1.rotate();
                    break;

                case KEY_CODES_P1.DROP:
                    brick1.hardDrop();
                    break;

                // HOLD P1
                case KEY_CODES_P1.HOLD:
                    holdP1();
                    break;
            }
            if (isFogActive) {
                applyFog();
            }
        }

        // Player 2 (Arrow Keys)
        if (board2 && board2.isPlaying && !board2.gameOver) {
            switch (e.code) {
                case KEY_CODES.LEFT:
                    brick2.moveLeft();
                    break;

                case KEY_CODES.RIGHT:
                    brick2.moveRight();
                    break;

                case KEY_CODES.DOWN:
                    brick2.moveDown();
                    break;

                case KEY_CODES.UP:
                    brick2.rotate();
                    break;

                case KEY_CODES_P2.DROP:
                    brick2.hardDrop();
                    break;

                // HOLD P2
                case KEY_CODES_P2.HOLD:
                    holdP2();
                    break;
            }
            if (isFogActive) {
                applyFog();
            }
        }
    }
});