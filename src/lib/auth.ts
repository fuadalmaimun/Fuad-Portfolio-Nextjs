import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const isProduction = process.env.NODE_ENV === "production";
const uri = process.env.MONGODB_URI || (isProduction ? undefined : "mongodb://localhost:27017/fuad_portfolio");
if (!uri) throw new Error("MONGODB_URI must be configured in production");

const dbName = process.env.DB_NAME || "fuad_portfolio";
const secret = process.env.BETTER_AUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  (isProduction ? undefined : "http://localhost:3000");

if (isProduction && !secret) throw new Error("BETTER_AUTH_SECRET must be configured in production");
if (!baseURL) throw new Error("BETTER_AUTH_URL must be configured in production");

const trustedOrigins = [
  baseURL,
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS || "").split(",").map((origin) => origin.trim()),
  ...(!isProduction ? ["http://localhost:3000", "http://localhost:5000"] : []),
].filter((origin): origin is string => Boolean(origin));

// Connection caching for Next.js dev hot-reloads
declare global {
  var _mongoClientPromise: MongoClient | undefined;
}

let client: MongoClient;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri);
  }
  client = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
}

const db = client.db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret,
  baseURL,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      defaultRole: "user",
    }),
  ],
  trustedOrigins,
});
