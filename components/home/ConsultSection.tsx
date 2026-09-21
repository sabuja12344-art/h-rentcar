import { siteConfig } from "@/config/site";
import { ConsultForm } from "./ConsultForm";

const tips = [
  "원하는 차종 및 예산 범위",
  "계약 기간 (12 / 24 / 36 / 48개월)",
  "차량 인수 희망 지역",
];

export function ConsultSection() {
  return (
    <section id="consult" className="section-py section-soft border-t border-[var(--line)]">
      <div className="wrap">
        {/* 섹션 헤더 */}
        <div className="text-center sec-header">
          <div className="text-[13px] font-bold text-blue tracking-[.14em] uppercase mb-3">Contact</div>
          <h2 className="sec-h2">
            현대렌트카, 지금 바로 상담하세요
          </h2>
          <p style={{ fontSize: "16px", color: "var(--color-ink-soft)", marginTop: "12px", maxWidth: "38ch", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, textAlign: "center", wordBreak: "keep-all" }}>
            차량·기간·예산만 알려주시면 담당자가 맞춤 견적을 바로 안내해 드립니다.
          </p>
        </div>

        {/* 상담 카드 — .consult-box 는 globals.css 에서 정의 */}
        <div className="consult-box">
          {/* 배경 글로우 */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "-90px", top: "-90px",
              width: "340px", height: "340px",
              background: "radial-gradient(circle, rgba(47,107,230,.08), transparent 65%)",
            }}
          />

          {/* .consult-grid — 데스크탑 2컬럼 (1fr 1.1fr), 모바일 1컬럼 */}
          <div className="consult-grid">
            {/* 왼쪽: 전화·준비 사항 */}
            <div style={{ wordBreak: "keep-all" }}>
              <h3 style={{ fontSize: "clamp(23px,2.8vw,32px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-.02em" }}>
                전화 한 통이면<br />맞춤 견적 완성
              </h3>
              <p className="text-ink-soft mt-[14px] text-[15px] leading-[1.7]">
                전화 또는 오른쪽 폼으로 편하게 남겨주세요.
              </p>

              <div className="mt-[26px]">
                <a
                  href={`tel:${siteConfig.phone}`}
                  style={{ fontSize: "30px", fontWeight: 900, display: "inline-flex", alignItems: "center", gap: "12px", color: "var(--color-ink)" }}
                >
                  <span
                    style={{ width: "44px", height: "44px", borderRadius: "11px", background: "rgba(47,107,230,.1)", color: "var(--color-blue-bright)", display: "grid", placeItems: "center", flexShrink: 0 }}
                  >
                    <svg viewBox="0 0 24 24" width="22" fill="currentColor">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
                    </svg>
                  </span>
                  {siteConfig.phone}
                </a>
                <div className="text-[13px] text-ink-dim mt-3 leading-[1.9]">
                  평일 09:00 – 18:00 · 토요일 09:00 – 13:00<br />
                  일요일·공휴일 온라인 상담 가능
                </div>
              </div>

              <div style={{ marginTop: "20px", borderRadius: "12px", padding: "16px 18px", background: "var(--glass-bg-2)", border: "1px solid var(--line)" }}>
                <div className="text-[13px] font-bold text-blue mb-2">미리 준비하면 더 빨라요</div>
                <ul>
                  {tips.map(tip => (
                    <li key={tip} className="text-[13px] text-ink-soft leading-[1.9]">
                      <span style={{ color: "var(--color-blue-bright)", fontWeight: 900, marginRight: "7px" }}>·</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 오른쪽: 상담 폼 */}
            <ConsultForm />
          </div>
        </div>
      </div>
    </section>
  );
}
