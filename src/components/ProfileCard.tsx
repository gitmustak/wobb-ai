import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useListStore } from "@/store/useListStore";
import { formatCount } from "@/utils/formatters";
import { getPlatformColor } from "@/utils/platformColors";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({ profile, platform }: ProfileCardProps) {
  const navigate = useNavigate();

  // Granular selectors — each card only re-renders when its own list status changes,
  // not when any other profile is added or removed.
  const add = useListStore((s) => s.add);
  const remove = useListStore((s) => s.remove);
  const inList = useListStore((s) =>
    s.list.some((p) => p.user_id === profile.user_id)
  );

  const platformColor = getPlatformColor(platform);

  return (
    <div
      onClick={() => navigate(`/profile/${profile.username}?platform=${platform}`)}
      style={{ borderColor: platformColor }}
      className="glass glass-hover flex items-center gap-3 p-3.5 w-full cursor-pointer rounded-xl border transition-colors duration-150"
    >
      <img
        src={profile.picture}
        alt={profile.fullname}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname)}&size=88&background=e2e8f0&color=64748b&bold=true`; }}
        className="w-11 h-11 rounded-full shrink-0 object-cover"
      />

      <div className="text-left flex-1 min-w-0">
        <div className="flex items-center gap-1 leading-snug">
          <span className="font-semibold text-[14px] truncate">@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-[13px] text-[var(--muted)] truncate">{profile.fullname}</div>
        <div className="text-[12px] text-[var(--muted)]/70 mt-0.5 flex items-center gap-2">
          <span>{formatCount(profile.followers, " followers")}</span>
          {profile.engagements != null && profile.engagements > 0 && (
            <>
              <span className="opacity-40">·</span>
              <span>{formatCount(profile.engagements, " engagements")}</span>
            </>
          )}
        </div>
      </div>

      <button
        className={`shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
          inList
            ? "border-[var(--highlight)]/40 text-[var(--highlight)] bg-[var(--highlight-bg)]"
            : "border-[var(--border)] text-[var(--muted)] bg-transparent hover:border-[var(--text)]/30 hover:text-[var(--text)]"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          inList ? remove(profile.user_id) : add(profile);
        }}
      >
        {inList ? "✓ Added" : "+ Add"}
      </button>
    </div>
  );
});
