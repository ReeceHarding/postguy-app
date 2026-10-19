import Link from 'next/link';

export function PostguyLogo() {
  return (
    <Link href="/" className="postguy-brand" aria-label="Postguy home">
      <span className="postguy-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="2" opacity=".45" />
          <path d="M8 19.5c4.8-.1 9.7-2.8 14-8.8M17.6 10.5H22v4.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="22.5" r="2" fill="currentColor" />
        </svg>
      </span>
      <span>postguy</span>
    </Link>
  );
}

export function SiteNav({ active }: { active?: string }) {
  return (
    <nav className="postguy-nav" aria-label="Main navigation">
      <PostguyLogo />
      <div className="postguy-nav-links">
        <Link href="/#workflow">Workflow</Link>
        <Link href="/#capabilities">Capabilities</Link>
        <Link href="/privacy" aria-current={active === 'privacy' ? 'page' : undefined}>Privacy</Link>
        <Link href="/terms" aria-current={active === 'terms' ? 'page' : undefined}>Terms</Link>
      </div>
      <Link href="https://github.com/gitroomhq/postiz-app" className="postguy-nav-cta" target="_blank" rel="noreferrer">
        Source <span aria-hidden="true">↗</span>
      </Link>
    </nav>
  );
}

export function SiteFrame({ children, active }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="postguy-site">
      <div className="postguy-backdrop" aria-hidden="true" />
      <main className="postguy-frame">
        <div className="postguy-grid" aria-hidden="true" />
        <div className="postguy-glow" aria-hidden="true" />
        <div className="postguy-frame-content">
          <SiteNav active={active} />
          {children}
        </div>
      </main>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="postguy-footer">
      <div>
        <PostguyLogo />
        <p>Self-hosted social publishing, built on an open source foundation.</p>
        <p className="postguy-footer-status"><span /> Early build · provider access depends on your own app approvals</p>
      </div>
      <div className="postguy-footer-links">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/source">Source &amp; license</Link>
      </div>
    </footer>
  );
}
