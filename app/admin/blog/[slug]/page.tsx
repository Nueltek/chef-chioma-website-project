'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import slugify from 'slugify';

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: { url: string; publicId: string; alt?: string };
  category: string;
  tags: string[];
  author: { name: string; bio?: string };
  featured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const categories = [
  'Recipes',
  'Nigerian Cuisine',
  'Cooking Tips',
  'Behind the Scenes',
  'Events',
  'Food Stories',
  'Ingredients',
  'Culture & Heritage',
];

const initialForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: { url: '', publicId: '' },
  category: 'Recipes',
  tags: [],
  author: { name: 'Chef Chioma Okonkwo' },
  featured: false,
  isPublished: false,
  seoTitle: '',
  seoDescription: '',
};

export default function BlogEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.slug === 'new';
  const router = useRouter();
  
  const [form, setForm] = useState<BlogForm>(initialForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchPost();
    }
  }, [isNew, resolvedParams.slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/${resolvedParams.slug}`);
      const data = await res.json();
      if (data.post) {
        setForm({
          ...data.post,
          tags: data.post.tags || [],
        });
      }
    } catch (error) {
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    if (name === 'title' && isNew) {
      setForm(prev => ({
        ...prev,
        slug: slugify(value, { lower: true, strict: true }),
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'chef-chioma/blog');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.url) {
        setForm(prev => ({
          ...prev,
          featuredImage: { url: data.url, publicId: data.publicId },
        }));
        toast.success('Image uploaded');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/blog' : `/api/blog/${resolvedParams.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isNew ? 'Post created' : 'Post updated');
        router.push('/admin/blog');
      } else {
        toast.error('Failed to save post');
      }
    } catch (error) {
      toast.error('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-earth-100 rounded w-1/4" />
        <div className="h-64 bg-earth-100 rounded" />
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/blog"
          className="p-2 hover:bg-earth-100 rounded-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-3xl text-earth-900">
            {isNew ? 'New Blog Post' : 'Edit Post'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-earth-200 rounded-sm p-6 space-y-6">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper text-lg font-display"
                placeholder="Your compelling headline..."
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper bg-earth-50 font-mono text-sm"
                placeholder="your-post-slug"
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
                placeholder="A brief summary that appears on blog listing pages..."
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={20}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none font-mono text-sm"
                placeholder="Write your article content here. You can use HTML tags like <p>, <h2>, <ul>, <li>, <strong>, etc."
              />
              <p className="font-body text-xs text-text-muted mt-2">
                Tip: Use HTML tags for formatting. For example: &lt;h2&gt;Section Title&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;, &lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;
              </p>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white border border-earth-200 rounded-sm p-6 space-y-4">
            <h3 className="font-display text-lg text-earth-900">SEO Settings</h3>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                SEO Title
              </label>
              <input
                type="text"
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Custom title for search engines (optional)"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                SEO Description
              </label>
              <textarea
                name="seoDescription"
                value={form.seoDescription}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
                placeholder="Custom description for search engines (optional)"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white border border-earth-200 rounded-sm p-6">
            <h3 className="font-display text-lg text-earth-900 mb-4">Publish</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
                />
                <label className="font-sans text-sm text-earth-700">Publish immediately</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
                />
                <label className="font-sans text-sm text-earth-700">Featured post</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-earth-200">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-3 bg-copper text-cream font-sans text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : isNew ? 'Create Post' : 'Update Post'}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white border border-earth-200 rounded-sm p-6">
            <h3 className="font-display text-lg text-earth-900 mb-4">Featured Image</h3>
            {form.featuredImage?.url ? (
              <div className="relative aspect-video rounded-sm overflow-hidden mb-4">
                <Image src={form.featuredImage.url} alt="Featured" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, featuredImage: { url: '', publicId: '' } }))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-earth-200 rounded-sm cursor-pointer hover:border-copper transition-colors">
                <Upload className="w-8 h-8 text-earth-400 mb-2" />
                <span className="text-sm text-earth-500">
                  {uploading ? 'Uploading...' : 'Click to upload'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          {/* Category */}
          <div className="bg-white border border-earth-200 rounded-sm p-6">
            <h3 className="font-display text-lg text-earth-900 mb-4">Category</h3>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white border border-earth-200 rounded-sm p-6">
            <h3 className="font-display text-lg text-earth-900 mb-4">Tags</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-earth-200 rounded-sm focus:outline-none focus:border-copper text-sm"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="p-2 bg-earth-100 text-earth-700 rounded-sm hover:bg-earth-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-earth-100 text-earth-700 text-sm rounded">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-earth-500 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
