// src/services/live.ts
import { prisma } from "@/src/lib/prisma";

export async function getLiveMatches() {
  return prisma.match.findMany({
    where: {
      status: {
        in: ["IN_PLAY", "PAUSED", "LIVE"],
      },
    },
    orderBy: {
      utcDate: "asc",
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });
}