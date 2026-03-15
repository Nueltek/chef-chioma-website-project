import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import BookContent from './BookContent';

export const metadata: Metadata = {
  title: 'Book Your Experience',
  description: 'Reserve your private dining experience, event catering, or cooking class with Chef Chioma Okonkwo.',
};

export default function BookPage() {
  return (
    <PublicLayout>
      <BookContent />
    </PublicLayout>
  );
}
