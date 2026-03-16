"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { images } from "@/lib/utils";

export default function Introduction() {
  const featuredRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);

  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.1 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.1 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const isBadgeInView = useInView(badgeRef, { once: true });

  return (
    <section className="relative bg-cream py-16 lg:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1A0F0A 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Featured in logos - subtle credibility */}
      <motion.div
        ref={featuredRef}
        initial={{ opacity: 0, y: 20 }}
        animate={
          isFeaturedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.6 }}
        className="container-main mb-12 lg:mb-24"
      >
        <p className="text-center font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-text-muted mb-6 md:mb-8">
          As Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-16 opacity-40">
          {["Forbes Africa", "CNN", "Guardian Life", "Bella Naija"].map(
            (name) => (
              <span
                key={name}
                className="font-display text-sm md:text-lg lg:text-xl text-earth-800"
              >
                {name}
              </span>
            ),
          )}
        </div>
      </motion.div>

      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40 }}
            animate={
              isImageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
            }
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src={images.about}
                  alt="Chef Chioma in her kitchen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Decorative frame - hidden on mobile */}
              <div className="hidden md:block absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-full h-full border border-copper/30 rounded-sm -z-10" />

              {/* Experience badge */}
              <motion.div
                ref={badgeRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isBadgeInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 lg:-bottom-8 lg:-left-8 bg-earth-800 text-cream p-4 md:p-6 lg:p-8 rounded-sm shadow-xl"
              >
                <span className="font-display text-3xl md:text-4xl lg:text-5xl block">
                  15+
                </span>
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-cream/70">
                  Years of Excellence
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 40 }}
            animate={
              isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }
            }
            transition={{ duration: 0.6 }}
          >
            <span className="font-script text-xl md:text-2xl lg:text-3xl text-copper block mb-2 md:mb-3">
              Introduction
            </span>

            <h2 className="font-display text-2xl md:text-3xl lg:text-display text-earth-900 mb-4 md:mb-6">
              Where Heritage Meets
              <br />
              Modern Elegance
            </h2>

            <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
              <p className="font-body text-sm md:text-base lg:text-body-lg text-text-secondary leading-relaxed">
                Welcome to a new chapter of private dining. Chef Chioma Okonkwo
                brings the soulful depth of West African cuisine to your most
                cherished gatherings, delivering Michelin-caliber experiences
                with the warmth of home.
              </p>

              <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                Born in Enugu and trained in the world&apos;s finest
                kitchens—from Le Cordon Bleu Paris to the legendary
                establishments of London and Dubai—Chef Chioma has spent over
                fifteen years perfecting her craft.
              </p>

              <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed hidden md:block">
                Every dish tells a story. Of grandmother&apos;s recipes
                reimagined. Of local ingredients sourced with intention. Of a
                heritage too rich to be contained by borders.
              </p>
            </div>

            {/* Philosophy quote */}
            <blockquote className="border-l-2 border-copper pl-4 md:pl-6 mb-6 md:mb-8">
              <p className="font-display text-base md:text-lg lg:text-xl italic text-earth-800">
                &ldquo;Food is memory made edible. I don&apos;t just cook—I
                translate love, history, and belonging onto a plate.&rdquo;
              </p>
              <cite className="font-sans text-[10px] md:text-sm uppercase tracking-widest text-text-muted mt-2 md:mt-3 block not-italic">
                — Chef Chioma Okonkwo
              </cite>
            </blockquote>

            <Link
              href="/about"
              className="relative z-10 inline-flex items-center gap-2 md:gap-3 font-sans text-xs md:text-sm uppercase tracking-widest text-earth-800 group hover:text-copper transition-colors duration-300"
            >
              <span className="border-b border-earth-800/30 group-hover:border-copper transition-colors duration-300">
                Read My Story
              </span>
              <svg
                className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
