import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore Chef Chioma\'s culinary creations, private dining setups, event catering, and behind-the-scenes moments.',
};

export default function GalleryPage() {
  return (
    <PublicLayout>
      <GalleryContent />
    </PublicLayout>
  );
}
