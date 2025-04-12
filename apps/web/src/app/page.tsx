"use client";

import Phone from "@/components/phone";
import Background from "@/components/background";
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { Button } from "@linktra/components/button";;
import Hero from "@/components/hero";
import UseCase1 from "@/components/useCase1";
import UseCase2 from "@/components/useCase2";

export default function Home() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div ref={pageRef} className="flex flex-col min-h-[500vh]">
      <header className="fixed px-5 top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 rounded-xl shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                L
              </div>
            </div>
            <span className="text-xl font-bold">Linktraa</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <p
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </p>
            <p
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </p>
            <p
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Pricing
            </p>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="lg" className="hidden md:flex">
              Log In
            </Button>
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </header>
      <Background />
      <Hero scrollProgress={smoothProgress} />
      <UseCase1 scrollProgress={smoothProgress} />
      <Phone scrollProgress={smoothProgress} />
      <UseCase2 scrollProgress={smoothProgress}/>
    </div>
  );
}
