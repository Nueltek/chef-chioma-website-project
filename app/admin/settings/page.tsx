'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Settings {
  chefName: string;
  chefTitle: string;
  tagline: string;
  shortBio: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  serviceAreas: string[];
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  businessHours: string;
  bookingLeadTime: string;
}

const defaultSettings: Settings = {
  chefName: 'Chef Chioma Okonkwo',
  chefTitle: 'Private Chef & Culinary Artist',
  tagline: 'Elevated Nigerian Cuisine',
  shortBio: 'Award-winning Nigerian chef bringing the rich flavors of West Africa to intimate dining experiences.',
  email: 'hello@chefchioma.com',
  phone: '+234 801 234 5678',
  whatsapp: '+234 801 234 5678',
  location: 'Lagos, Nigeria',
  serviceAreas: ['Lagos', 'Abuja', 'Port Harcourt'],
  instagram: 'https://instagram.com/chefchioma',
  facebook: '',
  twitter: '',
  youtube: '',
  tiktok: '',
  seoTitle: 'Chef Chioma Okonkwo | Private Chef & Nigerian Cuisine Expert',
  seoDescription: 'Experience elevated Nigerian cuisine with Chef Chioma Okonkwo.',
  seoKeywords: ['Nigerian chef', 'private chef Lagos'],
  businessHours: 'By appointment only',
  bookingLeadTime: '2 weeks advance booking recommended',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serviceAreasText, setServiceAreasText] = useState('');
  const [keywordsText, setKeywordsText] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      if (data.settings) {
        const s = data.settings;
        setSettings({
          chefName: s.chefName || defaultSettings.chefName,
          chefTitle: s.chefTitle || defaultSettings.chefTitle,
          tagline: s.tagline || defaultSettings.tagline,
          shortBio: s.shortBio || defaultSettings.shortBio,
          email: s.email || defaultSettings.email,
          phone: s.phone || defaultSettings.phone,
          whatsapp: s.whatsapp || defaultSettings.whatsapp,
          location: s.location || defaultSettings.location,
          serviceAreas: s.serviceAreas || defaultSettings.serviceAreas,
          instagram: s.instagram || '',
          facebook: s.facebook || '',
          twitter: s.twitter || '',
          youtube: s.youtube || '',
          tiktok: s.tiktok || '',
          seoTitle: s.seoTitle || defaultSettings.seoTitle,
          seoDescription: s.seoDescription || defaultSettings.seoDescription,
          seoKeywords: s.seoKeywords || defaultSettings.seoKeywords,
          businessHours: s.businessHours || defaultSettings.businessHours,
          bookingLeadTime: s.bookingLeadTime || defaultSettings.bookingLeadTime,
        });
        setServiceAreasText((s.serviceAreas || []).join(', '));
        setKeywordsText((s.seoKeywords || []).join(', '));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Convert comma-separated strings to arrays
    const dataToSave = {
      ...settings,
      serviceAreas: serviceAreasText.split(',').map(s => s.trim()).filter(Boolean),
      seoKeywords: keywordsText.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (res.ok) {
        toast.success('Settings saved successfully!');
        // Refresh to confirm save
        await fetchSettings();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-copper" />
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-earth-900 mb-2">Site Settings</h1>
          <p className="font-body text-text-secondary">
            Configure your website information. Changes will reflect across the entire site.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Chef Information */}
        <div className="bg-white border border-earth-200 rounded-sm p-6">
          <h2 className="font-display text-xl text-earth-900 mb-6">Chef Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Chef Name
              </label>
              <input
                type="text"
                value={settings.chefName}
                onChange={(e) => handleChange('chefName', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Title
              </label>
              <input
                type="text"
                value={settings.chefTitle}
                onChange={(e) => handleChange('chefTitle', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Business Hours
              </label>
              <input
                type="text"
                value={settings.businessHours}
                onChange={(e) => handleChange('businessHours', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Short Bio
              </label>
              <textarea
                value={settings.shortBio}
                onChange={(e) => handleChange('shortBio', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-earth-200 rounded-sm p-6">
          <h2 className="font-display text-xl text-earth-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="hello@chefchioma.com"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="+234 801 234 5678"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={settings.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="+234 801 234 5678"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Location
              </label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Lagos, Nigeria"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Service Areas (comma-separated)
              </label>
              <input
                type="text"
                value={serviceAreasText}
                onChange={(e) => setServiceAreasText(e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Lagos, Abuja, Port Harcourt, International"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white border border-earth-200 rounded-sm p-6">
          <h2 className="font-display text-xl text-earth-900 mb-6">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="https://instagram.com/chefchioma"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="https://facebook.com/chefchioma"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                Twitter/X URL
              </label>
              <input
                type="url"
                value={settings.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="https://twitter.com/chefchioma"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) => handleChange('youtube', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="https://youtube.com/@chefchioma"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                TikTok URL
              </label>
              <input
                type="url"
                value={settings.tiktok}
                onChange={(e) => handleChange('tiktok', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="https://tiktok.com/@chefchioma"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white border border-earth-200 rounded-sm p-6">
          <h2 className="font-display text-xl text-earth-900 mb-6">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={settings.seoTitle}
                onChange={(e) => handleChange('seoTitle', e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="Chef Chioma Okonkwo | Private Chef Lagos"
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                SEO Description
              </label>
              <textarea
                value={settings.seoDescription}
                onChange={(e) => handleChange('seoDescription', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper resize-none"
                placeholder="Award-winning Nigerian private chef..."
              />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-text-muted mb-2">
                SEO Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywordsText}
                onChange={(e) => setKeywordsText(e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-sm focus:outline-none focus:border-copper"
                placeholder="private chef lagos, nigerian cuisine, catering"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={fetchSettings}
            className="px-6 py-3 border border-earth-300 text-earth-700 font-sans text-sm uppercase tracking-widest hover:bg-earth-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-copper text-cream font-sans text-sm uppercase tracking-widest hover:bg-copper-dark transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
