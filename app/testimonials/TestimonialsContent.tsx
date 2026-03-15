'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/utils';

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
    name: 'Ngozi & Emeka Adeyemi',
    title: 'Celebrating 25 Years',
    location: 'Ikoyi, Lagos',
    content: 'Chef Chioma transformed our silver anniversary into the most memorable evening of our lives. Every course was a revelation—familiar Nigerian flavors elevated to something we\'d never experienced before. Our 12 guests are still talking about the moin moin soufflé months later. She didn\'t just cook for us; she created a love letter to our marriage through food.',
    eventType: 'Private Dining',
    rating: 5,
  },
  {
    _id: '2',
    name: 'David & Sarah Okafor',
    title: 'Wedding Celebration',
    location: 'Abuja',
    content: 'Choosing Chef Chioma for our 300-guest wedding was the best decision we made. She didn\'t just cater our event—she told our love story through food. The palm wine panna cotta brought tears to my mother\'s eyes because it reminded her of my late father\'s palm wine tapping days in the village. That\'s the level of thoughtfulness she brings.',
    eventType: 'Wedding',
    rating: 5,
  },
  {
    _id: '3',
    name: 'Michael Chen',
    title: 'Managing Director, Goldman Sachs West Africa',
    location: 'Victoria Island, Lagos',
    content: 'We brought Chef Chioma in for a corporate dinner with 50 executives from around the world. She introduced them to Nigerian cuisine in a way that was sophisticated, surprising, and absolutely delicious. The conversation around the table kept returning to the food—which is exactly what you want when you\'re building relationships. A masterclass in hospitality.',
    eventType: 'Corporate Event',
    rating: 5,
  },
  {
    _id: '4',
    name: 'Adaeze Nwosu',
    title: 'Restaurateur & Food Writer',
    location: 'Port Harcourt',
    content: 'The cooking class with Chef Chioma wasn\'t just educational—it was transformative. I thought I knew Nigerian cooking after running restaurants for 15 years, but she opened my eyes to techniques and flavor combinations I\'d never considered. My menu has evolved completely since. Worth every kobo.',
    eventType: 'Cooking Class',
    rating: 5,
  },
  {
    _id: '5',
    name: 'The Bakare Family',
    title: 'Chief Bakare\'s 70th Birthday',
    location: 'Ikeja, Lagos',
    content: 'We wanted something special for Daddy\'s 70th—not just good food, but a celebration of his life. Chef Chioma spent hours with us, learning about his childhood in Abeokuta, his favorite dishes, his memories. The menu she created was essentially his biography on a plate. He wept at the first course. We all did.',
    eventType: 'Private Dining',
    rating: 5,
  },
  {
    _id: '6',
    name: 'Yemi Alade',
    title: 'Music Artist',
    location: 'Lagos',
    content: 'After months of touring, I wanted to host an intimate dinner for my team. Chef Chioma created magic in my home. The energy, the aromas, the presentation—it felt like being wrapped in a warm embrace. This is what Nigerian hospitality looks like at its finest.',
    eventType: 'Private Dining',
    rating: 5,
  },
];

export default function TestimonialsContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchTestimonials();
    }
  }, []);

  const fetchTestimonials = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch('/api/testimonials', {
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
      console.log('Using fallback testimonials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-earth-900 overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 117, 51, 0.3) 0%, transparent 60%)',
          }}
        />
        
        {/* Large quote mark */}
        <div className="absolute top-1/4 right-10 lg:right-20 opacity-10">
          <Quote className="w-40 h-40 lg:w-64 lg:h-64 text-copper" />
        </div>

        <div className="container-main relative py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="font-script text-3xl text-copper-light block mb-4">Testimonials</span>
            <h1 className="font-display text-hero text-cream mb-6">
              Stories from the Table
            </h1>
            <p className="font-body text-xl text-cream/80 max-w-xl">
              Every gathering is unique, but the sentiment remains the same—our clients become family.
              Here&apos;s what they have to say about their experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream py-12 border-b border-earth-200">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-4xl text-copper mb-1">500+</p>
              <p className="font-body text-text-secondary text-sm">Events Catered</p>
            </div>
            <div>
              <p className="font-display text-4xl text-copper mb-1">15+</p>
              <p className="font-body text-text-secondary text-sm">Years Experience</p>
            </div>
            <div>
              <p className="font-display text-4xl text-copper mb-1">5.0</p>
              <p className="font-body text-text-secondary text-sm">Google Rating</p>
            </div>
            <div>
              <p className="font-display text-4xl text-copper mb-1">98%</p>
              <p className="font-body text-text-secondary text-sm">Return Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-main">
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial._id}
                variants={staggerItemVariants}
                className="bg-white border border-earth-200 rounded-sm p-8 relative"
              >
                {/* Quote mark */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-copper/20" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-copper text-copper" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="font-body text-text-secondary leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-earth-100 pt-4">
                  <p className="font-display text-lg text-earth-900">{testimonial.name}</p>
                  {testimonial.title && (
                    <p className="font-body text-sm text-text-muted">{testimonial.title}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {testimonial.location && (
                      <span className="font-body text-xs text-text-muted">{testimonial.location}</span>
                    )}
                    {testimonial.eventType && (
                      <>
                        <span className="text-earth-300">•</span>
                        <span className="font-sans text-xs uppercase tracking-widest text-copper">
                          {testimonial.eventType}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-earth-900 py-16 lg:py-24">
        <div className="container-main text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <span className="font-script text-3xl text-copper-light block mb-4">
              Ready to Create Your Story?
            </span>
            <h2 className="font-display text-display text-cream mb-6">
              Let&apos;s Make Memories Together
            </h2>
            <p className="font-body text-body-lg text-cream/80 mb-8">
              Join the family of satisfied clients who have experienced 
              Chef Chioma&apos;s extraordinary culinary artistry.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-copper text-cream font-sans text-sm uppercase tracking-[0.2em] border border-copper hover:bg-transparent hover:text-copper transition-all duration-400"
            >
              Book Your Experience
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
