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
      className="relative glass glass-hover flex items-center gap-3 p-3.5 w-full cursor-pointer rounded-xl border transition-colors duration-150"
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
        <div className="text-[12px] text-[var(--muted)]/70 mt-0.5 flex items-center gap-3 min-w-0 overflow-hidden">
          <div className="flex flex-col items-center leading-tight">
            <span>{formatCount(profile.followers)}</span>
            <span>followers</span>
          </div>
          {profile.engagements != null && profile.engagements > 0 && (
            <>
              <span className="opacity-30">·</span>
              <div className="flex flex-col items-center leading-tight">
                <span>{formatCount(profile.engagements)}</span>
                <span>engagements</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile: plus/check icon at top-right corner */}
      <button
        aria-label={inList ? "Remove from list" : "Add to list"}
        className={`sm:hidden absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full border text-[13px] text-black transition-colors ${
          inList
            ? "border-[var(--highlight)]/40 bg-[var(--highlight-bg)]"
            : "border-[var(--border)] bg-transparent"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          inList ? remove(profile.user_id) : add(profile);
        }}
      >
        {inList ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="currentColor"/>
            <path d="M6.5 12.5l3.5 3.5 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20.66 17A10 10 0 1 0 17 20.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Desktop: full text button */}
      <button
        className={`hidden sm:inline-flex shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
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
