"use client";

import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  color?: "cyan" | "magenta" | "mixed";
  opacity?: number;
}

export default function MatrixRain({ color = "mixed", opacity = 0.15 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle responsiveness
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters definition
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ⚡🤖💻";
    const charArr = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = `rgba(1, 2, 5, 0.08)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick random character
        const char = charArr[Math.floor(Math.random() * charArr.length)];

        // Color selection
        if (color === "cyan") {
          ctx.fillStyle = "rgba(0, 245, 212, 0.8)";
        } else if (color === "magenta") {
          ctx.fillStyle = "rgba(255, 0, 127, 0.8)";
        } else {
          // Mixed Cyan and Magenta matrix rain
          ctx.fillStyle = i % 2 === 0 ? "rgba(0, 245, 212, 0.85)" : "rgba(255, 0, 127, 0.85)";
        }

        // Write character on canvas
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset drop position if it goes off screen or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop downwards
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity }}
    />
  );
}
