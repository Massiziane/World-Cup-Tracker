import GroupTeamCell from "./GroupTeamCell";

export default function GroupTable({ teams }: { teams: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px]">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase text-slate-400">
            <th className="px-6 py-4 text-left">Team</th>
            <th className="px-3 py-4 text-center">P</th>
            <th className="px-3 py-4 text-center">W</th>
            <th className="px-3 py-4 text-center">D</th>
            <th className="px-3 py-4 text-center">L</th>
            <th className="px-3 py-4 text-center">GF</th>
            <th className="px-3 py-4 text-center">GA</th>
            <th className="px-3 py-4 text-center">GD</th>
            <th className="px-6 py-4 text-center">Pts</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => (
            <tr
              key={team.teamId}
              className="border-b border-white/5 transition hover:bg-white/[0.04]"
            >
              <td className="px-6 py-4">
                <GroupTeamCell team={team} index={index} />
              </td>

              <td className="px-3 py-4 text-center">{team.played}</td>
              <td className="px-3 py-4 text-center">{team.wins}</td>
              <td className="px-3 py-4 text-center">{team.draws}</td>
              <td className="px-3 py-4 text-center">{team.losses}</td>
              <td className="px-3 py-4 text-center">{team.goalsFor}</td>
              <td className="px-3 py-4 text-center">{team.goalsAgainst}</td>
              <td className="px-3 py-4 text-center">
                {team.goalDifference > 0
                  ? `+${team.goalDifference}`
                  : team.goalDifference}
              </td>
              <td className="px-6 py-4 text-center text-lg font-black text-emerald-400">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}