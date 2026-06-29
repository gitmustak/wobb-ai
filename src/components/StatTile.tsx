interface StatTileProps {
  label: string;
  value: string;
}

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      <span className="text-[11px] font-medium tracking-wide uppercase text-[var(--muted)]">{label}</span>
      <span className="text-lg font-semibold tracking-tight text-[var(--text)]">{value}</span>
    </div>
  );
}
