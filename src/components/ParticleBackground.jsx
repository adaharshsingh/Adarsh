import React, { useEffect, useRef } from "react";

/* ---------- move the class outside the component/hook ---------- */
class Particle {
  constructor(canvas, ctx, colors) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    const cw = this.canvas.width;
    const ch = this.canvas.height;

    // wrap-around (keeps using canvas pixel dimensions)
    if (this.x < 0) this.x = cw;
    if (this.x > cw) this.x = 0;
    if (this.y < 0) this.y = ch;
    if (this.y > ch) this.y = 0;

    this.draw();
  }
}

/* ---------------- React component ---------------- */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 40;
    const colors = ["#ffffff", "#ffcccc", "#ccffcc", "#ccccff"];
    let animationId;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      // keep CSS size 1:1 with window size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // set backing store size for crispness
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      // scale drawing operations back to CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        // pass canvas & ctx into the Particle constructor
        particles.push(new Particle(canvas, ctx, colors));
      }
    }

    function animate() {
      if (!ctx) return;
      // clear using canvas backing store size (it works fine with setTransform)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }

    // init
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    // cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
