import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Chef Chioma Okonkwo\'s private dining and catering services.',
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <PrivacyContent />
    </PublicLayout>
  );
}
