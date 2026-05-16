const paths = {
  briefcase: `<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M2 13h20"/>`,
  bookOpen: `<path d="M12 7v14"/><path d="M3 18a2 2 0 0 0 2 2h7V5H5a2 2 0 0 0-2 2z"/><path d="M21 18a2 2 0 0 1-2 2h-7V5h7a2 2 0 0 1 2 2z"/>`,
  sparkles: `<path d="M12 3 10.5 8.5 5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5z"/><path d="M5 4v2"/><path d="M19 16v2"/><path d="M4 5h2"/><path d="M18 17h2"/>`,
  refresh: `<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v5h-5"/>`,
  flag: `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>`,
  arrowRight: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
  heartPulse: `<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.36l-.78-.78a5.41 5.41 0 0 0-7.65 7.65l.78.78L12 20.66l7.65-7.65.78-.78a5.4 5.4 0 0 0 0-7.65z"/><path d="M3.22 12H7l1.5-3 3 6 1.5-3h4.78"/>`,
  users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  shieldAlert: `<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  kanban: `<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="7" x2="9" y2="14"/><line x1="15" y1="7" x2="15" y2="10"/>`,
  scroll: `<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M22 17H2a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3 3 3 0 0 0-3-3H8"/>`,
  trash: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
  lightbulb: `<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14a5 5 0 1 0-6.18 0c.46.37.91.86 1.09 1.5h4c.18-.64.63-1.13 1.09-1.5z"/>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>`,
  coins: `<circle cx="9" cy="9" r="6"/><path d="M14.5 9.5h.01"/><path d="M21 15a6 6 0 0 1-9 5.2"/><path d="M15.5 21.5h.01"/>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  wrench: `<path d="M14.7 6.3a4 4 0 0 0 5 5l1.3-1.3a6 6 0 0 1-8.04 8.04L6 22l-4-4 4-4-2-2 2.7-2.7a6 6 0 0 1 8.04-8.04z"/>`,
  smile: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`,
  handshake: `<path d="m11 17 2 2a1 1 0 0 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 0 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="M21 3v6h-2"/><path d="m3 11 8 8"/><path d="m12 12-3 3"/>`,
  hammer: `<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-1.13-1.13-1.13-2.97 0-4.1l.07-.07a2 2 0 0 0 0-2.83 2 2 0 0 0-2.83 0l-.07.07c-1.13 1.13-2.97 1.13-4.1 0L11.48 2.3"/>`,
  palette: `<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2a10 10 0 1 0 0 20 4 4 0 0 1 0-8 4 4 0 0 0 0-8 10 10 0 0 0 0-4z"/>`,
  microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>`,
  checkCircle: `<circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/>`,
  alertTriangle: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
  play: `<polygon points="6 3 20 12 6 21 6 3"/>`,
  eye: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
  circle: `<circle cx="12" cy="12" r="9"/>`,
  x: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
} as const;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName | string;
  size?: "sm" | "lg";
  className?: string;
}

export function Icon({ name, size, className = "" }: IconProps) {
  const path = paths[name as IconName] ?? paths.circle;
  return (
    <svg
      className={["icon", size, className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
