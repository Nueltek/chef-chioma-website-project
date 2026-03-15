import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions',
  description: 'Find answers to common questions about Chef Chioma\'s private dining services, catering, pricing, and booking process.',
};

export default function FAQPage() {
  return (
    <PublicLayout>
      <FAQContent />
    </PublicLayout>
  );
}
