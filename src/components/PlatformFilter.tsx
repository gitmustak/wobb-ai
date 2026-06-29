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
    <div className="mb-4">
      <div className="flex gap-2 justify-center mb-3">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-4 py-2 rounded border transition-colors duration-150 ${
              selected === p
                ? "bg-[var(--accent)] text-white border-[var(--accent-border)]"
                : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]"
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
        placeholder="Search by username or name..."
        className="w-full max-w-md rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--text)]"
      />
    </div>
  );
}
