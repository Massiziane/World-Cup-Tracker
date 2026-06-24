import { getMatches } from "@/src/services/matches";

type TeamStanding = {
  teamId: string;
  name: string;
  shortName: string;
  tla: string;
  crest: string | null;
  group: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

function createStanding(team: any, group: string): TeamStanding {
  return {
    teamId: team.id,
    name: team.name,
    shortName: team.shortName ?? team.name,
    tla: team.tla ?? "",
    crest: team.crest ?? null,
    group,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  };
}

export async function getStandingsByGroup() {
  const matches = await getMatches();

  const standings: Record<string, Record<string, TeamStanding>> = {};

  for (const match of matches) {
    if (!match.group || match.status !== "FINISHED") continue;
    if (!match.homeTeam || !match.awayTeam) continue;
    if (match.homeScore === null || match.awayScore === null) continue;

    if (!standings[match.group]) {
      standings[match.group] = {};
    }

    const groupTable = standings[match.group];

    if (!groupTable[match.homeTeam.id]) {
      groupTable[match.homeTeam.id] = createStanding(match.homeTeam, match.group);
    }

    if (!groupTable[match.awayTeam.id]) {
      groupTable[match.awayTeam.id] = createStanding(match.awayTeam, match.group);
    }

    const home = groupTable[match.homeTeam.id];
    const away = groupTable[match.awayTeam.id];

    home.played++;
    away.played++;

    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;

    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.wins++;
      home.points += 3;
      away.losses++;
    } else if (match.homeScore < match.awayScore) {
      away.wins++;
      away.points += 3;
      home.losses++;
    } else {
      home.draws++;
      away.draws++;
      home.points++;
      away.points++;
    }

    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;
  }

  return Object.entries(standings).reduce<Record<string, TeamStanding[]>>(
    (acc, [group, teams]) => {
      acc[group] = Object.values(teams).sort((a, b) => {
        return (
          b.points - a.points ||
          b.goalDifference - a.goalDifference ||
          b.goalsFor - a.goalsFor
        );
      });

      return acc;
    },
    {}
  );
}