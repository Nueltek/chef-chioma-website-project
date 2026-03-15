import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISettings extends Document {
  // Chef info
  chefName: string;
  chefTitle: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  profileImage?: {
    url: string;
    publicId: string;
  };
  
  // Contact
  email: string;
  phone: string;
  whatsapp?: string;
  location: string;
  serviceAreas: string[];
  
  // Social links
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroCTA: string;
  
  // About section
  aboutTitle: string;
  aboutContent: string;
  philosophy: string;
  experience: string;
  
  // Press & Features
  pressFeatures: {
    name: string;
    logo?: string;
    link?: string;
  }[];
  
  // Business info
  businessHours?: string;
  bookingLeadTime?: string;
  minGuestCount?: number;
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    chefName: {
      type: String,
      required: true,
      default: 'Chef Chioma Okonkwo',
    },
    chefTitle: {
      type: String,
      default: 'Private Chef & Culinary Artist',
    },
    tagline: {
      type: String,
      default: 'Elevated Nigerian Cuisine',
    },
    shortBio: {
      type: String,
      default: 'Award-winning Nigerian chef bringing the rich flavors of West Africa to intimate dining experiences.',
    },
    fullBio: {
      type: String,
      default: '',
    },
    profileImage: {
      url: { type: String },
      publicId: { type: String, default: '' },
    },
    
    email: {
      type: String,
      default: 'hello@chefchioma.com',
    },
    phone: {
      type: String,
      default: '+234 801 234 5678',
    },
    whatsapp: {
      type: String,
    },
    location: {
      type: String,
      default: 'Lagos, Nigeria',
    },
    serviceAreas: [{
      type: String,
    }],
    
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    tiktok: { type: String },
    
    heroTitle: {
      type: String,
      default: 'Chef Chioma Okonkwo',
    },
    heroSubtitle: {
      type: String,
      default: 'This is more than a meal.',
    },
    heroTagline: {
      type: String,
      default: "It's a refined dining experience curated exclusively around you, designed to linger long after the last bite.",
    },
    heroCTA: {
      type: String,
      default: 'Reserve Your Experience',
    },
    
    aboutTitle: {
      type: String,
      default: 'A Culinary Journey',
    },
    aboutContent: {
      type: String,
      default: '',
    },
    philosophy: {
      type: String,
      default: 'Every dish tells a story of heritage, innovation, and passion.',
    },
    experience: {
      type: String,
      default: '15+ years',
    },
    
    pressFeatures: [{
      name: { type: String },
      logo: { type: String },
      link: { type: String },
    }],
    
    businessHours: {
      type: String,
      default: 'By appointment only',
    },
    bookingLeadTime: {
      type: String,
      default: '2 weeks advance booking recommended',
    },
    minGuestCount: {
      type: Number,
      default: 2,
    },
    
    seoTitle: {
      type: String,
      default: 'Chef Chioma Okonkwo | Private Chef & Nigerian Cuisine Expert',
    },
    seoDescription: {
      type: String,
      default: 'Experience elevated Nigerian cuisine with Chef Chioma Okonkwo. Private dining, event catering, and cooking classes in Lagos and beyond.',
    },
    seoKeywords: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
SettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
