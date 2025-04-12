"use client";
import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";

interface HeroProps {
  scrollProgress: MotionValue<number>;
}

export default function Hero({ scrollProgress }: HeroProps) {
  const opacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollProgress, [0, 0.2], [0, -100]);

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative z-10"
      style={{ opacity, y }}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-full max-w-6xl h-full relative">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 blur-3xl"></div>
            <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-600/30 blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="max-w-3xl mx-auto relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="mb-6">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700 backdrop-blur-sm">
              AI-Powered Link Management
            </span>
          </motion.div>
        </div>

        <motion.p
          className="text-xl text-black/80 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Redefine your digital presence with AI-powered link management that
          adapts, predicts, and evolves with your audience.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-black/50 text-sm "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Scroll to explore</span>
        <motion.div
          className="mt-2 w-6 h-10 rounded-full border-2 border-black/20 flex justify-center items-start p-1"
          animate={{ y: [0, 24, 0] }}
          transition={{
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
        >
          <div className="w-1.5 h-3 bg-black/40 rounded-full"></div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
