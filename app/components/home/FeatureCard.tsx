import Link from "next/link";

type FeatureCardProps = {
  title: string;
  text: string;
  href: string;
  icon: React.ReactNode;
  variant?: "default" | "live";
};

export default function FeatureCard({
  title,
  text,
  href,
  icon,
  variant = "default",
}: FeatureCardProps) {
  const isLive = variant === "live";

  return (
    <Link
      href={href}
      className={`group rounded-3xl border p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 ${
        isLive
          ? "border-red-500/30 bg-red-500/10 hover:border-red-500/60 hover:bg-red-500/15"
          : "border-white/10 bg-white/[0.06] hover:border-emerald-400/50 hover:bg-white/[0.09]"
      }`}
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
          isLive
            ? "bg-red-500/15 text-red-400"
            : "bg-emerald-400/15 text-emerald-300"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`text-lg font-black ${
          isLive ? "text-red-300" : ""
        }`}
      >
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-400">
        {text}
      </p>
    </Link>
  );
}