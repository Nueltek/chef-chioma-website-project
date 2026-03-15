import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact | Chef Chioma Okonkwo',
  description: 'Get in touch with Chef Chioma Okonkwo. Located in Lagos, Nigeria, serving clients across Africa and beyond.',
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <ContactContent />
    </PublicLayout>
  );
}
