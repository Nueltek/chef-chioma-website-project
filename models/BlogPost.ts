import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
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
  publishedAt?: Date;
  views: number;
  readTime: number;
  featured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: {
      url: { type: String, required: true },
      publicId: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    images: [{
      url: { type: String },
      publicId: { type: String },
      alt: { type: String },
      caption: { type: String },
    }],
    category: { 
      type: String, 
      required: true,
      enum: [
        'Recipes',
        'Nigerian Cuisine',
        'Cooking Tips',
        'Behind the Scenes',
        'Events',
        'Food Stories',
        'Ingredients',
        'Culture & Heritage',
      ],
    },
    tags: [{ type: String }],
    author: {
      name: { type: String, default: 'Chef Chioma Okonkwo' },
      image: { type: String },
      bio: { type: String },
    },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

// Auto-calculate read time before saving
BlogPostSchema.pre('save', function (next) {
  if (this.content) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
