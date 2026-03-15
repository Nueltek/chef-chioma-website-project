"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface Settings {
  email: string;
  phone: string;
  location: string;
  serviceAreas: string[];
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  chefName: string;
  tagline: string;
}

const defaultSettings: Settings = {
  email: "hello@chefchioma.com",
  phone: "+234 801 234 5678",
  location: "Lagos, Nigeria",
  serviceAreas: ["Lagos", "Abuja", "Beyond"],
  instagram: "https://instagram.com/chefchioma",
  facebook: "https://facebook.com/chefchioma",
  chefName: "Chef Chioma Okonkwo",
  tagline: "Elevating Nigerian cuisine through intimate dining experiences.",
};

const footerLinks = {
  explore: [
    { href: "/about", label: "Meet the Chef" },
    { href: "/services", label: "Services" },
    { href: "/menus", label: "Sample Menus" },
    { href: "/gallery", label: "Gallery" },
  ],
  information: [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const currentYear = new Date().getFullYear();
  const hasFetched = useRef(false);

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

      const res = await fetch("/api/settings", {
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (data.settings) {
        setSettings({
          ...defaultSettings,
          ...data.settings,
        });
      }
    } catch (error) {
      // Use default settings on error
    }
  };

  // Format phone for tel: link
  const phoneLink = settings.phone.replace(/\s/g, "").replace(/[^+\d]/g, "");

  return (
    <footer className="bg-earth-900 text-cream">
      {/* Main Footer */}
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-script text-3xl text-copper-light leading-none block">
                Chioma
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[1px] w-4 bg-cream/40" />
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-cream/60">
                  Private Chef
                </span>
                <div className="h-[1px] w-4 bg-cream/40" />
              </div>
            </div>
            <p className="font-body text-cream/70 mb-6 max-w-xs text-sm">
              {settings.tagline}
            </p>
            <div className="flex gap-3">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-copper hover:border-copper hover:text-cream transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-copper hover:border-copper hover:text-cream transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.twitter && (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-copper hover:border-copper hover:text-cream transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-copper hover:border-copper hover:text-cream transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-copper-light mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-cream/70 hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-copper-light mb-6">
              Information
            </h4>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-cream/70 hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-copper-light mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${phoneLink}`}
                  className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-copper-light" />
                  <span className="font-body">{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-copper-light" />
                  <span className="font-body">{settings.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-cream/70">
                  <MapPin className="w-4 h-4 text-copper-light mt-1" />
                  <span className="font-body">
                    {settings.location}
                    {settings.serviceAreas &&
                      settings.serviceAreas.length > 0 && (
                        <>
                          <br />
                          Serving {settings.serviceAreas.slice(0, 3).join(", ")}
                        </>
                      )}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-cream/50">
            &copy; {currentYear} {settings.chefName}. All rights reserved.
          </p>
          <p className="font-body text-sm text-cream/50">
            Built by{" "}
            <a
              href="https://x.com/nueltek"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper hover:underline"
            >
              Nueltek
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
