// Các biến cấu hình phím toàn cục
window.KEY_CODES = { LEFT: 'ArrowLeft', RIGHT: 'ArrowRight', UP: 'ArrowUp', DOWN: 'ArrowDown', HOLD: 'ShiftLeft', DROP: 'Space' };
window.KEY_CODES_P1 = { LEFT: 'KeyA', RIGHT: 'KeyD', UP: 'KeyW', DOWN: 'KeyS', HOLD: 'KeyQ', DROP: 'KeyE' };
window.KEY_CODES_P2 = { LEFT: 'ArrowLeft', RIGHT: 'ArrowRight', UP: 'ArrowUp', DOWN: 'ArrowDown', HOLD: 'ShiftRight', DROP: 'Space' };

// Hàm nạp phím bấm từ Backend khi vào game
async function loadKeySettings() {
    const token = localStorage.getItem("userToken"); // Dùng token được trả về từ login
    if (!token) return;

    try {
        const response = await fetch(`${BACKEND_URL}/stats/settings`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.solo) window.KEY_CODES = data.solo;
            if (data.p1) window.KEY_CODES_P1 = data.p1;
            if (data.p2) window.KEY_CODES_P2 = data.p2;
            updateSettingsUI();
        }
    } catch (error) {
        console.error("Lỗi khi tải cấu hình phím từ server:", error);
    }
}

// Hàm gửi phím bấm mới lên Backend lưu trữ
async function saveKeySettingsToServer() {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    const payload = {
        solo: window.KEY_CODES,
        p1: window.KEY_CODES_P1,
        p2: window.KEY_CODES_P2
    };

    try {
        await fetch(`${BACKEND_URL}/stats/settings`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Không thể lưu cấu hình phím lên server:", error);
    }
}

function bindKey(buttonId, configObject, directionKey) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener("click", () => {
        btn.textContent = "...";
        btn.classList.add("listening");

        const onKeyDown = (e) => {
            configObject[directionKey] = e.code;
            btn.textContent = e.code;
            btn.classList.remove("listening");
            document.removeEventListener("keydown", onKeyDown);
            
            // Mỗi lần bấm đổi phím xong, lưu ngay lên Server
            saveKeySettingsToServer();
        };

        document.addEventListener("keydown", onKeyDown);
    });
}

function updateSettingsUI() {
    const checkAndSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };
    /* SOLO */
    checkAndSetText("soloLeftBtn", KEY_CODES.LEFT);
    checkAndSetText("soloRightBtn", KEY_CODES.RIGHT);
    checkAndSetText("soloUpBtn", KEY_CODES.UP);
    checkAndSetText("soloDownBtn", KEY_CODES.DOWN);
    checkAndSetText("soloHoldBtn", KEY_CODES.HOLD);
    checkAndSetText("soloDropBtn", KEY_CODES.DROP);
    /* P1 */
    checkAndSetText("p1LeftBtn", KEY_CODES_P1.LEFT);
    checkAndSetText("p1RightBtn", KEY_CODES_P1.RIGHT);
    checkAndSetText("p1UpBtn", KEY_CODES_P1.UP);
    checkAndSetText("p1DownBtn", KEY_CODES_P1.DOWN);
    checkAndSetText("p1HoldBtn", KEY_CODES_P1.HOLD);
    checkAndSetText("p1DropBtn", KEY_CODES_P1.DROP);
    /* P2 */
    checkAndSetText("p2LeftBtn", KEY_CODES_P2.LEFT);
    checkAndSetText("p2RightBtn", KEY_CODES_P2.RIGHT);
    checkAndSetText("p2UpBtn", KEY_CODES_P2.UP);
    checkAndSetText("p2DownBtn", KEY_CODES_P2.DOWN);
    checkAndSetText("p2HoldBtn", KEY_CODES_P2.HOLD);
    checkAndSetText("p2DropBtn", KEY_CODES_P2.DROP);
}

document.addEventListener("DOMContentLoaded", () => {
    // Nạp phím ngầm từ server để gán cho các nút bấm hành động của Tetris
    loadKeySettings(); 

    // Gán sự kiện đổi phím (chỉ chạy khi các nút này tồn tại trên màn hình)
    if (document.getElementById("soloLeftBtn")) {
        bindKey("soloLeftBtn", KEY_CODES, "LEFT");
        bindKey("soloRightBtn", KEY_CODES, "RIGHT");
        bindKey("soloUpBtn", KEY_CODES, "UP");
        bindKey("soloDownBtn", KEY_CODES, "DOWN");
        bindKey("soloHoldBtn", KEY_CODES, "HOLD");
        bindKey("soloDropBtn", KEY_CODES, "DROP");
        
        bindKey("p1LeftBtn", KEY_CODES_P1, "LEFT");
        bindKey("p1RightBtn", KEY_CODES_P1, "RIGHT");
        bindKey("p1UpBtn", KEY_CODES_P1, "UP");
        bindKey("p1DownBtn", KEY_CODES_P1, "DOWN");
        bindKey("p1HoldBtn", KEY_CODES_P1, "HOLD");
        bindKey("p1DropBtn", KEY_CODES_P1, "DROP");
        
        bindKey("p2LeftBtn", KEY_CODES_P2, "LEFT");
        bindKey("p2RightBtn", KEY_CODES_P2, "RIGHT");
        bindKey("p2UpBtn", KEY_CODES_P2, "UP");
        bindKey("p2DownBtn", KEY_CODES_P2, "DOWN");
        bindKey("p2HoldBtn", KEY_CODES_P2, "HOLD");
        bindKey("p2DropBtn", KEY_CODES_P2, "DROP");
    }
});