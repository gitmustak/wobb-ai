import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
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
  );
}
