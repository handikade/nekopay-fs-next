import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
if (!MONGODB_DB) throw new Error("Missing MONGODB_DB");

// Global cache to avoid creating many connections in dev (hot reload)
declare global {
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) return mongoose; // already connected

  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI as string, {
      dbName: MONGODB_DB,
      bufferCommands: false,
    });
  }

  return global._mongooseConn;
}

export function getReadyState() {
  return mongoose.connection.readyState === 1;
}
