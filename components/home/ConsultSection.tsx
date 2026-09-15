import { siteConfig } from "@/config/site";
import { ConsultForm } from "./ConsultForm";

export function ConsultSection() {
  return (
    <section id="consult" className="py-[60px] sm:py-[88px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div
          className="relative rounded-3xl overflow-hidden border border-[var(--line-strong)] p-[30px] sm:p-[52px]"
          style={{
            background: "linear-gradient(120deg, #12203a 0%, #0d1830 60%, #0b1424 100%)",
          }}
        >
          {/* 우상단 골드 글로우 */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "-80px",
              top: "-80px",
              width: "360px",
              height: "360px",
              background: "radial-gradient(circle, rgba(200,161,90,0.16), transparent 65%)",
            }}
          />

          <div className="relative grid md:grid-cols-2 gap-8 md:gap-[44px] items-center">
            {/* 텍스트 + 전화 */}
            <div>
              <h2 className="text-[clamp(24px,3vw,34px)] font-black tracking-[-0.02em] leading-[1.2]">
                광주 월 장기렌트,
                <br />
                지금 바로 상담하세요
              </h2>
              <p className="text-ink-soft mt-[14px] text-[15px] leading-[1.7]">
                차량·기간·예산만 알려주시면 담당자가 맞춤 견적을 안내해 드립니다.
                전화 또는 아래 폼으로 남겨주세요.
              </p>
              <div className="flex items-center gap-[14px] mt-7">
                <div className="w-12 h-12 rounded-[12px] bg-[rgba(200,161,90,0.14)] grid place-items-center text-gold-soft shrink-0">
                  <svg viewBox="0 0 24 24" width="22" fill="currentColor">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[12px] text-ink-dim">전용 상담전화</div>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-[26px] font-black tracking-[0.01em] hover:text-gold transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* 폼 */}
            <ConsultForm />
          </div>
        </div>
      </div>
    </section>
  );
}
