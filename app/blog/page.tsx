import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog | Culinary Stories & Nigerian Food Insights',
  description: 'Explore Chef Chioma\'s culinary blog featuring Nigerian recipes, cooking tips, food stories, and behind-the-scenes insights into elevated West African cuisine.',
};

export default function BlogPage() {
  return (
    <PublicLayout>
      <BlogContent />
    </PublicLayout>
  );
}
