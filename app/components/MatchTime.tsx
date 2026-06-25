"use client";

export default function MatchTime({
  date,
}: {
  date: Date | string;
}) {
  return (
    <>
      {new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(date))}
    </>
  );
}