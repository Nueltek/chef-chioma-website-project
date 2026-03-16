# Chef Chioma Okonkwo - Private Chef Website

A stunning, fullstack website for a Nigerian private chef featuring elevated design, compelling copywriting, and a complete CMS for managing all content.

## ✨ Features

### Frontend

- **Stunning Design**: Warm earth tones inspired by Nigerian cuisine, sophisticated typography, and elegant animations
- **Responsive**: Beautiful on all devices from mobile to desktop
- **Performance**: Optimized images, lazy loading, and smooth animations with Framer Motion
- **Accessibility**: Semantic HTML, proper contrast, and keyboard navigation

### Backend & CMS

- **Full Admin Dashboard**: Manage all website content
- **Services Management**: CRUD for chef services
- **Menu Items**: Add, edit, and categorize dishes
- **Gallery**: Image management with Cloudinary integration
- **Testimonials**: Client reviews and ratings
- **Inquiries**: Booking request management with status tracking
- **Settings**: Global site configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Image Upload**: Cloudinary
- **Rich Text**: TinyMCE
- **Icons**: Lucide React

## 📁 Project Structure

```
chef-chioma/
├── app/
│   ├── admin/           # Admin dashboard pages
│   ├── api/             # API routes
│   ├── about/           # About page
│   ├── services/        # Services page
│   ├── menus/           # Sample menus page
│   ├── gallery/         # Gallery page
│   ├── book/            # Booking form
│   └── page.tsx         # Homepage
├── components/
│   ├── layouts/         # Navbar, Footer, PublicLayout
│   ├── sections/        # Homepage sections
│   └── ui/              # Reusable UI components
├── lib/
│   ├── db/              # MongoDB connection
│   ├── auth.ts          # NextAuth config
│   ├── cloudinary.ts    # Cloudinary config
│   └── utils.ts         # Utilities and animations
├── models/              # Mongoose models
├── scripts/
│   └── seed.ts          # Database seed script
└── types/               # TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Cloudinary account
- TinyMCE API key (optional, for rich text)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` from `.env.example`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chef-chioma

# NextAuth
NEXTAUTH_SECRET=create-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary_cloud-name
CLOUDINARY_API_KEY=youcloudinaryr-api-key
CLOUDINARY_API_SECRET=cloudinary-api-secret

# TinyMCE (optional)
NEXT_PUBLIC_TINYMCE_API_KEY=tinymce-key

# Admin Credentials
ADMIN_EMAIL=chef@chiomaokonkwo.com
ADMIN_PASSWORD=helloworld098
```

4. Seed the database with sample data:

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed.ts
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Admin Access

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `chef@chiomaokonkwo.com`
- Password: `chefchioma123`

### Troubleshooting

#### Admin login error: "CLIENT_FETCH_ERROR"

If you see this error when accessing the admin page, ensure you have these environment variables set in `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

**Important:**

- `NEXTAUTH_URL` must match your actual URL (no trailing slash)
- Generate a secret: `openssl rand -base64 32`
- For production, update `NEXTAUTH_URL` to your deployed domain

#### MongoDB connection issues

The admin will still work with static credentials even if MongoDB is unavailable, but data won't persist. Ensure your `MONGODB_URI` is correct.

## 🎨 Design System

### Colors

- **Earth tones**: #1A0F0A (deep chocolate) to #FDF5E6 (cream)
- **Copper accent**: #B87333
- **Gold highlight**: #C9A227

### Typography

- **Display**: Cormorant Garamond (elegant serif)
- **Script**: Pinyon Script (accents)
- **Body**: Lora (refined serif)
- **UI**: Outfit (clean sans-serif)

### Animations

- Smooth scroll animations with Framer Motion
- Subtle hover effects on images and buttons
- Staggered content reveals

## 📝 Content Sections

### Homepage

1. **Hero**: Striking introduction with chef image collage
2. **Introduction**: Chef story and philosophy
3. **Services**: Four service offerings with hover effects
4. **Featured Menu**: Signature dishes showcase
5. **Testimonials**: Client reviews carousel
6. **CTA**: Contact and booking prompt

### Admin Dashboard

- Dashboard with stats overview
- Services management
- Menu items with categories
- Gallery with category filters
- Testimonials management
- Inquiry tracking with status updates
- Global settings

## 🔧 API Routes

| Route                    | Methods          | Description              |
| ------------------------ | ---------------- | ------------------------ |
| `/api/settings`          | GET, PUT         | Site settings            |
| `/api/services`          | GET, POST        | Services list/create     |
| `/api/services/[id]`     | GET, PUT, DELETE | Single service           |
| `/api/menu-items`        | GET, POST        | Menu items list/create   |
| `/api/menu-items/[id]`   | GET, PUT, DELETE | Single menu item         |
| `/api/gallery`           | GET, POST        | Gallery list/create      |
| `/api/gallery/[id]`      | GET, PUT, DELETE | Single gallery item      |
| `/api/testimonials`      | GET, POST        | Testimonials list/create |
| `/api/testimonials/[id]` | GET, PUT, DELETE | Single testimonial       |
| `/api/inquiries`         | GET, POST        | Inquiries list/create    |
| `/api/inquiries/[id]`    | GET, PUT, DELETE | Single inquiry           |
| `/api/upload`            | POST, DELETE     | Image upload/delete      |

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## 📄 License

MIT License - feel free to use for your own projects.

---

**Designed & Developed by Uche with ❤️ for elevated Nigerian cuisine**
