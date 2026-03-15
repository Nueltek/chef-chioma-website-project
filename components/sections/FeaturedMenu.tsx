'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { images, staggerContainerVariants, staggerItemVariants } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: { url: string };
  isSignature: boolean;
}

// Fallback signature dishes
const fallbackDishes: MenuItem[] = [
  {
    _id: '1',
    name: 'Suya-Crusted Lamb',
    description: 'Tender lamb loin with traditional suya spice crust, served with yam purée and pepper sauce reduction',
    category: 'Modern Nigerian',
    image: { url: images.dish1 },
    isSignature: true,
  },
  {
    _id: '2',
    name: 'Ofada Risotto',
    description: 'Creamy ofada rice cooked risotto-style, finished with ayamase sauce and crispy dodo',
    category: 'Fusion',
    image: { url: images.dish2 },
    isSignature: true,
  },
  {
    _id: '3',
    name: 'Egusi Velouté',
    description: 'Silky egusi soup reimagined as an elegant velouté with bitter leaf oil and prawns',
    category: 'Modern Nigerian',
    image: { url: images.dish3 },
    isSignature: false,
  },
  {
    _id: '4',
    name: 'Moin Moin Soufflé',
    description: 'Light and airy take on the classic, with smoked fish center and palm oil emulsion',
    category: 'Nigerian Classics',
    image: { url: images.dish4 },
    isSignature: true,
  },
  {
    _id: '5',
    name: 'Jollof Arancini',
    description: 'Crispy rice balls filled with slow-cooked jollof, served with suya aioli',
    category: 'Fusion',
    image: { url: images.dish5 },
    isSignature: false,
  },
  {
    _id: '6',
    name: 'Palm Wine Panna Cotta',
    description: 'Delicate dessert infused with aged palm wine, topped with coconut tuile and tropical coulis',
    category: 'Desserts',
    image: { url: images.dish6 },
    isSignature: true,
  },
];

export default function FeaturedMenu() {
  const [dishes, setDishes] = useState<MenuItem[]>(fallbackDishes);
  const hasFetched = useRef(false);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchDishes();
    }
  }, []);

  const fetchDishes = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch('/api/menu-items?featured=true&limit=6', {
        signal: controller.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      
      if (data.menuItems && Array.isArray(data.menuItems) && data.menuItems.length > 0) {
        const mergedDishes = data.menuItems.map((item: MenuItem) => ({
          ...item,
          image: item.image?.url ? item.image : { url: images.dish1 },
        }));
        setDishes(mergedDishes);
      }
      // Keep fallback if no data
    } catch (error) {
      // Keep fallback dishes on error
      console.log('Using fallback dishes');
    }
  };

  return (
    <section className="relative bg-cream py-20 lg:py-32 overflow-hidden">
      {/* Decorative element */}
      <div 
        className="absolute top-20 left-0 w-64 h-64 opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #8B4513 0%, transparent 70%)',
        }}
      />

      <div className="container-main">
        <SectionHeading
          scriptText="Sample Menus"
          title="A Taste of What Awaits"
          subtitle="Each menu is customized for your occasion. These signature dishes offer a glimpse into the culinary journey we'll create together."
        />

        {/* Dishes Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {dishes.map((dish) => (
            <motion.article
              key={dish._id}
              variants={staggerItemVariants}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] mb-4 md:mb-5 overflow-hidden rounded-sm">
                <Image
                  src={dish.image?.url || images.dish1}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-earth-900/0 group-hover:bg-earth-900/20 transition-colors duration-500" />
                
                {/* Signature badge */}
                {dish.isSignature && (
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-copper/90 text-cream px-2 md:px-3 py-1 rounded-sm">
                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-wider">Signature</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-copper mb-1 md:mb-2 block">
                  {dish.category}
                </span>
                <h3 className="font-display text-lg md:text-xl lg:text-2xl text-earth-900 mb-1 md:mb-2 group-hover:text-copper transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="font-body text-text-secondary text-xs md:text-sm leading-relaxed line-clamp-2">
                  {dish.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 lg:mt-20"
        >
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-earth-200 to-transparent mb-8 md:mb-12" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-xl md:text-2xl text-earth-900 mb-2">
                Create Your Own Menu
              </h3>
              <p className="font-body text-text-secondary text-sm md:text-base max-w-md">
                Every gathering is unique. Work with Chef Chioma to design a bespoke menu 
                tailored to your preferences, dietary needs, and the story you want to tell.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-earth-800 text-cream font-sans text-xs md:text-sm uppercase tracking-[0.2em] border border-earth-800 hover:bg-transparent hover:text-earth-800 transition-all duration-400 whitespace-nowrap"
            >
              Reserve Your Dining
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
