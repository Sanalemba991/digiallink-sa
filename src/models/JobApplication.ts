import mongoose from 'mongoose';

export interface IJobApplication {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobTitle: string;
  jobSlug: string;
  resumeFilename?: string;
  resumePath?: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema = new mongoose.Schema<IJobApplication>({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  jobSlug: {
    type: String,
    required: true
  },
  resumeFilename: {
    type: String,
    default: null
  },
  resumePath: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
jobApplicationSchema.index({ email: 1, jobSlug: 1 });
jobApplicationSchema.index({ status: 1 });
jobApplicationSchema.index({ appliedDate: -1 });

export default mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema);
