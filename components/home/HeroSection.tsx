import Link from "next/link";

const stats = [
  { n: "43", unit: "만원~", label: "월 렌트료 시작가" },
  { n: "120", unit: "여종", label: "보유 차량 라인업" },
  { n: "24", unit: "시간", label: "상담 접수 가능" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 1000px 600px at 70% 20%, rgba(200,161,90,.12), transparent 60%),
            radial-gradient(ellipse 800px 500px at 10% -10%, rgba(50,80,140,.25), transparent 55%),
            linear-gradient(175deg, #0e1828 0%, #090e1a 50%, #070b13 100%)
          `,
        }}
      />
      {/* 장식 원 */}
      <div
        className="absolute top-[15%] right-[8%] w-[420px] h-[420px] rounded-full z-0 opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c8a15a, transparent 70%)" }}
      />

      <div className="wrap relative z-10 pt-[72px] pb-[60px] lg:pt-[96px] lg:pb-[120px]">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-center">

          {/* ── 텍스트 ── */}
          <div>
            {/* 배지 */}
            <div className="inline-flex items-center gap-[10px] text-[13px] font-semibold text-gold-soft border border-[rgba(200,161,90,0.35)] rounded-full px-[18px] py-[9px] mb-8 bg-[rgba(200,161,90,0.07)]">
              <span className="w-[7px] h-[7px] rounded-full bg-gold animate-pulse" />
              광주 전용 · 월 장기렌트 전문
            </div>

            <h1 className="text-[clamp(36px,5vw,62px)] font-black leading-[1.1] tracking-[-0.03em]">
              합리적인 장기렌트,
              <br />
              <em className="not-italic text-gold-soft">H-RENT CAR</em>와 함께
            </h1>

            <p className="mt-6 text-[clamp(15px,1.6vw,18px)] text-ink-soft max-w-[44ch] leading-[1.8]">
              복잡한 절차 없이 원하는 차량을 월 단위로.
              <br />
              초기비용 부담을 낮추고, 정비·보험까지 한 번에.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/#consult"
                className="inline-flex items-center gap-2 px-8 py-[15px] rounded-[14px] text-[15px] font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold shadow-[0_10px_32px_rgba(200,161,90,0.32)] hover:-translate-y-[2px] hover:shadow-[0_16px_42px_rgba(200,161,90,0.44)] transition-all duration-200"
              >
                무료 상담 신청하기
                <svg width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 9H2a1 1 0 010-2h9.586L8.293 3.707a1 1 0 010-1.414z"/></svg>
              </Link>
              <Link
                href="/#fleet"
                className="inline-flex items-center gap-2 px-7 py-[15px] rounded-[14px] text-[15px] font-semibold text-ink border border-[var(--line-strong)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(200,161,90,0.5)] transition-all duration-200"
              >
                차량 둘러보기
              </Link>
            </div>

            {/* 통계 */}
            <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-[var(--line)]">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[clamp(26px,2.8vw,34px)] font-black text-ink tracking-[-0.02em] leading-none">
                    {s.n}
                    <small className="text-[14px] text-gold font-bold ml-[3px]">{s.unit}</small>
                  </div>
                  <div className="text-[12px] text-ink-dim mt-[6px]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 차량 비주얼 (데스크탑만) ── */}
          <div className="hidden lg:block">
            <div
              className="relative rounded-[24px] overflow-hidden border border-[var(--line-strong)] shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              style={{
                background: "linear-gradient(150deg, #1c2d48 0%, #111e33 50%, #0b1525 100%)",
                aspectRatio: "4/3",
              }}
            >
              {/* 글로우 */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(80% 60% at 60% 40%, rgba(200,161,90,0.22), transparent 65%)",
                }}
              />
              {/* 차량 SVG */}
              <div className="absolute inset-0 grid place-items-center" style={{ padding: "8% 10%" }}>
                <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-auto drop-shadow-[0_28px_38px_rgba(0,0,0,0.65)]">
                  <defs>
                    <linearGradient id="hbody" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#eef1f6" />
                      <stop offset="1" stopColor="#c3ccdb" />
                    </linearGradient>
                    <linearGradient id="hglass" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#8ea3c4" />
                      <stop offset="1" stopColor="#54678a" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="310" cy="216" rx="270" ry="22" fill="rgba(0,0,0,.4)" />
                  <path d="M60 176 Q84 118 176 106 Q234 66 388 64 Q520 64 592 120 L604 150 Q612 160 606 178 L596 186 Q560 186 540 186 L120 186 Q64 186 60 176Z" fill="url(#hbody)" />
                  <path d="M210 106 Q252 78 384 76 Q492 78 552 118 L494 118 Q360 110 236 116 Z" fill="url(#hglass)" />
                  <path d="M60 176 Q84 118 176 106 L200 118 Q140 128 96 168 Z" fill="#aab6c9" opacity=".5" />
                  <circle cx="176" cy="186" r="38" fill="#10161f" stroke="#2c384c" strokeWidth="6" />
                  <circle cx="176" cy="186" r="15" fill="#4a586e" />
                  <circle cx="470" cy="186" r="38" fill="#10161f" stroke="#2c384c" strokeWidth="6" />
                  <circle cx="470" cy="186" r="15" fill="#4a586e" />
                  <path d="M582 138 Q604 142 600 158 L566 156 Z" fill="#c8a15a" />
                  <rect x="96" y="150" width="26" height="9" rx="4" fill="#dfe5ee" opacity=".8" />
                </svg>
              </div>
              {/* 가격 배지 */}
              <div className="absolute top-5 right-5 z-10 bg-gold text-[#1a1305] rounded-[14px] px-4 py-[10px] shadow-[0_8px_24px_rgba(200,161,90,0.45)]">
                <div className="text-[10px] font-bold opacity-70 leading-none mb-[3px]">월 렌트 시작가</div>
                <div className="text-[20px] font-black leading-none">43만원~</div>
              </div>
              {/* 캡션 */}
              <div className="absolute bottom-4 left-4 z-10 text-[11px] text-ink-soft/70 bg-[rgba(7,11,19,0.6)] backdrop-blur-sm border border-[var(--line)] rounded-full px-[13px] py-[6px]">
                대표 차량 이미지 · 실제 사진으로 교체 가능
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
