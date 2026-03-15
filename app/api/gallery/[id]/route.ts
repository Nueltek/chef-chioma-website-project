import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongoose';
import Gallery from '@/models/Gallery';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    return NextResponse.json({ galleryItem });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    await connectDB();
    const data = await request.json();
    const galleryItem = await Gallery.findByIdAndUpdate(id, data, { new: true });
    if (!galleryItem) return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    return NextResponse.json({ galleryItem, message: 'Gallery item updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    await connectDB();
    const galleryItem = await Gallery.findByIdAndDelete(id);
    if (!galleryItem) return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
