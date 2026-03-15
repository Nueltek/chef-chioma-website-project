'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Testimonial {
  _id: string;
  name: string;
  title?: string;
  location?: string;
  content: string;
  eventType?: string;
  rating: number;
  featured: boolean;
  isActive: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Testimonial deleted');
        fetchTestimonials();
      }
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  const toggleActive = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${testimonial._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !testimonial.isActive }),
      });
      if (res.ok) {
        toast.success(testimonial.isActive ? 'Testimonial hidden' : 'Testimonial visible');
        fetchTestimonials();
      }
    } catch (error) {
      toast.error('Failed to update testimonial');
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${testimonial._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !testimonial.featured }),
      });
      if (res.ok) {
        toast.success(testimonial.featured ? 'Removed from featured' : 'Added to featured');
        fetchTestimonials();
      }
    } catch (error) {
      toast.error('Failed to update testimonial');
    }
  };

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-earth-900 mb-2">Testimonials</h1>
          <p className="font-body text-text-secondary">
            Manage client testimonials and reviews
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-earth-200 rounded-sm p-6 animate-pulse">
              <div className="h-4 bg-earth-100 rounded w-1/4 mb-3" />
              <div className="h-20 bg-earth-100 rounded mb-3" />
              <div className="h-4 bg-earth-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white border border-earth-200 rounded-sm p-12 text-center">
          <p className="font-body text-text-secondary mb-4">No testimonials yet</p>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-800 text-cream font-sans text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" />
            Add Your First Testimonial
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className={`bg-white border rounded-sm p-6 ${
                testimonial.isActive ? 'border-earth-200' : 'border-earth-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'fill-copper text-copper' : 'text-earth-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="font-body text-text-secondary line-clamp-3 mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-display text-lg text-earth-900">{testimonial.name}</p>
                      <p className="font-body text-sm text-text-muted">
                        {[testimonial.title, testimonial.location].filter(Boolean).join(' • ')}
                      </p>
                    </div>
                    {testimonial.eventType && (
                      <span className="px-2 py-0.5 bg-copper/10 text-copper text-xs font-sans uppercase tracking-widest">
                        {testimonial.eventType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/admin/testimonials/${testimonial._id}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => toggleFeatured(testimonial)}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs transition-colors ${
                      testimonial.featured
                        ? 'bg-copper text-cream hover:bg-copper-dark'
                        : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                    }`}
                  >
                    <Star className="w-3 h-3" />
                    {testimonial.featured ? 'Featured' : 'Feature'}
                  </button>
                  <button
                    onClick={() => toggleActive(testimonial)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    {testimonial.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {testimonial.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
