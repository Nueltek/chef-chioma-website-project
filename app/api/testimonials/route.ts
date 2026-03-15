import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongoose';
import Testimonial from '@/models/Testimonial';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const query: Record<string, unknown> = { isActive: true };
    
    if (featured === 'true') query.featured = true;

    let testimonialQuery = Testimonial.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      testimonialQuery = testimonialQuery.limit(parseInt(limit));
    }

    const testimonials = await testimonialQuery;

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const testimonial = await Testimonial.create(data);

    return NextResponse.json({ testimonial, message: 'Testimonial created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
