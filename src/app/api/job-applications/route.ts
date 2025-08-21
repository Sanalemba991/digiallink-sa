import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

// Helper function to create CORS response
function createCorsResponse(data: any, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders
  });
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Starting job application submission...');
    console.log('Environment check:', {
      hasMongoUri: !!process.env.MONGODB_URI,
      mongoDb: process.env.MONGODB_DB
    });

    // Connect to database
    await connectDB();
    console.log('Database connected successfully');

    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const jobSlug = formData.get('jobSlug') as string;
    const resume = formData.get('resume') as File;

    console.log('Form data received:', {
      fullName: !!fullName,
      email: !!email,
      phone: !!phone,
      coverLetter: !!coverLetter,
      jobTitle: !!jobTitle,
      jobSlug: !!jobSlug,
      hasResume: !!(resume && resume.size > 0)
    });

    // Validate required fields
    if (!fullName || !email || !phone || !coverLetter || !jobTitle) {
      console.log('Validation failed: Missing required fields');
      return createCorsResponse(
        { error: 'All fields are required' },
        400
      );
    }

    // Check for duplicate application
    try {
      const existingApplication = await JobApplication.findOne({
        email,
        jobSlug
      });

      if (existingApplication) {
        console.log('Duplicate application found');
        return createCorsResponse(
          { error: 'You have already applied for this position' },
          400
        );
      }
    } catch (dbError) {
      console.error('Database query error:', dbError);
      // Continue without duplicate check if DB query fails
    }

    let resumeFilename = '';
    let resumePath = '';
    let resumeData = '';

    // Handle resume file if provided
    if (resume && resume.size > 0) {
      // Validate file type - Only PDF allowed
      const allowedTypes = ['application/pdf'];

      if (!allowedTypes.includes(resume.type)) {
        console.log('Invalid file type:', resume.type);
        return createCorsResponse(
          { error: 'Only PDF files are allowed. Please convert your resume to PDF format.' },
          400
        );
      }

      // Validate file size (2MB max for base64 storage)
      if (resume.size > 2 * 1024 * 1024) {
        console.log('File too large:', resume.size);
        return createCorsResponse(
          { error: 'File size must be less than 2MB' },
          400
        );
      }

      try {
        // Convert file to base64 for database storage
        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);
        resumeData = buffer.toString('base64');
        
        const timestamp = Date.now();
        const cleanJobSlug = jobSlug.replace(/[^a-zA-Z0-9]/g, '-');
        const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, '-');
        const fileExtension = resume.name.split('.').pop();
        resumeFilename = `${cleanName}-${cleanJobSlug}-${timestamp}.${fileExtension}`;
        resumePath = `data:${resume.type};base64,${resumeData}`;
        
        console.log('Resume processed successfully:', {
          filename: resumeFilename,
          size: resume.size,
          type: resume.type
        });
      } catch (fileError) {
        console.error('Error processing resume file:', fileError);
        return createCorsResponse(
          { error: 'Failed to process resume file' },
          400
        );
      }
    }

    // Create job application record
    console.log('Creating job application record...');
    const jobApplication = new JobApplication({
      fullName,
      email,
      phone,
      coverLetter,
      jobTitle,
      jobSlug,
      resumeFilename,
      resumePath,
      status: 'pending',
      appliedDate: new Date()
    });

    const savedApplication = await jobApplication.save();
    console.log('Application saved successfully:', savedApplication._id);

    return createCorsResponse(
      { 
        message: 'Application submitted successfully! We will contact you soon.',
        applicationId: savedApplication._id 
      },
      201
    );

  } catch (error) {
    console.error('Detailed error in job application:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return createCorsResponse(
      { 
        error: 'Failed to process application', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      500
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const applications = await JobApplication.find({})
      .sort({ appliedDate: -1 })
      .lean();

    // Transform data to match frontend interface
    const transformedApplications = applications.map((app: any) => ({
      id: app._id.toString(),
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
      coverLetter: app.coverLetter,
      jobTitle: app.jobTitle,
      jobSlug: app.jobSlug,
      resumeFilename: app.resumeFilename,
      resumePath: app.resumePath,
      status: app.status,
      appliedDate: app.appliedDate.toISOString(),
      createdAt: app.createdAt.toISOString()
    }));

    return createCorsResponse(transformedApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return createCorsResponse(
      { error: 'Failed to fetch applications' },
      500
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const { id, status } = await request.json();
    
    if (!id || !status) {
      return createCorsResponse(
        { error: 'Application ID and status are required' },
        400
      );
    }

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return createCorsResponse(
        { error: 'Invalid status value' },
        400
      );
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return createCorsResponse(
        { error: 'Application not found' },
        404
      );
    }

    return createCorsResponse(
      { 
        message: 'Application status updated successfully',
        application: {
          id: updatedApplication._id.toString(),
          status: updatedApplication.status
        }
      }
    );

  } catch (error) {
    console.error('Error updating application:', error);
    return createCorsResponse(
      { error: 'Failed to update application' },
      500
    );
  }
}
