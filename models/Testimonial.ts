import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestimonial extends Document {
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
  date?: Date;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    image: {
      url: { type: String },
      publicId: { type: String, default: '' },
    },
    eventType: {
      type: String,
      enum: ['Private Dining', 'Event Catering', 'Cooking Class', 'Corporate Event', 'Wedding', 'Other'],
    },
    date: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
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

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
