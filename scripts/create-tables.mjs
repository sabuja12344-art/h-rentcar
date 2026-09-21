import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS "hr_cars" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "nameEn" TEXT,
  "category" TEXT NOT NULL,
  "brand" TEXT,
  "thumbnail" TEXT NOT NULL DEFAULT '',
  "images" TEXT NOT NULL DEFAULT '[]',
  "monthlyPrice" INTEGER NOT NULL,
  "deposit" TEXT,
  "contractTerms" TEXT,
  "mileage" TEXT,
  "year" TEXT,
  "fuel" TEXT,
  "seats" INTEGER,
  "options" TEXT,
  "description" TEXT,
  "label" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "hr_inquiries" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "carInterest" TEXT,
  "type" TEXT,
  "message" TEXT,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "agreedPrivacy" BOOLEAN NOT NULL,
  "pickupDate" TEXT,
  "returnDate" TEXT,
  "pickupTime" TEXT,
  "returnTime" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "hr_banners" (
  "id" TEXT NOT NULL,
  "chipLabel" TEXT NOT NULL,
  "chipPrice" TEXT NOT NULL,
  "caption" TEXT,
  "carType" TEXT NOT NULL DEFAULT 'sedan',
  "glow" TEXT NOT NULL DEFAULT 'rgba(61,139,255,.28)',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "hr_reviews" (
  "id" TEXT NOT NULL,
  "stars" INTEGER NOT NULL DEFAULT 5,
  "text" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "detail" TEXT,
  "initial" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);
`;

const client = new Client({
  connectionString: "postgresql://postgres.qvzbkxfexxjjghmhlsnw:elehyRZyB4Ex0YED@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  console.log("✓ Connected to Supabase");
  await client.query(sql);
  console.log("✓ Tables created successfully");
  await client.end();
} catch (err) {
  console.error("✗ Error:", err.message);
  process.exit(1);
}
