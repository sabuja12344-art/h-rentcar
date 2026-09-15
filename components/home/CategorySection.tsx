const categories = [
  {
    id: "sedan",
    name: "세단",
    desc: "편안한 승차감의 대표 차종",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-[46px] h-[46px]">
        <path d="M8 30 L11 20 Q12 17 15 17 L33 17 Q36 17 37 20 L40 30" strokeLinecap="round" />
        <rect x="6" y="30" width="36" height="8" rx="2" />
        <circle cx="15" cy="38" r="3" fill="currentColor" />
        <circle cx="33" cy="38" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "suv",
    name: "SUV",
    desc: "공간과 주행 안정성 모두",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-[46px] h-[46px]">
        <path d="M7 30 L9 19 Q10 15 14 15 L30 15 Q34 15 36 19 L41 30" strokeLinecap="round" />
        <rect x="5" y="30" width="38" height="9" rx="2" />
        <circle cx="15" cy="39" r="3" fill="currentColor" />
        <circle cx="33" cy="39" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "van",
    name: "승합·미니밴",
    desc: "대가족·단체 이동에 최적",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-[46px] h-[46px]">
        <path d="M8 32 L9 16 Q9 13 13 13 L34 13 Q38 13 38 16 L40 32" strokeLinecap="round" />
        <rect x="6" y="32" width="36" height="8" rx="2" />
        <circle cx="15" cy="40" r="3" fill="currentColor" />
        <circle cx="33" cy="40" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "ev",
    name: "전기·친환경",
    desc: "유지비 절감형 라인업",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-[46px] h-[46px]">
        <circle cx="24" cy="24" r="20" />
        <path d="M24 6 L24 42 M14 16 L34 16 M12 28 L36 28" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function CategorySection() {
  return (
    <section id="solutions" className="py-[60px] sm:py-[88px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-[42px]">
          <h2 className="text-[clamp(26px,3.4vw,38px)] font-black tracking-[-0.02em]">
            원하는 조건으로 찾기
          </h2>
          <p className="text-ink-soft text-[15px] mt-2">
            차종·용도에 맞춰 딱 맞는 장기렌트 플랜을 안내해 드립니다.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-[26px] rounded-card border border-[var(--line)] bg-panel-2 transition-all duration-200 cursor-pointer hover:border-[rgba(200,161,90,0.45)] hover:bg-panel"
            >
              <div className="text-gold-soft mb-4">{cat.icon}</div>
              <h3 className="text-[17px] font-bold">{cat.name}</h3>
              <p className="text-[13px] text-ink-dim mt-[6px]">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}