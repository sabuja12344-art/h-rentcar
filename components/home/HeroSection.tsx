import Link from "next/link";
import { siteConfig } from "@/config/site";

const stats = [
  { n: "43", unit: "만원~", label: "월 렌트료 시작가" },
  { n: "120", unit: "여종", label: "보유 차량 라인업" },
  { n: "24", unit: "시간", label: "상담 접수 가능" },
];

export function HeroSection() {
  return (
    <section className="relative pt-14 pb-[72px] md:pt-[96px] md:pb-[120px] overflow-hidden">
      {/* 배경 그라디언트 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(1200px 600px at 72% 8%, rgba(200,161,90,.10), transparent 60%),
            radial-gradient(900px 500px at 12% 0%, rgba(60,90,150,.22), transparent 55%),
            linear-gradient(180deg, #0d1626 0%, #0a1120 45%, #070b13 100%)
          `,
        }}
      />
      {/* 별 파티클 */}
      <div
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.5), transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,.35), transparent),
            radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,.45), transparent),
            radial-gradient(1px 1px at 35% 55%, rgba(255,255,255,.3), transparent),
            radial-gradient(1.5px 1.5px at 90% 12%, rgba(255,255,255,.5), transparent)
          `,
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-8 grid md:grid-cols-[1.05fr_0.95fr] gap-9 md:gap-10 items-center">
        {/* 텍스트 */}
        <div>
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-gold-soft border border-[rgba(200,161,90,0.3)] rounded-full px-[15px] py-[7px] mb-[26px] bg-[rgba(200,161,90,0.06)]">
            <span className="w-[6px] h-[6px] rounded-full bg-gold shadow-[0_0_8px_var(--color-gold)]" />
            광주 전용 · 월 장기렌트 통합 솔루션
          </div>

          <h1 className="text-[clamp(34px,5.4vw,60px)] font-black leading-[1.12] tracking-[-0.025em] max-w-[16ch]">
            합리적인 장기렌트,
            <br />
            <em className="not-italic text-gold-soft">H-RENT CAR</em>와 함께
          </h1>

          <p className="mt-[22px] text-[clamp(15px,1.7vw,19px)] text-ink-soft max-w-[42ch] leading-[1.65]">
            복잡한 절차 없이 원하는 차량을 월 단위로. 초기비용 부담을 낮추고,
            정비·보험까지 한 번에 해결하세요.
          </p>

          <div className="flex gap-[14px] mt-[38px] flex-wrap">
            <Link
              href="/#consult"
              className="inline-flex items-center gap-[9px] px-[30px] py-4 rounded-btn text-base font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold shadow-[0_10px_30px_rgba(200,161,90,0.3)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(200,161,90,0.42)]"
            >
              월 장기렌트 신청하기 →
            </Link>
            <Link
              href="/#fleet"
              className="inline-flex items-center gap-[9px] px-7 py-4 rounded-btn text-base font-semibold text-ink border border-[var(--line-strong)] bg-[rgba(255,255,255,0.03)] transition-all duration-200 hover:bg-[rgba(255,255,255,0.07)] hover:border-gold"
            >
              차량 둘러보기
            </Link>
          </div>

          <div className="flex gap-[26px] md:gap-10 mt-12 flex-wrap">
            {stats.map((s) => (
              <div key={s.label} className="min-w-[82px]">
                <div className="text-[clamp(24px,2.5vw,30px)] font-black text-ink tracking-[-0.02em]">
                  {s.n}
                  <small className="text-[15px] text-gold font-bold ml-[2px]">{s.unit}</small>
                </div>
                <div className="text-[13px] text-ink-dim mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 비주얼 */}
        <div>
          <div
            className="relative rounded-[22px] overflow-hidden aspect-[16/11] sm:aspect-[4/3] border border-[var(--line-strong)] shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
            style={{
              background: "linear-gradient(160deg, #1a2740 0%, #0e1626 60%, #0a111e 100%)",
            }}
          >
            {/* 글로우 */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(90% 70% at 62% 42%, rgba(200,161,90,0.20), transparent 62%)",
              }}
            />
            {/* 차량 SVG 플레이스홀더 */}
            <div className="absolute inset-0 grid place-items-center" style={{ padding: "6% 8%" }}>
              <svg
                viewBox="0 0 620 260"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-full h-auto drop-shadow-[0_26px_34px_rgba(0,0,0,0.6)]"
              >
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
                <path
                  d="M60 176 Q84 118 176 106 Q234 66 388 64 Q520 64 592 120 L604 150 Q612 160 606 178 L596 186 Q560 186 540 186 L120 186 Q64 186 60 176Z"
                  fill="url(#hbody)"
                />
                <path
                  d="M210 106 Q252 78 384 76 Q492 78 552 118 L494 118 Q360 110 236 116 Z"
                  fill="url(#hglass)"
                />
                <path
                  d="M60 176 Q84 118 176 106 L200 118 Q140 128 96 168 Z"
                  fill="#aab6c9"
                  opacity=".5"
                />
                <circle cx="176" cy="186" r="38" fill="#10161f" stroke="#2c384c" strokeWidth="6" />
                <circle cx="176" cy="186" r="15" fill="#4a586e" />
                <circle cx="470" cy="186" r="38" fill="#10161f" stroke="#2c384c" strokeWidth="6" />
                <circle cx="470" cy="186" r="15" fill="#4a586e" />
                <path d="M582 138 Q604 142 600 158 L566 156 Z" fill="#c8a15a" />
                <rect x="96" y="150" width="26" height="9" rx="4" fill="#dfe5ee" opacity=".8" />
              </svg>
            </div>
            {/* 가격 칩 */}
            <div className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 bg-gold text-[#1a1305] rounded-[12px] px-3 py-2 sm:px-[14px] sm:py-[10px] shadow-[0_8px_22px_rgba(200,161,90,0.4)]">
              <div className="text-[11px] font-bold opacity-80">월 렌트 시작가</div>
              <div className="text-base sm:text-[19px] font-black leading-[1.1]">43만원~</div>
            </div>
            {/* 캡션 */}
            <div className="absolute left-[18px] bottom-4 z-10 text-[12px] text-ink-soft bg-[rgba(7,11,19,0.55)] backdrop-blur-sm border border-[var(--line)] rounded-full px-[14px] py-[7px]">
              대표 차량 이미지 · 실제 사진으로 교체 가능
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}