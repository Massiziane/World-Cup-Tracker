import Image from "next/image";

export default function MatchTeam({
  team,
  reverse = false,
}: {
  team: any;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        reverse ? "justify-end text-right" : ""
      }`}
    >
      {!reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={32}
          height={32}
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

      {reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={32}
          height={32}
          className="rounded object-contain"
        />
      )}
    </div>
  );
}