'use client';

export const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    className="mt-[8px] min-w-[60px] min-h-[60px]"
    role="img"
    aria-label="Postguy"
  >
    <defs>
      <linearGradient id="postguy-logo" x1="10" y1="5" x2="52" y2="55" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4AB1FF" />
        <stop offset="1" stopColor="#1F54C5" />
      </linearGradient>
    </defs>
    <circle cx="30" cy="30" r="27" fill="#08111F" stroke="#8AC7FF" strokeOpacity=".55" />
    <circle cx="30" cy="30" r="18" stroke="url(#postguy-logo)" strokeWidth="3" opacity=".72" />
    <path d="M14.5 35.5c8.4-.2 16.9-4.9 24.4-15.2M31.1 20.3h7.8v7.8" stroke="url(#postguy-logo)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16.4" cy="41.1" r="3.3" fill="#BCE6FF" />
  </svg>
);
