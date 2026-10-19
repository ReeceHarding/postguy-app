export const LogoTextComponent = () => (
  <a href="/" aria-label="Postguy home" className="inline-flex items-center gap-3 text-white no-underline">
    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-700 text-sky-50 shadow-[0_0_22px_rgba(44,135,255,.32)]">
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
        <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="2" opacity=".45" />
        <path d="M8 19.5c4.8-.1 9.7-2.8 14-8.8M17.6 10.5H22v4.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="22.5" r="2" fill="currentColor" />
      </svg>
    </span>
    <span className="text-xl font-semibold tracking-tight">postguy</span>
  </a>
);
