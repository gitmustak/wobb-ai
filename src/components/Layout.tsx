import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--panel)] rounded-[28px] p-6 sm:p-8 text-[var(--text)]">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-[var(--text)]">
          Influencer Search
        </Link>
        {title && (
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
            {title}
          </h1>
        )}
      </header>
      <main className="space-y-6">{children}</main>
    </div>
  );
}
