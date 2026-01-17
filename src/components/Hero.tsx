"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ChatWidget from "./ChatWidget";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1e] via-[#1a1f3a] to-[#0f172a] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.5)] bg-blue-900/20">
              <Image
                src="/images/profile.jpg"
                alt="Profile Photo"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-[#e0e7ff] mb-6"
          >
            Engineering Excellence
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            A technical portfolio that doesn&apos;t just showcase work—it talks about it.
            Ask me anything about my projects, experience, or approach to engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <a
              href="/projects"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/50"
            >
              View Projects
            </a>
            <a
              href="/about"
              className="px-8 py-3 bg-blue-900/50 text-blue-200 rounded-lg font-semibold hover:bg-blue-900/70 transition-colors border border-blue-500/30"
            >
              Learn More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <ChatWidget />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
