// =====================================
// TETRIS BACKGROUND
// =====================================

const bgCanvas = document.getElementById("bg");
const bgCtx = bgCanvas.getContext("2d");

const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {

    bgCanvas.width = window.innerWidth * DPR;
    bgCanvas.height = window.innerHeight * DPR;

    bgCanvas.style.width = window.innerWidth + "px";
    bgCanvas.style.height = window.innerHeight + "px";

    bgCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

// =====================================
// UTILS
// =====================================

function rand(min, max) {

    return Math.random() * (max - min) + min;

}

// =====================================
// PARTICLES
// =====================================

const particles = [];

class Particle {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = rand(
            0,
            window.innerWidth
        );

        this.y = rand(
            0,
            window.innerHeight
        );

        this.size = rand(
            1,
            2.5
        );

        this.speed = rand(
            0.05,
            0.3
        );

        this.alpha = rand(
            0.1,
            0.5
        );

    }

    update() {

        this.y += this.speed;

        if (
            this.y >
            window.innerHeight + 10
        ) {

            this.y = -10;

            this.x = rand(
                0,
                window.innerWidth
            );

        }

    }

    draw() {

        bgCtx.beginPath();

        bgCtx.fillStyle =
            "rgba(255,255,255," +
            this.alpha +
            ")";

        bgCtx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        bgCtx.fill();

    }

}

for (let i = 0; i < 80; i++) {

    particles.push(
        new Particle()
    );

}

// =====================================
// CENTER GLOW
// =====================================

function drawCenterGlow() {

    const x =
        window.innerWidth / 2;

    const y =
        window.innerHeight / 2;

    const glow =
        bgCtx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            500
        );

    glow.addColorStop(
        0,
        "rgba(0,191,255,0.18)"
    );

    glow.addColorStop(
        0.4,
        "rgba(0,191,255,0.08)"
    );

    glow.addColorStop(
        1,
        "rgba(0,191,255,0)"
    );

    bgCtx.fillStyle = glow;

    bgCtx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

}

// =====================================
// HUD RINGS
// =====================================

function drawHudRing(
    radius,
    alpha
) {

    const cx =
        window.innerWidth / 2;

    const cy =
        window.innerHeight / 2;

    bgCtx.beginPath();

    bgCtx.arc(
        cx,
        cy,
        radius,
        0,
        Math.PI * 2
    );

    bgCtx.strokeStyle =
        `rgba(0,191,255,${alpha})`;

    bgCtx.lineWidth = 1;

    bgCtx.stroke();

}

function drawHud() {

    drawHudRing(180, 0.05);
    drawHudRing(260, 0.04);
    drawHudRing(340, 0.03);
    drawHudRing(420, 0.02);

}

// =====================================
// SCAN LINES
// =====================================

function drawScanLines() {

    bgCtx.strokeStyle =
        "rgba(255,255,255,0.015)";

    bgCtx.lineWidth = 1;

    for (
        let y = 0;
        y < window.innerHeight;
        y += 4
    ) {

        bgCtx.beginPath();

        bgCtx.moveTo(
            0,
            y
        );

        bgCtx.lineTo(
            window.innerWidth,
            y
        );

        bgCtx.stroke();

    }

}

// =====================================
// CORNER LIGHTS
// =====================================

function drawCorners() {

    const size = 160;

    bgCtx.strokeStyle =
        "rgba(0,191,255,0.08)";

    bgCtx.lineWidth = 2;

    // TL

    bgCtx.beginPath();

    bgCtx.moveTo(40, size);
    bgCtx.lineTo(40, 40);
    bgCtx.lineTo(size, 40);

    bgCtx.stroke();

    // TR

    bgCtx.beginPath();

    bgCtx.moveTo(
        window.innerWidth - size,
        40
    );

    bgCtx.lineTo(
        window.innerWidth - 40,
        40
    );

    bgCtx.lineTo(
        window.innerWidth - 40,
        size
    );

    bgCtx.stroke();

    // BL

    bgCtx.beginPath();

    bgCtx.moveTo(
        40,
        window.innerHeight - size
    );

    bgCtx.lineTo(
        40,
        window.innerHeight - 40
    );

    bgCtx.lineTo(
        size,
        window.innerHeight - 40
    );

    bgCtx.stroke();

    // BR

    bgCtx.beginPath();

    bgCtx.moveTo(
        window.innerWidth - size,
        window.innerHeight - 40
    );

    bgCtx.lineTo(
        window.innerWidth - 40,
        window.innerHeight - 40
    );

    bgCtx.lineTo(
        window.innerWidth - 40,
        window.innerHeight - size
    );

    bgCtx.stroke();

}

// =====================================
// MAIN LOOP
// =====================================

function animateBackground() {

    const gradient =
        bgCtx.createLinearGradient(
            0,
            0,
            0,
            window.innerHeight
        );

    gradient.addColorStop(
        0,
        "#0B1625"
    );

    gradient.addColorStop(
        0.5,
        "#08111D"
    );

    gradient.addColorStop(
        1,
        "#02060B"
    );

    bgCtx.fillStyle =
        gradient;

    bgCtx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    drawCenterGlow();

    drawHud();

    drawScanLines();

    drawCorners();

    particles.forEach(p => {

        p.update();

        p.draw();

    });

    requestAnimationFrame(
        animateBackground
    );

}

animateBackground();