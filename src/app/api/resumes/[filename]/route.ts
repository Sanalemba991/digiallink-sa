import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';

// Resume download API route
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    await connectDB();
    
    const { filename } = await params;
    
    // Find the application by resume filename
    const application = await JobApplication.findOne({ 
      resumeFilename: filename 
    });
    
    if (!application || !application.resumePath) {
      return new NextResponse('Resume not found', { status: 404 });
    }
    
    // Extract base64 data and content type from data URL
    if (application.resumePath.startsWith('data:')) {
      const [mimeType, base64Data] = application.resumePath.split(';base64,');
      const contentType = mimeType.replace('data:', '');
      
      // Convert base64 to buffer
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Return the file with appropriate headers
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': buffer.length.toString(),
        },
      });
    }
    
    return new NextResponse('Invalid resume format', { status: 400 });
    
  } catch (error) {
    console.error('Error serving resume:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
