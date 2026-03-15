'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import slugify from 'slugify';

interface MenuItemForm {
  name: string;
  slug: string;
  description: string;
  category: string;
  subcategory?: string;
  ingredients: string[];
  dietaryInfo: string[];
  image: { url: string; publicId: string };
  featured: boolean;
  isSignature: boolean;
  order: number;
  isActive: boolean;
}

const categories = ['Starters', 'Mains', 'Sides', 'Desserts', 'Beverages'];
const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Spicy'];

const initialForm: MenuItemForm = {
  name: '',
  slug: '',
  description: '',
  category: 'Mains',
  ingredients: [],
  dietaryInfo: [],
  image: { url: '', publicId: '' },
  featured: false,
  isSignature: false,
  order: 0,
  isActive: true,
};

export default function MenuItemEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [form, setForm] = useState<MenuItemForm>(initialForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchItem();
    }
  }, [isNew, resolvedParams.id]);

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/menu-items/${resolvedParams.id}`);
      const data = await res.json();
      if (data.menuItem) {
        setForm({
          ...data.menuItem,
          ingredients: data.menuItem.ingredients || [],
          dietaryInfo: data.menuItem.dietaryInfo || [],
        });
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

    if (name === 'name' && isNew) {
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
    formData.append('folder', 'chef-chioma/menu');

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

  const addIngredient = () => {
    if (newIngredient.trim() && !form.ingredients.includes(newIngredient.trim())) {
      setForm(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ingredient),
    }));
  };

  const toggleDietary = (option: string) => {
    setForm(prev => ({
      ...prev,
      dietaryInfo: prev.dietaryInfo.includes(option)
        ? prev.dietaryInfo.filter(d => d !== option)
        : [...prev.dietaryInfo, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/menu-items' : `/api/menu-items/${resolvedParams.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isNew ? 'Item created' : 'Item updated');
        router.push('/admin/menu-items');
      } else {
        toast.error('Failed to save item');
      }
    } catch (error) {
      toast.error('Failed to save item');
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
          href="/admin/menu-items"
          className="p-2 hover:bg-earth-100 rounded-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-3xl text-earth-900">
          {isNew ? 'New Menu Item' : 'Edit Item'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-earth-200 rounded-sm p-6 space-y-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Suya-Crusted Lamb Rack"
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
                placeholder="A brief, appetizing description of the dish..."
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

            {/* Ingredients */}
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Ingredients
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                  className="flex-1 px-3 py-2 border border-earth-200 rounded-sm focus:outline-none focus:border-copper text-sm"
                  placeholder="Add ingredient..."
                />
                <button
                  type="button"
                  onClick={addIngredient}
                  className="p-2 bg-earth-100 text-earth-700 rounded-sm hover:bg-earth-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.ingredients.map(ing => (
                  <span key={ing} className="inline-flex items-center gap-1 px-2 py-1 bg-earth-100 text-earth-700 text-sm rounded">
                    {ing}
                    <button type="button" onClick={() => removeIngredient(ing)} className="text-earth-500 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Dietary Info */}
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Dietary Information
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleDietary(option)}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      form.dietaryInfo.includes(option)
                        ? 'bg-copper text-cream'
                        : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Actions */}
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
                <label className="font-sans text-sm text-earth-700">Active (visible on menu)</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
                />
                <label className="font-sans text-sm text-earth-700">Featured item</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isSignature"
                  checked={form.isSignature}
                  onChange={handleChange}
                  className="w-5 h-5 border-earth-300 rounded text-copper focus:ring-copper"
                />
                <label className="font-sans text-sm text-earth-700">Signature dish</label>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-earth-200">
              <button
                type="submit"
                disabled={saving}
                className="w-full px-4 py-3 bg-copper text-cream font-sans text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : isNew ? 'Create Item' : 'Update Item'}
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white border border-earth-200 rounded-sm p-6">
            <h3 className="font-display text-lg text-earth-900 mb-4">Image</h3>
            {form.image?.url ? (
              <div className="relative aspect-square rounded-sm overflow-hidden mb-4">
                <Image src={form.image.url} alt="Item" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, image: { url: '', publicId: '' } }))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-earth-200 rounded-sm cursor-pointer hover:border-copper transition-colors">
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
        </div>
      </form>
    </div>
  );
}
