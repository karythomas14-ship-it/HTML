let displayedScore = 0;
let scoreTarget = 0;
let scoreTicking = false;

function addScore(points, x = 0, y = 0) {
    scoreTarget += points;

    spawnFloatingScore(points, x, y);

    if (!scoreTicking) {
        animateScore();
    }
}

function animateScore() {

    scoreTicking = true;

    const step = () => {

        // tăng mượt kiểu easing
        const diff = scoreTarget - displayedScore;

        if (diff <= 0) {
            scoreTicking = false;
            return;
        }

        displayedScore += Math.ceil(diff * 0.12);

        updateScoreUI(displayedScore);

        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
}

function updateScoreUI(value) {
    const el = document.getElementById("score");
    if (el) el.innerText = value;
}

function showPerfectClearEffect() {
    const el = document.createElement("div");
    el.className = "perfect-clear";

    el.innerText = "PERFECT CLEAR!";
    document.body.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 900);
}

