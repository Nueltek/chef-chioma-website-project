'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Meet the Chef' },
  { href: '/services', label: 'Services' },
  { href: '/menus', label: 'Sample Menus' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  const isHomePage = pathname === '/';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 transition-all duration-500',
          isMobileMenuOpen ? 'z-[60]' : 'z-50',
          isMobileMenuOpen
            ? 'bg-transparent py-5'
            : isScrolled || !isHomePage
              ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3'
              : 'bg-transparent py-5'
        )}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <div className="flex flex-col">
                <span className={cn(
                  'font-script text-2xl md:text-3xl transition-colors duration-300 leading-none',
                  isMobileMenuOpen 
                    ? 'text-copper-light' 
                    : isScrolled || !isHomePage 
                      ? 'text-copper' 
                      : 'text-copper-light'
                )}>
                  Chioma
                </span>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'h-[1px] w-4 transition-colors duration-300',
                    isMobileMenuOpen 
                      ? 'bg-cream/40' 
                      : isScrolled || !isHomePage 
                        ? 'bg-earth-300' 
                        : 'bg-cream/40'
                  )} />
                  <span className={cn(
                    'font-sans text-[9px] md:text-[10px] uppercase tracking-[0.25em] transition-colors duration-300',
                    isMobileMenuOpen 
                      ? 'text-cream/70' 
                      : isScrolled || !isHomePage 
                        ? 'text-earth-600' 
                        : 'text-cream/70'
                  )}>
                    Private Chef
                  </span>
                  <div className={cn(
                    'h-[1px] w-4 transition-colors duration-300',
                    isMobileMenuOpen 
                      ? 'bg-cream/40' 
                      : isScrolled || !isHomePage 
                        ? 'bg-earth-300' 
                        : 'bg-cream/40'
                  )} />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-sans text-sm uppercase tracking-widest transition-colors duration-300 link-underline',
                    pathname === link.href
                      ? isScrolled || !isHomePage ? 'text-copper' : 'text-copper-light'
                      : isScrolled || !isHomePage ? 'text-earth-800 hover:text-copper' : 'text-cream/90 hover:text-cream'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://instagram.com/chefchioma"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'p-2 transition-colors duration-300',
                  isScrolled || !isHomePage ? 'text-earth-800 hover:text-copper' : 'text-cream/90 hover:text-cream'
                )}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <Link
                href="/book"
                className={cn(
                  'px-6 py-3 font-sans text-xs uppercase tracking-widest border transition-all duration-300',
                  isScrolled || !isHomePage
                    ? 'bg-earth-800 text-cream border-earth-800 hover:bg-transparent hover:text-earth-800'
                    : 'bg-cream/10 text-cream border-cream/50 hover:bg-cream hover:text-earth-800'
                )}
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors duration-300',
                isMobileMenuOpen
                  ? 'text-cream'
                  : isScrolled || !isHomePage ? 'text-earth-800' : 'text-cream'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-earth-900" />
            
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-earth-800 via-earth-900 to-earth-900" />
            
            {/* Content */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-6 px-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'font-display text-2xl transition-colors duration-300',
                      pathname === link.href ? 'text-copper-light' : 'text-cream/80 hover:text-cream'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <Link
                  href="/book"
                  className="px-8 py-4 bg-copper text-cream font-sans text-sm uppercase tracking-widest"
                >
                  Book Now
                </Link>
                
                <div className="flex items-center gap-6 mt-4">
                  <a
                    href="https://instagram.com/chefchioma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/70 hover:text-cream transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="tel:+2348012345678"
                    className="text-cream/70 hover:text-cream transition-colors"
                    aria-label="Phone"
                  >
                    <Phone className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
