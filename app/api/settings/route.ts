import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongoose';
import Settings from '@/models/Settings';
import { authOptions } from '@/lib/auth';

// GET - Fetch settings (public)
export async function GET() {
  try {
    await connectDB();
    
    let settings = await Settings.findOne();
    
    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        chefName: 'Chef Chioma Okonkwo',
        chefTitle: 'Private Chef & Culinary Artist',
        tagline: 'Elevated Nigerian Cuisine',
        shortBio: 'Award-winning Nigerian chef bringing the rich flavors of West Africa to intimate dining experiences.',
        fullBio: `With over 15 years of culinary expertise spanning Lagos, London, and Dubai, Chef Chioma Okonkwo has dedicated her career to elevating Nigerian cuisine on the global stage.

Her journey began in her grandmother's kitchen in Enugu, where she first discovered the magic of combining local ingredients with time-honored techniques. After training at Le Cordon Bleu and working in Michelin-starred kitchens across Europe, she returned home with a mission: to showcase the sophistication and depth of Nigerian flavors.

Today, Chef Chioma creates bespoke dining experiences that blend traditional Nigerian recipes with modern culinary innovation. Each dish tells a story—of heritage, of place, of passion.`,
        email: 'hello@chefchioma.com',
        phone: '+234 801 234 5678',
        whatsapp: '+234 801 234 5678',
        location: 'Lagos, Nigeria',
        serviceAreas: ['Lagos', 'Abuja', 'Port Harcourt', 'International'],
        instagram: 'https://instagram.com/chefchioma',
        heroTitle: 'Chef Chioma Okonkwo',
        heroSubtitle: 'This is more than a meal.',
        heroTagline: "It's a refined dining experience curated exclusively around you, designed to linger long after the last bite.",
        heroCTA: 'Reserve Your Private Experience',
        aboutTitle: 'A Culinary Journey',
        philosophy: 'Every dish tells a story of heritage, innovation, and passion. I believe food is the most intimate gift you can offer—a direct connection to culture, memory, and love.',
        experience: '15+ years',
        pressFeatures: [
          { name: 'Forbes Africa', logo: '', link: '' },
          { name: 'CNN African Voices', logo: '', link: '' },
          { name: 'Guardian Life', logo: '', link: '' },
        ],
        businessHours: 'By appointment only',
        bookingLeadTime: '2 weeks advance booking recommended',
        minGuestCount: 2,
        seoTitle: 'Chef Chioma Okonkwo | Private Chef & Nigerian Cuisine Expert',
        seoDescription: 'Experience elevated Nigerian cuisine with Chef Chioma Okonkwo. Private dining, event catering, and cooking classes in Lagos and beyond.',
        seoKeywords: ['Nigerian chef', 'private chef Lagos', 'Nigerian cuisine', 'catering Lagos', 'private dining'],
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    let settings = await Settings.findOne();
    
    if (settings) {
      settings = await Settings.findOneAndUpdate({}, data, { new: true });
    } else {
      settings = await Settings.create(data);
    }

    return NextResponse.json({ settings, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
