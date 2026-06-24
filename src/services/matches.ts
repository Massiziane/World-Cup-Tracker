import { prisma } from "@/src/lib/prisma";

export async function getMatches() {
  return prisma.match.findMany({
    orderBy: {
      utcDate: "asc",
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });
}

export async function getUpcomingMatches(limit = 6) {
  return prisma.match.findMany({
    where: {
      status: {
        in: ["TIMED", "SCHEDULED"],
      },
    },
    orderBy: {
      utcDate: "asc",
    },
    take: limit,
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });
}

export async function getFinishedMatches(limit = 6) {
  return prisma.match.findMany({
    where: {
      status: "FINISHED",
    },
    orderBy: {
      utcDate: "desc",
    },
    take: limit,
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });
}