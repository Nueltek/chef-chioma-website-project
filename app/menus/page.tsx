import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import MenusContent from './MenusContent';

export const metadata: Metadata = {
  title: 'Sample Menus',
  description: 'Explore Chef Chioma\'s signature dishes and sample menus featuring elevated Nigerian cuisine with modern techniques.',
};

export default function MenusPage() {
  return (
    <PublicLayout>
      <MenusContent />
    </PublicLayout>
  );
}
