import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongoose';
import Inquiry from '@/models/Inquiry';
import { authOptions } from '@/lib/auth';

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize string input
const sanitizeString = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .slice(0, 5000) // Limit length
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, ''); // Remove javascript: URLs
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeString(data.name).slice(0, 100),
      email: data.email.toLowerCase().trim().slice(0, 254),
      phone: data.phone ? sanitizeString(data.phone).slice(0, 20) : undefined,
      subject: data.subject ? sanitizeString(data.subject).slice(0, 200) : undefined,
      message: sanitizeString(data.message).slice(0, 5000),
      serviceType: data.serviceType || 'General Inquiry',
      eventDate: data.eventDate,
      guestCount: data.guestCount ? Math.min(Math.max(1, parseInt(data.guestCount) || 1), 10000) : undefined,
      location: data.location ? sanitizeString(data.location).slice(0, 200) : undefined,
      budget: data.budget ? sanitizeString(data.budget).slice(0, 100) : undefined,
      dietaryRequirements: data.dietaryRequirements ? sanitizeString(data.dietaryRequirements).slice(0, 500) : undefined,
      referralSource: data.referralSource,
    };

    const inquiry = await Inquiry.create(sanitizedData);

    return NextResponse.json({ inquiry, message: 'Inquiry submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
