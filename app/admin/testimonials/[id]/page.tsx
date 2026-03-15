'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface TestimonialForm {
  name: string;
  title?: string;
  company?: string;
  location?: string;
  content: string;
  eventType?: string;
  rating: number;
  featured: boolean;
  isActive: boolean;
}

const eventTypes = [
  'Private Dining',
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Anniversary',
  'Cooking Class',
  'Other',
];

const initialForm: TestimonialForm = {
  name: '',
  title: '',
  location: '',
  content: '',
  eventType: 'Private Dining',
  rating: 5,
  featured: false,
  isActive: true,
};

export default function TestimonialEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [form, setForm] = useState<TestimonialForm>(initialForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchTestimonial();
    }
  }, [isNew, resolvedParams.id]);

  const fetchTestimonial = async () => {
    try {
      const res = await fetch(`/api/testimonials/${resolvedParams.id}`);
      const data = await res.json();
      if (data.testimonial) {
        setForm(data.testimonial);
      }
    } catch (error) {
      toast.error('Failed to load testimonial');
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

  const setRating = (rating: number) => {
    setForm(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/testimonials' : `/api/testimonials/${resolvedParams.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isNew ? 'Testimonial created' : 'Testimonial updated');
        router.push('/admin/testimonials');
      } else {
        toast.error('Failed to save testimonial');
      }
    } catch (error) {
      toast.error('Failed to save testimonial');
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
          href="/admin/testimonials"
          className="p-2 hover:bg-earth-100 rounded-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-3xl text-earth-900">
          {isNew ? 'Add Testimonial' : 'Edit Testimonial'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white border border-earth-200 rounded-sm p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-3">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= form.rating ? 'fill-copper text-copper' : 'text-earth-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
              Testimonial Content *
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
              placeholder="Share the client's experience in their words..."
            />
          </div>

          {/* Client Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Mr. & Mrs. Adeyemi"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Title/Role
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="CEO, Company Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Lagos, Nigeria"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Event Type
              </label>
              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Settings */}
          <div className="pt-4 border-t border-earth-200">
            <div className="flex items-center gap-6">
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
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-3 bg-copper text-cream font-sans text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : isNew ? 'Add Testimonial' : 'Update Testimonial'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
