// ==========================================
// NÚT CHUYỂN SANG TRANG ĐĂNG NHẬP
// ==========================================
document.getElementById("goLogin").addEventListener("click", () => {
    window.location = "../login/login.html";
});

// ==========================================
// XỬ LÝ ĐĂNG KÝ TÀI KHOẢN (KẾT NỐI BACKEND)
// ==========================================
document.getElementById("registerBtn").addEventListener("click", () => {
    const username = document.getElementById("registerUser").value.trim();
    const password = document.getElementById("registerPass").value.trim();

    // 1. Kiểm tra dữ liệu đầu vào
    if (username === "" || password === "") {
        alert("Please enter all information");
        return;
    }

    // 2. Gửi dữ liệu đăng ký lên Node.js Backend bằng API Fetch
    // Bắt buộc phải dùng đúng phương thức POST khớp với router.post bên Backend
    fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        })
    })
    .then(async (res) => {
        const data = await res.json();
        
        // Nếu Backend trả về mã lỗi (400, 404, 500...)
        if (!res.ok) {
            throw new Error(data.message || "Registration failed");
        }
        
        return data;
    })
    .then((data) => {
        // Đăng ký thành công
        alert("Registration successful! Redirecting to login page..."); 
        
        // Chuyển hướng người dùng về trang đăng nhập
        window.location = "../login/login.html";
    })
    .catch((err) => {
        // Hiển thị thông báo lỗi cụ thể từ Server (Trùng username, lỗi kết nối DB,...)
        alert("Register failed: " + err.message);
    });
});