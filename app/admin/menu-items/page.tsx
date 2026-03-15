'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: { url: string };
  featured: boolean;
  isSignature: boolean;
  isActive: boolean;
}

const categories = [
  'All',
  'Starters',
  'Mains',
  'Sides',
  'Desserts',
  'Beverages',
];

export default function AdminMenuItemsPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/menu-items');
      const data = await res.json();
      setItems(data.menuItems || []);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/menu-items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Item deleted');
        fetchItems();
      }
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const toggleActive = async (item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu-items/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (res.ok) {
        toast.success(item.isActive ? 'Item hidden' : 'Item visible');
        fetchItems();
      }
    } catch (error) {
      toast.error('Failed to update item');
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
          <h1 className="font-display text-3xl text-earth-900 mb-2">Menu Items</h1>
          <p className="font-body text-text-secondary">
            Manage your sample menu dishes
          </p>
        </div>
        <Link
          href="/admin/menu-items/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Item
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-earth-200 rounded-sm p-4 animate-pulse">
              <div className="w-full h-32 bg-earth-100 rounded mb-3" />
              <div className="h-4 bg-earth-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-earth-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white border border-earth-200 rounded-sm p-12 text-center">
          <p className="font-body text-text-secondary mb-4">No menu items found</p>
          <Link
            href="/admin/menu-items/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-800 text-cream font-sans text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" />
            Add Your First Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`bg-white border rounded-sm overflow-hidden ${
                item.isActive ? 'border-earth-200' : 'border-earth-200 opacity-60'
              }`}
            >
              <div className="relative h-36">
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-earth-100 flex items-center justify-center">
                    <span className="text-earth-400 text-xs">No image</span>
                  </div>
                )}
                {item.isSignature && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-copper text-cream text-xs flex items-center gap-1">
                    <Star className="w-3 h-3" /> Signature
                  </span>
                )}
                {!item.isActive && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-earth-800 text-cream text-xs">
                    Hidden
                  </span>
                )}
              </div>

              <div className="p-4">
                <span className="font-sans text-xs uppercase tracking-widest text-copper">
                  {item.category}
                </span>
                <h3 className="font-display text-lg text-earth-900 mt-1">{item.name}</h3>
                <p className="font-body text-sm text-text-secondary line-clamp-2 mt-1">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-earth-100">
                  <Link
                    href={`/admin/menu-items/${item._id}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => toggleActive(item)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    {item.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {item.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
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
