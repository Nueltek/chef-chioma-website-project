import { Metadata } from 'next';
import PublicLayout from '@/components/layouts/PublicLayout';
import BlogPostContent from './BlogPostContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // In production, fetch the actual post data
  return {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'Read this culinary article from Chef Chioma Okonkwo\'s blog.',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  return (
    <PublicLayout>
      <BlogPostContent slug={slug} />
    </PublicLayout>
  );
}
