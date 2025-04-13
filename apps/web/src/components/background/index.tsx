"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#1a1a3a_0%,_#000000_70%)] opacity-5"></div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-700/20 blur-3xl"
        animate={{
          x: [0, -70, 0],
          y: [0, 70, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-cyan-700/20 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}
