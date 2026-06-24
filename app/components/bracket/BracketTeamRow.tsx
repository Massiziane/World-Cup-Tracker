import Image from "next/image";

export default function BracketTeamRow({
  team,
  score,
  isWinner,
}: {
  team: any;
  score?: number | null;
  isWinner?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 ${
        isWinner ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-3">
        {team?.crest && (
          <Image
            src={team.crest}
            alt={team.name ?? "Team crest"}
            width={28}
            height={28}
            className="rounded object-contain"
          />
        )}

        <div>
          <p className="font-black">
            {team?.shortName ?? team?.name ?? "TBD"}
          </p>

          <p className="text-xs font-bold text-slate-500">
            {team?.tla ?? ""}
          </p>
        </div>
      </div>

      <span className="text-xl font-black">{score ?? "-"}</span>
    </div>
  );
}