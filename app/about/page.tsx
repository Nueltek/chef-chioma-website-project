import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'Meet the Chef',
  description: 'Learn about Chef Chioma Okonkwo - her journey from Enugu to Le Cordon Bleu, and her mission to elevate Nigerian cuisine on the world stage.',
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <AboutContent />
    </PublicLayout>
  );
}
