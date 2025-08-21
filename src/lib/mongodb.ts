import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Global mongoose connection cache
let cached: any = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // If we already have a connection, use it
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  // If we don't have a connection promise, create one
  if (!cached.promise) {
    console.log('Creating new MongoDB connection to:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      family: 4 // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connection established successfully');
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}
