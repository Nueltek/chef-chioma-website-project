'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ChefHat, 
  Utensils, 
  Image as ImageIcon, 
  MessageSquare, 
  Mail,
  TrendingUp,
  Calendar,
  Users,
} from 'lucide-react';

interface Stats {
  services: number;
  menuItems: number;
  gallery: number;
  testimonials: number;
  inquiries: {
    total: number;
    new: number;
  };
}

const quickActions = [
  { href: '/admin/services', label: 'Manage Services', icon: ChefHat },
  { href: '/admin/menu-items', label: 'Manage Menu', icon: Utensils },
  { href: '/admin/gallery', label: 'Manage Gallery', icon: ImageIcon },
  { href: '/admin/testimonials', label: 'Manage Testimonials', icon: MessageSquare },
  { href: '/admin/inquiries', label: 'View Inquiries', icon: Mail },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [services, menuItems, gallery, testimonials, inquiries] = await Promise.all([
          fetch('/api/services').then(r => r.json()),
          fetch('/api/menu-items').then(r => r.json()),
          fetch('/api/gallery').then(r => r.json()),
          fetch('/api/testimonials').then(r => r.json()),
          fetch('/api/inquiries').then(r => r.json()),
        ]);

        const newInquiries = inquiries.inquiries?.filter((i: { status: string }) => i.status === 'new').length || 0;

        setStats({
          services: services.services?.length || 0,
          menuItems: menuItems.menuItems?.length || 0,
          gallery: gallery.gallery?.length || 0,
          testimonials: testimonials.testimonials?.length || 0,
          inquiries: {
            total: inquiries.inquiries?.length || 0,
            new: newInquiries,
          },
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl text-earth-900 mb-2">Dashboard</h1>
        <p className="font-body text-text-secondary">
          Welcome back, Chef Chioma. Here&apos;s an overview of your website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Services"
          value={stats?.services || 0}
          icon={ChefHat}
          loading={loading}
        />
        <StatCard
          label="Menu Items"
          value={stats?.menuItems || 0}
          icon={Utensils}
          loading={loading}
        />
        <StatCard
          label="Gallery Items"
          value={stats?.gallery || 0}
          icon={ImageIcon}
          loading={loading}
        />
        <StatCard
          label="Testimonials"
          value={stats?.testimonials || 0}
          icon={MessageSquare}
          loading={loading}
        />
      </div>

      {/* Inquiries Alert */}
      {stats?.inquiries.new && stats.inquiries.new > 0 && (
        <div className="bg-copper/10 border border-copper/30 rounded-sm p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-copper/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-copper" />
              </div>
              <div>
                <p className="font-display text-lg text-earth-900">
                  {stats.inquiries.new} New {stats.inquiries.new === 1 ? 'Inquiry' : 'Inquiries'}
                </p>
                <p className="font-body text-sm text-text-secondary">
                  You have new booking requests to review
                </p>
              </div>
            </div>
            <Link
              href="/admin/inquiries"
              className="px-4 py-2 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-display text-xl text-earth-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-4 p-4 bg-white border border-earth-200 rounded-sm hover:border-copper hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-earth-100 flex items-center justify-center group-hover:bg-copper/10 transition-colors">
                  <Icon className="w-5 h-5 text-earth-600 group-hover:text-copper transition-colors" />
                </div>
                <span className="font-sans text-sm text-earth-800">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="font-display text-xl text-earth-900 mb-4">Getting Started</h2>
        <div className="bg-white border border-earth-200 rounded-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-sm text-copper">1</span>
              </div>
              <div>
                <h3 className="font-display text-lg text-earth-900 mb-1">Add Your Services</h3>
                <p className="font-body text-sm text-text-secondary">
                  Create your service offerings with descriptions and pricing.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-sm text-copper">2</span>
              </div>
              <div>
                <h3 className="font-display text-lg text-earth-900 mb-1">Upload Gallery</h3>
                <p className="font-body text-sm text-text-secondary">
                  Showcase your beautiful dishes and events with photos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-sm text-copper">3</span>
              </div>
              <div>
                <h3 className="font-display text-lg text-earth-900 mb-1">Add Testimonials</h3>
                <p className="font-body text-sm text-text-secondary">
                  Share reviews from satisfied clients to build trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  loading,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  loading: boolean;
}) {
  return (
    <div className="bg-white border border-earth-200 rounded-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-xs uppercase tracking-widest text-text-muted">
          {label}
        </span>
        <Icon className="w-5 h-5 text-copper" />
      </div>
      {loading ? (
        <div className="h-9 bg-earth-100 rounded animate-pulse" />
      ) : (
        <p className="font-display text-3xl text-earth-900">{value}</p>
      )}
    </div>
  );
}
