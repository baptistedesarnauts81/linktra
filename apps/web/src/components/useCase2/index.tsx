"use client";
import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";

interface UseCase2Props {
  scrollProgress: MotionValue<number>;
}

export default function UseCase2({ scrollProgress }: UseCase2Props) {
  const opacity = useTransform(
    scrollProgress,
    [0.8, 0.9, 0.95, 1],
    [0, 1, 1, 0.8],
  );
  const y = useTransform(scrollProgress, [0.8, 0.9, 0.95, 1], [100, 0, 0, 0]);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center sticky top-0 py-20 px-6 z-10"
      style={{ opacity, y }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-block px-4 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700 backdrop-blur-sm"
          >
            Intelligent Analytics
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Smart analytics
            </span>{" "}
            that evolve
          </motion.h2>

          <motion.p
            className="text-lg text-slate-600 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Get predictive insights about visitor behavior, engagement patterns,
            and conversion potential. Our AI doesn't just track clicks—it
            predicts future trends and suggests optimizations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Try analytics dashboard
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
