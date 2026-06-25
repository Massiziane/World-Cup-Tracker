"use client";

import { useMemo, useState } from "react";
import BracketRound from "./BracketRound";
import EmptyBracket from "./EmptyBracket";

type GroupedRound = {
  stage: string;
  matches: any[];
};

const STAGE_LABELS: Record<string, string> = {
  LAST_32: "Round of 32",
  ROUND_OF_16: "Round of 16",
  QUARTER_FINALS: "Quarter-finals",
  SEMI_FINALS: "Semi-finals",
  THIRD_PLACE: "Third place",
  FINAL: "Final",
};

export default function BracketGrid({
  groupedMatches,
}: {
  groupedMatches: GroupedRound[];
}) {
  const [selectedStage, setSelectedStage] = useState("ALL");

  const visibleRounds = useMemo(() => {
    if (selectedStage === "ALL") return groupedMatches;

    return groupedMatches.filter((round) => round.stage === selectedStage);
  }, [groupedMatches, selectedStage]);

  if (groupedMatches.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <EmptyBracket />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-wrap gap-3">
        <FilterButton
          active={selectedStage === "ALL"}
          onClick={() => setSelectedStage("ALL")}
        >
          All rounds
        </FilterButton>

        {groupedMatches.map((round) => (
          <FilterButton
            key={round.stage}
            active={selectedStage === round.stage}
            onClick={() => setSelectedStage(round.stage)}
          >
            {STAGE_LABELS[round.stage] ?? round.stage}
          </FilterButton>
        ))}
      </div>

      {selectedStage === "ALL" ? (
        <div className="overflow-x-auto pb-6">
          <div
            className="grid min-w-[1200px] gap-5"
            style={{
              gridTemplateColumns: `repeat(${visibleRounds.length}, minmax(260px, 1fr))`,
            }}
          >
            {visibleRounds.map((round) => (
              <BracketRound
                key={round.stage}
                stage={round.stage}
                matches={round.matches}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          {visibleRounds.map((round) => (
            <BracketRound
              key={round.stage}
              stage={round.stage}
              matches={round.matches}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-black uppercase transition ${
        active
          ? "border-emerald-400 bg-emerald-400 text-slate-950"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-emerald-400/50 hover:text-emerald-300"
      }`}
    >
      {children}
    </button>
  );
}