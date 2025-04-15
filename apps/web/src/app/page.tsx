"use client";

import Phone from "@/components/phone";
import Background from "@/components/background";
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import Hero from "@/components/hero";
import UseCase1 from "@/components/useCase1";
import UseCase2 from "@/components/useCase2";
import ScrollIndicator from "@/components/scrollIndicator";
import TopBar from "@/components/topbar";
import FeatureHighlights from "@/components/highlights";
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
      <TopBar scrollProgress={smoothProgress} />
      <Background />
      <ScrollIndicator scrollProgress={smoothProgress} />

      <Hero scrollProgress={smoothProgress} />
      <UseCase1 scrollProgress={smoothProgress} />
      <Phone scrollProgress={smoothProgress} />
      <UseCase2 scrollProgress={smoothProgress} />
      <FeatureHighlights scrollProgress={smoothProgress} />
    </div>
  );
}
