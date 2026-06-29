interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      title="Verified"
      className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--text)] text-[var(--surface)] text-[9px] font-bold shrink-0"
    >
      ✓
    </span>
  );
}
