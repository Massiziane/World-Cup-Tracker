import { getMatches } from "./matches";

export async function getGroupedMatches() {
  const matches = await getMatches();

  return matches.reduce<Record<string, typeof matches>>((acc, match) => {
    const group = match.group ?? "KNOCKOUT";

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group].push(match);

    return acc;
  }, {});
}