import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="section-soft border-t border-[var(--line)] pt-11 pb-10">
      <div className="wrap">
        <div className="flex justify-between gap-6 flex-wrap">
          <div className="text-[13px] text-ink-dim leading-[1.95]">
            <strong className="text-ink-soft font-bold">{siteConfig.business.name}</strong>
            {" · "}광주 월 장기렌트 전용 상담
            <br />
            대표전화 {siteConfig.phone}
            {" · "}사업자등록번호 {siteConfig.business.regNo}
            <br />
            {siteConfig.business.address}
            {" · "}자동차대여사업 허가 {siteConfig.business.licenseNo}
          </div>
          <div className="flex gap-[10px] items-start">
            <a
              href={`tel:${siteConfig.phone}`}
              title="전화"
              className="w-[40px] h-[40px] rounded-[10px] border border-[var(--line-strong)] grid place-items-center text-ink-soft transition-all duration-150 hover:border-blue-bright hover:text-blue-bright"
            >
              <svg viewBox="0 0 24 24" width="18" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
              </svg>
            </a>
            <a
              href={`sms:${siteConfig.sms}`}
              title="문자"
              className="w-[40px] h-[40px] rounded-[10px] border border-[var(--line-strong)] grid place-items-center text-ink-soft transition-all duration-150 hover:border-blue-bright hover:text-blue-bright"
            >
              <svg viewBox="0 0 24 24" width="18" fill="currentColor">
                <path d="M4 4h16c1 0 2 .9 2 2v10c0 1-1 2-2 2H8l-4 4V6c0-1 1-2 2-2z" />
              </svg>
            </a>
            <a
              href={siteConfig.kakaoOpenUrl}
              title="카카오"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-[10px] border border-[var(--line-strong)] grid place-items-center text-ink-soft transition-all duration-150 hover:border-blue-bright hover:text-blue-bright"
            >
              <svg viewBox="0 0 24 24" width="18" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.7 1.8 5.1 4.6 6.5l-1 3.6 4-2.6c.8.1 1.6.2 2.4.2 5.5 0 10-3.5 10-7.9S17.5 3 12 3z" />
              </svg>
            </a>
            <a
              href={siteConfig.instagramUrl}
              title="인스타그램"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-[10px] border border-[var(--line-strong)] grid place-items-center text-ink-soft transition-all duration-150 hover:border-blue-bright hover:text-blue-bright"
            >
              <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-[var(--line)] text-[12px] text-ink-dim">
          © 2026 H-RENT CAR. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
