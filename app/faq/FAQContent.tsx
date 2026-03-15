'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'Booking & Pricing',
    items: [
      {
        question: 'How far in advance should I book?',
        answer: 'For intimate dinners (up to 20 guests), I recommend booking at least 2-3 weeks in advance. For larger events, weddings, or corporate functions, 4-8 weeks notice allows adequate time for menu planning, tastings, and coordination. That said, I understand special occasions sometimes arise unexpectedly—please reach out even on shorter notice, and I\'ll do my best to accommodate.',
      },
      {
        question: 'What are your pricing structures?',
        answer: 'Pricing varies based on the type of service, number of guests, menu complexity, and event logistics. Intimate private dining experiences for 2-8 guests typically start from ₦350,000, while larger events are quoted based on specific requirements. I provide detailed proposals after our initial consultation so there are no surprises. Every quote includes menu development, ingredient sourcing, preparation, service, and cleanup.',
      },
      {
        question: 'Is there a minimum guest count?',
        answer: 'There\'s no minimum for private dining experiences—I frequently cook intimate dinners for two. However, for catering services at venues outside your home, there\'s typically a minimum of 25 guests to ensure the experience justifies the logistics involved.',
      },
      {
        question: 'Do you require a deposit?',
        answer: 'Yes, a 50% deposit is required to secure your date, with the balance due 48 hours before the event. For weddings and large-scale events, a tiered payment structure is arranged. All deposits are non-refundable but transferable to a new date with at least 14 days\' notice.',
      },
    ],
  },
  {
    title: 'Services & Menu',
    items: [
      {
        question: 'Can you accommodate dietary restrictions and allergies?',
        answer: 'Absolutely. During our consultation, I gather detailed information about any dietary requirements—whether vegetarian, vegan, gluten-free, halal, or specific allergies. My menus are designed with flexibility in mind, and I can create equally stunning alternatives that never feel like an afterthought. Your guests\' safety and enjoyment are paramount.',
      },
      {
        question: 'Do you only cook Nigerian cuisine?',
        answer: 'While Nigerian cuisine is my specialty and passion, my training at Le Cordon Bleu and experience in international kitchens means I\'m equally comfortable with French, Mediterranean, Asian-fusion, and contemporary global cuisines. Many clients love my approach of applying classic techniques to Nigerian ingredients—the best of both worlds.',
      },
      {
        question: 'Can I request specific dishes?',
        answer: 'Of course. If there\'s a family recipe you\'d like elevated, a dish that holds special meaning, or simply a favorite you\'d love to see reimagined, I welcome the collaboration. Some of my most memorable menus have grown from a single dish a client mentioned in passing.',
      },
      {
        question: 'Do you offer menu tastings?',
        answer: 'For weddings and events over 100 guests, a complimentary tasting session is included. For smaller events, tastings can be arranged at an additional cost, which is credited toward your final booking if you proceed. Tastings typically feature 4-5 dishes from your proposed menu.',
      },
    ],
  },
  {
    title: 'Logistics & Event Day',
    items: [
      {
        question: 'What equipment and space do you need?',
        answer: 'For most private dining experiences, a standard home kitchen is sufficient—I bring specialty equipment, cookware, and serving ware as needed. Before your event, I conduct a brief kitchen assessment (in-person or via video call) to ensure everything runs smoothly. For venues without kitchen facilities, I can arrange mobile kitchen setups.',
      },
      {
        question: 'Do you provide serving staff?',
        answer: 'Yes. For intimate dinners, I personally handle both cooking and service to maintain the bespoke experience. For larger events, I bring a trained team of servers and kitchen assistants. Staffing is included in your quote based on guest count and service style.',
      },
      {
        question: 'What happens to leftover food?',
        answer: 'Any leftovers are yours to keep—I package them properly before leaving. Many clients tell me the leftovers are almost as anticipated as the event itself! I prepare quantities carefully to minimize waste while ensuring abundance.',
      },
      {
        question: 'Do you handle setup and cleanup?',
        answer: 'Completely. I arrive well before service to set up, and my team handles all cleanup after the event. You won\'t touch a single dish. My goal is for you to be fully present with your guests from arrival to farewell.',
      },
    ],
  },
  {
    title: 'Cooking Classes',
    items: [
      {
        question: 'What do your cooking classes include?',
        answer: 'Each class includes hands-on instruction with all ingredients provided, printed recipe cards, and of course, you eat what you create. Classes can be held at my studio kitchen or in your home. Group classes cover 3-4 dishes over 3-4 hours; private sessions can be tailored to focus on specific techniques or cuisines.',
      },
      {
        question: 'Are classes suitable for beginners?',
        answer: 'Absolutely. I adjust instruction to match each participant\'s skill level. Whether you\'re learning to hold a knife properly or refining your sauce techniques, you\'ll leave with new skills and confidence. My teaching philosophy: there are no silly questions, only delicious answers.',
      },
      {
        question: 'Can I book a private class for a group?',
        answer: 'Yes, private group classes are wonderful for team building, hen parties, birthday celebrations, or simply a fun evening with friends. Groups of 4-12 work best. Custom menus can be designed around themes, cuisines, or skill-building objectives.',
      },
    ],
  },
];

export default function FAQContent() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-earth-900 overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 117, 51, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="container-main relative py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="font-script text-3xl text-copper-light block mb-4">Questions?</span>
            <h1 className="font-display text-hero text-cream mb-6">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-xl text-cream/80">
              Everything you need to know about working with Chef Chioma. 
              Can&apos;t find what you&apos;re looking for? <Link href="/book" className="text-copper-light underline">Get in touch</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-main max-w-4xl" ref={faqRef}>
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <h2 className="font-display text-2xl text-earth-900 mb-6 pb-4 border-b border-earth-200">
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const key = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems.has(key);

                  return (
                    <div
                      key={key}
                      className="bg-white border border-earth-200 rounded-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-earth-50 transition-colors"
                      >
                        <span className="font-display text-lg text-earth-900 pr-4">
                          {item.question}
                        </span>
                        <span className="flex-shrink-0 text-copper">
                          {isOpen ? (
                            <Minus className="w-5 h-5" />
                          ) : (
                            <Plus className="w-5 h-5" />
                          )}
                        </span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-5 pb-5">
                              <p className="font-body text-text-secondary leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-earth-800 py-16">
        <div className="container-main text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="font-display text-display text-cream mb-4">
              Still Have Questions?
            </h2>
            <p className="font-body text-cream/70 mb-8">
              I&apos;m happy to discuss your specific needs and answer any questions not covered here.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-copper text-cream font-sans text-sm uppercase tracking-[0.2em] hover:bg-copper-dark transition-colors"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
