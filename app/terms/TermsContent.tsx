'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TermsContent() {
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
              Terms of Service
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
              These Terms of Service (&quot;Terms&quot;) govern your engagement of Chef Chioma Okonkwo 
              (&quot;Chef,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) for private dining, catering, 
              cooking classes, and related culinary services. By booking our services, you agree to these Terms.
            </p>

            <h2>1. Services</h2>
            <p>
              We provide bespoke culinary experiences including but not limited to private dining, 
              event catering, corporate functions, wedding catering, and cooking classes. The specific 
              services, menu, pricing, and logistics will be detailed in your personalized proposal 
              and confirmation.
            </p>

            <h2>2. Booking and Confirmation</h2>
            <p>
              A booking is considered confirmed only upon receipt of:
            </p>
            <ul>
              <li>A signed service agreement or written confirmation (email is acceptable)</li>
              <li>Payment of the required deposit (typically 50% of the total quoted amount)</li>
            </ul>
            <p>
              We reserve the right to decline bookings at our discretion based on availability, 
              logistics, or alignment with our service standards.
            </p>

            <h2>3. Payment Terms</h2>
            <p>
              <strong>Deposits:</strong> A 50% non-refundable deposit is required to secure your date. 
              For weddings and large events, a tiered payment schedule may be arranged.
            </p>
            <p>
              <strong>Final Payment:</strong> The remaining balance is due 48 hours before the event date.
            </p>
            <p>
              <strong>Accepted Methods:</strong> Bank transfer, credit/debit card, or other methods 
              as agreed in writing.
            </p>
            <p>
              <strong>Additional Charges:</strong> Any services requested beyond the original agreement 
              will be quoted and billed separately.
            </p>

            <h2>4. Cancellation Policy</h2>
            <p>
              <strong>More than 30 days before event:</strong> Deposit is transferable to a new date 
              within 12 months.
            </p>
            <p>
              <strong>14-30 days before event:</strong> Deposit is forfeited; balance not charged.
            </p>
            <p>
              <strong>Less than 14 days before event:</strong> Full payment is due regardless of cancellation.
            </p>
            <p>
              We reserve the right to cancel services in case of force majeure, illness, or 
              circumstances beyond our control. In such cases, we will offer rescheduling or 
              full refund at the client&apos;s discretion.
            </p>

            <h2>5. Menu and Dietary Requirements</h2>
            <p>
              Menus are developed collaboratively based on your preferences and event requirements. 
              Final menu confirmation is required at least 14 days before the event.
            </p>
            <p>
              Please inform us of all dietary restrictions, allergies, and special requirements 
              during the planning process. While we take every precaution, we cannot guarantee 
              a completely allergen-free environment.
            </p>

            <h2>6. Venue Requirements</h2>
            <p>
              For events at your home or private venue, you are responsible for ensuring:
            </p>
            <ul>
              <li>Adequate kitchen facilities as discussed during planning</li>
              <li>Sufficient electrical capacity for our equipment</li>
              <li>Appropriate space for setup, preparation, and service</li>
              <li>Safe and legal access to the premises for our team</li>
            </ul>

            <h2>7. Staff and Conduct</h2>
            <p>
              Our team will conduct themselves professionally at all times. We expect the same 
              courtesy from clients and guests. We reserve the right to terminate services 
              immediately if our staff experiences harassment, abuse, or unsafe conditions.
            </p>

            <h2>8. Liability</h2>
            <p>
              We maintain appropriate liability insurance for our services. However, we are not 
              liable for:
            </p>
            <ul>
              <li>Allergic reactions from undisclosed allergies</li>
              <li>Damage to premises not caused by our negligence</li>
              <li>Circumstances beyond our control affecting service delivery</li>
              <li>Loss or damage to client property unless directly caused by our team</li>
            </ul>

            <h2>9. Photography and Media</h2>
            <p>
              We may photograph our work for portfolio and promotional purposes. If you prefer 
              your event not be photographed or shared, please inform us in writing before the event.
            </p>

            <h2>10. Intellectual Property</h2>
            <p>
              All recipes, techniques, and culinary creations remain the intellectual property 
              of Chef Chioma Okonkwo. Cooking class participants receive recipes for personal 
              use only; commercial reproduction is prohibited.
            </p>

            <h2>11. Changes to Services</h2>
            <p>
              We reserve the right to make reasonable ingredient substitutions due to availability, 
              seasonality, or quality concerns. We will communicate significant changes in advance 
              when possible.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes 
              shall be resolved through good-faith negotiation, mediation if necessary, and ultimately 
              through the courts of Lagos State if resolution cannot be reached otherwise.
            </p>

            <h2>13. Contact</h2>
            <p>
              For questions about these Terms or our services:
            </p>
            <p>
              Email: hello@chefchiomaokonkwo.com<br />
              Phone: +234 801 234 5678<br />
              Address: Victoria Island, Lagos, Nigeria
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
