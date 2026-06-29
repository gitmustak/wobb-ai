import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useListStore } from "@/store/useListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const count = useListStore((s) => s.list.length);

  return (
    <div className="min-h-screen bg-[var(--surface)] rounded-2xl text-[var(--text)] overflow-hidden">
      <header className="flex items-center justify-between px-8 py-4 border-b border-[var(--border)]">
        <Link
          to="/"
          className="text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        >
          Influencer Search
        </Link>

        {count > 0 && (
          <Link
            to="/"
            className="text-[11px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            My List ({count})
          </Link>
        )}
      </header>

      {title && (
        <div className="px-8 pt-8 pb-2">
          <h1>{title}</h1>
        </div>
      )}

      <main className="px-8 py-6 space-y-5">{children}</main>
    </div>
  );
}
