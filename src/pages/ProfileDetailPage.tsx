import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StatTile } from "@/components/StatTile";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { formatCount, formatRate } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <Layout title={user.fullname}>
      <Link
        to={`/?platform=${platform}`}
        className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
      >
        ← Back to search
      </Link>

      <div className="flex gap-5 items-start">
        <img
          src={user.picture}
          alt={user.fullname}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&size=160&background=e2e8f0&color=64748b&bold=true`; }}
          className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[var(--border)]"
        />

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="text-xl font-semibold tracking-tight">@{user.username}</h2>
            <VerifiedBadge verified={user.is_verified} />
          </div>
          <p className="text-sm text-[var(--muted)] mt-0.5 mb-0">{user.fullname}</p>
          <span className="inline-block mt-1.5 text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-md bg-[var(--panel)] border border-[var(--border)] text-[var(--muted)]">
            {platform}
          </span>

          {user.description && (
            <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed mb-0 max-w-lg">
              {user.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <StatTile label="Followers" value={formatCount(user.followers)} />
        <StatTile label="Engagement Rate" value={formatRate(user.engagement_rate)} />
        {user.posts_count !== undefined && (
          <StatTile label="Posts" value={String(user.posts_count)} />
        )}
        {user.avg_likes !== undefined && (
          <StatTile label="Avg Likes" value={formatCount(user.avg_likes)} />
        )}
        {user.avg_comments !== undefined && (
          <StatTile label="Avg Comments" value={formatCount(user.avg_comments)} />
        )}
        {user.avg_views !== undefined && user.avg_views > 0 && (
          <StatTile label="Avg Views" value={formatCount(user.avg_views)} />
        )}
        {user.engagements !== undefined && (
          <StatTile label="Engagements" value={formatCount(user.engagements)} />
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
              ? "border-[var(--text)]/30 text-[var(--text)] bg-[var(--text)]/5"
              : "border-[var(--border)] text-[var(--muted)] bg-transparent hover:border-[var(--text)]/30 hover:text-[var(--text)]"
          }`}
        >
          {inList ? "✓ Added to List" : "+ Add to List"}
        </button>
      </div>
    </Layout>
  );
}
