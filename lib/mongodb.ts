import { Db, MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __ishuMongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

export async function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI. Add it to your .env.local file.");
  }

  if (clientPromise) return clientPromise;

  if (process.env.NODE_ENV === "development") {
    if (!global.__ishuMongoClientPromise) {
      const client = new MongoClient(uri);
      global.__ishuMongoClientPromise = client.connect();
    }
    clientPromise = global.__ishuMongoClientPromise;
  } else {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const dbName = process.env.MONGODB_DB || "ishu_alpha";
  const client = await getMongoClient();
  return client.db(dbName);
}

