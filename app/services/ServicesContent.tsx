'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { images } from '@/lib/utils';

const services = [
  {
    id: 'private-dining',
    title: 'Private Dining',
    tagline: 'Your Home, Transformed',
    description: 'Experience restaurant-quality dining in the comfort of your own space. Chef Chioma arrives with her team, fresh ingredients, and complete kitchen setup to create a bespoke multi-course meal tailored to your preferences.',
    longDescription: 'From intimate dinners for two to gatherings of twenty, every private dining experience is customized to your vision. We handle everything—from menu creation and ingredient sourcing to service and cleanup—leaving you free to be a guest at your own table.',
    features: [
      'Personalized menu consultation',
      'Premium ingredient sourcing',
      'Complete kitchen setup and breakdown',
      'Professional table styling available',
      'Wine pairing recommendations',
      'Dietary accommodations',
    ],
    pricing: 'From ₦350,000 for 2 guests',
    image: images.privateDining,
    reverse: false,
  },
  {
    id: 'catering',
    title: 'Event Catering',
    tagline: 'Celebrations Elevated',
    description: 'Weddings, corporate functions, milestone celebrations—your events deserve food that creates lasting memories. Full-service catering with the same attention to detail as our intimate dining experiences.',
    longDescription: 'We scale our signature quality to events of any size while maintaining the personalized touch that defines Chef Chioma\'s approach. From canapé receptions to seated multi-course dinners, every element is crafted to complement your celebration.',
    features: [
      'Events from 20 to 500+ guests',
      'Customized menu development',
      'Professional service staff',
      'Equipment and setup included',
      'Tasting sessions available',
      'Coordination with event planners',
    ],
    pricing: 'Custom quotes based on requirements',
    image: images.catering,
    reverse: true,
  },
  {
    id: 'classes',
    title: 'Cooking Classes',
    tagline: 'Master the Art',
    description: 'Hands-on culinary education for individuals, couples, or groups. Learn the secrets of Nigerian cuisine from Chef Chioma herself, from foundational techniques to advanced preparations.',
    longDescription: 'Whether you want to perfect your jollof rice, explore regional Nigerian cuisines, or simply spend a memorable afternoon learning something new, our classes combine education with entertainment in a relaxed, inspiring environment.',
    features: [
      'Private or group sessions',
      'Hands-on instruction',
      'All ingredients provided',
      'Recipe cards to take home',
      'Wine and dining included',
      'Custom curriculum available',
    ],
    pricing: 'From ₦150,000 per person',
    image: images.classes,
    reverse: false,
  },
  {
    id: 'consulting',
    title: 'Menu Development',
    tagline: 'Culinary Consulting',
    description: 'For restaurants, hotels, and hospitality brands seeking authentic Nigerian culinary expertise. Recipe development, menu curation, staff training, and brand consulting.',
    longDescription: 'Chef Chioma brings her deep knowledge of Nigerian cuisine and global fine dining experience to help hospitality businesses create distinctive culinary offerings that resonate with modern diners while honoring traditional flavors.',
    features: [
      'Menu creation and refinement',
      'Recipe development and testing',
      'Kitchen staff training',
      'Food cost optimization',
      'Brand storytelling through food',
      'Ongoing consulting available',
    ],
    pricing: 'Project-based pricing',
    image: images.menuDev,
    reverse: true,
  },
];

// Component for individual service section with its own animation
function ServiceSection({ service, index }: { service: typeof services[0], index: number }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id={service.id}
      className={`py-16 lg:py-28 ${index % 2 === 0 ? 'bg-cream' : 'bg-cream-dark'}`}
    >
      <div className="container-main" ref={sectionRef}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center ${
          service.reverse ? 'lg:grid-flow-dense' : ''
        }`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: service.reverse ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: service.reverse ? 40 : -40 }}
            transition={{ duration: 0.6 }}
            className={service.reverse ? 'lg:col-start-2' : ''}
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: service.reverse ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: service.reverse ? -40 : 40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-script text-xl md:text-2xl text-copper block mb-2">
              {service.tagline}
            </span>
            <h2 className="font-display text-2xl md:text-display text-earth-900 mb-3 md:mb-4">
              {service.title}
            </h2>
            <p className="font-body text-text-secondary mb-4 md:mb-6 leading-relaxed">
              {service.description}
            </p>
            <p className="font-body text-text-secondary mb-6 md:mb-8 leading-relaxed">
              {service.longDescription}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 md:gap-3">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-copper flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm md:text-base text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4">
              <span className="font-display text-lg md:text-xl text-earth-900">{service.pricing}</span>
              <Link
                href="/book"
                className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-earth-800 text-cream font-sans text-xs md:text-sm uppercase tracking-wider hover:bg-copper transition-colors"
              >
                Inquire
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesContent() {
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center bg-earth-900 overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 60%, rgba(184, 117, 51, 0.3) 0%, transparent 60%)',
          }}
        />

        <div className="container-main relative py-16 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4">Our Services</span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-hero text-cream mb-4 md:mb-6">
              Curated Experiences
            </h1>
            <p className="font-body text-base md:text-xl text-cream/80 max-w-xl">
              Every service is designed around you. Whether an intimate dinner or a grand celebration, 
              we bring the same passion and precision to every plate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* CTA Section */}
      <section className="bg-earth-900 py-16 lg:py-28">
        <div className="container-main text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <span className="font-script text-2xl md:text-3xl text-copper-light block mb-3 md:mb-4">
              Not Sure Where to Start?
            </span>
            <h2 className="font-display text-2xl md:text-display text-cream mb-4 md:mb-6">
              Let&apos;s Have a Conversation
            </h2>
            <p className="font-body text-base md:text-body-lg text-cream/80 mb-6 md:mb-8">
              Every great experience begins with understanding your vision. 
              Reach out, and let&apos;s explore how we can create something unforgettable together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-transparent text-cream font-sans text-xs md:text-sm uppercase tracking-[0.2em] border border-cream/40 hover:bg-cream hover:text-earth-800 transition-all duration-400"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
