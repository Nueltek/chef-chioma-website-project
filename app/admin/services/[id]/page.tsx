'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import slugify from 'slugify';

interface ServiceForm {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  priceRange: string;
  image: { url: string; publicId: string };
  order: number;
  featured: boolean;
  isActive: boolean;
}

const initialForm: ServiceForm = {
  title: '',
  slug: '',
  tagline: '',
  description: '',
  longDescription: '',
  features: [''],
  priceRange: '',
  image: { url: '', publicId: '' },
  order: 0,
  featured: false,
  isActive: true,
};

export default function ServiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [form, setForm] = useState<ServiceForm>(initialForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchService();
    }
  }, [isNew, resolvedParams.id]);

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${resolvedParams.id}`);
      const data = await res.json();
      if (data.service) {
        setForm({
          ...data.service,
          features: data.service.features?.length ? data.service.features : [''],
        });
      }
    } catch (error) {
      toast.error('Failed to load service');
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

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'chef-chioma/services');

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
    setSaving(true);

    const cleanedForm = {
      ...form,
      features: form.features.filter(f => f.trim()),
    };

    try {
      const url = isNew ? '/api/services' : `/api/services/${resolvedParams.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedForm),
      });

      if (res.ok) {
        toast.success(isNew ? 'Service created' : 'Service updated');
        router.push('/admin/services');
      } else {
        toast.error('Failed to save service');
      }
    } catch (error) {
      toast.error('Failed to save service');
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
          href="/admin/services"
          className="p-2 hover:bg-earth-100 rounded-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-3xl text-earth-900">
            {isNew ? 'New Service' : 'Edit Service'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white border border-earth-200 rounded-sm p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Private Dining"
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
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper bg-earth-50"
                placeholder="private-dining"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
              Tagline *
            </label>
            <input
              type="text"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
              placeholder="Your Home, Transformed"
            />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
              Short Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
              placeholder="Brief description for cards and previews..."
            />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
              Full Description
            </label>
            <textarea
              name="longDescription"
              value={form.longDescription}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
              placeholder="Detailed description for the service page..."
            />
          </div>

          {/* Features */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
              Features
            </label>
            <div className="space-y-2">
              {form.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                    placeholder="Feature benefit..."
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-copper text-sm hover:underline"
              >
                + Add feature
              </button>
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
              Price Range *
            </label>
            <input
              type="text"
              name="priceRange"
              value={form.priceRange}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
              placeholder="From ₦350,000"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
              Image
            </label>
            {form.image?.url ? (
              <div className="relative aspect-video w-full max-w-md rounded-sm overflow-hidden">
                <Image src={form.image.url} alt="Service" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, image: { url: '', publicId: '' } }))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full max-w-md aspect-video border-2 border-dashed border-earth-200 rounded-sm cursor-pointer hover:border-copper transition-colors">
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

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-earth-200">
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
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
              />
              <label className="font-sans text-sm text-earth-700">Featured</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
              />
              <label className="font-sans text-sm text-earth-700">Active</label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-copper text-cream font-sans text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : isNew ? 'Create Service' : 'Save Changes'}
          </button>
          <Link
            href="/admin/services"
            className="px-6 py-3 border border-earth-300 text-earth-700 font-sans text-sm uppercase tracking-widest hover:bg-earth-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
