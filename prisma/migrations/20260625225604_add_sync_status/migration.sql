-- CreateTable
CREATE TABLE "SyncStatus" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "lastSynced" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyncStatus_pkey" PRIMARY KEY ("id")
);
