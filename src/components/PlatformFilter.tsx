import { useEffect, useRef, useState } from "react";
import type { Platform, SortDir, SortKey } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "followers", label: "Followers" },
  // { value: "avg_likes", label: "Avg. Likes" },       // TODO: re-enable when avg_likes data is available
  // { value: "avg_comments", label: "Avg. Comments" }, // TODO: re-enable when avg_comments data is available
  { value: "engagement_rate", label: "Engagement Rate" },
];

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortKey;
  onSortByChange: (key: SortKey) => void;
  sortDir: SortDir;
  onSortDirChange: (dir: SortDir) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortDir,
  onSortDirChange,
}: PlatformFilterProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="inline-flex rounded-lg bg-[var(--panel)] p-1 gap-0.5 shrink-0">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                selected === p
                  ? "bg-[var(--surface)] text-[var(--text)] shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {getPlatformLabel(p)}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name…"
          className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--text)]/25 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--muted)] shrink-0">Sort by</span>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
          >
            {selectedLabel}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform ${open ? "rotate-180" : ""}`}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-1 z-50 min-w-[160px] rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-lg overflow-hidden">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onSortByChange(opt.value); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    sortBy === opt.value
                      ? "bg-[var(--panel)] text-[var(--text)] font-medium"
                      : "text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--text)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSortDirChange(sortDir === "desc" ? "asc" : "desc")}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
          title={sortDir === "desc" ? "Descending — click for ascending" : "Ascending — click for descending"}
        >
          {sortDir === "desc" ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10V2M6 10L3 7M6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Desc
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Asc
            </>
          )}
        </button>
      </div>
    </div>
  );
}
