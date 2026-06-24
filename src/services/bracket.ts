import { prisma } from "@/src/lib/prisma";

export async function getBracketMatches() {
  return prisma.match.findMany({
    where: {
      stage: {
        not: "GROUP_STAGE",
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