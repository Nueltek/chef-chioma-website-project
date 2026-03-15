import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description?: string;
  category: string;
  image: {
    url: string;
    publicId: string;
  };
  event?: string;
  date?: Date;
  featured: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Signature Dishes',
        'Private Dining',
        'Event Catering',
        'Behind the Scenes',
        'Plating & Presentation',
        'Ingredients',
        'Cooking Classes',
      ],
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, default: '' },
    },
    event: {
      type: String,
    },
    date: {
      type: Date,
    },
    featured: {
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

const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
