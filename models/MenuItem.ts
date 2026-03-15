import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMenuItem extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Nigerian Classics',
        'Modern Nigerian', 
        'Fusion',
        'Seafood',
        'Vegetarian',
        'Desserts',
        'Appetizers',
        'Soups & Stews',
        'Rice Dishes',
        'Grills',
      ],
    },
    subcategory: {
      type: String,
    },
    ingredients: [{
      type: String,
      trim: true,
    }],
    dietaryInfo: [{
      type: String,
      enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Spicy'],
    }],
    image: {
      url: { type: String },
      publicId: { type: String, default: '' },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isSignature: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem: Model<IMenuItem> = mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
