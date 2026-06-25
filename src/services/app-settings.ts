import { prisma } from "@/src/lib/prisma";

export async function getAppSettings() {
  return prisma.appSettings.findUnique({
    where: { id: 1 },
  });
}