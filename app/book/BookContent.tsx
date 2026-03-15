'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Calendar, Users, MessageSquare } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/utils';
import toast, { Toaster } from 'react-hot-toast';

const serviceOptions = [
  'Private Dining',
  'Event Catering',
  'Cooking Classes',
  'Menu Development',
  'Corporate Events',
  'Wedding',
  'Other',
];

const budgetRanges = [
  'Under ₦500,000',
  '₦500,000 - ₦1,000,000',
  '₦1,000,000 - ₦3,000,000',
  '₦3,000,000 - ₦5,000,000',
  'Above ₦5,000,000',
  'Prefer to discuss',
];

const referralSources = [
  'Google',
  'Instagram',
  'Friend/Family',
  'Event',
  'Press',
  'Other',
];

export default function BookContent() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    eventDate: '',
    guestCount: '',
    location: '',
    budget: '',
    message: '',
    dietaryRequirements: '',
    referralSource: '',
  });
  const formSectionRef = useRef(null);
  const faqRef = useRef(null);
  const isFormInView = useInView(formSectionRef, { once: true, amount: 0.1 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          guestCount: formData.guestCount ? parseInt(formData.guestCount) : undefined,
        }),
      });

      if (res.ok) {
        toast.success('Thank you! We\'ll be in touch within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          eventDate: '',
          guestCount: '',
          location: '',
          budget: '',
          message: '',
          dietaryRequirements: '',
          referralSource: '',
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      <Toaster position="top-center" />
      
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-earth-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 70% 40%, rgba(184, 117, 51, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="container-main relative py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="font-script text-3xl text-copper-light block mb-4">Reserve</span>
            <h1 className="font-display text-hero text-cream mb-6">
              Begin Your Journey
            </h1>
            <p className="font-body text-xl text-cream/80 max-w-xl">
              Every unforgettable experience starts with a conversation. Tell us about your vision, 
              and we&apos;ll craft something extraordinary together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              ref={formSectionRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Details */}
                <div>
                  <h3 className="font-display text-xl text-earth-900 mb-6">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                        placeholder="+234 801 234 5678"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                      >
                        <option value="">Select an option</option>
                        {referralSources.map(source => (
                          <option key={source} value={source}>{source}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-display text-xl text-earth-900 mb-6">Event Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Service Type *
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                        placeholder="Expected guests"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Event Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                        placeholder="City or venue"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                      >
                        <option value="">Select a range</option>
                        {budgetRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                        Dietary Requirements
                      </label>
                      <input
                        type="text"
                        name="dietaryRequirements"
                        value={formData.dietaryRequirements}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors"
                        placeholder="Allergies, preferences, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="font-display text-xl text-earth-900 mb-6">Tell Us More</h3>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-earth-200 rounded-sm text-earth-900 font-body focus:outline-none focus:border-copper transition-colors resize-none"
                      placeholder="Tell us about your vision for this event..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-earth-800 text-cream font-sans text-sm uppercase tracking-[0.2em] border border-earth-800 hover:bg-transparent hover:text-earth-800 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pl-8 lg:border-l border-earth-200"
            >
              <div className="lg:sticky lg:top-32 space-y-8">
                <div>
                  <span className="font-script text-2xl text-copper block mb-2">Get in Touch</span>
                  <h3 className="font-display text-xl text-earth-900 mb-4">
                    Prefer to speak directly?
                  </h3>
                  <p className="font-body text-text-secondary">
                    We typically respond within 24 hours. For urgent inquiries, 
                    please call or WhatsApp.
                  </p>
                </div>

                <div className="space-y-6">
                  <a
                    href="tel:+2348012345678"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full border border-earth-200 flex items-center justify-center group-hover:bg-copper group-hover:border-copper transition-colors">
                      <Phone className="w-5 h-5 text-copper group-hover:text-cream transition-colors" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-text-muted">Phone</p>
                      <p className="font-body text-earth-900">+234 801 234 5678</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@chefchioma.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full border border-earth-200 flex items-center justify-center group-hover:bg-copper group-hover:border-copper transition-colors">
                      <Mail className="w-5 h-5 text-copper group-hover:text-cream transition-colors" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-text-muted">Email</p>
                      <p className="font-body text-earth-900">hello@chefchioma.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-earth-200 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-copper" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-text-muted">Location</p>
                      <p className="font-body text-earth-900">Lagos, Nigeria</p>
                      <p className="font-body text-text-secondary text-sm">Serving Lagos, Abuja & Beyond</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-earth-200">
                  <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-4">
                    Planning Ahead?
                  </p>
                  <p className="font-body text-text-secondary text-sm">
                    We recommend booking at least 2 weeks in advance for private dining 
                    and 4-6 weeks for larger events.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
