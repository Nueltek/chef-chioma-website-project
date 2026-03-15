import PublicLayout from '@/components/layouts/PublicLayout';
import {
  Hero,
  Introduction,
  Services,
  FeaturedMenu,
  Testimonials,
  CTASection,
} from '@/components/sections';

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <Introduction />
      <Services />
      <FeaturedMenu />
      <Testimonials />
      <CTASection />
    </PublicLayout>
  );
}
