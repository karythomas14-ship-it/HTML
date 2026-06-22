function spawnFloatingScore(points, x, y) {
  const el = document.createElement("div");
  el.className = "floating-score";
  el.textContent = `+${points}`;

  el.style.left = x + "px";
  el.style.top = y + "px";

  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = "translateY(-40px)";
    el.style.opacity = "0";
  });

  setTimeout(() => {
    el.remove();
  }, 700);
}
//===== LOADING SCREEN =====//
window.addEventListener("load", () => {s
  const loader = document.getElementById("loading-Screen");

  setTimeout(() => {
    loader.style.opacity = "0"; // Hiệu ứng mờ dần
    setTimeout(() => {
      loader.style.display = "none"; // Ẩn hoàn toàn
    }, 200);
  }, 1000);
});

//===== COMBO TEXT =====//

function showLineText(rowsCleared) {
  console.log("SHOW:", rowsCleared);

  const combo = document.getElementById("comboText");

  let text = "";

  if (rowsCleared === 1) text = "GOOD!";
  else if (rowsCleared === 2) text = "GREAT!";
  else if (rowsCleared === 3) text = "AMAZING!";
  else if (rowsCleared >= 4) text = "FANTASTIC!!!";

  combo.innerText = text;

  combo.classList.remove("show");
  void combo.offsetWidth;
  combo.classList.add("show");
}

function showComboCounter(text) {
  const combo = document.getElementById("comboCounter");

  combo.innerText = text;

  combo.classList.remove("show");

  void combo.offsetWidth;

  combo.classList.add("show");
}

function showSpecialText(text) {
  const combo = document.getElementById("comboCounter");

  combo.innerText = text;

  combo.classList.remove("show");

  void combo.offsetWidth;

  combo.classList.add("show");
}
