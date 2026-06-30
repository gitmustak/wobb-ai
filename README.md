# Wobb — Influencer Discovery Platform

A social media influencer discovery web app built as part of an internship assignment. It lets users browse, search, sort, and shortlist influencers across Instagram, YouTube, and TikTok.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| State management | Zustand (with localStorage persistence) |
| Routing | React Router v6 |
| Font | Prompt (Google Fonts) |

---

## Features

### Platform Browsing
- Switch between **Instagram**, **YouTube**, and **TikTok** using a tab bar with platform icons
- Tab bar is a **horizontal scrollable carousel** on narrow screens (iPhone SE safe)
- Each platform displays its own **brand color** as the accent throughout the UI — purple for Instagram, red for YouTube, cyan for TikTok

### Search & Sort
- **Live search** by username, full name, or handle
- **Sort** by Followers/Subscribers or Engagement Rate in ascending or descending order
- Sort label is **context-aware** — shows "Followers" for Instagram/TikTok and "Subscribers" for YouTube
- Search and sort state is **preserved on back navigation** (stored in Zustand, not component state)

### Profile Cards
- Displays avatar, username (with verified badge), full name, follower/subscriber count, and engagement count
- On **mobile**: a circular add/remove icon (open-arc `+` or filled `✓`) is pinned to the top-right corner of each card, colored to match the platform
- On **desktop**: a full "+ Add" / "✓ Added" text button appears on the right side of the card

### Profile Detail Page
- Full profile view with bio, platform badge, and a stats grid (followers, engagement rate, posts, avg likes, avg comments, avg views, engagements)
- **"Read more"** toggle for long descriptions
- **"Also on"** panel for cross-platform profiles (e.g. MrBeast on YouTube links to his TikTok and vice versa)
- **"View on platform"** external link and **"Add to List"** button

### My List
- Add/remove influencers to a personal shortlist from any card or profile page
- **Desktop/tablet**: panel fixed to the top-right of the screen
- **Mobile**: slides up as a **bottom sheet** with a collapse toggle
- Collapse arrow direction follows UX convention — points down when open, up/right when closed
- Clicking a profile in the list navigates directly to their detail page
- "Clear all" empties the list; list is **persisted in localStorage** across sessions

### UI & Accessibility
- **Light and dark mode** with a toggle in the navbar; preference is saved and respects the OS default on first visit
- **Glassmorphism** cards and panels with `backdrop-filter` blur
- **Gradient backgrounds** for both light (warm parchment) and dark (warm charcoal) modes
- Lazy image loading on all avatars
- Fallback avatar via `ui-avatars.com` if a profile image fails to load
- Favicon: custom network-graph SVG icon

---

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Page shell (navbar + main content area)
│   ├── Navbar.tsx          # Sticky top bar with logo, My List badge, theme toggle
│   ├── Footer.tsx          # Bottom bar with copyright
│   ├── PlatformFilter.tsx  # Platform tabs + search input + sort controls
│   ├── ProfileCard.tsx     # Single influencer card (search results)
│   ├── ProfileList.tsx     # Responsive grid of ProfileCards
│   ├── SelectedList.tsx    # My List panel / mobile bottom sheet
│   ├── StatTile.tsx        # Stat box used on the profile detail page
│   └── VerifiedBadge.tsx   # Blue verified checkmark badge
├── pages/
│   ├── SearchPage.tsx      # Main search/browse page
│   └── ProfileDetailPage.tsx # Full profile view
├── store/
│   ├── useListStore.ts     # My List state (persisted)
│   ├── useSearchStore.ts   # Search/sort/platform state (memory only)
│   └── useThemeStore.ts    # Light/dark theme state (persisted)
├── utils/
│   ├── dataHelpers.ts      # extractProfiles, filterProfiles, sortProfiles, detectPlatform
│   ├── formatters.ts       # formatCount, formatRate
│   ├── platformColors.ts   # Brand color map per platform
│   ├── crossPlatformLinks.ts # Cross-platform identity map (e.g. MrBeast)
│   └── profileLoader.ts    # Lazy JSON profile loader via import.meta.glob
├── types/
│   └── index.ts            # Shared TypeScript types
└── index.css               # CSS variables, theming, glassmorphism, scrollbar utilities
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Platform Brand Colors

| Platform | Color | Hex |
|---|---|---|
| Instagram | Purple | `#aa2cc0` |
| YouTube | Red | `#FE2C55` |
| TikTok | Cyan | `#25F4EE` |
| UI Highlight | Blue | `#447BBE` |
