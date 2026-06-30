export interface CrossPlatformLink {
  platform: string;
  username: string;
  displayName: string;
}

// Keyed by username — lists the same person's accounts on other platforms.
// Extend this map when more cross-platform data becomes available.
const LINKS: Record<string, CrossPlatformLink[]> = {
  MrBeast6000: [{ platform: "tiktok", username: "mrbeast", displayName: "MrBeast" }],
  mrbeast:     [{ platform: "youtube", username: "MrBeast6000", displayName: "MrBeast" }],
};

export function getCrossPlatformLinks(username: string): CrossPlatformLink[] {
  return LINKS[username] ?? [];
}
