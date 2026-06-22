function showGameOverModal(title, message, score = null) {
    const modal = document.getElementById("gameOverModal");
    const titleElement = document.getElementById("modalTitle");
    const messageElement = document.getElementById("modalMessage");
    const scoreContainer = document.getElementById("modalScoreContainer");
    const scoreElement = document.getElementById("modalScore");

    if (!modal || !titleElement || !messageElement) {
        console.error("Không tìm thấy các phần tử của Game Over Modal trong HTML!");
        return;
    }

    titleElement.innerText = title;
    messageElement.innerText = message;
    
    if (score !== null) {
        scoreContainer.style.display = "block";
        scoreElement.innerText = score;
    } else {
        scoreContainer.style.display = "none";
    }

    modal.style.setProperty("display", "flex", "important");
    console.log("Modal đã được gọi hiển thị với nội dung:", title, message);
}

if (document.getElementById("modalRestartBtn")) {
    document.getElementById("modalRestartBtn").addEventListener("click", () => {
        document.getElementById("gameOverModal").style.display = "none";
        if (currentMode === 'solo') {
            startGame(); 
        } else if (currentMode === 'duo') {
            generateDualNewBrick(); 
        }
    });
}

if (document.getElementById("modalMenuBtn")) {
    document.getElementById("modalMenuBtn").addEventListener("click", () => {
        document.getElementById("gameOverModal").style.display = "none";
        gameScreen.style.display = "none";
        dualGameScreen.style.display = "none";
        menuScreen.style.display = "flex";
    });
}