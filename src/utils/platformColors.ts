export function getPlatformColor(platform: string): string {
  switch (platform.toLowerCase()) {
    case "instagram": return "#aa2cc0";
    case "youtube":   return "#FE2C55";
    case "tiktok":    return "#25F4EE";
    default:          return "var(--highlight)";
  }
}
