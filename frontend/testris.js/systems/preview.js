const nextCanvas =
    document.getElementById("nextCanvas");

const nextCtx =
    nextCanvas.getContext("2d");

let nextBrick = null;

/* RANDOM CÓ PREVIEW     */

function generateNextPiece() {

    if (nextBrick === null) {

        nextBrick = {
            id: getRandomBrick(),
            colorId: Math.floor(
                Math.random() *
                (COLOR_MAPPING.length - 1)
            )
        };
    }

    const current = nextBrick;

    nextBrick = {
        id: getRandomBrick(),
        colorId: Math.floor(
            Math.random() *
            (COLOR_MAPPING.length - 1)
        )
    };

    updateNextUI();

    return current;
}

/* ===================== */
/* VẼ NEXT               */
/* ===================== */

function updateNextUI() {

    nextCtx.clearRect(
        0,
        0,
        nextCanvas.width,
        nextCanvas.height
    );

    if (nextBrick === null) return;

    const layout =
    BRICK_LAYOUT[
        nextBrick.id
    ][0];

    const blockSize = 25;

    const pieceWidth =
        layout[0].length *
        blockSize;

    const pieceHeight =
        layout.length *
        blockSize;

    const offsetX =
        (
            nextCanvas.width -
            pieceWidth
        ) / 2;

    const offsetY =
        (
            nextCanvas.height -
            pieceHeight
        ) / 2;

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
                layout[row][col] !==
                WHITE_COLOR_ID
            ) {

                nextCtx.fillStyle =
                    COLOR_MAPPING[
                    nextBrick.colorId
                    ];

                nextCtx.fillRect(
                    offsetX +
                    col * blockSize,

                    offsetY +
                    row * blockSize,

                    blockSize,
                    blockSize
                );

                nextCtx.strokeRect(
                    offsetX +
                    col * blockSize,

                    offsetY +
                    row * blockSize,

                    blockSize,
                    blockSize
                );
            }
        }
    }
}