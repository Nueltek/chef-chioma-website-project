import { DefaultSession } from 'next-auth';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    id: string;
  }
}

// Service types
export interface Service {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription?: string;
  features: string[];
  priceRange: string;
  image: {
    url: string;
    publicId: string;
  };
  icon?: string;
  order: number;
  featured: boolean;
  isActive: boolean;
}

// Menu Item types
export interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  subcategory?: string;
  ingredients?: string[];
  dietaryInfo?: string[];
  image?: {
    url: string;
    publicId: string;
  };
  featured: boolean;
  isSignature: boolean;
  order: number;
  isActive: boolean;
}

// Gallery types
export interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  image: {
    url: string;
    publicId: string;
  };
  event?: string;
  date?: string;
  featured: boolean;
  order: number;
  isActive: boolean;
}

// Testimonial types
export interface Testimonial {
  _id: string;
  name: string;
  title?: string;
  company?: string;
  location?: string;
  content: string;
  rating: number;
  image?: {
    url: string;
    publicId: string;
  };
  eventType?: string;
  date?: string;
  featured: boolean;
  isActive: boolean;
}

// Inquiry types
export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate?: string;
  guestCount?: number;
  location?: string;
  budget?: string;
  message: string;
  dietaryRequirements?: string;
  referralSource?: string;
  status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Blog Post types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    publicId: string;
    alt?: string;
  };
  images?: {
    url: string;
    publicId: string;
    alt?: string;
    caption?: string;
  }[];
  category: string;
  tags: string[];
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  publishedAt?: string;
  views: number;
  readTime: number;
  featured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// Settings types
export interface SiteSettings {
  chefName: string;
  chefTitle: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  profileImage?: {
    url: string;
    publicId: string;
  };
  email: string;
  phone: string;
  whatsapp?: string;
  location: string;
  serviceAreas: string[];
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroCTA: string;
  aboutTitle: string;
  aboutContent: string;
  philosophy: string;
  experience: string;
  pressFeatures: {
    name: string;
    logo?: string;
    link?: string;
  }[];
  businessHours?: string;
  bookingLeadTime?: string;
  minGuestCount?: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
