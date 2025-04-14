"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Background() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects for different layers
  const bgLayer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgLayer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgLayer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Parallax rotation for some elements
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 20]);

  // Scale effect for some elements
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full overflow-hidden z-0"
    >
      {/* Base gradient background */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#1a1a3a_0%,_#000000_70%)] opacity-5"></div>

      {/* Floating grid pattern - creates a subtle tech feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBhMzAgMzAgMCAxMS02MCAwIDMwIDMwIDAgMDE2MCAweiIgc3Ryb2tlPSIjOTc5Nzk3IiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTYwIDI2YTI2IDI2IDAgMTEtNTIgMCAyNiAyNiAwIDAxNTIgMHoiIHN0cm9rZT0iIzk3OTc5NyIgc3Ryb2tlLW9wYWNpdHk9Ii4wNCIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>

      {/* Layer 1 - Slowest moving, deepest layer */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ y: bgLayer1Y }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          style={{
            rotate: rotate1,
            scale: scale1,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-2/3 right-1/5 w-64 h-64 rounded-full bg-indigo-600/15 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 30, 0],
          }}
          style={{ rotate: rotate2 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Layer 2 - Medium speed layer */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ y: bgLayer2Y }}
      >
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-700/20 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 70, 0],
          }}
          style={{ scale: scale2 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute bottom-1/2 left-1/3 w-72 h-72 rounded-full bg-pink-700/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          style={{ rotate: rotate3 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </motion.div>

      {/* Layer 3 - Fastest moving, front layer */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ y: bgLayer3Y }}
      >
        <motion.div
          className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-cyan-700/20 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        <motion.div
          className="absolute top-3/4 left-1/2 w-48 h-48 rounded-full bg-emerald-700/15 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      {/* Moving particles effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => {
          // Pre-calculate random values
          const initialY = Math.random() * 100 + "%";
          const initialOpacity = Math.random() * 0.3 + 0.1;
          const initialScale = Math.random() * 0.5 + 0.5;

          const midY = Math.random() * -30 - 10;
          const midOpacity = Math.random() * 0.5 + 0.3;
          const midScale = Math.random() * 1 + 1;

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white"
              initial={{
                x: Math.random() * 100 + "%",
                y: initialY,
                opacity: initialOpacity,
                scale: initialScale,
              }}
              animate={{
                y: [initialY, `calc(${initialY} + ${midY}px)`, initialY],
                opacity: [initialOpacity, midOpacity, initialOpacity],
                scale: [initialScale, midScale, initialScale],
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          );
        })}
      </div>

      {/* Optional: Subtle noise texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] opacity-40 mix-blend-overlay"></div>
    </div>
  );
}
