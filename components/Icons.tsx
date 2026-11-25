type P = { className?: string; title?: string };
const base = (title?: string) =>
  title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const, focusable: false as const };

export const PhoneIcon = ({ className = "w-5 h-5", title }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...base(title)}>
    <path d="M5 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 7.4 7.4l1.3-2 4.2 1.6v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);
export const MailIcon = ({ className = "w-5 h-5", title }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...base(title)}>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" />
  </svg>
);
export const ChatIcon = ({ className = "w-5 h-5", title }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...base(title)}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </svg>
);
export const InstagramIcon = ({ className = "w-5 h-5", title }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" {...base(title)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
export const TikTokIcon = ({ className = "w-5 h-5", title }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" {...base(title)}>
    <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.4 2.6 2.2 4.4 5 4.6" />
  </svg>
);
export const Arrow = () => (
  <span className="arrow" aria-hidden="true">→</span>
);

/** Small leaf sprig used beside chapter markers and as flourishes. */
export const LeafSprig = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg viewBox="0 0 38 30" className={className} aria-hidden="true" focusable="false" style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <g fill="none" stroke="var(--color-rose)" strokeWidth="1.1" strokeLinecap="round">
      <path d="M1 28 C 10 24, 18 17, 24 6" />
      <path d="M11 22 C 9 15, 13 10, 19 8 C 19 15, 16 20, 11 22 Z" />
      <path d="M18 15 C 22 10, 29 9, 36 11 C 31 16, 24 18, 18 15 Z" />
    </g>
  </svg>
);
