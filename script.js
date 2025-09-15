const video = document.getElementById("camera");
const canvas = document.getElementById("sky-overlay");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.getElementById("start-btn").addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
  } catch {
    alert("Camera not allowed!");
  }

  // Draw simple stars to check
  drawStars();
});

function drawStars() {
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
