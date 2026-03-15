import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for Chef Chioma Okonkwo\'s private dining and catering services.',
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <TermsContent />
    </PublicLayout>
  );
}
