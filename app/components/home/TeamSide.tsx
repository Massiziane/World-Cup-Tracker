import Image from "next/image";

export default function TeamSide({
  team,
  reverse = false,
}: {
  team: any;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-1 items-center gap-3 ${
        reverse ? "justify-end" : ""
      }`}
    >
      {!reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={30}
          height={30}
          className="rounded object-contain"
        />
      )}

      <span className="font-bold">
        {team?.shortName ?? team?.name ?? "TBD"}
      </span>

      {reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={30}
          height={30}
          className="rounded object-contain"
        />
      )}
    </div>
  );
}