import Image from "next/image";

export default function LiveTeam({
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
          alt={team.name}
          width={42}
          height={42}
          className="rounded object-contain"
        />
      )}

      <div>
        <p className="text-xl font-black">
          {team?.shortName ?? team?.name ?? "TBD"}
        </p>

        <p className="text-sm font-bold text-slate-500">
          {team?.tla ?? ""}
        </p>
      </div>

      {reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name}
          width={42}
          height={42}
          className="rounded object-contain"
        />
      )}
    </div>
  );
}