import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongoose';
import Gallery from '@/models/Gallery';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const query: Record<string, unknown> = { isActive: true };
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    let galleryQuery = Gallery.find(query).sort({ order: 1, createdAt: -1 });
    
    if (limit) {
      galleryQuery = galleryQuery.limit(parseInt(limit));
    }

    const gallery = await galleryQuery;

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
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
    const galleryItem = await Gallery.create(data);

    return NextResponse.json({ galleryItem, message: 'Gallery item created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
