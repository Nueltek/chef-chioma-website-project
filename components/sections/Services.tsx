"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChefHat, Users, GraduationCap, Utensils } from "lucide-react";
import {
  images,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";

interface Service {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image?: { url: string };
}

const iconMap: Record<string, typeof ChefHat> = {
  "private-dining": ChefHat,
  "event-catering": Users,
  "cooking-classes": GraduationCap,
  "menu-development": Utensils,
};

const fallbackServices: Service[] = [
  {
    _id: "1",
    slug: "private-dining",
    title: "Private Dining",
    tagline: "Intimate Culinary Theatre",
    description:
      "Transform your home into an exclusive restaurant. From intimate dinners for two to gatherings of twenty, experience bespoke multi-course menus crafted to your preferences.",
    image: { url: images.privateDining },
  },
  {
    _id: "2",
    slug: "event-catering",
    title: "Event Catering",
    tagline: "Celebrations Elevated",
    description:
      "Weddings, corporate functions, milestone celebrations—your events deserve food that creates lasting memories. Full-service catering with meticulous attention to detail.",
    image: { url: images.catering },
  },
  {
    _id: "3",
    slug: "cooking-classes",
    title: "Cooking Classes",
    tagline: "Master the Art",
    description:
      "Hands-on experiences for individuals, couples, or groups. Learn the secrets of Nigerian cuisine—from perfecting jollof rice to mastering complex traditional techniques.",
    image: { url: images.classes },
  },
  {
    _id: "4",
    slug: "menu-development",
    title: "Menu Development",
    tagline: "Culinary Consulting",
    description:
      "For restaurants and hospitality brands seeking authentic Nigerian flavors. Recipe development, menu curation, and training for your culinary team.",
    image: { url: images.menuDev },
  },
];

export default function Services() {
  const [mounted, setMounted] = useState(false);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const hasFetched = useRef(false);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  useEffect(() => {
    setMounted(true);

    // Only fetch once using ref
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchServices();
    }
  }, []);

  const fetchServices = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch("/api/services?featured=true&limit=4", {
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Only update if we got valid data with items
      if (
        data.services &&
        Array.isArray(data.services) &&
        data.services.length > 0
      ) {
        const mergedServices = data.services.map((service: Service) => {
          const fallback = fallbackServices.find(
            (f) => f.slug === service.slug,
          );
          return {
            ...service,
            image: service.image?.url
              ? service.image
              : { url: fallback?.image?.url || images.privateDining },
            tagline:
              service.tagline || fallback?.tagline || "Culinary Excellence",
          };
        });
        setServices(mergedServices);
      }
      // If empty or invalid, keep fallback (already set)
    } catch (error) {
      // Keep fallback services on error
      console.log("Using fallback services");
    }
  };

  return (
    <section className="relative bg-earth-800 py-20 lg:py-32 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise" />

      {/* Warm gradient accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(184, 117, 51, 0.4) 0%, transparent 60%)",
        }}
      />

      <div className="container-main relative">
        <SectionHeading
          scriptText="Our Services"
          title="Curated Experiences"
          subtitle="Every service is tailored to create extraordinary moments. Whether an intimate dinner or a grand celebration, we bring the same passion and precision to every plate."
          light
        />

        {/* Services Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = iconMap[service.slug] || ChefHat;
            const isHovered = hoveredService === service._id;

            return (
              <motion.div
                key={service._id}
                variants={staggerItemVariants}
                onMouseEnter={() => setHoveredService(service._id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <Link
                  href={`/services#${service.slug}`}
                  className="group block relative h-full min-h-[280px] md:min-h-[320px] lg:min-h-[400px] rounded-sm overflow-hidden"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image?.url || images.privateDining}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-900 via-earth-900/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 md:p-6 lg:p-8 flex flex-col justify-end">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        y: mounted && isHovered ? -8 : 0,
                        opacity: mounted && isHovered ? 0.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mb-3 md:mb-4"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-copper-light/50 flex items-center justify-center">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-copper-light" />
                      </div>
                    </motion.div>

                    {/* Tagline */}
                    <span className="font-script text-base md:text-lg text-copper-light mb-1">
                      {service.tagline}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-cream mb-2 md:mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-cream/80 text-sm lg:text-base max-w-sm line-clamp-3">
                      {service.description}
                    </p>

                    {/* Learn More Link */}
                    <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-copper-light">
                        Learn More
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-10 lg:mt-16"
        >
          <p className="font-body text-cream/70 mb-5 md:mb-6 max-w-xl mx-auto text-sm md:text-base">
            Not sure which service fits your needs? Let&apos;s have a
            conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-transparent text-cream font-sans text-xs md:text-sm uppercase tracking-[0.2em] border border-cream/40 hover:bg-cream hover:text-earth-800 transition-all duration-400"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
