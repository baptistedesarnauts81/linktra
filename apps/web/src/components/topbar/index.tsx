"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";

// Enhanced navigation items with subsections
const navItems = [
  {
    label: "How It Works",
    id: "how-it-works",
    minScroll: 0.2,
    maxScroll: 0.6,
    subsections: [],
  },
  {
    label: "Features",
    id: "features",
    minScroll: 0.65,
    maxScroll: 1,
    subsections: [
      {
        label: "Key Features",
        id: "key-features",
        minScroll: 0.65,
        maxScroll: 0.85,
      },
      {
        label: "Analytics",
        id: "analytics",
        minScroll: 0.85,
        maxScroll: 1,
      },
    ],
  },
];

interface TopBarProps {
  scrollProgress: MotionValue<number>;
}

export default function TopBar({ scrollProgress }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const [scrollUnit, setScrollUnit] = useState(0);
  const prevScrollValue = useRef(0);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Skip client-side effects during SSR
  const [isMounted, setIsMounted] = useState(false);

  // Derived state using transforms (more efficient)
  const isFeaturesActive = useTransform(scrollProgress, (value) => {
    const featuresItem = navItems.find((item) => item.id === "features");
    return featuresItem
      ? value >= featuresItem.minScroll && value <= featuresItem.maxScroll
      : false;
  });

  // Setup once on mount
  useEffect(() => {
    setIsMounted(true);
    setScrollUnit(document.documentElement.scrollHeight);

    // Optimize resize handler with debounce
    const handleResize = () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(() => {
        setScrollUnit(document.documentElement.scrollHeight);
      }, 200); // 200ms debounce
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Memoize particle positions to prevent recalculation
  const particles = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => {
      // Reduced from 6 to 4
      const xPos1 = 20 + ((i * 15) % 80);
      const xPos2 = 30 + ((i * 20) % 70);
      const yPos1 = 25 + ((i * 10) % 75);
      const yPos2 = 40 + ((i * 15) % 60);
      const duration = 15 + i * 2;

      return { xPos1, xPos2, yPos1, yPos2, duration };
    });
  }, []);

  // Optimized scroll handler with throttling
  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (!latest) return;

    // Throttle updates - only process if value changed significantly
    if (Math.abs(latest - prevScrollValue.current) < 0.005) return;
    prevScrollValue.current = latest;

    // Find active section/subsection - done outside React state update for performance
    let newActiveSection = "home";
    let newActiveSubsection: string | null = null;

    // Find the active main section
    const selectedSection = navItems.find(
      (item) => latest >= item.minScroll && latest <= item.maxScroll
    );

    if (selectedSection) {
      newActiveSection = selectedSection.id;

      // Find the active subsection if there are any
      if (selectedSection.subsections.length > 0) {
        const foundSubsection = selectedSection.subsections.find(
          (sub) => latest >= sub.minScroll && latest <= sub.maxScroll
        );

        if (foundSubsection) {
          newActiveSubsection = foundSubsection.id;
        }
      }
    }

    // Only update state if values actually changed (prevents unnecessary renders)
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }

    if (newActiveSubsection !== activeSubsection) {
      setActiveSubsection(newActiveSubsection);
    }
  });

  const scrollTo = (sectionId: string, subsectionId?: string) => {
    if (!isMounted) return;

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If a subsection is specified, scroll to it
      if (subsectionId) {
        const parentSection = navItems.find((item) => item.id === sectionId);
        if (parentSection) {
          const subsection = parentSection.subsections.find(
            (sub) => sub.id === subsectionId
          );
          if (subsection && scrollUnit) {
            window.scrollTo({
              top: (subsection.minScroll as number) * scrollUnit,
              behavior: "smooth",
            });
            return;
          }
        }
      }

      // Otherwise scroll to the main section
      const item = navItems.find((item) => item.id === sectionId);
      if (item && scrollUnit) {
        window.scrollTo({
          top: (item.minScroll as number) * scrollUnit,
          behavior: "smooth",
        });
      }
    }
  };

  const showFeaturesActive = isFeaturesActive.get();

  return (
    <header
      className={`fixed px-5 top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl border py-0 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-gray-200/20 shadow-sm rounded-xl transition-all duration-300 ${showFeaturesActive ? "pb-2" : ""}`}
    >
      {/* Optimized animated particles - fewer of them, will-change property */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute -inset-[100%] opacity-20">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-[20px] h-[20px] rounded-full bg-indigo-500/30"
                style={{
                  willChange: "transform",
                  translateZ: 0, // Hardware acceleration hint
                }}
                initial={{
                  x: `${particle.xPos1}%`,
                  y: `${particle.yPos1}%`,
                }}
                animate={{
                  x: [`${particle.xPos1}%`, `${particle.xPos2}%`],
                  y: [`${particle.yPos1}%`, `${particle.yPos2}%`],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  background: [
                    "linear-gradient(to bottom right, #8b5cf6, #3b82f6)",
                    "linear-gradient(to bottom right, #a855f7, #2563eb)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                  willChange: "transform",
                  translateZ: 0, // Hardware acceleration hint
                }}
                initial={{ x: -100 }}
                animate={{ x: 100 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">Linktraa</span>
            </div>
          </div>
        </div>

        {/* Desktop navigation - memoized rendering */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.id} className="relative flex items-start">
              {/* Main menu item */}
              <div
                className={`relative text-sm font-medium hover:text-indigo-600 transition-colors cursor-pointer flex-1 self-center ${
                  activeSection === item.id
                    ? "text-indigo-600"
                    : "text-gray-700"
                }`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
                {activeSection === item.id && item.subsections.length === 0 && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  />
                )}
              </div>

              {/* Subsections - conditionally rendered with simpler animations */}
              {activeSection === item.id && item.subsections.length > 0 && (
                <motion.div
                  className="flex flex-col ml-3 space-y-1 self-center border-l-2 border-indigo-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  {item.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      className={`text-xs font-medium cursor-pointer transition-colors py-0.5 px-2 rounded-md ${
                        activeSubsection === subsection.id
                          ? " text-indigo-700"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                      onClick={() => scrollTo(item.id, subsection.id)}
                    >
                      {subsection.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Log In
          </Button>
          <Button size="sm" className="relative overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600"
              style={{ willChange: "background" }}
              animate={{
                background: [
                  "linear-gradient(to right, #4f46e5, #3b82f6)",
                  "linear-gradient(to right, #6366f1, #2563eb)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                willChange: "transform",
                translateZ: 0, // Hardware acceleration hint
              }}
              initial={{ x: -100 }}
              animate={{ x: 100 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            />
          </Button>

          {/* Mobile menu toggle */}
          <button
            className="flex md:hidden ml-1 w-9 h-9 items-center justify-center rounded-lg bg-gray-100/80 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}
            >
              {isMenuOpen ? (
                <path
                  d="M1 1L17 17M1 17L17 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M1 3H17M1 9H17M1 15H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation menu - only animate when needed */}
      {isMounted && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 px-2 space-y-4 border-t border-gray-100/50 mt-2">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`block py-2 px-4 rounded-lg cursor-pointer ${
                        activeSection === item.id
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        scrollTo(item.id);
                        if (item.subsections.length === 0) {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      {item.label}
                    </div>

                    {/* Mobile subsections */}
                    {activeSection === item.id &&
                      item.subsections.length > 0 && (
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-indigo-100 pl-2">
                          {item.subsections.map((subsection) => (
                            <div
                              key={subsection.id}
                              className={`py-2 px-4 rounded-lg cursor-pointer text-sm ${
                                activeSubsection === subsection.id
                                  ? "bg-indigo-50/50 text-indigo-700"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                              onClick={() => {
                                scrollTo(item.id, subsection.id);
                                setIsMenuOpen(false);
                              }}
                            >
                              {subsection.label}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}
