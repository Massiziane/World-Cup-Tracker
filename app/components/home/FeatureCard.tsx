import Link from "next/link";

type FeatureCardProps = {
  title: string;
  text: string;
  href: string;
  icon: React.ReactNode;
};

export default function FeatureCard({
  title,
  text,
  href,
  icon,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.09]"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
        {icon}
      </div>

      <h3 className="text-lg font-black">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-slate-400">
        {text}
      </p>
    </Link>
  );
}