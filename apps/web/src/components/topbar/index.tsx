"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionValue, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";

// Navigation items
const navItems = [

    { label: "How It Works", id: "how-it-works", minScroll: 0.27, maxScroll: 0.78 },
    { label: "Features", id: "features", minScroll: 0.78, maxScroll: 1 },
  { label: "Pricing", id: "pricing", minScroll: 50, maxScroll: 70 }, // exist pas encore
];
interface TopBarProps {
    scrollProgress: MotionValue<number>
}

const scrollUnit = document.documentElement.scrollHeight

export default function TopBar({ scrollProgress }: TopBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    
    useMotionValueEvent(scrollProgress, "change", () => {
        const selectedSection = navItems.find((item) => scrollProgress.get() >= item.minScroll && scrollProgress.get() <= item.maxScroll)
        if (selectedSection?.id === activeSection) return 
        if (selectedSection){
            setActiveSection(selectedSection.id)
        }else{
            setActiveSection("home")
        }
    })
    
    const scrollTo = (sectionId: string)  => {
        console.log(scrollUnit)
        if (sectionId === 'home') {
            window.scrollTo({top: 0})
        }else{
            const item = navItems.find(item => item.id === sectionId)
            window.scrollTo({top: (item?.minScroll as number) * scrollUnit})
        }
    }
    
    return (
        <header
        className={`fixed px-5 top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl border py-0 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-gray-200/20 shadow-sm rounded-xl transition-all duration-300`}
        >
      {/* Animated particles for AI theme */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <div className="absolute -inset-[100%] opacity-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[20px] h-[20px] rounded-full bg-indigo-500/30"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
              }}
              animate={{
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => scrollTo('home')}>
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

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`relative text-sm font-medium hover:text-indigo-600 transition-colors cursor-pointer ${
                activeSection === item.id ? "text-indigo-600" : "text-gray-700"
              }`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
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

      {/* Mobile navigation menu */}
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
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block py-2 px-4 rounded-lg ${
                    activeSection === item.id
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
