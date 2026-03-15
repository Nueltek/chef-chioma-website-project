'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Leaf, Flame, Award } from 'lucide-react';

interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  ingredients?: string[];
  dietaryInfo?: string[];
  image?: { url: string; publicId: string };
  isSignature: boolean;
}

const categories = [
  'All',
  'Signature Dishes',
  'Appetizers',
  'Soups & Stews',
  'Modern Nigerian',
  'Fusion',
  'Grills',
  'Desserts',
];

const fallbackItems: MenuItem[] = [
  {
    _id: '1',
    name: 'Suya-Crusted Lamb Rack',
    slug: 'suya-crusted-lamb-rack',
    description: 'Tender lamb rack with traditional suya spice crust, served with silky yam purée, wilted ugu greens, and a rich pepper sauce reduction.',
    category: 'Modern Nigerian',
    ingredients: ['Lamb rack', 'Suya spice blend', 'Yam', 'Ugu leaves'],
    dietaryInfo: ['Gluten-Free'],
    image: { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', publicId: '' },
    isSignature: true,
  },
  {
    _id: '2',
    name: 'Ofada Risotto',
    slug: 'ofada-risotto',
    description: 'Creamy ofada rice cooked risotto-style, finished with vibrant ayamase sauce, crispy plantain crisps, and a drizzle of palm oil.',
    category: 'Fusion',
    ingredients: ['Ofada rice', 'Ayamase sauce', 'Plantain'],
    dietaryInfo: ['Vegetarian', 'Gluten-Free'],
    image: { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', publicId: '' },
    isSignature: true,
  },
  {
    _id: '3',
    name: 'Egusi Velouté',
    slug: 'egusi-veloute',
    description: 'Silky egusi soup reimagined as an elegant velouté, finished with bitter leaf oil and pan-seared tiger prawns.',
    category: 'Modern Nigerian',
    ingredients: ['Egusi seeds', 'Tiger prawns', 'Bitter leaf'],
    dietaryInfo: ['Gluten-Free'],
    image: { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', publicId: '' },
    isSignature: true,
  },
  {
    _id: '4',
    name: 'Jollof Arancini',
    slug: 'jollof-arancini',
    description: 'Crispy rice balls filled with slow-cooked party jollof, served with suya-spiced aioli and tomato chutney.',
    category: 'Appetizers',
    ingredients: ['Jollof rice', 'Suya spice', 'Tomatoes'],
    dietaryInfo: [],
    image: { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', publicId: '' },
    isSignature: false,
  },
  {
    _id: '5',
    name: 'Palm Wine Panna Cotta',
    slug: 'palm-wine-panna-cotta',
    description: 'Delicate custard infused with aged palm wine, topped with coconut tuile, tropical fruit coulis, and edible gold leaf.',
    category: 'Desserts',
    ingredients: ['Palm wine', 'Cream', 'Coconut', 'Mango'],
    dietaryInfo: ['Gluten-Free', 'Vegetarian'],
    image: { url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', publicId: '' },
    isSignature: true,
  },
  {
    _id: '6',
    name: 'Pepper Soup Consommé',
    slug: 'pepper-soup-consomme',
    description: 'Crystal-clear goat meat pepper soup, clarified to perfection, served with tender goat medallions and aromatic herbs.',
    category: 'Soups & Stews',
    ingredients: ['Goat meat', 'Pepper soup spices', 'Uziza'],
    dietaryInfo: ['Gluten-Free', 'Dairy-Free'],
    image: { url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80', publicId: '' },
    isSignature: false,
  },
  {
    _id: '7',
    name: 'Grilled Croaker Fish',
    slug: 'grilled-croaker-fish',
    description: 'Whole croaker fish marinated in yaji spices, grilled over open flame, served with plantain mash and pepper sauce.',
    category: 'Grills',
    ingredients: ['Croaker fish', 'Yaji spice', 'Plantain'],
    dietaryInfo: ['Gluten-Free', 'Dairy-Free'],
    image: { url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80', publicId: '' },
    isSignature: false,
  },
  {
    _id: '8',
    name: 'Akara Duo',
    slug: 'akara-duo',
    description: 'Traditional black-eyed pea fritters paired with a modern herb-infused version, served with spiced tomato jam.',
    category: 'Appetizers',
    ingredients: ['Black-eyed peas', 'Fresh herbs', 'Tomatoes'],
    dietaryInfo: ['Vegan', 'Gluten-Free'],
    image: { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', publicId: '' },
    isSignature: false,
  },
];

export default function MenusContent() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(fallbackItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const hasFetched = useRef(false);
  const wineRef = useRef(null);
  const ctaRef = useRef(null);
  const isWineInView = useInView(wineRef, { once: true, amount: 0.2 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
    
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchMenuItems();
    }
  }, []);

  const fetchMenuItems = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch('/api/menu-items', {
        signal: controller.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      
      if (data.menuItems && Array.isArray(data.menuItems) && data.menuItems.length > 0) {
        setMenuItems(data.menuItems);
      }
      // Keep fallback if no data
    } catch (error) {
      console.log('Using fallback menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    if (activeCategory === 'Signature Dishes') return menuItems.filter(item => item.isSignature);
    return menuItems.filter(item => item.category === activeCategory);
  }, [menuItems, activeCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-cream" />;
  }

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center bg-earth-900 overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 60% 30%, rgba(184, 117, 51, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="container-main relative py-16 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4">Sample Menus</span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-hero text-cream mb-4 md:mb-6">
              A Taste of What Awaits
            </h1>
            <p className="font-body text-base md:text-xl text-cream/80 max-w-xl">
              Each menu is customized for your occasion. These signature dishes offer 
              a glimpse into the culinary journey we&apos;ll create together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Note */}
      <section className="bg-earth-800 py-4 md:py-6">
        <div className="container-main">
          <p className="text-center font-body text-cream/70 text-xs md:text-sm">
            <Leaf className="w-3 h-3 md:w-4 md:h-4 inline-block mr-2 text-copper-light" />
            All dishes can be adapted for dietary requirements. Menus are fully customizable for your event.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-cream sticky top-16 md:top-0 z-20 border-b border-earth-200">
        <div className="container-main py-3 md:py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 md:px-4 py-1.5 md:py-2 font-sans text-[10px] md:text-xs uppercase tracking-widest rounded-sm transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-earth-800 text-cream'
                    : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="bg-cream py-12 lg:py-24">
        <div className="container-main">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-earth-100 rounded-sm mb-4" />
                  <div className="h-4 bg-earth-100 rounded w-1/4 mb-2" />
                  <div className="h-6 bg-earth-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-earth-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {filteredItems.map((item, index) => (
                    <motion.article
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] mb-4 md:mb-5 overflow-hidden rounded-sm bg-earth-100">
                        {item.image?.url ? (
                          <Image
                            src={item.image.url}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-earth-400 text-sm">No image</span>
                          </div>
                        )}
                        
                        {/* Signature badge */}
                        {item.isSignature && (
                          <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-1 bg-copper/90 text-cream px-2 md:px-3 py-1 rounded-sm">
                            <Award className="w-3 h-3" />
                            <span className="font-sans text-[10px] md:text-xs uppercase tracking-wider">Signature</span>
                          </div>
                        )}

                        {/* Dietary badges */}
                        {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex gap-1.5 md:gap-2">
                            {item.dietaryInfo.includes('Vegetarian') && (
                              <span className="bg-green-600/90 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm text-[10px] md:text-xs flex items-center gap-1">
                                <Leaf className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                V
                              </span>
                            )}
                            {item.dietaryInfo.includes('Spicy') && (
                              <span className="bg-red-600/90 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm text-[10px] md:text-xs flex items-center gap-1">
                                <Flame className="w-2.5 h-2.5 md:w-3 md:h-3" />
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-copper mb-1.5 md:mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="font-display text-lg md:text-xl lg:text-2xl text-earth-900 mb-1.5 md:mb-2 group-hover:text-copper transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="font-body text-text-secondary text-xs md:text-sm leading-relaxed mb-2 md:mb-3">
                          {item.description}
                        </p>
                        
                        {/* Ingredients */}
                        {item.ingredients && item.ingredients.length > 0 && (
                          <p className="font-body text-[10px] md:text-xs text-text-muted">
                            <span className="font-semibold">Key ingredients:</span> {item.ingredients.slice(0, 4).join(' • ')}
                          </p>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <div className="text-center py-12 md:py-16">
                  <p className="font-body text-text-secondary text-sm md:text-base">No dishes found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Wine Pairing */}
      <section className="bg-earth-800 py-12 lg:py-24">
        <div className="container-main" ref={wineRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isWineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-script text-xl md:text-2xl text-copper-light block mb-3 md:mb-4">Wine Pairing</span>
              <h2 className="font-display text-2xl md:text-4xl lg:text-display text-cream mb-4 md:mb-6">
                Complete the Experience
              </h2>
              <p className="font-body text-sm md:text-base text-cream/80 mb-4 md:mb-6">
                Elevate your dining experience with expertly curated wine pairings. 
                Chef Chioma works with a sommelier to select wines that complement 
                the bold, complex flavors of Nigerian cuisine.
              </p>
              <p className="font-body text-cream/60 text-xs md:text-sm">
                Wine pairing service available for all private dining and catering events. 
                Both local and imported selections available.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isWineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-square"
            >
              <Image
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=85"
                alt="Wine selection"
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-12 lg:py-24">
        <div className="container-main text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <span className="font-script text-xl md:text-2xl text-copper block mb-3 md:mb-4">
              Create Your Own Menu
            </span>
            <h2 className="font-display text-2xl md:text-section text-earth-900 mb-4 md:mb-6">
              Every Gathering Is Unique
            </h2>
            <p className="font-body text-sm md:text-body-lg text-text-secondary mb-6 md:mb-8 px-4 md:px-0">
              Work with Chef Chioma to design a bespoke menu tailored to your 
              preferences, dietary needs, and the story you want to tell.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-earth-800 text-cream font-sans text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] border border-earth-800 hover:bg-transparent hover:text-earth-800 transition-all duration-400"
            >
              Start Planning
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
