export function Footer() {
  return (
    <footer className="mt-auto px-8 py-6 border-t border-[var(--border)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-[var(--muted)]">
          © {new Date().getFullYear()} Wobb AI. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-[12px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[12px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-[12px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
