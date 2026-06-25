"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function TeamsSearchModal({
  teams,
}: {
  teams: any[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredTeams = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) return teams;

    return teams.filter((team) =>
      [
        team.name,
        team.shortName,
        team.tla,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [teams, query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-black text-slate-200 transition hover:border-emerald-400/50 hover:bg-white/[0.08]"
      >
        <Search size={18} />
        Search Teams
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 py-20 backdrop-blur">
          <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="text-xl font-black uppercase">
                Search Teams
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl bg-white/10 p-2 hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
                <Search size={18} className="text-emerald-400" />

                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Canada, Brazil, ARG..."
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="max-h-[520px] overflow-y-auto p-5">
              <div className="space-y-3">
                {filteredTeams.map((team) => (
                  <Link
                    key={team.id}
                    href={`/teams/${team.tla}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={team.crest}
                        alt={team.name}
                        width={42}
                        height={42}
                        className="object-contain"
                      />

                      <div>
                        <p className="font-black">{team.name}</p>
                        <p className="text-xs font-bold uppercase text-slate-500">
                          {team.tla}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-black text-emerald-400">
                      View
                    </span>
                  </Link>
                ))}

                {filteredTeams.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
                    <p className="font-black">No teams found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}