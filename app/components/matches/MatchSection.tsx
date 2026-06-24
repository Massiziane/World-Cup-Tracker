import { Trophy } from "lucide-react";
import MatchCard from "./MatchCard";

type MatchSectionProps = {
  title: string;
  matches: any[];
  isResult?: boolean;
};

export default function MatchSection({
  title,
  matches,
  isResult = false,
}: MatchSectionProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="text-emerald-400" />

        <h2 className="text-xl font-black uppercase">
          {title}
        </h2>
      </div>

      <div className="max-h-[900px] space-y-3 overflow-y-auto pr-2">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isResult={isResult}
          />
        ))}
      </div>
    </div>
  );
}