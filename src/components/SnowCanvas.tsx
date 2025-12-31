"use client";

import { useEffect, useRef } from "react";

export default function SnowCanvas() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const flakes: any[] = [];
        const BASE_FLAKE_COUNT = Math.min(120, Math.floor(width / 10));
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const FLAKE_COUNT = prefersReducedMotion
            ? Math.max(20, Math.floor(BASE_FLAKE_COUNT / 2))
            : BASE_FLAKE_COUNT;

        const GLOBAL_WIND = 0.06;
        const SIZE_SCALE = 1 / 1.5;

        function createFlake() {
            const size = (Math.random() * 2.5 + 1) * SIZE_SCALE;
            const r = Math.random();
            let type = r < 1 / 3 ? "wind" : r < 2 / 3 ? "straight" : "gust";

            return {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: size,
                speedY: 0.5 + size * 0.22,
                phase: Math.random() * Math.PI * 2,
                swayAmplitude: 0.02 + Math.random() * 0.25,
                opacity: 0.45 + Math.random() * 0.8,
                type,
                windFactor: type === "wind" ? 0.3 + Math.random() * 0.4 : 0,
                windVel: type === "gust" ? (0.4 + Math.random() * 0.6) * GLOBAL_WIND * 3 : 0
            };
        }

        for (let i = 0; i < FLAKE_COUNT; i++) flakes.push(createFlake());

        function resetFlake(flake: any) {
            flake.x = Math.random() * width;
            flake.y = -flake.radius;
            if (flake.type === "gust") {
                flake.windVel = (0.4 + Math.random() * 0.6) * GLOBAL_WIND * 3;
            }
        }

        function resize() {
            if (!canvas) return;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener("resize", resize);

        let lastTime = performance.now();
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) lastTime = performance.now();
        });

        const render = (now: number) => {
            let delta = (now - lastTime) / 16.67;
            lastTime = now;
            if (delta > 3) delta = 1;
            ctx.clearRect(0, 0, width, height);

            flakes.forEach((fl) => {
                const sway = Math.sin(fl.phase + now * 0.0015) * fl.swayAmplitude;
                const wind = fl.type === "wind" ? GLOBAL_WIND * fl.windFactor :
                    fl.type === "gust" ? fl.windVel : 0;

                if (fl.type === "gust") fl.windVel *= 0.987;

                fl.y += fl.speedY * delta;
                fl.x += (sway + wind) * delta;

                if (fl.y > height + fl.radius) resetFlake(fl);
                if (fl.x < -fl.radius) fl.x = width + fl.radius;
                if (fl.x > width + fl.radius) fl.x = -fl.radius;

                ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
                ctx.shadowBlur = fl.radius * 10;

                ctx.beginPath();
                ctx.arc(fl.x, fl.y, fl.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${fl.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const isSnowSeason =
        (month === 12) || // весь декабрь
        (month === 1 && day <= 10); // до 10 января

    if (!isSnowSeason) return;

    return (
        <canvas
            id="snow-canvas"
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none opacity-0 transition-opacity duration-700"
            style={{ opacity: 1 }}
        />
    );
}
