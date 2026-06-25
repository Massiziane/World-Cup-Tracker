"use client";

import { useEffect, useState } from "react";

export default function SyncStatusBadge({
  lastSynced,
}: {
  lastSynced?: Date | string | null;
}) {
  const [label, setLabel] = useState("Checking sync...");

  useEffect(() => {
    if (!lastSynced) {
      setLabel("Sync pending");
      return;
    }

    const update = () => {
      const diff = Date.now() - new Date(lastSynced).getTime();
      const minutes = Math.max(0, Math.floor(diff / 60000));

      if (minutes < 1) setLabel("Last updated just now");
      else if (minutes === 1) setLabel("Last updated 1 minute ago");
      else setLabel(`Last updated ${minutes} minutes ago`);
    };

    update();

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [lastSynced]);

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-full border border-emerald-400/30 bg-slate-950/90 px-4 py-2 text-xs font-bold text-emerald-300 shadow-2xl backdrop-blur">
      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
      {label}
    </div>
  );
}