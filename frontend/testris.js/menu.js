// ===== MENU & SCREEN =====

const menuScreen =
    document.getElementById("menuScreen");

const gameScreen =
    document.getElementById("gameScreen");

const dualGameScreen =
    document.getElementById("dualGameScreen");

const settingsScreen =
    document.getElementById("settingsScreen");

document
    .getElementById("startBtn3")
    .addEventListener("click", () => {

        menuScreen.style.display = "none";

        gameScreen.style.display = "none";

        dualGameScreen.style.display = "none";

        settingsScreen.style.display = "flex";
    });

// bấm Play (Solo)
document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        settingsScreen.style.display = "none";

        dualGameScreen.style.display = "none";

        menuScreen.style.display = "none";

        gameScreen.style.display = "block";

        startGame();
    });

// bấm Play Duo
document
    .getElementById("startBtn2")
    .addEventListener("click", () => {

        settingsScreen.style.display = "none";

        gameScreen.style.display = "none";

        menuScreen.style.display = "none";

        dualGameScreen.style.display = "flex";

        generateDualNewBrick();
    });

// quay lại menu từ Solo
document
    .getElementById("backMenu")
    .addEventListener("click", () => {

        resetAllGames();

        gameScreen.style.display = "none";

        menuScreen.style.display = "flex";
    });

// quay lại menu từ Duo
document
    .getElementById("backMenuDual")
    .addEventListener("click", () => {

        resetAllGames();

        dualGameScreen.style.display = "none";

        menuScreen.style.display = "flex";
    });

document
    .getElementById("backBtn")
    .addEventListener("click", () => {

        settingsScreen.style.display = "none";

        menuScreen.style.display = "flex";
    });