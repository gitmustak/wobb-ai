import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StatTile } from "@/components/StatTile";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { formatCount, formatRate } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";
import { getCrossPlatformLinks } from "@/utils/crossPlatformLinks";
import { getPlatformColor } from "@/utils/platformColors";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  // Called unconditionally before any early returns to satisfy rules of hooks
  const { add, remove, contains } = useListStore();

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    loadProfileByUsername(username)
      .then((data) => {
        if (!cancelled) {
          setProfileData(data);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProfileData(null);
          setLoaded(true);
        }
      });

    return () => { cancelled = true; };
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <p className="text-[var(--muted)] text-sm">Loading…</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <p className="text-[var(--danger)] text-sm">Could not load profile for @{username}.</p>
        <Link to="/" className="text-sm text-[var(--text)] underline underline-offset-2">
          ← Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const inList = contains(user.user_id);
  const crossPlatformLinks = getCrossPlatformLinks(user.username);
  const platformColor = getPlatformColor(platform);

  return (
    <Layout title={user.fullname}>
      <Link
        to={`/?platform=${platform}`}
        className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
      >
        ← Back to search
      </Link>

      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="flex gap-5 items-start flex-1 min-w-0">
          <img
            src={user.picture}
            alt={user.fullname}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&size=160&background=e2e8f0&color=64748b&bold=true`; }}
            className="w-20 h-20 rounded-2xl object-cover shrink-0"
          />

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-xl font-semibold tracking-tight">@{user.username}</h2>
              <VerifiedBadge verified={user.is_verified} />
            </div>
            <p className="text-sm text-[var(--muted)] mt-0.5 mb-0">{user.fullname}</p>
            <span style={{ backgroundColor: platformColor, borderColor: platformColor }} className="inline-block mt-1.5 text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-md border text-white">
              {platform}
            </span>

            {user.description && (
              <div className="mt-3 max-w-lg">
                <p className={`text-sm text-[var(--muted)] leading-relaxed mb-0 ${descExpanded ? "" : "line-clamp-3"}`}>
                  {user.description}
                </p>
                {user.description.length > 120 && (
                  <button
                    type="button"
                    onClick={() => setDescExpanded((v) => !v)}
                    className="mt-1 text-[12px] font-medium text-[var(--text)] hover:opacity-60 transition-opacity"
                  >
                    {descExpanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {crossPlatformLinks.length > 0 && (
          <div style={{ borderColor: platformColor }} className="glass w-full sm:w-56 sm:shrink-0 rounded-xl border p-4 flex flex-col gap-3">
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Also on</p>
            <div className="flex flex-col gap-2">
              {crossPlatformLinks.map((link) => (
                <Link
                  key={link.username}
                  to={`/profile/${link.username}?platform=${link.platform}`}
                  style={{ borderColor: platformColor }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-[var(--surface)] text-sm text-[var(--text)] hover:bg-[var(--panel)] transition-colors"
                >
                  <span className="text-xs font-medium tracking-wider uppercase text-[var(--muted)]">{link.platform}</span>
                  <span className="font-medium truncate">@{link.username}</span>
                  <span className="ml-auto text-[var(--muted)]">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <StatTile label="Followers" value={formatCount(user.followers)} borderColor={platformColor} />
        <StatTile label="Engagement Rate" value={formatRate(user.engagement_rate)} borderColor={platformColor} />
        {user.posts_count !== undefined && (
          <StatTile label="Posts" value={String(user.posts_count)} borderColor={platformColor} />
        )}
        {user.avg_likes !== undefined && (
          <StatTile label="Avg Likes" value={formatCount(user.avg_likes)} borderColor={platformColor} />
        )}
        {user.avg_comments !== undefined && (
          <StatTile label="Avg Comments" value={formatCount(user.avg_comments)} borderColor={platformColor} />
        )}
        {user.avg_views !== undefined && user.avg_views > 0 && (
          <StatTile label="Avg Views" value={formatCount(user.avg_views)} borderColor={platformColor} />
        )}
        {user.engagements !== undefined && (
          <StatTile label="Engagements" value={formatCount(user.engagements)} borderColor={platformColor} />
        )}
      </div>

      <div className="flex items-center gap-3 pt-1">
        {user.url && (
          <a
            href={user.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-[var(--text)] underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            View on platform →
          </a>
        )}

        <button
          onClick={() => inList ? remove(user.user_id) : add(user)}
          className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
            inList
              ? "border-[var(--highlight)]/40 text-[var(--highlight)] bg-[var(--highlight-bg)]"
              : "border-[var(--border)] text-[var(--muted)] bg-transparent hover:border-[var(--text)]/30 hover:text-[var(--text)]"
          }`}
        >
          {inList ? "✓ Added to List" : "+ Add to List"}
        </button>
      </div>
    </Layout>
  );
}
