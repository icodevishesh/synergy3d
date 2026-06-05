import React from 'react';

interface SvgProps {
  className?: string;
}

export const ZirconiaSvg: React.FC<SvgProps> = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 120 130" fill="none" className={className}>
    <path d="M24 34 Q22 14 42 9 Q60 5 78 9 Q98 14 96 34 L90 102 Q88 118 74 120 L46 120 Q32 118 30 102 Z" fill="#ECF1FA" stroke="#C8D5EE" strokeWidth="2"/>
    <path d="M36 9 Q60 24 84 9 Q88 20 84 34 Q60 27 36 34 Q32 20 36 9Z" fill="rgba(255,255,255,.75)"/>
    <path d="M24 34 Q36 44 60 40 Q84 44 96 34" stroke="#C8D5EE" strokeWidth="1.5" fill="none"/>
    <path d="M28 66 Q60 74 92 66" stroke="#D8E2F4" strokeWidth="1" fill="none"/>
    <ellipse cx="48" cy="18" rx="8" ry="4" fill="rgba(255,255,255,.5)" transform="rotate(-15,48,18)"/>
  </svg>
);

export const AllOnXSvg: React.FC<SvgProps> = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 180 110" fill="none" className={className}>
    <rect x="12" y="46" width="156" height="18" rx="9" fill="#E8EEFC" stroke="#C0CFF0" strokeWidth="2"/>
    <path d="M28 46 Q26 28 36 22 Q44 17 52 22 Q60 28 58 46Z" fill="#F0F5FF" stroke="#C8D5EE" strokeWidth="1.5"/>
    <path d="M68 46 Q66 28 76 22 Q84 17 92 22 Q100 28 98 46Z" fill="#F0F5FF" stroke="#C8D5EE" strokeWidth="1.5"/>
    <path d="M108 46 Q106 28 118 22 Q126 17 134 22 Q142 28 140 46Z" fill="#F0F5FF" stroke="#C8D5EE" strokeWidth="1.5"/>
    <rect x="38" y="64" width="8" height="30" rx="4" fill="#D4DEF4" stroke="#B8C8E8" strokeWidth="1.5"/>
    <rect x="80" y="64" width="8" height="30" rx="4" fill="#D4DEF4" stroke="#B8C8E8" strokeWidth="1.5"/>
    <rect x="120" y="64" width="8" height="30" rx="4" fill="#D4DEF4" stroke="#B8C8E8" strokeWidth="1.5"/>
  </svg>
);

export const EmaxSvg: React.FC<SvgProps> = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 120 130" fill="none" className={className}>
    <path d="M24 34 Q22 14 42 9 Q60 5 78 9 Q98 14 96 34 L90 102 Q88 118 74 120 L46 120 Q32 118 30 102 Z" fill="rgba(220,232,255,.45)" stroke="rgba(30,86,217,.22)" strokeWidth="2"/>
    <path d="M36 9 Q60 22 84 9 Q88 20 84 34 Q60 27 36 34 Q32 20 36 9Z" fill="rgba(255,255,255,.65)"/>
    <path d="M24 34 Q36 44 60 40 Q84 44 96 34" stroke="rgba(30,86,217,.18)" strokeWidth="1.5" fill="none"/>
    <ellipse cx="46" cy="20" rx="9" ry="4" fill="rgba(255,255,255,.6)" transform="rotate(-20,46,20)"/>
  </svg>
);

export const PfmSvg: React.FC<SvgProps> = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 120 130" fill="none" className={className}>
    <path d="M24 34 Q22 14 42 9 Q60 5 78 9 Q98 14 96 34 L90 102 Q88 118 74 120 L46 120 Q32 118 30 102 Z" fill="#ECF1FA" stroke="#C8D5EE" strokeWidth="2"/>
    <path d="M36 9 Q60 24 84 9 Q88 20 84 34 Q60 27 36 34 Q32 20 36 9Z" fill="#D4DEF4"/>
    <path d="M24 34 Q36 50 60 46 Q84 50 96 34" stroke="#B8C8E8" strokeWidth="2" fill="#D4DEF4"/>
    <ellipse cx="60" cy="40" rx="36" ry="8" fill="#C8D8F0"/>
  </svg>
);

export const SurgicalSvg: React.FC<SvgProps> = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 160 110" fill="none" className={className}>
    <path d="M18 52 Q18 26 80 22 Q142 26 142 52 Q142 76 80 80 Q18 76 18 52Z" fill="rgba(215,230,255,.3)" stroke="rgba(30,86,217,.3)" strokeWidth="2"/>
    <circle cx="50" cy="46" r="10" fill="rgba(30,86,217,.1)" stroke="rgba(30,86,217,.3)" strokeWidth="1.5"/>
    <circle cx="50" cy="46" r="4" fill="rgba(30,86,217,.5)"/>
    <circle cx="80" cy="42" r="10" fill="rgba(30,86,217,.1)" stroke="rgba(30,86,217,.3)" strokeWidth="1.5"/>
    <circle cx="80" cy="42" r="4" fill="rgba(30,86,217,.5)"/>
    <circle cx="110" cy="46" r="10" fill="rgba(30,86,217,.1)" stroke="rgba(30,86,217,.3)" strokeWidth="1.5"/>
    <circle cx="110" cy="46" r="4" fill="rgba(30,86,217,.5)"/>
  </svg>
);

export const NightguardSvg: React.FC<SvgProps> = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 150 100" fill="none" className={className}>
    <path d="M18 52 Q18 26 75 22 Q132 26 132 52 Q132 76 75 80 Q18 76 18 52Z" fill="#ECF1FA" stroke="#C8D5EE" strokeWidth="2"/>
    <path d="M24 52 Q24 34 75 30 Q126 34 126 52" stroke="#C8D5EE" strokeWidth="1.5" fill="none"/>
    <ellipse cx="40" cy="46" rx="8" ry="10" fill="rgba(255,255,255,.5)" stroke="#D8E2F4" strokeWidth="1"/>
    <ellipse cx="75" cy="40" rx="10" ry="13" fill="rgba(255,255,255,.5)" stroke="#D8E2F4" strokeWidth="1"/>
    <ellipse cx="110" cy="46" rx="8" ry="10" fill="rgba(255,255,255,.5)" stroke="#D8E2F4" strokeWidth="1"/>
  </svg>
);

export const ModelsSvg: React.FC<SvgProps> = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 160 110" fill="none" className={className}>
    <rect x="20" y="60" width="120" height="30" rx="6" fill="#E8EEFC" stroke="#C0CFF0" strokeWidth="1.5"/>
    <rect x="30" y="30" width="100" height="32" rx="4" fill="#F0F5FF" stroke="#C8D5EE" strokeWidth="1.5"/>
    <rect x="42" y="10" width="76" height="22" rx="4" fill="#F5F8FF" stroke="#D0DCEE" strokeWidth="1.5"/>
    <line x1="80" y1="30" x2="80" y2="60" stroke="#D8E2F4" strokeWidth="1"/>
  </svg>
);
