import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Chef Chioma\'s culinary services: private dining, event catering, cooking classes, and menu development for restaurants.',
};

export default function ServicesPage() {
  return (
    <PublicLayout>
      <ServicesContent />
    </PublicLayout>
  );
}
