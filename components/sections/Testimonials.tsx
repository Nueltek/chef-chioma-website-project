'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { fadeUpVariants } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';

interface Testimonial {
  _id: string;
  name: string;
  title?: string;
  location?: string;
  content: string;
  eventType?: string;
  rating: number;
}

const fallbackTestimonials: Testimonial[] = [
  {
    _id: '1',
    name: 'Ngozi Adeyemi',
    title: 'CEO, Silverbird Group',
    location: 'Lagos',
    content: "Chef Chioma turned our 25th anniversary into the most memorable evening of our lives. Every course was a revelation—familiar Nigerian flavors elevated to something I've never experienced before. Our guests are still talking about it months later.",
    eventType: 'Private Dining',
    rating: 5,
  },
  {
    _id: '2',
    name: 'David & Sarah Okafor',
    title: 'The Couple',
    location: 'Abuja',
    content: "Choosing Chef Chioma for our wedding was the best decision we made. She didn't just cater our event—she told our love story through food. The palm wine panna cotta brought tears to my mother's eyes.",
    eventType: 'Wedding',
    rating: 5,
  },
  {
    _id: '3',
    name: 'Michael Chen',
    title: 'Managing Director, Goldman Sachs',
    location: 'London',
    content: "We brought Chef Chioma to London for a corporate dinner with 50 executives from around the world. She introduced them to Nigerian cuisine in a way that was sophisticated, surprising, and absolutely delicious.",
    eventType: 'Corporate Event',
    rating: 5,
  },
  {
    _id: '4',
    name: 'Adaeze Nwosu',
    title: 'Restaurateur',
    location: 'Port Harcourt',
    content: "The cooking class with Chef Chioma wasn't just educational—it was transformative. I thought I knew Nigerian cooking, but she opened my eyes to techniques and flavor combinations I'd never considered.",
    eventType: 'Cooking Class',
    rating: 5,
  },
];

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const hasFetched = useRef(false);
  const badgeRef = useRef(null);
  const isBadgeInView = useInView(badgeRef, { once: true, amount: 0.1 });

  useEffect(() => {
    setMounted(true);
    
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchTestimonials();
    }
  }, []);

  const fetchTestimonials = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch('/api/testimonials?featured=true&limit=6', {
        signal: controller.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      
      if (data.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
        setTestimonials(data.testimonials);
      }
      // Keep fallback if no data
    } catch (error) {
      // Keep fallback testimonials on error
      console.log('Using fallback testimonials');
    }
  };

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [mounted, nextTestimonial]);

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="relative bg-earth-900 py-20 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184, 117, 51, 0.5) 0%, transparent 70%)',
        }}
      />
      
      {/* Large quote mark */}
      <div className="absolute top-16 right-4 md:top-20 md:right-10 lg:right-20 opacity-5">
        <Quote className="w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 text-copper" />
      </div>

      <div className="container-main relative">
        <SectionHeading
          scriptText="What Guests Say"
          title="Stories from the Table"
          subtitle="Every event creates memories. Here's what our guests have to say about their experiences."
          light
        />

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[320px] md:min-h-[380px] lg:min-h-[400px] flex items-center px-2 md:px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current._id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full"
              >
                <div className="text-center">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6 md:mb-8">
                    {[...Array(current.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-copper text-copper" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-display text-lg md:text-xl lg:text-2xl xl:text-3xl text-cream/90 leading-relaxed mb-6 md:mb-8 italic px-2 md:px-6">
                    &ldquo;{current.content}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div>
                    <p className="font-display text-base md:text-lg text-cream">
                      {current.name}
                    </p>
                    <p className="font-body text-cream/60 text-xs md:text-sm">
                      {[current.title, current.location].filter(Boolean).join(' • ')}
                    </p>
                    {current.eventType && (
                      <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-copper-light mt-2">
                        {current.eventType}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-cream/10 hover:text-cream transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-6 md:w-8 bg-copper' 
                      : 'w-2 bg-cream/30 hover:bg-cream/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-cream/10 hover:text-cream transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Google Reviews badge */}
        <motion.div
          ref={badgeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isBadgeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mt-12 md:mt-16"
        >
          <div className="flex items-center gap-2 bg-cream/10 rounded-full px-4 md:px-6 py-2 md:py-3">
            <span className="font-display text-base md:text-lg text-cream">5.0</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-copper text-copper" />
              ))}
            </div>
            <span className="text-cream/60 text-xs md:text-sm">on Google</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
