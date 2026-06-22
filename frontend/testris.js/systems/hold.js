const holdCanvas =
    document.getElementById("holdCanvas");

const holdCtx =
    holdCanvas.getContext("2d");

const holdCanvas1 =
    document.getElementById("holdCanvas1");

const holdCanvas2 =
    document.getElementById("holdCanvas2");

const holdCtx1 =
    holdCanvas1.getContext("2d");

const holdCtx2 =
    holdCanvas2.getContext("2d");

// SOLO
let holdBrick = null;
let holdUsed = false;

// DUO
let holdBrick1 = null;
let holdBrick2 = null;

let holdUsed1 = false;
let holdUsed2 = false;

// HOLD SOLO 
function holdSolo() {
    if (!brick || holdUsed) return;
    const currentPiece = {
    id: brick.id,
    colorId: brick.colorId
    };
    // lần đầu hold
    if (holdBrick === null) {
        holdBrick = currentPiece;
        brick.clear();
        board.drawBoard();
        brick = new Brick(
            getRandomBrick(),
            board,
            'solo'
        );
        brick.draw();
    }
    else {
       brick.clear();
       board.drawBoard();
       const temp = holdBrick;
       holdBrick = currentPiece;
       brick = new Brick(
            temp.id,
            board,
            'solo'
        );
        brick.colorId = temp.colorId;
        brick.draw();
    }
    holdUsed = true;
    updateHoldUI();
}

// HOLD PLAYER1
function holdP1() {
    if (!brick1 || holdUsed1) return;
    const currentPiece = {
        id: brick1.id,
        colorId: brick1.colorId
    };
    if (holdBrick1 === null) {
        holdBrick1 = currentPiece;
        brick1.clear();
        board1.drawBoard();
        brick1 = new Brick(
            getRandomBrick(),
            board1,
            'p1'
        );
        brick1.colorId =
            Math.floor(
                Math.random() *
                    (COLOR_MAPPING.length - 1)
            );
        brick1.draw();
    }
    else {
        brick1.clear();
        board1.drawBoard();
        const temp = holdBrick1;
        holdBrick1 = currentPiece;
        brick1 = new Brick(
            temp.id,
            board1,
            'p1'
        );
        brick1.colorId = temp.colorId;
        brick1.draw();
    }
    holdUsed1 = true;
    updateHoldUI1();
}

// HOLD PLAYER2 
function holdP2() {
    if (!brick2 || holdUsed2) return;
    const currentPiece = {
        id: brick2.id,
        colorId: brick2.colorId
    };
    if (holdBrick2 === null) {
        holdBrick2 = currentPiece;
        brick2.clear();
        board2.drawBoard();
        brick2 = new Brick(
            getRandomBrick(),
            board2,
            'p2'
        );
        brick2.colorId =
            Math.floor(
                Math.random() *
                (COLOR_MAPPING.length - 1)
            );
        brick2.draw();
    }
    else {
        brick2.clear();
        board2.drawBoard();
        const temp = holdBrick2;
        holdBrick2 = currentPiece;
        brick2 = new Brick(
            temp.id,
            board2,
            'p2'
        );
        brick2.colorId = temp.colorId;
        brick2.draw();
    }
    holdUsed2 = true;
    updateHoldUI2();
}

function updateHoldUI() {

    holdCtx.clearRect(
        0,
        0,
        holdCanvas.width,
        holdCanvas.height
    );

    if (holdBrick === null) return;

    const layout =
    BRICK_LAYOUT[
        holdBrick.id
    ][0];

    const blockSize = 25;

    const pieceWidth =
        layout[0].length * blockSize;

    const pieceHeight =
        layout.length * blockSize;

    const offsetX =
        (holdCanvas.width - pieceWidth) / 2;

    const offsetY =
        (holdCanvas.height - pieceHeight) / 2;

    for (
        let row = 0;
        row < layout.length;
        row++
    ) {

        for (
            let col = 0;
            col < layout[row].length;
            col++
        ) {

            if (
                layout[row][col]
                !== WHITE_COLOR_ID
            ) {

                holdCtx.fillStyle =
                        COLOR_MAPPING[
                            holdBrick.colorId
                        ];

                holdCtx.fillRect(
                    offsetX + col * blockSize,
                    offsetY + row * blockSize,
                    blockSize,
                    blockSize
                );

                holdCtx.strokeRect(
                    offsetX + col * blockSize,
                    offsetY + row * blockSize,
                    blockSize,
                    blockSize
                );
            }
        }
    }
}

function updateHoldUI1() {

    holdCtx1.clearRect(
        0,
        0,
        holdCanvas1.width,
        holdCanvas1.height
    );

    if (!holdBrick1) return;

    const layout =
        BRICK_LAYOUT[holdBrick1.id][0];

    const blockSize = 25;

    const offsetX =
        (holdCanvas1.width -
        layout[0].length * blockSize) / 2;

    const offsetY =
        (holdCanvas1.height -
        layout.length * blockSize) / 2;

    for(let row=0; row<layout.length; row++){

        for(let col=0; col<layout[row].length; col++){

            if(layout[row][col] !== WHITE_COLOR_ID){

                holdCtx1.fillStyle =
                    COLOR_MAPPING[
                        holdBrick1.colorId
                    ];

                holdCtx1.fillRect(
                    offsetX + col*blockSize,
                    offsetY + row*blockSize,
                    blockSize,
                    blockSize
                );

                holdCtx1.strokeRect(
                    offsetX + col*blockSize,
                    offsetY + row*blockSize,
                    blockSize,
                    blockSize
                );
            }
        }
    }
}

function updateHoldUI2() {

    holdCtx2.clearRect(
        0,
        0,
        holdCanvas2.width,
        holdCanvas2.height
    );

    if (!holdBrick2) return;

    const layout =
        BRICK_LAYOUT[holdBrick2.id][0];

    const blockSize = 25;

    const offsetX =
        (holdCanvas2.width -
        layout[0].length * blockSize) / 2;

    const offsetY =
        (holdCanvas2.height -
        layout.length * blockSize) / 2;

    for(let row=0; row<layout.length; row++){

        for(let col=0; col<layout[row].length; col++){

            if(layout[row][col] !== WHITE_COLOR_ID){

                holdCtx2.fillStyle =
                    COLOR_MAPPING[
                        holdBrick2.colorId
                    ];

                holdCtx2.fillRect(
                    offsetX + col*blockSize,
                    offsetY + row*blockSize,
                    blockSize,
                    blockSize
                );

                holdCtx2.strokeRect(
                    offsetX + col*blockSize,
                    offsetY + row*blockSize,
                    blockSize,
                    blockSize
                );
            }
        }
    }
}