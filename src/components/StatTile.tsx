interface StatTileProps {
  label: string;
  value: string;
  borderColor?: string;
}

export function StatTile({ label, value, borderColor }: StatTileProps) {
  return (
    <div style={{ borderColor }} className="glass flex flex-col gap-0.5 px-4 py-3 rounded-xl border">
      <span className="text-[11px] font-medium tracking-wide uppercase text-[var(--muted)]">{label}</span>
      <span className="text-lg font-semibold tracking-tight text-[var(--text)]">{value}</span>
    </div>
  );
}
