import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
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
      <Layout title={`@${username}`}>
        <p className="text-[var(--text)]/60">Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-[var(--danger)] mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-[var(--accent)] underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout title={user.fullname}>
      <Link to="/" className="text-sm mb-4 inline-block text-[var(--accent)]">
        ← Back to search
      </Link>

      <div className="flex gap-6 items-start text-left max-w-2xl mx-auto">
        <img
          src={user.picture}
          className="w-24 h-24 rounded-full border"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-[var(--text)]/80">{user.fullname}</p>
          <p className="text-xs mt-1 text-[var(--text)]/60">Platform: {platform}</p>

          {user.description && (
            <p className="mt-3 text-sm text-[var(--text)]/80">{user.description}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border p-2 rounded">
              <div className="text-[var(--text)]/60">Followers</div>
              <div className="font-semibold">
                {formatFollowersDetail(user.followers)}
              </div>
            </div>
            <div className="border p-2 rounded">
              <div className="text-[var(--text)]/60">Engagement Rate</div>
              <div className="font-semibold">
                {user.engagement_rate !== undefined
                  ? (user.engagement_rate * 10000).toFixed(2) + "%"
                  : "N/A"}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-[var(--text)]/60">Posts</div>
                <div className="font-semibold">{user.posts_count}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-[var(--text)]/60">Avg Likes</div>
                <div className="font-semibold">
                  {formatFollowersDetail(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-[var(--text)]/60">Avg Comments</div>
                <div className="font-semibold">{user.avg_comments}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border p-2 rounded">
                <div className="text-[var(--text)]/60">Avg Views</div>
                <div className="font-semibold">
                  {formatFollowersDetail(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-[var(--text)]/60">Engagements</div>
                <div className="font-semibold">
                  {formatEngagementRate(user.engagement_rate)}
                </div>
              </div>
            )}
          </div>

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              className="inline-block mt-4 text-[var(--accent)] text-sm"
            >
              View on platform →
            </a>
          )}

          {/* TODO: candidates must implement Add to List feature */}
          {/* TODO: candidates must implement Add to List feature */}
          <button
            disabled
            className="block mt-4 px-4 py-2 rounded border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] cursor-not-allowed"
          >
            Add to List
          </button>
        </div>
      </div>
    </Layout>
  );
}
