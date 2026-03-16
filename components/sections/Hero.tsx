"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { images } from "@/lib/utils";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <section className="relative min-h-screen bg-earth-900" />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={images.heroChef}
          alt="Chef Chioma Okonkwo"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-earth-900/70" />
        {/* Warm gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900 via-transparent to-earth-900/50" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="container-main text-center py-20">
          {/* Script accent */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-script text-2xl md:text-3xl lg:text-4xl text-copper-light block mb-4"
          >
            Chef
          </motion.span>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cream mb-6 leading-[0.95]"
          >
            Chioma Okonkwo
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-24 h-px bg-copper mx-auto mb-6"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-lg md:text-xl lg:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto"
          >
            Elevated Nigerian Cuisine for Your Most
            <br className="hidden md:block" /> Cherished Gatherings
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-copper text-cream font-sans text-sm uppercase tracking-[0.2em] border border-copper hover:bg-copper-dark transition-all duration-300"
            >
              Book a Consultation
            </Link>
            <Link
              href="/menus"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-cream font-sans text-sm uppercase tracking-[0.2em] border border-cream/50 hover:bg-cream/10 transition-all duration-300"
            >
              View Menus
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="font-sans text-xs uppercase tracking-widest text-cream/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-cream/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
