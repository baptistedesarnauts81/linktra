"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";

interface FeatureHighlightsProps {
  scrollProgress: MotionValue<number>;
}

// Updated features with modern icons and descriptions
const features = [
  {
    id: 1,
    title: "Smart Link Ordering",
    description:
      "AI automatically optimizes your link order based on audience behavior",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M9 16L15 10M9 10H15V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 8a3 3 0 110-6 3 3 0 010 6zM19 8a3 3 0 110-6 3 3 0 010 6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 22a3 3 0 110-6 3 3 0 010 6zM19 22a3 3 0 110-6 3 3 0 010 6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    gradient: "from-indigo-500 to-blue-500",
    lightGradient: "from-indigo-50 to-blue-50",
    shadowColor: "shadow-indigo-500/20",
  },
  {
    id: 2,
    title: "Audience Insights",
    description:
      "Real-time analytics on who's engaging with your content and when",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M9 19V13M9 13V5M9 13H15M15 13V5M15 13V19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-500",
    lightGradient: "from-cyan-50 to-teal-50",
    shadowColor: "shadow-cyan-500/20",
  },
  {
    id: 3,
    title: "Real-time Updates",
    description: "See performance metrics instantly as clicks and views happen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 8V12L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22V20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 4V2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 12H2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 12H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    shadowColor: "shadow-purple-500/20",
  },
];

export default function FeatureHighlights({
  scrollProgress,
}: FeatureHighlightsProps) {
  // Positioning between Phone and useCase2
  const sectionOpacity = useTransform(
    scrollProgress,
    [0.68, 0.75, 0.82, 0.85],
    [0, 1, 1, 0]
  );

  const sectionY = useTransform(
    scrollProgress,
    [0.72, 0.75, 0.82, 0.85],
    [100, 0, 0, -100]
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center sticky top-0 py-12 px-6 z-10"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Decorative elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px]">
          <div className="absolute inset-0">
            {/* Animated gradient background */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Animated circles */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10 blur-xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/10 to-teal-500/10 blur-xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700 backdrop-blur-sm mb-4">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
            Work smarter with AI
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-lg">
            Our AI-powered tools make link management effortless and effective
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`p-8 rounded-2xl bg-white border border-gray-100 ${feature.shadowColor} shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Gradient background that appears on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.lightGradient} opacity-30`}
                />
              </div>

              {/* Feature content */}
              <div className="relative z-10">
                {/* Icon container */}
                <div
                  className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg ${feature.shadowColor} relative`}
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      boxShadow: [
                        `0 0 0 rgba(255,255,255,0)`,
                        `0 0 20px rgba(255,255,255,0.5)`,
                        `0 0 0 rgba(255,255,255,0)`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-700 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 opacity-10 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br ${feature.gradient}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Try All Features Now</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: -100, opacity: 0 }}
              whileHover={{
                x: 200,
                opacity: 1,
                transition: { duration: 1 },
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
