import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useListStore } from "@/store/useListStore";
import { detectPlatform } from "@/utils/dataHelpers";
import type { UserProfileSummary } from "@/types";

interface ListRowProps {
  profile: UserProfileSummary;
  onRemove: (userId: string) => void;
}

// memo + stable onRemove reference (the store's remove fn) means rows only
// re-render when their own profile object changes, not when the list grows.
const ListRow = memo(function ListRow({ profile, onRemove }: ListRowProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${profile.username}?platform=${detectPlatform(profile.url)}`);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] transition-colors">
      <img
        src={profile.picture}
        alt={profile.fullname}
        loading="lazy"
        onClick={handleNavigate}
        className="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer"
      />
      <div className="flex-1 min-w-0 cursor-pointer" onClick={handleNavigate}>
        <div className="text-[13px] font-medium truncate">@{profile.username}</div>
        <div className="text-[11px] text-[var(--muted)] truncate">{profile.fullname}</div>
      </div>
      <button
        onClick={() => onRemove(profile.user_id)}
        className="shrink-0 text-[11px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
      >
        ✕
      </button>
    </div>
  );
});

export function SelectedList() {
  const list = useListStore((s) => s.list);
  const remove = useListStore((s) => s.remove);
  const clear = useListStore((s) => s.clear);

  if (list.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <span className="text-[13px] font-semibold text-[var(--text)]">
          My List
          <span className="ml-1.5 text-[11px] font-medium text-[var(--muted)]">({list.length})</span>
        </span>
        <button
          onClick={clear}
          className="text-[11px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {list.map((profile) => (
          <ListRow
            key={profile.user_id}
            profile={profile}
            onRemove={remove}
          />
        ))}
      </div>
    </div>
  );
}
