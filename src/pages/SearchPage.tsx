import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles, PLATFORMS } from "@/utils/dataHelpers";

function parsePlatform(value: string | null): Platform {
  if (value && (PLATFORMS as string[]).includes(value)) return value as Platform;
  return "instagram";
}

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [platform, setPlatform] = useState<Platform>(() => parsePlatform(searchParams.get("platform")));
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  return (
    <Layout title="Find Influencers">
      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-[12px] text-[var(--muted)]">
        {filtered.length} of {allProfiles.length} creators on {platform}
      </p>

      <ProfileList profiles={filtered} platform={platform} />
    </Layout>
  );
}
