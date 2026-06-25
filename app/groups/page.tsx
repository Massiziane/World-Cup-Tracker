import { getStandingsByGroup } from "@/src/services/standing";

import HomeNavbar from "../components/home/HomeNavbar";
import GroupsHero from "../components/groups/GroupsHero";
import GroupsGrid from "../components/groups/GroupsGrid";

export default async function GroupsPage() {
  const groups = await getStandingsByGroup();

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="sticky top-4 z-50 mx-auto max-w-7xl px-6">
        <HomeNavbar />
      </div>

      <GroupsHero />

      <GroupsGrid groups={groups} />
    </main>
  );
}