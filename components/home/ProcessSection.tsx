const steps = [
  {
    num: "STEP 01",
    title: "상담 신청",
    desc: "전화 또는 온라인 폼으로 무료 상담을 신청하세요. 전담 상담사가 빠르게 연락드립니다.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="currentColor">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
      </svg>
    ),
  },
  {
    num: "STEP 02",
    title: "차량 선택",
    desc: "세단·SUV·전기차 등 원하는 차종과 계약 기간, 예산에 맞게 최적 차량을 선택합니다.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 15l1.5-5a2 2 0 012-1.5h9a2 2 0 012 1.5L20 15" />
        <rect x="3" y="15" width="18" height="4" rx="1.5" />
      </svg>
    ),
  },
  {
    num: "STEP 03",
    title: "계약 체결",
    desc: "필요 서류를 안내받은 후 간단한 절차로 계약을 완료합니다. 방문 또는 비대면 가능.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    num: "STEP 04",
    title: "차량 인수",
    desc: "지정된 장소에서 차량을 인수하고 바로 이용을 시작하세요. 보험·정비 모두 포함.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  return (
    <section id="steps" className="section-py section-soft border-t border-[var(--line)]">
      <div className="wrap">
        <div className="text-center sec-header">
          <div className="text-[13px] font-bold text-blue tracking-[.14em] uppercase mb-3">How to</div>
          <h2 className="sec-h2">
            장기렌트, 이렇게 시작하세요
          </h2>
          <p className="text-ink-soft text-[16px] mt-3">복잡한 절차 없이 4단계로 간단하게 진행됩니다.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(step => (
            <div key={step.num} className="glass rounded-[18px]" style={{ padding: "30px 26px" }}>
              <div className="text-[13px] font-black text-blue tracking-[.05em]">{step.num}</div>
              <div className="w-[48px] h-[48px] rounded-[13px] text-blue-bright grid place-items-center mt-4 mb-[18px] shrink-0" style={{ background: "rgba(47,107,230,.1)" }}>
                {step.icon}
              </div>
              <h3 className="text-[18px] font-bold">{step.title}</h3>
              <p className="text-[14px] text-ink-dim mt-[10px] leading-[1.7]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
