// ==========================================
// NÚT CHUYỂN SANG TRANG ĐĂNG KÝ (GIỮ NGUYÊN)
// ==========================================
document.getElementById("goRegister").addEventListener("click", () => {
    window.location = "../register/register.html";
});

// ==========================================
// XỬ LÝ ĐĂNG NHẬP (ĐÃ KẾT NỐI MYSQL/MSSQL BACKEND)
// ==========================================
document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value.trim();

    // 1. Kiểm tra người dùng nhập đủ thông tin chưa
    if (username === "" || password === "") {
        alert("Please enter all information");
        return;
    }

    // 2. Gửi dữ liệu đăng nhập lên Node.js Backend bằng API Fetch
    fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(async (res) => {
        const data = await res.json();
        
        // Nếu Server trả về mã lỗi (không phải trạng thái 200 OK)
        if (!res.ok) {
            throw new Error(data.message || "Something went wrong");
        }
        
        return data;
    })
    .then((data) => {
        // Đăng nhập thành công
        alert("Login success!"); 
        
        // BỔ SUNG QUAN TRỌNG: Lưu token mã hóa từ backend gửi về để các file sau lấy đi xác thực quyền
        if (data.token) {
            localStorage.setItem("userToken", data.token);
        }

        // Lưu tên người chơi hiện tại vào bộ nhớ trình duyệt để hiển thị trong game
        localStorage.setItem("currentUser", username);
        localStorage.setItem("username", username);

        // Chuyển hướng đến màn hình chơi game xếp gạch Tetris
        window.location = "../testris.html";
    })
    .catch((err) => {
        // Hiển thị thông báo lỗi cụ thể (Sai mật khẩu / Không tìm thấy user / Server chưa bật)
        alert("Login failed: " + err.message);
    });
});