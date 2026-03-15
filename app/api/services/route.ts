import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongoose';
import Service from '@/models/Service';
import { authOptions } from '@/lib/auth';

// GET - Fetch all services
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: Record<string, unknown> = {};
    
    if (featured === 'true') {
      query.featured = true;
    }
    if (active !== 'false') {
      query.isActive = true;
    }

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(Math.min(limit, 50)) // Cap at 50
      .lean(); // Use lean for better performance

    return NextResponse.json({ 
      services: services || [],
      count: services?.length || 0 
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return empty array instead of error to allow fallback
    return NextResponse.json({ services: [], count: 0 });
  }
}

// POST - Create new service (admin only)
export async function POST(request: NextRequest) {
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

    const service = await Service.create(data);

    return NextResponse.json({ service, message: 'Service created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
