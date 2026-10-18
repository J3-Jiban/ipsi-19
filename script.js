
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Birthday confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId = null;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function celebrate() {
  const colors = [
    "#f2c5c5",
    "#f5dc8b",
    "#d9e4ce",
    "#e4d9ed",
    "#d5e6ed",
    "#ffffff"
  ];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 250,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8
    });
  }

  if (!animationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    p.vy += 0.02;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    ctx.restore();
  });

  particles = particles.filter(
    p => p.y < window.innerHeight + 30
  );

  if (particles.length) {
    animationId = requestAnimationFrame(animateConfetti);
  } else {
    cancelAnimationFrame(animationId);
    animationId = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

// Hero celebration button
document.getElementById("celebrateButton")
  .addEventListener("click", () => {
    celebrate();
    showToast("Happy Birthday, Ipsi! 🎂 Have the best day!");
  });

// Birthday candles
const candles = document.querySelectorAll(".candle");
const cakeMessage = document.getElementById("cakeMessage");
let candlesBlown = 0;

candles.forEach(candle => {
  candle.addEventListener("click", () => {
    if (candle.classList.contains("blown")) return;

    candle.classList.add("blown");
    candlesBlown++;

    if (candlesBlown === candles.length) {
      cakeMessage.textContent =
        "All candles out! Here's to your brightest year yet, Ipsi! ✨";

      showToast("Wish made! Happy Birthday, Ipsi! 🎉");
      celebrate();
    } else {
      cakeMessage.textContent =
        `${candles.length - candlesBlown} candle(s) left! Keep going, Ipsi!`;
    }
  });
});

// Make a birthday wish
document.getElementById("wishButton")
  .addEventListener("click", () => {
    if (candlesBlown < candles.length) {
      showToast("Blow out all three candles first! 🕯️");
    } else {
      showToast("Wishing you happiness, success and lots of adventures! ✨");
      celebrate();
    }
  });
