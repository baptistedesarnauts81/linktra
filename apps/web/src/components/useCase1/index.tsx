"use client";
import type { MotionValue } from "framer-motion";
import { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";

interface UseCase1Props {
  scrollProgress: MotionValue<number>;
}

export const socialCards = [
  {
    id: "youtube",
    title: "YouTube Channel",
    url: "youtube.com/c/mychannel",
    icon: "📹",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    // Adding gradient colors for modern design
    gradientFrom: "#FF0000", // YouTube red start
    gradientTo: "#FF4D4D", // Lighter red end
    color: "bg-gradient-to-r from-red-500 to-red-600",
    borderColor: "border-red-400",
    iconBg: "bg-red-50",
    textColor: "text-red-600",
    brandColor: "text-red-600",
    scrollLimit: 0.33,
  },
  {
    id: "instagram",
    title: "Instagram Profile",
    url: "instagram.com/myprofile",
    icon: "📷",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    // Instagram gradient (purple to pink to orange)
    gradientFrom: "#833AB4",
    gradientTo: "#FD1D1D",
    color: "bg-gradient-to-r from-purple-500 to-pink-600",
    borderColor: "border-purple-400",
    iconBg: "bg-purple-50",
    textColor: "text-purple-600",
    brandColor: "text-purple-600",
    scrollLimit: 0.41,
  },
  {
    id: "twitter",
    title: "X (Twitter)",
    url: "twitter.com/myhandle",
    icon: "🐦",
    logo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    // X/Twitter dark gradient
    gradientFrom: "#15202B",
    gradientTo: "#1A1A1A",
    color: "bg-gradient-to-r from-gray-700 to-gray-800",
    borderColor: "border-gray-500",
    iconBg: "bg-gray-100",
    textColor: "text-gray-700",
    brandColor: "text-gray-900",
    scrollLimit: 0.49,
  },
  {
    id: "linkedin",
    title: "LinkedIn Profile",
    url: "linkedin.com/in/myprofile",
    icon: "💼",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    // LinkedIn blue gradient
    gradientFrom: "#0077B5",
    gradientTo: "#0A66C2",
    color: "bg-gradient-to-r from-blue-600 to-blue-700",
    borderColor: "border-blue-500",
    iconBg: "bg-blue-50",
    textColor: "text-blue-600",
    brandColor: "text-blue-700",
    scrollLimit: 0.57,
  },
];

export default function UseCase1({ scrollProgress }: UseCase1Props) {
  const opacity = useTransform(
    scrollProgress,
    [0.2, 0.25, 0.75, 0.8],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollProgress,
    [0.2, 0.25, 0.75, 0.8],
    [100, 0, 0, -100],
  );

  const [remainingCards, setRemainingCards] = useState([...socialCards]);

  useMotionValueEvent(scrollProgress, "change", (value) => {
    if (value === undefined) return;
    setRemainingCards(
      socialCards.filter((card) => card.scrollLimit > value).reverse(),
    );
  });

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center sticky top-0 py-20 px-6 z-10"
      style={{ opacity, y }}
      id="how-it-works"
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
            Seamless Integration
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Add links with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              intelligence
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-600 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Simply add your social media profiles, websites, and other links.
            Our AI analyzes each link to optimize its presentation and
            engagement potential automatically.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn how it works
            </motion.button>
          </motion.div>
        </div>

        {/* Card Stack Area */}
        <motion.div
          className="relative flex justify-center h-96 md:h-[500px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Instruction text when cards are being removed */}
          {remainingCards.length < socialCards.length && (
            <motion.div
              className="absolute -top-10 left-0 right-0 text-center text-sm font-medium text-indigo-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>Scroll to add more links to your profile</span>
              <motion.div
                className="inline-block ml-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.div>
            </motion.div>
          )}

          {/* Empty state message when all cards are removed */}
          {remainingCards.length === 0 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6 rounded-xl border-2 border-dashed border-slate-200 max-w-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  All Links Added!
                </h3>
                <p className="text-sm text-slate-500">
                  Your profile is now complete with all your important links.
                  Check your profile to see how it looks!
                </p>
              </div>
            </motion.div>
          )}

          {/* The actual stacked cards */}
          <div className="relative w-full max-w-md mt-10">
            <AnimatePresence>
              {remainingCards.map((card, index) => {
                // Calculate dynamic styles for stacked effect
                const isTopCard = index === 0;
                const offset = remainingCards.length - index - 1;

                return (
                  <motion.div
                    key={card.id}
                    className="absolute left-0 right-0 p-6 lg:p-8 rounded-2xl bg-white shadow-xl border border-slate-200"
                    initial={
                      isTopCard
                        ? {
                            x: 0,
                            y: 0,
                            scale: 1,
                            zIndex: 10 - offset,
                            rotate: 0,
                          }
                        : {
                            x: offset * -15, // Now offsetting to the left
                            y: offset * 20,
                            scale: 1 - offset * 0.03,
                            zIndex: 10 - offset,
                            rotate: offset * -2, // Also reversed rotation direction
                          }
                    }
                    animate={{
                      x: offset * -15, // Now offsetting to the left
                      y: offset * 20,
                      scale: 1 - offset * 0.03,
                      zIndex: 10 - offset,
                      rotate: offset * -2, // Also reversed rotation direction
                      boxShadow: `0 ${4 + offset * 4}px ${8 + offset * 6}px rgba(0, 0, 0, ${0.06 + offset * 0.01})`,
                    }}
                    exit={
                      isTopCard
                        ? {
                            x: [null, 20, 250], // Now moving right
                            y: [null, -20, -100],
                            opacity: [null, 1, 0],
                            rotate: [null, 3, 10], // Changed rotation direction to match
                            transition: { duration: 0.5 },
                          }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <h3 className="text-xl font-semibold text-slate-900">
                          Add {card.title}
                        </h3>
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} ${card.brandColor}`}
                          >
                            {card.logo}
                          </div>
                          <div>
                            <p
                              className={`text-base font-medium ${card.textColor}`}
                            >
                              {card.title}
                            </p>
                            <p className="text-xs text-slate-400">
                              https://{card.url}
                            </p>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-xl">
                          {card.icon}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm text-slate-500 font-medium">
                              AI Recommendations
                            </label>
                            <span className="text-xs text-indigo-600">
                              Auto-detected
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <div
                              className={`px-3 py-1 rounded-full ${card.iconBg} ${card.textColor} text-xs font-medium border ${card.borderColor}`}
                            >
                              {card.title.split(" ")[0]}
                            </div>
                            <div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
                              Priority: High
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        className={`w-full py-3 rounded-xl ${card.color} text-white font-medium shadow-md relative overflow-hidden group`}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">
                          Add to Your Profile
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-xl opacity-70"></div>
          <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 blur-xl opacity-70"></div>
        </motion.div>
      </div>
    </motion.section>
  );
}
