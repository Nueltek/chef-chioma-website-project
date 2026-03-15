'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PrivacyContent() {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.1 });

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[35vh] flex items-center bg-earth-900 overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900" />

        <div className="container-main relative py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-hero text-cream mb-4">
              Privacy Policy
            </h1>
            <p className="font-body text-cream/70">
              Last updated: March 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-main max-w-3xl">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-earth-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:font-body prose-p:text-text-secondary prose-p:leading-relaxed
              prose-ul:list-disc prose-ul:pl-6
              prose-li:font-body prose-li:text-text-secondary"
          >
            <p>
              Chef Chioma Okonkwo (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting 
              your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you visit our website or engage our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide when:</p>
            <ul>
              <li>Filling out inquiry or booking forms on our website</li>
              <li>Subscribing to our newsletter</li>
              <li>Communicating with us via email, phone, or social media</li>
              <li>Engaging our services for private dining, catering, or cooking classes</li>
            </ul>
            <p>
              This information may include your name, email address, phone number, physical address, 
              event details, dietary requirements, and payment information.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide requested services</li>
              <li>Plan and execute your culinary experience</li>
              <li>Process payments and send invoices</li>
              <li>Send you updates about your booking</li>
              <li>Send newsletters and promotional materials (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist in delivering our services (e.g., payment processors, event venues)</li>
              <li>Professional advisors such as lawyers and accountants when necessary</li>
              <li>Authorities when required by law</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction. 
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your 
              browsing experience. You can set your browser to refuse cookies, though this may 
              limit certain website functionality.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2>Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the 
              purposes for which it was collected, including to satisfy legal, accounting, or 
              reporting requirements.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect 
              personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be 
              indicated by an updated date at the top of this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              Email: privacy@chefchiomaokonkwo.com<br />
              Phone: +234 801 234 5678<br />
              Address: Victoria Island, Lagos, Nigeria
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
