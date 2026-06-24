import Image from "next/image";

export default function GroupTeamCell({
  team,
  index,
}: {
  team: any;
  index: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-sm font-black text-slate-500">
        {index + 1}
      </span>

      {team.crest && (
        <Image
          src={team.crest}
          alt={team.name}
          width={28}
          height={28}
          className="rounded object-contain"
        />
      )}

      <div>
        <p className="font-black">{team.shortName}</p>
        <p className="text-xs font-bold text-slate-500">{team.tla}</p>
      </div>
    </div>
  );
}