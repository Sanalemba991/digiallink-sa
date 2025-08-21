import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';

// Helper function to add CORS headers
function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

// Handle preflight requests
export async function OPTIONS() {
  return addCorsHeaders(new NextResponse(null, { status: 200 }));
}

// POST - Create new contact message
export async function POST(request: NextRequest) {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const { name, email, phone, subject, message } = await request.json();

    console.log('New contact message received:', {
      name,
      email,
      subject,
      date: new Date().toISOString()
    });

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      const errorResponse = NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorResponse = NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
    }

    // Check for duplicate message (same email and subject within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingMessage = await Contact.findOne({
      email,
      subject,
      submittedDate: { $gte: oneHourAgo }
    });

    if (existingMessage) {
      const errorResponse = NextResponse.json(
        { error: 'You have already sent a similar message recently. Please wait before sending another.' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
    }

    // Create contact message record
    const contactMessage = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
      submittedDate: new Date()
    });

    await contactMessage.save();

    console.log('Contact message saved successfully:', contactMessage._id);

    const successResponse = NextResponse.json(
      { 
        message: 'Message sent successfully! We will get back to you within 24 hours.',
        contactId: contactMessage._id 
      },
      { status: 201 }
    );
    return addCorsHeaders(successResponse);

  } catch (error) {
    console.error('Error creating contact message:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
}

// GET - Fetch all contact messages (for admin)
export async function GET() {
  try {
    await connectDB();
    
    const messages = await Contact.find({})
      .sort({ submittedDate: -1 })
      .lean();

    // Transform data to match frontend interface
    const transformedMessages = messages.map((msg: any) => ({
      id: msg._id.toString(),
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      subject: msg.subject,
      message: msg.message,
      status: msg.status,
      submittedDate: msg.submittedDate.toISOString(),
      createdAt: msg.createdAt.toISOString()
    }));

    const successResponse = NextResponse.json(transformedMessages);
    return addCorsHeaders(successResponse);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
}

// PATCH - Update message status
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const { id, status } = await request.json();
    
    if (!id || !status) {
      const errorResponse = NextResponse.json(
        { error: 'Message ID and status are required' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
    }

    if (!['new', 'read', 'replied', 'resolved'].includes(status)) {
      const errorResponse = NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
      return addCorsHeaders(errorResponse);
    }

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      const errorResponse = NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
      return addCorsHeaders(errorResponse);
    }

    const successResponse = NextResponse.json({
      message: 'Message status updated successfully',
      contact: {
        id: updatedMessage._id.toString(),
        status: updatedMessage.status
      }
    });
    return addCorsHeaders(successResponse);

  } catch (error) {
    console.error('Error updating message status:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update message status' },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
}
