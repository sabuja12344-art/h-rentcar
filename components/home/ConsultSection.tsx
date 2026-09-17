import { siteConfig } from "@/config/site";
import { ConsultForm } from "./ConsultForm";

const tips = [
  "원하는 차종 및 예산 범위",
  "계약 기간 (12 / 24 / 36 / 48개월)",
  "차량 인수 희망 지역",
];

export function ConsultSection() {
  return (
    <section id="consult" className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        {/* 섹션 헤더 */}
        <div className="text-center mb-[38px]">
          <div className="text-[12.5px] font-bold text-cyan tracking-[.14em] uppercase mb-[10px]">Contact</div>
          <h2 className="text-[clamp(24px,3.1vw,34px)] font-black tracking-[-0.02em]">
            광주 월 장기렌트, 지금 바로 상담하세요
          </h2>
          <p className="text-ink-soft text-[15px] mt-[10px] max-w-[44ch] mx-auto leading-[1.7]">
            차량·기간·예산만 알려주시면 담당자가 맞춤 견적을 바로 안내해 드립니다.
          </p>
        </div>

        {/* 상담 카드 */}
        <div
          className="relative rounded-[24px] overflow-hidden"
          style={{
            padding: "48px",
            background: "linear-gradient(120deg, rgba(61,139,255,.16), rgba(87,214,240,.05) 60%, rgba(255,255,255,.02))",
            border: "1px solid var(--glass-line)",
            backdropFilter: "blur(var(--glass-blur))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)",
          }}
        >
          {/* 글로우 */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "-90px", top: "-90px",
              width: "340px", height: "340px",
              background: "radial-gradient(circle, rgba(94,166,255,.22), transparent 65%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[44px] items-start">
            {/* 왼쪽: 연락 정보 */}
            <div>
              <h3 className="text-[clamp(23px,2.8vw,32px)] font-black leading-[1.25] tracking-[-0.02em]">
                전화 한 통이면<br />맞춤 견적 완성
              </h3>
              <p className="text-ink-soft mt-[14px] text-[15px] leading-[1.7]">
                전화 또는 오른쪽 폼으로 편하게 남겨주세요.
              </p>

              <div className="mt-[26px]">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-3 text-[30px] font-black text-ink hover:text-blue-bright transition-colors duration-150"
                >
                  <span
                    className="w-[44px] h-[44px] rounded-[11px] text-blue-bright grid place-items-center shrink-0"
                    style={{ background: "rgba(61,139,255,.18)" }}
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

              <div
                className="mt-5 rounded-[12px] p-[16px_18px] border border-[var(--line)]"
                style={{ background: "var(--glass-bg-2)" }}
              >
                <div className="text-[13px] font-bold text-cyan mb-2">미리 준비하면 더 빨라요</div>
                <ul className="space-y-0">
                  {tips.map(tip => (
                    <li
                      key={tip}
                      className="text-[13px] text-ink-soft leading-[1.9]"
                    >
                      <span className="text-blue-bright font-black mr-[7px]">·</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 오른쪽: 폼 */}
            <ConsultForm />
          </div>
        </div>
      </div>
    </section>
  );
}
