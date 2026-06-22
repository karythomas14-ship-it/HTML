 const introScreen = document.getElementById("introScreen");

setTimeout(() => {
    introScreen.style.opacity = "0";
    setTimeout(() => {
    window.location.href = "../intro2/intro2.html";
    }, 300);
}, 3000);