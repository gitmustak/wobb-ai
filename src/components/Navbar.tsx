import { Link, useLocation } from "react-router-dom";
import { useListStore } from "@/store/useListStore";
import { useThemeStore } from "@/store/useThemeStore";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Navbar() {
  const count = useListStore((s) => s.list.length);
  const { pathname } = useLocation();
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-7 h-7 rounded-lg bg-[var(--text)] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5.5" cy="4.5" r="2.5" stroke="var(--surface)" strokeWidth="1.4"/>
            <path d="M1 12c0-2.485 2.015-4.5 4.5-4.5S10 9.515 10 12" stroke="var(--surface)" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M10.5 6l1.5 1.5L14 5" stroke="var(--surface)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[13px] font-bold tracking-[0.18em] uppercase text-[var(--text)] group-hover:opacity-70 transition-opacity">
          Wobb
        </span>
      </Link>

      <div className="flex items-center gap-5">
        <Link
          to="/"
          className={`text-[13px] font-medium transition-colors ${
            pathname === "/"
              ? "text-[var(--text)]"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          Find Influencers
        </Link>

        <Link
          to="/"
          className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${
            count > 0 ? "text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          My List
          {count > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--text)] text-[var(--surface)] text-[10px] font-bold leading-none">
              {count}
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--panel)] transition-colors"
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </nav>
  );
}
