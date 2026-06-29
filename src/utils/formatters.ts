export function formatCount(count: number, suffix = ""): string {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M" + suffix;
  if (count >= 1_000) return (count / 1_000).toFixed(0) + "K" + suffix;
  return count.toString() + suffix;
}

export function formatRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}
