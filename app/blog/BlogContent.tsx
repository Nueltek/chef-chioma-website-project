'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: { url: string; alt?: string };
  category: string;
  author: { name: string; image?: string };
  publishedAt: string;
  views: number;
  readTime: number;
  featured: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const categories = [
  'All',
  'Recipes',
  'Nigerian Cuisine',
  'Cooking Tips',
  'Behind the Scenes',
  'Events',
  'Food Stories',
  'Ingredients',
  'Culture & Heritage',
];

const fallbackPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'The Art of Perfect Jollof Rice: Secrets from My Kitchen',
    slug: 'the-art-of-perfect-jollof-rice',
    excerpt: 'After years of perfecting my jollof rice technique in professional kitchens across three continents, I\'m sharing the secrets that make my version stand out.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', alt: 'Jollof Rice' },
    category: 'Recipes',
    author: { name: 'Chef Chioma Okonkwo' },
    publishedAt: new Date().toISOString(),
    views: 1247,
    readTime: 8,
    featured: true,
  },
  {
    _id: '2',
    title: 'Understanding Egusi: From Market to Masterpiece',
    slug: 'understanding-egusi-from-market-to-masterpiece',
    excerpt: 'Egusi soup is more than a dish—it\'s a canvas for creativity. Learn how to select the best melon seeds at the market.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', alt: 'Egusi Soup' },
    category: 'Nigerian Cuisine',
    author: { name: 'Chef Chioma Okonkwo' },
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    views: 892,
    readTime: 6,
    featured: true,
  },
  {
    _id: '3',
    title: 'Behind the Scenes: Catering a 300-Guest Nigerian Wedding',
    slug: 'behind-the-scenes-300-guest-nigerian-wedding',
    excerpt: 'A look inside the meticulous planning, early mornings, and coordinated chaos that goes into delivering a memorable wedding feast.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80', alt: 'Wedding Catering' },
    category: 'Behind the Scenes',
    author: { name: 'Chef Chioma Okonkwo' },
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    views: 654,
    readTime: 10,
    featured: false,
  },
  {
    _id: '4',
    title: 'The Suya Spice Blend: My Secret Formula',
    slug: 'the-suya-spice-blend-my-secret-formula',
    excerpt: 'Suya is Nigeria\'s beloved street food, but in my kitchen, it becomes something more refined.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80', alt: 'Suya Spices' },
    category: 'Cooking Tips',
    author: { name: 'Chef Chioma Okonkwo' },
    publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    views: 1089,
    readTime: 5,
    featured: false,
  },
  {
    _id: '5',
    title: 'Palm Oil: The Misunderstood Ingredient',
    slug: 'palm-oil-the-misunderstood-ingredient',
    excerpt: 'Palm oil has been central to West African cooking for centuries. Let\'s explore its culinary uses and health considerations.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80', alt: 'Palm Oil' },
    category: 'Ingredients',
    author: { name: 'Chef Chioma Okonkwo' },
    publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    views: 723,
    readTime: 7,
    featured: false,
  },
  {
    _id: '6',
    title: 'Food as Memory: My Grandmother\'s Kitchen in Enugu',
    slug: 'food-as-memory-grandmothers-kitchen-enugu',
    excerpt: 'Every chef has an origin story. Mine begins in a modest kitchen in Enugu, where my grandmother taught me that cooking is about love.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', alt: 'Traditional Kitchen' },
    category: 'Culture & Heritage',
    author: { name: 'Chef Chioma Okonkwo' },
    publishedAt: new Date(Date.now() - 86400000 * 21).toISOString(),
    views: 1456,
    readTime: 12,
    featured: false,
  },
];

