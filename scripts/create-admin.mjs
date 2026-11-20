import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "fuad_portfolio";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    emailAndPassword: { enabled: true },
    plugins: [admin({ defaultRole: "user" })],
  });

  const adminEmail = process.argv[2] || "fuadmaymun0@gmail.com";
  const adminPassword = process.argv[3] || "Admin@123456";
  const adminName = process.argv[4] || "Fuad Al Maimun";

  console.log(`Checking for existing admin user: ${adminEmail}`);
  const userCol = db.collection("user");
  const existing = await userCol.findOne({ email: adminEmail });

  if (existing) {
    console.log(`User ${adminEmail} already exists. Ensuring admin role...`);
    await userCol.updateOne({ _id: existing._id }, { $set: { role: "admin" } });
    console.log(`User ${adminEmail} updated to role 'admin'.`);
  } else {
    console.log(`Creating admin user: ${adminEmail}...`);
    try {
      const res = await auth.api.signUpEmail({
        body: {
          email: adminEmail,
          password: adminPassword,
          name: adminName,
        },
      });
      console.log("Admin account created successfully:", res);
      await userCol.updateOne({ email: adminEmail }, { $set: { role: "admin" } });
      console.log(`Role 'admin' granted to ${adminEmail}.`);
    } catch (err) {
      console.error("Failed to sign up admin:", err);
    }
  }

  await client.close();
  console.log("Done.");
}

main().catch(console.error);
