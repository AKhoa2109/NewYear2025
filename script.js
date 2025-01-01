const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = random(2, 4);
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.02;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function createFirework(x, y) {
  const colors = ["#ff4500", "#ffd700", "#00ff00", "#1e90ff", "#ff69b4"];
  for (let i = 0; i < 50; i++) {
    particles.push(
      new Particle(x, y, colors[Math.floor(Math.random() * colors.length)])
    );
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.opacity <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
      particle.draw();
    }
  });

  requestAnimationFrame(animate);
}

// Tự động bắn pháo hoa
setInterval(() => {
  const x = random(100, canvas.width - 100);
  const y = random(100, canvas.height / 2); // Bắn ở nửa trên màn hình
  createFirework(x, y);
}, 500); // Bắn pháo hoa mỗi 500ms

animate();

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");
  const overlay = document.getElementById("audio-overlay");

  const enableAudio = () => {
    audio
      .play()
      .then(() => {
        console.log("Âm thanh bắt đầu phát.");
      })
      .catch((error) => {
        console.log("Lỗi phát âm thanh:", error);
      });

    // Ẩn lớp phủ
    overlay.style.display = "none";

    // Xóa sự kiện click
    document.body.removeEventListener("click", enableAudio);
  };

  document.body.addEventListener("click", enableAudio);
});

// Vẽ các con vật (đơn giản hóa bằng hình học)
