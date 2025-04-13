"use client";
import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface ScrollIndicatorProps {
  scrollProgress: MotionValue<number>;
}

export default function ScrollIndicator({
  scrollProgress,
}: ScrollIndicatorProps) {
  const indicatorHeight = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="relative h-48 w-1 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-indigo-600 rounded-full"
          style={{ height: indicatorHeight }}
        />
      </div>
    </motion.div>
  );
}
