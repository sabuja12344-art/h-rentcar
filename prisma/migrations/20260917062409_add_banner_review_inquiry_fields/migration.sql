-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN "pickupDate" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "pickupTime" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "returnDate" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "returnTime" TEXT;

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chipLabel" TEXT NOT NULL,
    "chipPrice" TEXT NOT NULL,
    "caption" TEXT,
    "carType" TEXT NOT NULL DEFAULT 'sedan',
    "glow" TEXT NOT NULL DEFAULT 'rgba(61,139,255,.28)',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "text" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT,
    "initial" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
