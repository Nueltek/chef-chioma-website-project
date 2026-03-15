'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { images } from '@/lib/utils';

const milestones = [
  { year: '2008', title: 'Le Cordon Bleu Paris', description: 'Graduated with Grand Diplôme in Culinary Arts' },
  { year: '2010', title: 'London Chapter', description: 'Trained at The Ledbury and Dinner by Heston' },
  { year: '2014', title: 'Dubai Debut', description: 'Executive Sous Chef at Pierchic Dubai' },
  { year: '2017', title: 'Return Home', description: 'Launched private dining practice in Lagos' },
  { year: '2020', title: 'Forbes Africa', description: 'Featured as "New Voice in African Cuisine"' },
  { year: '2024', title: 'Today', description: 'Creating unforgettable experiences across Nigeria and beyond' },
];

export default function AboutContent() {
  const storyImageRef = useRef(null);
  const storyContentRef = useRef(null);
  const philosophyHeaderRef = useRef(null);
  const philosophyGridRef = useRef(null);
  const timelineHeaderRef = useRef(null);
  const timelineRef = useRef(null);
  const ctaRef = useRef(null);

  const isStoryImageInView = useInView(storyImageRef, { once: true, amount: 0.1 });
  const isStoryContentInView = useInView(storyContentRef, { once: true, amount: 0.1 });
  const isPhilosophyHeaderInView = useInView(philosophyHeaderRef, { once: true, amount: 0.1 });
  const isPhilosophyGridInView = useInView(philosophyGridRef, { once: true, amount: 0.1 });
  const isTimelineHeaderInView = useInView(timelineHeaderRef, { once: true, amount: 0.1 });
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center bg-earth-900 overflow-hidden pt-20 md:pt-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 70% 50%, rgba(184, 117, 51, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="container-main relative py-16 md:py-32">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4"
            >
              Meet the Chef
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-hero text-cream mb-4 md:mb-6"
            >
              Chioma Okonkwo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-body text-lg md:text-xl text-cream/80 max-w-xl"
            >
              Where the warmth of Nigerian tradition meets the precision of global technique.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-cream py-16 lg:py-28">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              ref={storyImageRef}
              initial={{ opacity: 0, x: -40 }}
              animate={isStoryImageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7 }}
              className="relative lg:sticky lg:top-32"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src={images.cooking}
                  alt="Chef Chioma preparing a dish"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="hidden md:block absolute -bottom-4 -right-4 w-full h-full border border-copper/30 rounded-sm -z-10" />
            </motion.div>

            {/* Story Content */}
            <motion.div
              ref={storyContentRef}
              initial={{ opacity: 0, x: 40 }}
              animate={isStoryContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.7 }}
              className="lg:py-8"
            >
              <span className="font-script text-xl md:text-2xl text-copper block mb-3 md:mb-4">The Journey</span>
              <h2 className="font-display text-section text-earth-900 mb-8">
                From Grandmother&apos;s Kitchen to the World&apos;s Stage
              </h2>

              <div className="prose prose-lg max-w-none space-y-6">
                <p className="font-body text-text-secondary leading-relaxed">
                  My earliest memories are steeped in the aromas of my grandmother&apos;s kitchen in Enugu. 
                  The rhythmic pounding of yam, the sizzle of palm oil meeting fresh peppers, the way 
                  she could tell by scent alone when the ogbono was ready. She cooked not from recipes, 
                  but from a deep ancestral knowing.
                </p>

                <p className="font-body text-text-secondary leading-relaxed">
                  At fifteen, I announced I would become a chef. In a family of engineers and doctors, 
                  this was received with polite confusion. But my grandmother understood. She pressed 
                  her worn wooden spoon into my hands and said, &ldquo;Go learn everything. Then come 
                  home and teach them what Nigerian food really means.&rdquo;
                </p>

                <p className="font-body text-text-secondary leading-relaxed">
                  Le Cordon Bleu Paris taught me technique. London&apos;s Michelin-starred kitchens 
                  taught me precision. Dubai taught me to cook for the world&apos;s most discerning 
                  palates. But it was returning home to Nigeria that taught me my true purpose: to 
                  bridge worlds.
                </p>

                <blockquote className="border-l-2 border-copper pl-6 my-8">
                  <p className="font-display text-xl italic text-earth-800">
                    &ldquo;Nigerian cuisine isn&apos;t just food—it&apos;s memory, it&apos;s celebration, 
                    it&apos;s the very essence of who we are. My mission is to help the world taste 
                    that truth.&rdquo;
                  </p>
                </blockquote>

                <p className="font-body text-text-secondary leading-relaxed">
                  Today, I create dining experiences that honor my grandmother&apos;s legacy while 
                  pushing the boundaries of what Nigerian cuisine can be. Every dish is a conversation 
                  between tradition and innovation, between the familiar and the extraordinary.
                </p>

                <p className="font-body text-text-secondary leading-relaxed">
                  Whether I&apos;m preparing an intimate dinner for two in Lagos, catering a 
                  wedding celebration in Abuja, or flying to London for a corporate event, 
                  I carry the same philosophy: food is the most intimate gift you can give. 
                  It deserves to be prepared with reverence, served with joy, and remembered forever.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-earth-800 py-16 lg:py-28">
        <div className="container-main">
          <motion.div
            ref={philosophyHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isPhilosophyHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <span className="font-script text-xl md:text-2xl text-copper-light block mb-3 md:mb-4">My Philosophy</span>
            <h2 className="font-display text-2xl md:text-section text-cream">Three Pillars of My Craft</h2>
          </motion.div>

          <motion.div
            ref={philosophyGridRef}
            initial={{ opacity: 0 }}
            animate={isPhilosophyGridInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              {
                title: 'Heritage',
                description: 'Every recipe carries the wisdom of generations. I honor traditional techniques while understanding when to evolve them. The flavors of Nigeria are not static—they are a living conversation across time.',
              },
              {
                title: 'Intention',
                description: 'From sourcing ingredients to the final garnish, every choice is deliberate. I work with local farmers and artisans who share my commitment to quality. The journey to the plate matters as much as the destination.',
              },
              {
                title: 'Experience',
                description: 'A meal is never just about taste. It&apos;s about the story you tell, the atmosphere you create, the memories you forge. I design complete experiences that engage all the senses and linger in the heart.',
              },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isPhilosophyGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-4xl md:text-6xl text-copper/20 block mb-3 md:mb-4">
                  0{index + 1}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-cream mb-3 md:mb-4">{pillar.title}</h3>
                <p className="font-body text-sm md:text-base text-cream/70 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-cream py-16 lg:py-28">
        <div className="container-main">
          <motion.div
            ref={timelineHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="font-script text-xl md:text-2xl text-copper block mb-3 md:mb-4">The Journey</span>
            <h2 className="font-display text-2xl md:text-section text-earth-900">Milestones</h2>
          </motion.div>

          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0 }}
            animate={isTimelineInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex gap-4 md:gap-6 mb-6 md:mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-16 md:w-20">
                  <span className="font-display text-lg md:text-xl text-copper">{milestone.year}</span>
                </div>
                <div className="flex-1 pb-6 md:pb-8 border-l border-earth-200 pl-4 md:pl-6 relative">
                  <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-copper -translate-x-1/2" />
                  <h3 className="font-display text-lg md:text-xl text-earth-900 mb-1">{milestone.title}</h3>
                  <p className="font-body text-sm md:text-base text-text-secondary">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-earth-900 py-16 lg:py-28">
        <div className="container-main text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4">
              Let&apos;s Create Together
            </span>
            <h2 className="font-display text-2xl md:text-display text-cream mb-4 md:mb-6">
              Your Story Deserves an Unforgettable Meal
            </h2>
            <p className="font-body text-base md:text-body-lg text-cream/80 mb-6 md:mb-8">
              Every occasion is unique. Let&apos;s discuss how we can make yours extraordinary.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-copper text-cream font-sans text-xs md:text-sm uppercase tracking-[0.2em] border border-copper hover:bg-transparent hover:text-copper transition-all duration-400"
            >
              Start the Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
