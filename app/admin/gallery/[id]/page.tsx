'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface GalleryForm {
  title: string;
  description?: string;
  category: string;
  image: { url: string; publicId: string };
  event?: string;
  date?: string;
  featured: boolean;
  order: number;
  isActive: boolean;
}

const categories = [
  'Private Dining',
  'Weddings',
  'Corporate Events',
  'Plated Dishes',
  'Behind the Scenes',
];

const initialForm: GalleryForm = {
  title: '',
  description: '',
  category: 'Plated Dishes',
  image: { url: '', publicId: '' },
  featured: false,
  order: 0,
  isActive: true,
};

export default function GalleryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [form, setForm] = useState<GalleryForm>(initialForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchItem();
    }
  }, [isNew, resolvedParams.id]);

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/gallery/${resolvedParams.id}`);
      const data = await res.json();
      if (data.galleryItem) {
        setForm(data.galleryItem);
      }
    } catch (error) {
      toast.error('Failed to load item');
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
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'chef-chioma/gallery');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.url) {
        setForm(prev => ({
          ...prev,
          image: { url: data.url, publicId: data.publicId },
        }));
        toast.success('Image uploaded');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.image.url) {
      toast.error('Please upload an image');
      return;
    }

    setSaving(true);

    try {
      const url = isNew ? '/api/gallery' : `/api/gallery/${resolvedParams.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isNew ? 'Image added' : 'Image updated');
        router.push('/admin/gallery');
      } else {
        toast.error('Failed to save');
      }
    } catch (error) {
      toast.error('Failed to save');
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

      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/gallery"
          className="p-2 hover:bg-earth-100 rounded-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-3xl text-earth-900">
          {isNew ? 'Add Gallery Image' : 'Edit Image'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <div className="bg-white border border-earth-200 rounded-sm p-6">
          <h3 className="font-display text-lg text-earth-900 mb-4">Image *</h3>
          {form.image?.url ? (
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src={form.image.url} alt="Gallery" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, image: { url: '', publicId: '' } }))}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-earth-200 rounded-sm cursor-pointer hover:border-copper transition-colors">
              <Upload className="w-12 h-12 text-earth-400 mb-3" />
              <span className="text-earth-500 font-body">
                {uploading ? 'Uploading...' : 'Click to upload image'}
              </span>
              <span className="text-xs text-earth-400 mt-1">JPG, PNG up to 10MB</span>
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

        {/* Details */}
        <div className="space-y-6">
          <div className="bg-white border border-earth-200 rounded-sm p-6 space-y-4">
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
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Elegant Wedding Reception"
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
                placeholder="Optional description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                  Category *
                </label>
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
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Event Name
              </label>
              <input
                type="text"
                name="event"
                value={form.event || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="The Adeyemi Wedding"
              />
            </div>
          </div>

          <div className="bg-white border border-earth-200 rounded-sm p-6">
            <h3 className="font-display text-lg text-earth-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
                />
                <label className="font-sans text-sm text-earth-700">Active (visible in gallery)</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
                />
                <label className="font-sans text-sm text-earth-700">Featured image</label>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-earth-200">
              <button
                type="submit"
                disabled={saving || !form.image.url}
                className="w-full px-4 py-3 bg-copper text-cream font-sans text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : isNew ? 'Add Image' : 'Update Image'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
