"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Store,
  BarChart2,
  Share2,
  MessageSquareText,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const [viewMode, setViewMode] = useState<"creator" | "public">("public");
  const [mounted, setMounted] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const links = [
    {
      id: "youtube",
      title: "My Latest YouTube Video",
      url: "https://youtube.com/watch?v=example",
      icon: <Youtube className="text-red-500" />,
      color: "bg-gradient-to-r from-red-500 to-red-600",
      views: 1243,
      growth: "+12%",
      suggestion: "Add 'Watch Now' to increase clicks by 18%",
    },
    {
      id: "instagram",
      title: "Follow me on Instagram",
      url: "https://instagram.com/username",
      icon: <Instagram className="text-pink-500" />,
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
      views: 2789,
      growth: "+24%",
      suggestion: null,
    },
    {
      id: "twitter",
      title: "Join the conversation on X",
      url: "https://twitter.com/username",
      icon: <Twitter className="text-black" />,
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
      views: 856,
      growth: "+3%",
      suggestion: "Pin this to increase visibility",
    },
    {
      id: "linkedin",
      title: "Connect with me on LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: <Linkedin className="text-blue-600" />,
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      views: 421,
      growth: "+8%",
      suggestion: null,
    },
    {
      id: "shop",
      title: "Visit my online shop",
      url: "https://shop.example.com",
      icon: <Store className="text-emerald-500" />,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      views: 1876,
      growth: "+35%",
      suggestion: "AI suggests moving this higher for +22% engagement",
    },
  ];

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      {/* Floating decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-900"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-900"></div>
      </div>

      {/* Top navigation bar */}
      <div className="top-0 z-50 w-full backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => router.push("/")}
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 p-1 px-3 dark:bg-gray-800">
              <span
                className={`text-sm ${viewMode === "public" ? "text-gray-500" : "font-medium"}`}
              >
                Creator
              </span>
              <Switch
                checked={viewMode === "public"}
                onCheckedChange={(checked) => {
                  setViewMode(checked ? "public" : "creator");
                }}
                className="data-[state=checked]:bg-indigo-500"
              />
              <span
                className={`text-sm ${viewMode === "creator" ? "text-gray-500" : "font-medium"}`}
              >
                Public
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {viewMode === "creator" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ opacity: 0, scale: 0.9, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-500 font-medium text-white shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Edit Profile
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="w-full max-w-4xl p-4 md:p-8">
        {/* Creator analytics and suggestions */}
        <div className="relative">
          <AnimatePresence>
            {viewMode === "creator" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Creator mode header with stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-8 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Profile Performance</h2>
                      <p className="text-sm text-gray-500">
                        Last 7 days overview
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs text-gray-500">Total Views</p>
                        <p className="text-xl font-bold">8,432</p>
                        <p className="text-xs text-green-500">
                          +16% from last week
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs text-gray-500">Total Clicks</p>
                        <p className="text-xl font-bold">1,245</p>
                        <p className="text-xs text-green-500">
                          +23% from last week
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs text-gray-500">CTR</p>
                        <p className="text-xl font-bold">14.8%</p>
                        <p className="text-xs text-green-500">
                          +5% from last week
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* AI suggestion */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-900/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-indigo-700 dark:text-indigo-400">
                        AI Suggestion
                      </h3>
                      <p className="mt-0.5 text-sm text-indigo-600/80 dark:text-indigo-300/80">
                        Reordering your links with Shop first could increase
                        your conversion rate by 22%. Would you like to apply
                        this change?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="h-8 bg-indigo-600 hover:bg-indigo-700"
                        >
                          Apply Change
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:bg-transparent dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center"
        >
          <motion.div
            className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
              JP
            </div>
          </motion.div>

          <h1 className="mb-1 text-2xl font-bold">Jo Perron</h1>
          <p className="mb-4 max-w-lg text-center text-gray-600 dark:text-gray-400">
            Product Designer & Developer • Creating beautiful digital
            experiences • Based in Montreal
          </p>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/70">
              Design
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900/70">
              Development
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-900/70">
              UI/UX
            </Badge>
          </div>

          {viewMode === "public" && (
            <div className="mb-6 flex gap-3">
              <Button size="sm" variant="outline" className="rounded-full">
                <Share2 size={14} className="mr-1" /> Share
              </Button>
              <Button size="sm" variant="outline" className="rounded-full">
                <MessageSquareText size={14} className="mr-1" /> Contact
              </Button>
            </div>
          )}
        </motion.div>

        {/* Links section */}
        <div className="mb-10 space-y-4">
          <AnimatePresence>
            {links.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setActiveLink(link.id)}
                onHoverEnd={() => setActiveLink(null)}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between p-4"
                >
                  {/* Background gradient when hovered */}
                  <motion.div
                    className={`absolute inset-0 opacity-0 ${link.color}`}
                    animate={{ opacity: activeLink === link.id ? 0.05 : 0 }}
                  />

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                      {link.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{link.title}</h3>
                      <p className="text-xs text-gray-500">
                        {link.url.replace("https://", "")}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={20} className="text-gray-400" />

                  {/* Creator stats overlay */}
                  {viewMode === "creator" && (
                    <div className="absolute right-12 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <BarChart2 size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {link.views.toLocaleString()}
                        </span>
                      </div>
                      <span
                        className={`text-xs ${link.growth.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                      >
                        {link.growth}
                      </span>
                    </div>
                  )}
                </Link>

                {/* AI suggestion for specific link (only in creator mode) */}
                {viewMode === "creator" && link.suggestion && (
                  <div className="border-t border-gray-100 bg-blue-50/30 px-4 py-2 dark:border-gray-800 dark:bg-blue-900/10">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-blue-500" />
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {link.suggestion}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col items-center gap-4 pb-10 text-center">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-sm font-bold text-white">L</span>
          </motion.div>

          <div>
            <p className="text-sm text-gray-500">
              Powered by{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Linktraa
              </span>
            </p>
            {viewMode === "public" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-blue-600 dark:text-blue-400"
                  asChild
                >
                  <Link href="/setup">
                    Create your own profile{" "}
                    <ExternalLink size={12} className="ml-1" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
