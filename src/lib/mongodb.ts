import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  let MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Sanitize URI: trim whitespace, remove accidental prefix, and strip quotes
  MONGODB_URI = MONGODB_URI.trim();
  if (MONGODB_URI.startsWith('MONGODB_URI=')) {
    MONGODB_URI = MONGODB_URI.slice('MONGODB_URI='.length).trim();
  }
  while (MONGODB_URI.startsWith('"') || MONGODB_URI.startsWith("'")) {
    MONGODB_URI = MONGODB_URI.slice(1).trim();
  }
  while (MONGODB_URI.endsWith('"') || MONGODB_URI.endsWith("'")) {
    MONGODB_URI = MONGODB_URI.slice(0, -1).trim();
  }

  // If already connected, return cached connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise || mongoose.connection.readyState === 0) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
