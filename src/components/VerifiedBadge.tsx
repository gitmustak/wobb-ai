interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return <span className="text-[var(--accent)] text-xs ml-1">✓</span>;
}
