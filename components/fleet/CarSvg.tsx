const cls = "w-4/5 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]";

export function CarSvg({ category }: { category: string }) {
  if (category === "세단") {
    return (
      <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
        <ellipse cx="130" cy="102" rx="112" ry="9" fill="rgba(0,0,0,.4)" />
        <path d="M26 78 Q40 46 92 40 Q118 22 168 22 Q214 24 236 52 L246 60 Q252 64 252 74 L252 80 Q252 86 244 86 L38 86 Q26 86 26 78Z" fill="#e8ecf2" />
        <path d="M100 40 Q120 26 165 26 Q198 28 214 50 L180 50 Q140 46 112 48Z" fill="#9fb0c8" />
        <circle cx="82" cy="86" r="17" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
        <circle cx="196" cy="86" r="17" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
      </svg>
    );
  }
  if (category === "SUV") {
    return (
      <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
        <ellipse cx="130" cy="102" rx="112" ry="9" fill="rgba(0,0,0,.4)" />
        <path d="M24 74 Q34 40 78 34 L100 20 Q120 14 180 16 Q220 18 240 46 L248 58 Q252 62 252 72 L252 80 Q252 86 244 86 L36 86 Q24 86 24 74Z" fill="#e8ecf2" />
        <path d="M86 34 L102 22 Q122 18 172 20 Q206 22 222 44 L180 44 Q130 40 100 42Z" fill="#9fb0c8" />
        <circle cx="80" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
        <circle cx="198" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
      </svg>
    );
  }
  if (category === "전기·친환경") {
    return (
      <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
        <ellipse cx="130" cy="102" rx="112" ry="9" fill="rgba(0,0,0,.4)" />
        <path d="M26 78 Q38 44 88 36 Q112 20 166 20 Q216 22 238 54 L248 62 Q252 66 252 76 L252 82 Q252 86 244 86 L38 86 Q26 86 26 78Z" fill="#d8eef8" />
        <path d="M98 36 Q118 22 162 22 Q200 24 218 52 L182 52 Q142 46 114 48Z" fill="#7ab4d4" />
        <circle cx="82" cy="86" r="17" fill="#0c121e" stroke="#4a8cb8" strokeWidth="4" />
        <circle cx="196" cy="86" r="17" fill="#0c121e" stroke="#4a8cb8" strokeWidth="4" />
        <path d="M134 38 L124 56 L132 56 L122 74 L142 52 L134 52 Z" fill="#c8a15a" />
      </svg>
    );
  }
  if (category === "경차") {
    return (
      <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
        <ellipse cx="130" cy="102" rx="100" ry="8" fill="rgba(0,0,0,.4)" />
        <path d="M46 78 Q54 50 92 42 Q112 28 152 28 Q190 30 208 52 L216 62 Q220 66 220 74 L220 82 Q220 86 212 86 L58 86 Q46 86 46 78Z" fill="#e8ecf2" />
        <path d="M100 42 Q116 30 150 30 Q182 32 200 52 L170 52 Q136 48 114 50Z" fill="#9fb0c8" />
        <circle cx="94" cy="86" r="15" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
        <circle cx="182" cy="86" r="15" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="130" cy="102" rx="112" ry="9" fill="rgba(0,0,0,.4)" />
      <path d="M22 72 Q30 36 70 30 L90 18 Q108 12 186 14 Q226 16 244 44 L250 58 Q252 64 252 72 L252 80 Q252 86 244 86 L34 86 Q22 86 22 72Z" fill="#e8ecf2" />
      <path d="M78 30 L94 20 Q112 16 182 18 Q214 20 230 42 L96 42Z" fill="#9fb0c8" />
      <circle cx="78" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
      <circle cx="200" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
    </svg>
  );
}
