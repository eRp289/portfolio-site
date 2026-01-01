"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Linkedin, Github, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const socialLinks = [
  { icon: Mail, href: "mailto:yehuda@ypinchuck.com", label: "Send email to Yehuda", external: false },
  { icon: Linkedin, href: "https://www.linkedin.com/in/yehudap", label: "View LinkedIn profile", external: true },
  { icon: Github, href: "https://github.com/eRp289", label: "View GitHub profile", external: true },
] as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Clean gradient background with subtle radial overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/50 animate-gradient"
        style={{ y: backgroundY }}
        aria-hidden="true"
      />

      {/* Subtle radial overlay for depth */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.12),transparent)]" />
      </div>

      {/* Visible floating orbs for visual interest */}
      <motion.div
        className="absolute top-20 right-1/4 w-64 h-64 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-32 left-1/5 w-72 h-72 bg-emerald-300/25 dark:bg-emerald-400/15 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, -25, 0],
          y: [0, 25, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 container mx-auto px-6"
        style={{ y: textY, opacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Avatar with refined presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
              {/* Refined glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full blur-3xl opacity-20 dark:opacity-25"
                animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.25, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-premium-xl border-4 border-white/80 dark:border-gray-800/80">
                <Image
                  src="https://avatars.githubusercontent.com/u/152485437?s=400&u=1cfa80090077633b1ab3446b11c56f8280bd2864&v=4"
                  alt="Yehuda Pinchuck - Professional headshot"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                />
              </div>
              {/* Refined wave badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-premium-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <span className="text-white text-xl">👋</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 glass rounded-full shadow-premium"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            >
              <motion.span
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Available for opportunities</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Yehuda
              <span className="block text-emerald-600 dark:text-emerald-400">Pinchuck</span>
            </motion.h1>

            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                className="h-px w-8 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                aria-hidden="true"
              />
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
                Tech • Innovation • AI
              </p>
              <motion.span
                className="h-px w-8 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.p
              className="text-gray-600 dark:text-gray-400 mb-10 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Building secure, innovative solutions at the intersection of
              technology and law enforcement.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-8 py-6 text-base font-medium rounded-full shadow-premium-lg hover-lift group focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 transition-premium"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 px-8 py-6 text-base font-medium rounded-full hover-lift-sm transition-premium focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
              </Button>
            </motion.div>

            <motion.nav
              className="flex gap-4 justify-center lg:justify-start mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              aria-label="Social media links"
            >
              {socialLinks.map(({ icon: Icon, href, label, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="p-3 glass rounded-xl text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-premium hover-lift-sm transition-premium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
