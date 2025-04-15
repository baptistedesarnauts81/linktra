"use client";
import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import LinkAnalyticsGraph from "@/components/analyticsGraphFake";
import { useIsMobile } from "../../../../../packages/components/src/hooks/use-mobile";

interface UseCase2Props {
  scrollProgress: MotionValue<number>;
}

export default function UseCase2({ scrollProgress }: UseCase2Props) {
  const opacity = useTransform(
    scrollProgress,
    [0.85, 0.9, 0.95, 1],
    [0, 1, 1, 0.8]
  );
  const y = useTransform(scrollProgress, [0.8, 0.9, 0.95, 1], [100, 0, 0, 0]);
  const isMobile = useIsMobile();

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center sticky top-0 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 z-10"
      style={{ opacity, y }}
      id="features"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-block px-3 sm:px-4 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs sm:text-sm font-medium text-indigo-700 backdrop-blur-sm"
          >
            Intelligent Analytics
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              AI-driven analytics
            </span>{" "}
            that evolve
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-slate-600 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Get predictive insights about visitor behavior, engagement patterns,
            and conversion potential. Our AI doesn't just track clicks it
            predicts future trends, suggests optimal link ordering, and delivers
            personalized recommendations to maximize your engagement.
          </motion.p>

          {/* Features list */}
          <motion.div
            className="space-y-3 sm:space-y-4 mt-6 sm:mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                title: "Real-time metrics",
                description:
                  "Track performance as it happens with instant updates.",
              },
              {
                icon: (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
                title: "Conversion insights",
                description:
                  "Understand what drives action and optimize for results.",
              },
              {
                icon: (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
                title: "AI recommendations",
                description:
                  "Get smart suggestions to improve engagement and reach.",
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="pt-2 sm:pt-4"
          >
            <motion.button
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-sm md:text-base text-white font-medium shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all hover:scale-105 active:scale-98"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Try analytics dashboard
            </motion.button>
          </motion.div>
        </div>

        {/* Analytics Graph */}
        {!isMobile && (
          <motion.div
            className="rounded-xl overflow-hidden bg-gradient-to-br from-white/60 to-white/90 backdrop-blur-md relative mt-8 md:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="p-1 sm:p-1.5">
              <LinkAnalyticsGraph />
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