export default function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 9, total: 6, pages: 1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const newsletterRef = useRef(null);
  const isNewsletterInView = useInView(newsletterRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchPosts();
    }
    
    // Cleanup: abort any pending request when deps change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [activeCategory, pagination.page, mounted]);

  const fetchPosts = async () => {
    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new controller
    abortControllerRef.current = new AbortController();
    const timeoutId = setTimeout(() => abortControllerRef.current?.abort(), 5000);
    
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'All') params.set('category', activeCategory);
      params.set('page', pagination.page.toString());
      params.set('limit', '9');

      const res = await fetch(`/api/blog?${params}`, {
        signal: abortControllerRef.current.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
        setPosts(data.posts);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      }
      // Keep fallback if no data
    } catch (error) {
      // Only log if not aborted
      if (error instanceof Error && error.name !== 'AbortError') {
        console.log('Using fallback posts');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  const featuredPost = useMemo(() => {
    return filteredPosts.find(p => p.featured);
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    return filteredPosts.filter(p => !p.featured || p._id !== featuredPost?._id);
  }, [filteredPosts, featuredPost]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-cream" />;
  }

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center bg-earth-900 overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 117, 51, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="container-main relative py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4">The Journal</span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-hero text-cream mb-4 md:mb-6">
              Culinary Stories
            </h1>
            <p className="font-body text-base md:text-xl text-cream/80 max-w-xl mx-auto mb-6 md:mb-8 px-4 md:px-0">
              Recipes, techniques, food memories, and insights from Chef Chioma&apos;s kitchen.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto px-4 md:px-0">
              <Search className="absolute left-7 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-cream/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-cream/10 border border-cream/20 rounded-sm text-cream placeholder-cream/50 font-body text-sm md:text-base focus:outline-none focus:border-copper-light transition-colors"
              />
            </div>
          </motion.div>
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

      {/* Featured Post */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <section className="bg-cream py-10 lg:py-16">
          <div className="container-main">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-earth-100">
                    <Image
                      src={featuredPost.featuredImage.url}
                      alt={featuredPost.featuredImage.alt || featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2 md:px-3 py-1 bg-copper text-cream text-[10px] md:text-xs font-sans uppercase tracking-wider">
                      Featured
                    </div>
                  </div>
                  <div className="lg:pl-8">
                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-copper mb-2 md:mb-3 block">
                      {featuredPost.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-earth-900 mb-3 md:mb-4 group-hover:text-copper transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="font-body text-sm md:text-base text-text-secondary mb-4 md:mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-text-muted mb-4 md:mb-6">
                      <span className="flex items-center gap-1.5 md:gap-2">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {format(new Date(featuredPost.publishedAt), 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-1.5 md:gap-2">
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {featuredPost.readTime} min read
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 font-sans text-xs md:text-sm uppercase tracking-widest text-earth-800 group-hover:text-copper transition-colors">
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="bg-cream-dark py-10 lg:py-20">
        <div className="container-main">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-sm overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-earth-100" />
                  <div className="p-4 md:p-6">
                    <div className="h-3 md:h-4 bg-earth-100 rounded w-1/4 mb-2 md:mb-3" />
                    <div className="h-5 md:h-6 bg-earth-100 rounded w-3/4 mb-2" />
                    <div className="h-3 md:h-4 bg-earth-100 rounded w-full mb-3 md:mb-4" />
                    <div className="h-2 md:h-3 bg-earth-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : regularPosts.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <p className="font-body text-text-secondary text-sm md:text-base">
                {searchQuery ? 'No articles found matching your search.' : 'No articles in this category yet.'}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
              >
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`} className="block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative aspect-[16/10] overflow-hidden bg-earth-100">
                        <Image
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-copper mb-1 md:mb-2 block">
                          {post.category}
                        </span>
                        <h3 className="font-display text-base md:text-xl text-earth-900 mb-1 md:mb-2 group-hover:text-copper transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="font-body text-xs md:text-sm text-text-secondary mb-3 md:mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-[10px] md:text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {!isLoading && pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 md:px-4 py-1.5 md:py-2 border border-earth-200 rounded-sm text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-earth-100 transition-colors"
              >
                Previous
              </button>
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-sm text-xs md:text-sm transition-colors ${
                    pagination.page === i + 1
                      ? 'bg-earth-800 text-cream'
                      : 'border border-earth-200 hover:bg-earth-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="px-3 md:px-4 py-1.5 md:py-2 border border-earth-200 rounded-sm text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-earth-100 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-earth-800 py-12 lg:py-20">
        <div className="container-main">
          <motion.div
            ref={newsletterRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="font-script text-xl md:text-2xl text-copper-light block mb-3 md:mb-4">Stay Connected</span>
            <h2 className="font-display text-2xl md:text-section text-cream mb-3 md:mb-4">
              Subscribe to My Newsletter
            </h2>
            <p className="font-body text-sm md:text-base text-cream/70 mb-6 md:mb-8 px-4 md:px-0">
              Get exclusive recipes, cooking tips, and behind-the-scenes stories 
              delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4 md:px-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 md:py-3 bg-cream/10 border border-cream/20 rounded-sm text-cream placeholder-cream/50 font-body text-sm md:text-base focus:outline-none focus:border-copper-light transition-colors"
              />
              <button
                type="submit"
                className="px-5 md:px-6 py-2.5 md:py-3 bg-copper text-cream font-sans text-xs md:text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
