import Link from "next/link";

type MatchPanelProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};

export default function MatchPanel({
  title,
  href,
  children,
}: MatchPanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase">
          {title}
        </h2>

        <Link
          href={href}
          className="text-sm font-bold text-emerald-400"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}