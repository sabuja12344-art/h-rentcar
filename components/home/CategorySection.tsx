const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    tag: "월 22만원~",
    title: "합리적인 월 납입금",
    desc: "초기 비용 없이 시작 가능. 불필요한 추가 비용 없이 투명하게 운영합니다.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    tag: "종합보험 포함",
    title: "보험·정비 완벽 포함",
    desc: "종합보험, 정기점검, 긴급출동까지 한 번에 해결. 별도 정비 걱정이 없습니다.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 15l1.5-5a2 2 0 012-1.5h9a2 2 0 012 1.5L20 15" />
        <rect x="3" y="15" width="18" height="4" rx="1.5" />
      </svg>
    ),
    tag: "120여 종",
    title: "다양한 차량 라인업",
    desc: "세단·SUV·전기차·승합까지 원하는 차량이 모두 있습니다. 국산·수입 전 차종.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="currentColor">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
      </svg>
    ),
    tag: "24시간 운영",
    title: "광주 전담 상담",
    desc: "광주·전남 지역 전담 상담사가 맞춤 견적을 언제든 빠르게 안내합니다.",
  },
];

export function CategorySection() {
  return (
    <section id="solutions" className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        <div className="text-center sec-header">
          <div className="text-[13px] font-bold text-blue tracking-[.14em] uppercase mb-3">
            Why H-RENT CAR
          </div>
          <h2 className="sec-h2">
            광주에서 장기렌트, 이래서 H-RENT CAR입니다
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <div key={i} className="glass rounded-[18px]" style={{ padding: "30px 26px" }}>
              <div className="w-[50px] h-[50px] rounded-[13px] text-green grid place-items-center mb-5" style={{ background: "rgba(18,178,106,.1)" }}>
                {b.icon}
              </div>
              <div className="text-[12.5px] text-green font-semibold">{b.tag}</div>
              <h3 className="text-[19px] font-black mt-2">{b.title}</h3>
              <p className="text-[14px] text-ink-dim mt-3 leading-[1.75]">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
