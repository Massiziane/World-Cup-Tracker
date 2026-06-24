import MatchStat from "./MatchStat";

type MatchesStatsProps = {
  total: number;
  upcoming: number;
  finished: number;
};

export default function MatchesStats({
  total,
  upcoming,
  finished,
}: MatchesStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <MatchStat label="Total" value={total} />
      <MatchStat label="Upcoming" value={upcoming} />
      <MatchStat label="Finished" value={finished} />
    </div>
  );
}