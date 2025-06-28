    import mongoose from "mongoose";

    const MONGODB_URI = process.env.MONGODB_URI;


    interface MongooseCache {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }

    // Use globalThis to persist the cache across hot reloads in development
    declare global {
        var mongooseCache: MongooseCache | undefined;
    }

    const globalWithCache = globalThis as typeof globalThis & {
        mongooseCache: MongooseCache;
    };

    if (!globalWithCache.mongooseCache) {
        globalWithCache.mongooseCache = { conn: null, promise: null };
    }

    export async function connectToDatabase(): Promise<typeof mongoose> {
        const cache = globalWithCache.mongooseCache;
        console.log("checking url ", MONGODB_URI);
        if (!MONGODB_URI) {
            throw new Error("Please define the MONGODB_URI environment variable in .env.local");
        }

        if (cache.conn) return cache.conn;

        if (!cache.promise) {
            const opts = {
                bufferCommands: false,
            };

            cache.promise = mongoose.connect(MONGODB_URI, opts);
        }

        try {
            cache.conn = await cache.promise;
        } catch (error) {
            cache.promise = null;
            throw error;
        }

        return cache.conn;
    }
