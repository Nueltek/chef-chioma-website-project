"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { images } from "@/lib/utils";

export default function CTASection() {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.1 });

  return (
    <section className="relative py-16 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images.table}
          alt="Elegant dining table setting"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-earth-900/95 via-earth-900/85 to-earth-900/75" />
      </div>

      {/* Content */}
      <div className="container-main relative">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4">
            Ready to Begin?
          </span>

          <h2 className="font-display text-2xl md:text-4xl lg:text-display text-cream mb-4 md:mb-6">
            Let&apos;s Create Something
            <br />
            Unforgettable Together
          </h2>

          <p className="font-body text-sm md:text-base lg:text-body-lg text-cream/80 mb-6 md:mb-8 max-w-xl mx-auto">
            Whether you&apos;re planning an intimate dinner, a grand
            celebration, or seeking to master the art of Nigerian cuisine—your
            culinary journey begins with a conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-5 md:px-8 py-3 md:py-4 bg-copper text-cream font-sans text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] border border-copper hover:bg-transparent hover:text-copper transition-all duration-400"
            >
              Reserve Your Experience
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 md:px-8 py-3 md:py-4 bg-transparent text-cream font-sans text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] border border-cream/40 hover:bg-cream/10 transition-all duration-400"
            >
              Get in Touch
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-cream/20">
            <div className="flex flex-col sm:flex-row gap-6 md:gap-12 justify-center">
              <div>
                <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-cream/50 mb-1 md:mb-2">
                  Email
                </p>
                <a
                  href="mailto:hello@chefchioma.com"
                  className="font-body text-sm md:text-base text-cream hover:text-copper-light transition-colors"
                >
                  hello@chefchioma.com
                </a>
              </div>
              <div>
                <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-cream/50 mb-1 md:mb-2">
                  Phone
                </p>
                <a
                  href="tel:+2348012345678"
                  className="font-body text-sm md:text-base text-cream hover:text-copper-light transition-colors"
                >
                  +234 801 234 5678
                </a>
              </div>
              <div>
                <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-cream/50 mb-1 md:mb-2">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm md:text-base text-cream hover:text-copper-light transition-colors"
                >
                  Chat with us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
