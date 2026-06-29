import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--surface)] rounded-2xl text-[var(--text)] overflow-hidden flex flex-col">
      <Navbar />

      {title && (
        <div className="px-8 pt-8 pb-2">
          <h1>{title}</h1>
        </div>
      )}

      <main className="flex-1 px-8 py-6 space-y-5">{children}</main>

      <Footer />
    </div>
  );
}
