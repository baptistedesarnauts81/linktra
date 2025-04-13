"use client";
import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";

interface HeroProps {
  scrollProgress: MotionValue<number>;
}

export default function Hero({ scrollProgress }: HeroProps) {
  const opacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollProgress, [0, 0.2], [0, -100]);

  // Parallax effect for hero elements
  const titleY = useTransform(scrollProgress, [0, 0.1], [0, -30]);
  const subtitleY = useTransform(scrollProgress, [0, 0.1], [0, -20]);
  const buttonY = useTransform(scrollProgress, [0, 0.1], [0, -10]);

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative z-10"
      style={{ opacity, y }}
      id="home"
    >
      {/* Background gradient blobs */}
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
        className="max-w-4xl mx-auto relative"
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

        {/* Main headline - new addition */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Linktraa<span className="text-indigo-600">.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
            Smart Links with AI
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-black/80 mb-8 max-w-2xl mx-auto"
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Redefine your digital presence with AI-powered link management that
          adapts, predicts, and evolves with your audience.
        </motion.p>

        {/* CTA Buttons - new addition */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          style={{ y: buttonY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started for Free
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-full bg-white border border-indigo-100 text-indigo-600 font-medium shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Watch Demo
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-black/50 text-sm"
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
