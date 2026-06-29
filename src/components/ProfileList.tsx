import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export function ProfileList({ profiles, platform }: ProfileListProps) {
  return (
    <div className="px-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {profiles.length === 0 && (
        <p className="col-span-full">No profiles found</p>
      )}
      {profiles.map((profile) => (
        <ProfileCard key={profile.user_id} profile={profile} platform={platform} />
      ))}
    </div>
  );
}
