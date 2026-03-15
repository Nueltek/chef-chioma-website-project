import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongoose';
import MenuItem from '@/models/MenuItem';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    return NextResponse.json({ menuItem });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu item' }, { status: 500 });
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
    const menuItem = await MenuItem.findByIdAndUpdate(id, data, { new: true });
    if (!menuItem) return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    return NextResponse.json({ menuItem, message: 'Menu item updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
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
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
