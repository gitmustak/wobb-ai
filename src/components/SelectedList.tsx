import { memo, useState } from "react";
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
        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname)}&size=64&background=e2e8f0&color=64748b&bold=true`; }}
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
  const [collapsed, setCollapsed] = useState(false);

  if (list.length === 0) return null;

  return (
    <div className="glass rounded-t-xl sm:rounded-xl border border-[var(--highlight)] overflow-hidden shadow-sm pt-1 pb-8 sm:pt-0 sm:pb-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center gap-2 text-[13px] font-semibold text-[var(--text)] hover:opacity-70 transition-opacity"
        >
          {/* On mobile chevron points up (expand) / down (collapse); on desktop points left (collapse) / right (expand) */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mobile: up chevron when expanded, down when collapsed */}
            <path
              className="sm:hidden"
              d={collapsed ? "M2 5l5 5 5-5" : "M2 9l5-5 5 5"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Desktop: left chevron when expanded, right when collapsed */}
            <path
              className="hidden sm:block"
              d={collapsed ? "M5 2l5 5-5 5" : "M9 2l-5 5 5 5"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          My List
          <span className="text-[11px] font-medium text-[var(--muted)]">({list.length})</span>
        </button>

        {!collapsed && (
          <button
            onClick={clear}
            className="text-[11px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="divide-y divide-[var(--border)]">
          {list.map((profile) => (
            <ListRow
              key={profile.user_id}
              profile={profile}
              onRemove={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
