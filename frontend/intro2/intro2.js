window.onload = () => {

  // ===== TITLE =====
  const title = document.getElementById("title");

  setTimeout(() => title.classList.add("show"), 200);

  setInterval(() => {
    title.classList.add("glitch");

    setTimeout(() => {
      title.classList.remove("glitch");
    }, 150);

  }, 2000);

  setTimeout(() => {

    title.classList.add("impact");

    setTimeout(() => {
      title.classList.remove("impact");
      title.classList.add("pulse");
    }, 600);

  }, 1000);


  // ===== CANVAS =====
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const BASE = 28;

  const colors = [
    "red",
    "orange",
    "yellow",
    "lime",
    "cyan",
    "violet"
  ];

  const shapes = [
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[0,1,0],[1,1,1]],
    [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]],
    [[0,1,1],[1,1,0]],
    [[1,1,0],[0,1,1]]
  ];

  let pieces = [];

  function createPiece() {

    const d = Math.random();

    return {
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      x: Math.floor(Math.random() * (canvas.width / BASE - 4)),
      y: -3,
      scale: 0.6 + d * 0.8,
      speed: 0.25 + d * 0.45,
      alpha: 0.4 + d * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      state: 0
    };
  }

  function draw(p) {

    const s = BASE * p.scale;

    p.shape.forEach((r, dy) => {

      r.forEach((v, dx) => {

        if (v) {

          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;

          ctx.fillRect(
            (p.x + dx) * s,
            (p.y + dy) * s,
            s,
            s
          );

          ctx.globalAlpha = 1;
        }
      });
    });

    if (p.state) {

      ctx.shadowColor = p.color;
      ctx.shadowBlur = 25;

      p.shape.forEach((r, dy) => {

        r.forEach((v, dx) => {

          if (v) {

            ctx.fillRect(
              (p.x + dx) * s,
              (p.y + dy) * s,
              s,
              s
            );
          }
        });
      });

      ctx.shadowBlur = 0;
    }
  }

  function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.03) {
      pieces.push(createPiece());
    }

    pieces.forEach(p => {
      p.y += p.speed;
      draw(p);
    });

    pieces = pieces.filter(
      p => p.y * BASE < canvas.height + 200
    );

    requestAnimationFrame(loop);
  }

  loop();


  // ===== GLITCH BG =====
  setInterval(() => {

    canvas.style.transform = "translate(6px,-6px)";

    setTimeout(() => {
      canvas.style.transform = "none";
    }, 100);

    pieces.forEach(p => {
      p.state = p.state ? 0 : 1;
    });

  }, 3000);


  // ===== LOADER =====
  const fill = document.getElementById("fill");
  const percent = document.getElementById("percent");

  let prog = 0;

  function load() {

    if (prog < 100) {

      let speed;

      if (prog < 80) {
        speed = Math.random() * 1.2 + 0.4;
      } else {
        speed = Math.random() * 0.4 + 0.1;
      }

      prog += speed;

      if (prog > 100) {
        prog = 100;
      }

      fill.style.width = prog + "%";
      percent.innerText = prog.toFixed(1) + "%";

    } else {

      fill.style.width = "100%";
      percent.innerText = "100.0%";

      clearInterval(loaderInterval);

      setTimeout(() => {

        document.querySelector(".loader").style.opacity = "0";
        document.body.style.opacity = "0";

        setTimeout(() => {
          window.location.href = "../login/login.html";
        }, 500);

      }, 400);
    }
  }

  const loaderInterval = setInterval(load, 50);

};

