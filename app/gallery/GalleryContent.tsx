'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { createPortal } from 'react-dom';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  image: { url: string; publicId: string };
}

const categories = [
  'All',
  'Signature Dishes',
  'Private Dining',
  'Event Catering',
  'Behind the Scenes',
  'Plating & Presentation',
];

const fallbackGallery: GalleryItem[] = [
  {
    _id: '1',
    title: 'Suya-Crusted Lamb Presentation',
    description: 'Signature dish plated for a private dining experience in Ikoyi',
    category: 'Signature Dishes',
    image: { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=85', publicId: '' },
  },
  {
    _id: '2',
    title: 'Private Dining Setup',
    description: 'Elegant table setting for an intimate anniversary dinner',
    category: 'Private Dining',
    image: { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85', publicId: '' },
  },
  {
    _id: '3',
    title: 'Wedding Reception Catering',
    description: 'Serving 300 guests at a Lagos wedding celebration',
    category: 'Event Catering',
    image: { url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85', publicId: '' },
  },
  {
    _id: '4',
    title: 'In the Kitchen',
    description: 'Chef Chioma preparing mise en place',
    category: 'Behind the Scenes',
    image: { url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=85', publicId: '' },
  },
  {
    _id: '5',
    title: 'Egusi Velouté Plating',
    description: 'The final touches on our signature soup course',
    category: 'Plating & Presentation',
    image: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85', publicId: '' },
  },
  {
    _id: '6',
    title: 'Fresh Ingredients',
    description: 'Morning sourcing at Mile 12 market',
    category: 'Behind the Scenes',
    image: { url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&q=85', publicId: '' },
  },
  {
    _id: '7',
    title: 'Dessert Course',
    description: 'Palm wine panna cotta with tropical coulis',
    category: 'Signature Dishes',
    image: { url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=85', publicId: '' },
  },
  {
    _id: '8',
    title: 'Corporate Event Setup',
    description: 'Executive dining for 50 guests',
    category: 'Event Catering',
    image: { url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=85', publicId: '' },
  },
  {
    _id: '9',
    title: 'Jollof Rice Perfection',
    description: 'The iconic party jollof with smoky notes',
    category: 'Signature Dishes',
    image: { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85', publicId: '' },
  },
  {
    _id: '10',
    title: 'Intimate Dinner Setting',
    description: 'Candlelit atmosphere for a romantic evening',
    category: 'Private Dining',
    image: { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85', publicId: '' },
  },
];

// Lightbox Component - renders via Portal
function Lightbox({
  image,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  image: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (idx: number) => void;
}) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create a dedicated container for the lightbox
    const container = document.createElement('div');
    container.id = 'lightbox-portal';
    document.body.appendChild(container);
    setPortalContainer(container);

    // Lock body scroll and save position
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      
      // Remove container
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!portalContainer) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(26, 15, 10, 0.98)',
        backdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10,
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(44, 24, 16, 0.9)',
          borderRadius: '50%',
          border: '1px solid rgba(253, 245, 230, 0.2)',
          cursor: 'pointer',
          color: '#FDF5E6',
          transition: 'all 0.2s',
        }}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Previous Button */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(44, 24, 16, 0.9)',
            borderRadius: '50%',
            border: '1px solid rgba(253, 245, 230, 0.2)',
            cursor: 'pointer',
            color: '#FDF5E6',
            transition: 'all 0.2s',
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next Button */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(44, 24, 16, 0.9)',
            borderRadius: '50%',
            border: '1px solid rgba(253, 245, 230, 0.2)',
            cursor: 'pointer',
            color: '#FDF5E6',
            transition: 'all 0.2s',
          }}
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Content Container - Centered */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '90vw',
          maxHeight: '90vh',
          padding: '20px',
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            width: 'auto',
            height: 'auto',
            maxWidth: '85vw',
            maxHeight: '65vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={image.image.url}
            alt={image.title}
            style={{
              maxWidth: '85vw',
              maxHeight: '65vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '4px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>

        {/* Caption */}
        <div style={{ textAlign: 'center', marginTop: '24px', maxWidth: '600px' }}>
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#D4A574',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            {image.category}
          </span>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              color: '#FDF5E6',
              marginBottom: '8px',
              fontFamily: 'serif',
            }}
          >
            {image.title}
          </h3>
          {image.description && (
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(253, 245, 230, 0.6)',
                lineHeight: '1.6',
              }}
            >
              {image.description}
            </p>
          )}

          {/* Dots Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {Array.from({ length: total }).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); onGoTo(idx); }}
                style={{
                  width: idx === index ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: idx === index ? '#B87333' : 'rgba(253, 245, 230, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <p style={{ fontSize: '12px', color: 'rgba(253, 245, 230, 0.4)', marginTop: '12px' }}>
            {index + 1} of {total}
          </p>
        </div>
      </div>
    </div>,
    portalContainer
  );
}

export default function GalleryContent() {
  const [gallery, setGallery] = useState<GalleryItem[]>(fallbackGallery);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    setMounted(true);
    
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchGallery();
    }
  }, []);

  const fetchGallery = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch('/api/gallery', {
        signal: controller.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      
      if (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
        setGallery(data.gallery);
      }
      // Keep fallback if no data
    } catch (error) {
      console.log('Using fallback gallery');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGallery = useMemo(() => {
    if (activeCategory === 'All') return gallery;
    return gallery.filter(item => item.category === activeCategory);
  }, [gallery, activeCategory]);

  const currentImage = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setLightboxIndex(null);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredGallery.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, filteredGallery.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredGallery.length - 1 ? 0 : lightboxIndex + 1);
  }, [lightboxIndex, filteredGallery.length]);

  const goToIndex = useCallback((idx: number) => {
    setLightboxIndex(idx);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-cream" />;
  }

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-earth-900 pt-20 md:pt-24 pb-10 md:pb-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3">Gallery</span>
            <h1 className="font-display text-3xl md:text-5xl text-cream mb-4">
              Visual Stories
            </h1>
            <p className="font-body text-sm md:text-lg text-cream/70">
              A curated collection of culinary moments, from signature dishes to unforgettable events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-cream sticky top-16 md:top-0 z-20 border-b border-earth-200">
        <div className="container-main py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 md:px-4 py-1.5 font-sans text-[10px] md:text-xs uppercase tracking-widest rounded-sm transition-all duration-200 whitespace-nowrap ${
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

      {/* Gallery Grid */}
      <section className="bg-cream py-8 md:py-12">
        <div className="container-main">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-earth-100 rounded-sm animate-pulse" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
              >
                {filteredGallery.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="group cursor-pointer relative"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-earth-100">
                      <Image
                        src={item.image.url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-earth-900/0 group-hover:bg-earth-900/60 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-3">
                          <ZoomIn className="w-6 h-6 md:w-8 md:h-8 text-cream mx-auto mb-2" />
                          <p className="font-display text-xs md:text-sm text-cream line-clamp-2">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && filteredGallery.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-text-secondary">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {currentImage && lightboxIndex !== null && (
        <Lightbox
          image={currentImage}
          index={lightboxIndex}
          total={filteredGallery.length}
          onClose={closeLightbox}
          onPrev={goToPrevious}
          onNext={goToNext}
          onGoTo={goToIndex}
        />
      )}
    </div>
  );
}
