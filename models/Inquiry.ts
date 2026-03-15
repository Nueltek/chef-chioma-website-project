import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  eventDate?: Date;
  guestCount?: number;
  location?: string;
  budget?: string;
  message: string;
  subject?: string;
  dietaryRequirements?: string;
  referralSource?: string;
  status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: [
        'General Inquiry',
        'Private Dining',
        'Event Catering',
        'Cooking Classes',
        'Menu Development',
        'Corporate Events',
        'Wedding',
        'Other',
      ],
    },
    eventDate: {
      type: Date,
    },
    guestCount: {
      type: Number,
      min: 1,
    },
    location: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    dietaryRequirements: {
      type: String,
    },
    referralSource: {
      type: String,
      enum: ['Google', 'Instagram', 'Friend/Family', 'Event', 'Press', 'Other'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
