'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  image: { url: string };
  featured: boolean;
  isActive: boolean;
}

const categories = [
  'All',
  'Private Dining',
  'Weddings',
  'Corporate Events',
  'Plated Dishes',
  'Behind the Scenes',
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setItems(data.gallery || []);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Image deleted');
        fetchItems();
      }
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const toggleActive = async (item: GalleryItem) => {
    try {
      const res = await fetch(`/api/gallery/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (res.ok) {
        toast.success(item.isActive ? 'Image hidden' : 'Image visible');
        fetchItems();
      }
    } catch (error) {
      toast.error('Failed to update image');
    }
  };

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-earth-900 mb-2">Gallery</h1>
          <p className="font-body text-text-secondary">
            Showcase your culinary artistry
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 font-sans text-xs uppercase tracking-widest rounded-sm transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-earth-800 text-cream'
                : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white border border-earth-200 rounded-sm overflow-hidden animate-pulse">
              <div className="aspect-square bg-earth-100" />
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white border border-earth-200 rounded-sm p-12 text-center">
          <p className="font-body text-text-secondary mb-4">No gallery images found</p>
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-800 text-cream font-sans text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" />
            Upload Your First Image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`bg-white border rounded-sm overflow-hidden group ${
                item.isActive ? 'border-earth-200' : 'border-earth-200 opacity-60'
              }`}
            >
              <div className="relative aspect-square">
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-earth-100 flex items-center justify-center">
                    <span className="text-earth-400 text-xs">No image</span>
                  </div>
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-earth-900/0 group-hover:bg-earth-900/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Link
                    href={`/admin/gallery/${item._id}`}
                    className="p-2 bg-white text-earth-700 rounded-full hover:bg-copper hover:text-cream transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => toggleActive(item)}
                    className="p-2 bg-white text-earth-700 rounded-full hover:bg-copper hover:text-cream transition-colors"
                  >
                    {item.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="p-2 bg-white text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Badges */}
                {item.featured && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-copper text-cream text-xs flex items-center gap-1">
                    <Star className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div className="p-3">
                <span className="font-sans text-xs uppercase tracking-widest text-copper">
                  {item.category}
                </span>
                <h3 className="font-display text-sm text-earth-900 mt-0.5 line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
