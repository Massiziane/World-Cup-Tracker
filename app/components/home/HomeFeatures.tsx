import {
  CalendarDays,
  GitBranch,
  Radio,
  Table2,
  Users,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function HomeFeatures() {
  return (
    <section className="relative z-20 mx-auto -mt-12 grid max-w-7xl gap-4 px-6 pb-8 md:grid-cols-2 xl:grid-cols-5">
      <FeatureCard
        title="Matches"
        text="Upcoming fixtures and final scores."
        href="/matches"
        icon={<CalendarDays />}
      />

      <FeatureCard
        title="Groups"
        text="Follow every group table."
        href="/groups"
        icon={<Table2 />}
      />

      <FeatureCard
        title="Bracket"
        text="Track the road to the final."
        href="/bracket"
        icon={<GitBranch />}
      />

      <FeatureCard
        title="Teams"
        text="Explore every nation."
        href="/teams"
        icon={<Users />}
      />

      <FeatureCard
        title="Live"
        text="Watch live scores and ongoing matches."
        href="/live"
        icon={<Radio className="animate-pulse" />}
        variant="live"
      />
    </section>
  );
}