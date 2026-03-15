'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Send, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/utils';
import toast, { Toaster } from 'react-hot-toast';

interface Settings {
  email: string;
  phone: string;
  location: string;
  instagram?: string;
}

const defaultSettings: Settings = {
  email: 'hello@chefchioma.com',
  phone: '+234 801 234 5678',
  location: 'Lagos, Nigeria',
  instagram: 'https://instagram.com/chefchioma',
};

export default function ContactContent() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const hasFetched = useRef(false);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.1 });
  const isMapInView = useInView(mapRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchSettings();
    }
  }, []);

  const fetchSettings = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch('/api/settings', { 
        signal: controller.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      
      if (data.settings) {
        setSettings({
          ...defaultSettings,
          ...data.settings,
        });
      }
    } catch (error) {
      // Use defaults on error
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          serviceType: 'General Inquiry',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success('Message sent successfully!');
        // Redirect to home after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format phone for tel: link
  const phoneLink = settings.phone.replace(/\s/g, '').replace(/[^+\d]/g, '');

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: settings.phone,
      href: `tel:${phoneLink}`,
    },
    {
      icon: MapPin,
      label: 'Based In',
      value: settings.location,
      href: null,
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
    },
  ];

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-earth-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 115, 51, 0.3) 0%, transparent 60%)',
            }}
          />
        </div>

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4">Get in Touch</span>
            <h1 className="font-display text-3xl md:text-display text-cream mb-4 md:mb-6">
              Let&apos;s Create Something<br />Extraordinary Together
            </h1>
            <p className="font-body text-base md:text-body-lg text-cream/80 px-4 md:px-0">
              Whether you have a question about our services, want to discuss a custom menu, 
              or are ready to book your unforgettable culinary experience—we&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-cream">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              ref={formRef}
              variants={staggerContainerVariants}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
            >
              <motion.div variants={staggerItemVariants}>
                <span className="font-script text-xl md:text-2xl text-copper block mb-2">Connect</span>
                <h2 className="font-display text-2xl md:text-section text-earth-900 mb-4 md:mb-6">
                  How to Reach Us
                </h2>
                <p className="font-body text-sm md:text-base text-text-secondary mb-8 md:mb-10 max-w-md">
                  Ready to embark on a culinary journey? Reach out through any of these channels, 
                  and Chef Chioma&apos;s team will respond within 24 hours.
                </p>
              </motion.div>

              <motion.div 
                variants={staggerItemVariants}
                className="space-y-4 md:space-y-6"
              >
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-copper/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-copper" />
                    </div>
                    <div>
                      <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-earth-500 block mb-0.5 md:mb-1">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-display text-base md:text-lg text-earth-900 hover:text-copper transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-display text-base md:text-lg text-earth-900">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div variants={staggerItemVariants} className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-earth-200">
                <h3 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-earth-600 mb-3 md:mb-4">
                  Follow the Journey
                </h3>
                <div className="flex gap-3 md:gap-4">
                  {settings.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 md:w-12 md:h-12 bg-earth-100 rounded-lg flex items-center justify-center text-earth-600 hover:bg-copper hover:text-cream transition-colors"
                    >
                      <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Ready to Book CTA */}
              <motion.div 
                variants={staggerItemVariants}
                className="mt-10 md:mt-12 p-6 md:p-8 bg-earth-800 rounded-xl"
              >
                <h3 className="font-display text-lg md:text-xl text-cream mb-2 md:mb-3">
                  Ready to Book?
                </h3>
                <p className="font-body text-sm md:text-base text-cream/70 mb-4 md:mb-6">
                  For event inquiries with specific dates and guest counts, use our detailed booking form.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 font-sans text-xs md:text-sm uppercase tracking-widest text-copper hover:text-copper-light transition-colors"
                >
                  Go to Booking Form
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              ref={mapRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white border border-earth-200 rounded-xl p-6 md:p-8 lg:p-10 shadow-soft">
                {submitted ? (
                  /* Success State */
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                    </motion.div>
                    <h3 className="font-display text-xl md:text-2xl text-earth-900 mb-3">
                      Message Sent Successfully!
                    </h3>
                    <p className="font-body text-sm md:text-base text-text-secondary mb-6">
                      Thank you for reaching out. Chef Chioma&apos;s team will get back to you within 24 hours.
                    </p>
                    <p className="font-body text-xs text-text-muted mb-6">
                      Redirecting you to the home page...
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => router.push('/')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors"
                      >
                        Go to Home
                      </button>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-earth-300 text-earth-700 font-sans text-xs uppercase tracking-widest hover:bg-earth-50 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form */
                  <>
                    <h3 className="font-display text-xl md:text-2xl text-earth-900 mb-2">
                      Send a Message
                    </h3>
                    <p className="font-body text-sm md:text-base text-text-secondary mb-6 md:mb-8">
                      Have a question? We&apos;d love to hear from you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div>
                        <label className="block font-sans text-[10px] md:text-xs uppercase tracking-widest text-earth-700 mb-1.5 md:mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                          required
                          className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-earth-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-copper/30 focus:border-copper transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-[10px] md:text-xs uppercase tracking-widest text-earth-700 mb-1.5 md:mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                          required
                          className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-earth-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-copper/30 focus:border-copper transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-[10px] md:text-xs uppercase tracking-widest text-earth-700 mb-1.5 md:mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                          placeholder="e.g., Question about services"
                          className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-earth-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-copper/30 focus:border-copper transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-[10px] md:text-xs uppercase tracking-widest text-earth-700 mb-1.5 md:mb-2">
                          Message *
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                          required
                          rows={4}
                          placeholder="Tell us how we can help..."
                          className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-earth-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-copper/30 focus:border-copper transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-copper text-cream font-sans text-xs md:text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3 md:w-4 md:h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-12 md:py-16 bg-cream-dark">
        <div className="container-main text-center">
          <h2 className="font-display text-xl md:text-2xl text-earth-900 mb-3 md:mb-4">
            Have More Questions?
          </h2>
          <p className="font-body text-sm md:text-base text-text-secondary mb-5 md:mb-6 max-w-xl mx-auto px-4 md:px-0">
            Check out our frequently asked questions for quick answers about our services, 
            booking process, and what to expect.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-sans text-xs md:text-sm uppercase tracking-widest text-copper hover:text-copper-dark transition-colors"
          >
            View FAQ
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
