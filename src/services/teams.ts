import { prisma } from "@/src/lib/prisma";

export async function getTeams() {
  return prisma.team.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getTeamByTla(tla: string) {
  return prisma.team.findFirst({
    where: {
      tla: tla.toUpperCase(),
    },
    include: {
      homeMatches: true,
      awayMatches: true,
    },
  });
}