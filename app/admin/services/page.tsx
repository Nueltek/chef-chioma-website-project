'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Service {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  priceRange: string;
  image: { url: string; publicId: string };
  featured: boolean;
  isActive: boolean;
  order: number;
}

export default function ServicesListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services?active=false');
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Service deleted');
        fetchServices();
      }
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      if (res.ok) {
        toast.success(service.isActive ? 'Service hidden' : 'Service visible');
        fetchServices();
      }
    } catch (error) {
      toast.error('Failed to update service');
    }
  };

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-earth-900 mb-2">Services</h1>
          <p className="font-body text-text-secondary">
            Manage your service offerings
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-earth-200 rounded-sm p-4 animate-pulse">
              <div className="aspect-video bg-earth-100 rounded mb-4" />
              <div className="h-6 bg-earth-100 rounded w-2/3 mb-2" />
              <div className="h-4 bg-earth-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white border border-earth-200 rounded-sm p-12 text-center">
          <p className="font-body text-text-secondary mb-4">No services yet</p>
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-800 text-cream font-sans text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" />
            Create Your First Service
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className={`bg-white border rounded-sm overflow-hidden ${
                service.isActive ? 'border-earth-200' : 'border-earth-200 opacity-60'
              }`}
            >
              <div className="relative aspect-video">
                {service.image?.url ? (
                  <Image
                    src={service.image.url}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-earth-100 flex items-center justify-center">
                    <span className="text-earth-400">No image</span>
                  </div>
                )}
                {service.featured && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-copper text-cream text-xs">
                    Featured
                  </span>
                )}
                {!service.isActive && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-earth-800 text-cream text-xs">
                    Hidden
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-display text-xl text-earth-900 mb-1">{service.title}</h3>
                <p className="font-body text-sm text-text-secondary mb-2">{service.tagline}</p>
                <p className="font-body text-sm text-copper">{service.priceRange}</p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-earth-100">
                  <Link
                    href={`/admin/services/${service._id}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => toggleActive(service)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    {service.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {service.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => deleteService(service._id)}
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
