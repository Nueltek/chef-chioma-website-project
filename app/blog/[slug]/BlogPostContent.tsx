'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: { url: string; alt?: string };
  category: string;
  tags: string[];
  author: { name: string; image?: string; bio?: string };
  publishedAt: string;
  views: number;
  readTime: number;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  featuredImage: { url: string };
  category: string;
  publishedAt: string;
  readTime: number;
}

const fallbackPost: BlogPost = {
  _id: '1',
  title: 'The Art of Perfect Jollof Rice: Secrets from My Kitchen',
  slug: 'the-art-of-perfect-jollof-rice',
  excerpt: 'After years of perfecting my jollof rice technique in professional kitchens across three continents, I\'m sharing the secrets that make my version stand out.',
  content: `
<p>Jollof rice is more than a dish—it's a cultural institution. Across West Africa, families and nations proudly stake their claim to having the best version.</p>

<h2>The Foundation: Building Your Tomato Base</h2>

<p>The secret to exceptional jollof begins long before the rice touches the pot. Your tomato base—what we call the "stew"—is everything. I use a blend of fresh Roma tomatoes, red bell peppers, and scotch bonnets, roasted until charred and blended smooth.</p>

<p>Here's what most recipes won't tell you: fry this blend twice. The first fry removes the raw tomato taste. Let it cool, then fry again until the oil separates and floats on top.</p>

<h2>Rice Selection Matters</h2>

<p>Not all rice is created equal for jollof. Long-grain parboiled rice holds up best to the cooking process without becoming mushy.</p>

<h2>The Party Jollof Secret</h2>

<p>Once the rice is nearly done, I increase the heat and let the bottom layer catch slightly—just enough to create that distinctive smoky aroma without actually burning.</p>
  `,
  featuredImage: { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85', alt: 'Jollof Rice' },
  category: 'Recipes',
  tags: ['Jollof Rice', 'Nigerian Cuisine', 'Cooking Techniques'],
  author: { name: 'Chef Chioma Okonkwo', bio: 'Award-winning Nigerian chef with over 15 years of experience.' },
  publishedAt: new Date().toISOString(),
  views: 1247,
  readTime: 8,
};

const fallbackRelated: RelatedPost[] = [
  {
    _id: '2',
    title: 'Understanding Egusi: From Market to Masterpiece',
    slug: 'understanding-egusi-from-market-to-masterpiece',
    featuredImage: { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
    category: 'Nigerian Cuisine',
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    readTime: 6,
  },
  {
    _id: '3',
    title: 'The Suya Spice Blend: My Secret Formula',
    slug: 'the-suya-spice-blend-my-secret-formula',
    featuredImage: { url: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80' },
    category: 'Cooking Tips',
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    readTime: 5,
  },
];

export default function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost>(fallbackPost);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>(fallbackRelated);
  const [mounted, setMounted] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentSlugRef = useRef<string>('');

  useEffect(() => {
    setMounted(true);
    
    // Only fetch if slug changed
    if (currentSlugRef.current !== slug) {
      currentSlugRef.current = slug;
      fetchPost();
    }
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [slug]);

  const fetchPost = async () => {
    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const timeoutId = setTimeout(() => abortControllerRef.current?.abort(), 5000);
    
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        signal: abortControllerRef.current.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      if (data.post) {
        setPost(data.post);
        
        // Fetch related posts
        try {
          const relatedRes = await fetch(`/api/blog?category=${encodeURIComponent(data.post.category)}&limit=3`, {
            cache: 'no-store',
          });
          const relatedData = await relatedRes.json();
          
          if (relatedData.posts && Array.isArray(relatedData.posts) && relatedData.posts.length > 0) {
            setRelatedPosts(relatedData.posts.filter((p: RelatedPost) => p.slug !== slug).slice(0, 2));
          }
        } catch {
          // Keep fallback related posts
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.log('Using fallback post');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-cream" />;
  }

  return (
    <div className="page-transition">
      {/* Compact Hero */}
      <section className="bg-earth-900 pt-20 md:pt-24 pb-8 md:pb-12">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-cream/60 hover:text-cream transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-sans text-xs uppercase tracking-widest">Back to Blog</span>
            </Link>

            <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-copper-light mb-3 block">
              {post.category}
            </span>
            
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl text-cream mb-4 leading-tight max-w-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-cream/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-cream transition-colors ml-auto"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-cream">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[21/9] md:aspect-[21/8] -mt-0 rounded-sm overflow-hidden shadow-lg"
          >
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-10 md:py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8"
            >
              {/* Excerpt */}
              <p className="font-body text-lg md:text-xl text-earth-700 leading-relaxed mb-8 pb-8 border-b border-earth-200">
                {post.excerpt}
              </p>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-earth-900
                  prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-p:font-body prose-p:text-text-secondary prose-p:leading-relaxed prose-p:text-sm prose-p:md:text-base
                  prose-a:text-copper prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-earth-900
                  prose-ul:list-disc prose-ul:pl-5
                  prose-li:font-body prose-li:text-text-secondary prose-li:text-sm prose-li:md:text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-earth-200">
                  <h3 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-text-muted mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 md:px-3 py-1 bg-earth-100 text-earth-700 text-xs md:text-sm rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                {/* Author Card */}
                <div className="bg-white border border-earth-100 rounded-sm p-5 md:p-6">
                  <h3 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-text-muted mb-4">About the Author</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-earth-100 flex items-center justify-center">
                      <span className="font-display text-lg text-copper">C</span>
                    </div>
                    <div>
                      <h4 className="font-display text-base md:text-lg text-earth-900">{post.author.name}</h4>
                      <p className="font-body text-xs text-copper">Private Chef & Culinary Artist</p>
                    </div>
                  </div>
                  <p className="font-body text-xs md:text-sm text-text-secondary">
                    {post.author.bio || 'Award-winning Nigerian chef with over 15 years of experience.'}
                  </p>
                </div>

                {/* CTA */}
                <div className="bg-copper rounded-sm p-5 md:p-6 text-center">
                  <h3 className="font-script text-xl md:text-2xl text-cream mb-2">Ready to Taste?</h3>
                  <p className="font-body text-xs md:text-sm text-cream/80 mb-4">
                    Book a private dining experience
                  </p>
                  <Link
                    href="/book"
                    className="inline-block w-full px-4 py-2.5 bg-cream text-earth-900 font-sans text-xs uppercase tracking-widest hover:bg-cream/90 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-cream-dark py-10 md:py-16">
          <div className="container-main">
            <h2 className="font-display text-xl md:text-2xl text-earth-900 mb-6 md:mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={relatedPost.featuredImage.url}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-copper mb-1 block">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-display text-base md:text-lg text-earth-900 group-hover:text-copper transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-text-muted">
                      <span>{format(new Date(relatedPost.publishedAt), 'MMM d, yyyy')}</span>
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
