import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import TestimonialsContent from './TestimonialsContent';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what clients say about their dining experiences with Chef Chioma Okonkwo.',
};

export default function TestimonialsPage() {
  return (
    <PublicLayout>
      <TestimonialsContent />
    </PublicLayout>
  );
}
