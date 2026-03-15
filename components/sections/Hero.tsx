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
    <section className="relative min-h-screen overflow-hidden pt-16 md:pt-24 lg:pt-36">
      {/* Background with warm gradient overlay */}
      <div className="absolute inset-0">
        {/* Base gradient - warm earth tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />

        {/* Radial warm glow */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(184, 117, 51, 0.25) 0%, transparent 60%)",
          }}
        />

        {/* Secondary accent glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 70% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)",
          }}
        />

        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-noise" />
      </div>

      <div className="relative container-main min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-4">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="order-2 lg:order-1"
          >
            {/* Main title - no duplicate Chef here since navbar already has it */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl md:text-5xl lg:text-hero text-cream mb-4 md:mb-6"
            >
              <span className="font-script text-2xl md:text-3xl lg:text-4xl text-copper-light block mb-1 md:mb-2">
                Chef
              </span>
              Chioma
              <br />
              Okonkwo
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-lg md:text-xl lg:text-2xl text-cream/90 mb-3 md:mb-4 max-w-lg"
            >
              This is more than a meal.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-sm md:text-base lg:text-body-lg text-cream/70 mb-8 md:mb-10 max-w-lg leading-relaxed"
            >
              It&apos;s a refined culinary journey, woven from the rich tapestry
              of Nigerian heritage and crafted exclusively for you—designed to
              linger long after the last bite.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-5 md:px-8 py-3 md:py-4 bg-copper text-cream font-sans text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] border border-copper hover:bg-transparent hover:text-copper transition-all duration-400"
              >
                Reserve Your Experience
              </Link>
              <Link
                href="/menus"
                className="inline-flex items-center justify-center px-5 md:px-8 py-3 md:py-4 bg-transparent text-cream font-sans text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] border border-cream/40 hover:bg-cream/10 transition-all duration-400"
              >
                Explore Menus
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative grid grid-cols-12 gap-3 lg:gap-4">
              {/* Main chef image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="col-span-7 row-span-2 relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl"
              >
                <Image
                  src={images.heroChef}
                  alt="Chef Chioma Okonkwo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 40vw"
                  priority
                />
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/40 via-transparent to-transparent" />
              </motion.div>

              {/* Top right - plated dish */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="col-span-5 relative aspect-square rounded-sm overflow-hidden shadow-xl"
              >
                <Image
                  src={images.dish1}
                  alt="Signature Nigerian dish"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/30 to-transparent" />
              </motion.div>

              {/* Bottom right - another dish */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="col-span-5 relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl"
              >
                <Image
                  src={images.plating}
                  alt="Elegant plating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/30 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
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
