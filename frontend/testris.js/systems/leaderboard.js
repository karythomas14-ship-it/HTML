function saveScore(score) {

    let scores =
        JSON.parse(
            localStorage.getItem("tetrisScores")
        ) || [];

    scores.push(score);

    scores.sort((a, b) => b - a);

    scores = scores.slice(0, 5);

    localStorage.setItem(
        "tetrisScores",
        JSON.stringify(scores)
    );
}
// hàm lưu điểm số vào localStorage,
// sắp xếp điểm số từ cao đến thấp
// và chỉ giữ lại 5 điểm số cao nhất

function renderLeaderboard() {

    const list =
        document.getElementById("leaderboard");

    list.innerHTML = "";

    let scores =
        JSON.parse(
            localStorage.getItem("tetrisScores")
        ) || [];

    scores.forEach((score, index) => {

        const li =
            document.createElement("li");

        li.innerText =
            `#${index + 1}: ${score}`;

        list.appendChild(li);
    });
}
// hàm hiển thị bảng xếp hạng điểm số
// trên giao diện

renderLeaderboard();
// gọi hàm renderLeaderboard
// khi trang được tải