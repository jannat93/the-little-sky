const video = document.getElementById("camera");
const canvas = document.getElementById("sky-overlay");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cloudOpacity = 0.8;

document.getElementById("start-btn").addEventListener("click", async () => {
  // Start camera
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied!");
  }

  // Start drawing stars and clouds
  drawSky();
});

function drawSky() {
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Random stars ---
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 0.5;

      // Twinkle effect
      const twinkle = Math.random() * 0.5;
      ctx.beginPath();
      ctx.arc(x, y, size + twinkle, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    // --- Cloud overlay ---
    if (cloudOpacity > 0) {
      ctx.fillStyle = `rgba(200,200,200,${cloudOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cloudOpacity -= 0.002; // clouds gradually disappear
    }

    requestAnimationFrame(animate);
  }

  animate();
}
