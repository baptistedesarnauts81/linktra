"use client";
import type { MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { socialCards } from "../useCase1";

interface PhoneProps {
  scrollProgress: MotionValue<number>;
}

export default function Phone({ scrollProgress }: PhoneProps) {
  const phoneRef = useRef(null);
  const isInView = useInView(phoneRef, { once: false, amount: 0.3 });
  const opacity = useTransform(
    scrollProgress,
    [0.2, 0.25, 0.75, 0.8],
    [0, 1, 1, 0],
  );
  const [addedCards, setAddedCards] = useState([...socialCards]);

  useMotionValueEvent(scrollProgress, "change", (value) => {
    if (value === undefined) return;
    setAddedCards(
      socialCards.filter((card) => card.scrollLimit < value).reverse(),
    );
  });

  return (
    <motion.div
      className="fixed top-1/2 right-[5%] transform -translate-y-1/2 z-20 md:right-[5%] lg:right-[10%] xl:right-[7%] hidden lg:block"
      ref={phoneRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
      style={{opacity}}
    >
      <motion.div
        className="w-[300px] h-[600px] rounded-[40px] bg-black dark:bg-white border border-white/10 p-3 shadow-2xl relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-tr from-white/5 to-white/10 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 rounded-[40px]"></div>

        <motion.div
          className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-purple-500/10 to-transparent rounded-t-[40px] opacity-30"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-xl z-10"></div>

        <div className="w-full h-full rounded-[32px] overflow-hidden bg-gradient-to-b from-gray-900 to-black relative z-0">
          {/* Scrollable area needs to contain the cards */}
          <div className="w-full h-full overflow-auto scrollbar-hide p-6">
            <div className="flex flex-col items-center mb-8">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mb-4 border-2 border-white/55 flex items-center justify-center text-white text-xl font-bold relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <span>Jo</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0"
                  animate={{ x: [-200, 200] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.div>

              <motion.h3
                className="text-base font-semibold text-white mb-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                @JoPerron
              </motion.h3>

              <motion.p
                className="text-xs text-white/60 text-center"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Your bio goes here. Tell the world about yourself!
              </motion.p>
            </div>

            {/* Cards section should be inside the scrollable area */}
            <div className="space-y-1.5 mt-5">
              <AnimatePresence>
                {addedCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className="relative overflow-hidden rounded-lg backdrop-blur-sm bg-white/10"
                    initial={{
                      opacity: 0,
                      x: -200,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      duration: 0.4,
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5"
                      style={{
                        background: `linear-gradient(to bottom, ${card.gradientFrom || "#3b82f6"}, ${card.gradientTo || "#8b5cf6"})`,
                      }}
                    />
                    <div className="relative flex items-center py-2 px-2.5">
                      <div
                        className="flex-shrink-0 mr-2 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: `${card.gradientFrom}`,
                        }}
                      >
                        <div className="text-white w-2.5 h-2.5 flex-1 flex justify-center items-center">
                          {card.logo}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">
                          {card.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 rounded-[40px]"
          animate={{
            opacity: [0, 0.05, 0],
            left: ["-100%", "100%"],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-10 rounded-[60px] opacity-30 blur-2xl z-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(111, 66, 193, 0.3) 0%, rgba(13, 13, 13, 0) 70%)",
            "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.3) 0%, rgba(13, 13, 13, 0) 70%)",
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, rgba(13, 13, 13, 0) 70%)",
            "radial-gradient(circle at 50% 50%, rgba(111, 66, 193, 0.3) 0%, rgba(13, 13, 13, 0) 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </motion.div>
  );
}
