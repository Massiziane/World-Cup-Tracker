import { Trophy } from "lucide-react";
import GroupTable from "./GroupTable";

function cleanGroupName(group: string) {
  return group.replace("GROUP_", "Group ");
}

export default function GroupCard({
  group,
  teams,
}: {
  group: string;
  teams: any[];
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-6 py-5">
        <Trophy className="text-emerald-400" />

        <h2 className="text-xl font-black uppercase">
          {cleanGroupName(group)}
        </h2>
      </div>

      <GroupTable teams={teams} />
    </div>
  );
}