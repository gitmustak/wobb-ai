import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles, sortProfiles } from "@/utils/dataHelpers";
import { useSearchStore } from "@/store/useSearchStore";

export function SearchPage() {
  const platform = useSearchStore((s) => s.platform);
  const searchQuery = useSearchStore((s) => s.searchQuery);
  const sortBy = useSearchStore((s) => s.sortBy);
  const sortDir = useSearchStore((s) => s.sortDir);
  const setPlatform = useSearchStore((s) => s.setPlatform);
  const setSearchQuery = useSearchStore((s) => s.setSearchQuery);
  const setSortBy = useSearchStore((s) => s.setSortBy);
  const setSortDir = useSearchStore((s) => s.setSortDir);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);
  const sorted = useMemo(() => sortProfiles(filtered, sortBy, sortDir), [filtered, sortBy, sortDir]);

  return (
    <Layout title="Find Influencers">
      <PlatformFilter
        selected={platform}
        onChange={setPlatform}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortDir={sortDir}
        onSortDirChange={setSortDir}
      />

      <p className="text-[12px] text-[var(--muted)]">
        {filtered.length} of {allProfiles.length} creators on {platform}
      </p>

      <ProfileList profiles={sorted} platform={platform} />
    </Layout>
  );
}
