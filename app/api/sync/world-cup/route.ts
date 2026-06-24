import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { footballFetch } from "@/src/lib/football-data";

type ApiTeam = {
  id?: number | null;
  name?: string | null;
  shortName?: string | null;
  tla?: string | null;
  crest?: string | null;
};

type ApiMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday?: number;
  stage?: string;
  group?: string | null;
  lastUpdated?: string;
  homeTeam?: ApiTeam | null;
  awayTeam?: ApiTeam | null;
  score?: {
    winner?: string | null;
    duration?: string | null;
    fullTime?: {
      home: number | null;
      away: number | null;
    };
    halfTime?: {
      home: number | null;
      away: number | null;
    };
  };
};

type MatchesResponse = {
  matches: ApiMatch[];
};

async function upsertTeam(team?: ApiTeam | null) {
  if (!team?.id) return null;

  return prisma.team.upsert({
    where: {
      apiId: team.id,
    },
    update: {
      name: team.name ?? "TBD",
      shortName: team.shortName,
      tla: team.tla,
      crest: team.crest,
    },
    create: {
      apiId: team.id,
      name: team.name ?? "TBD",
      shortName: team.shortName,
      tla: team.tla,
      crest: team.crest,
    },
  });
}

async function syncWorldCupData() {
  try {
    const data = await footballFetch<MatchesResponse>("/competitions/WC/matches");

    let syncedMatches = 0;
    let syncedTeams = 0;

    for (const match of data.matches) {
      const homeTeam = await upsertTeam(match.homeTeam);
      const awayTeam = await upsertTeam(match.awayTeam);

      if (homeTeam) syncedTeams++;
      if (awayTeam) syncedTeams++;

      await prisma.match.upsert({
        where: {
          apiId: match.id,
        },
        update: {
          utcDate: new Date(match.utcDate),
          status: match.status,
          matchday: match.matchday,
          stage: match.stage,
          group: match.group,
          winner: match.score?.winner,
          duration: match.score?.duration,
          homeScore: match.score?.fullTime?.home,
          awayScore: match.score?.fullTime?.away,
          homeHalf: match.score?.halfTime?.home,
          awayHalf: match.score?.halfTime?.away,
          lastUpdated: match.lastUpdated ? new Date(match.lastUpdated) : null,
          homeTeamId: homeTeam?.id ?? null,
          awayTeamId: awayTeam?.id ?? null,
        },
        create: {
          apiId: match.id,
          utcDate: new Date(match.utcDate),
          status: match.status,
          matchday: match.matchday,
          stage: match.stage,
          group: match.group,
          winner: match.score?.winner,
          duration: match.score?.duration,
          homeScore: match.score?.fullTime?.home,
          awayScore: match.score?.fullTime?.away,
          homeHalf: match.score?.halfTime?.home,
          awayHalf: match.score?.halfTime?.away,
          lastUpdated: match.lastUpdated ? new Date(match.lastUpdated) : null,
          homeTeamId: homeTeam?.id ?? null,
          awayTeamId: awayTeam?.id ?? null,
        },
      });

      syncedMatches++;
    }

    return NextResponse.json({
      message: "World Cup sync completed",
      syncedMatches,
      syncedTeamOperations: syncedTeams,
    });
  } catch (error) {
    console.error("SYNC ERROR:", error);

    return NextResponse.json(
      {
        error: "Sync failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-sync-secret");

  if (secret !== process.env.SYNC_SECRET) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        receivedSecret: Boolean(secret),
        hasEnvSecret: Boolean(process.env.SYNC_SECRET),
      },
      { status: 401 }
    );
  }

  return syncWorldCupData();
}
