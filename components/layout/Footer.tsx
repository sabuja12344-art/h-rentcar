import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] pt-10 pb-8 bg-bg-deep">
      <div className="mx-auto max-w-[1200px] px-8 sm:px-10">
        {/* 사업자 정보 */}
        <div className="text-[13px] text-ink-dim leading-[2]">
          <strong className="text-ink-soft font-bold text-[14px]">
            {siteConfig.business.name}
          </strong>
          <span className="mx-2 text-[var(--line-strong)]">·</span>
          광주 월 장기렌트 전용 상담
          <br />
          대표전화 {siteConfig.phone}
          <span className="mx-2 text-[var(--line-strong)]">·</span>
          사업자등록번호 {siteConfig.business.regNo}
          <br />
          {siteConfig.business.address}
          <span className="mx-2 text-[var(--line-strong)]">·</span>
          자동차대여사업 허가 {siteConfig.business.licenseNo}
        </div>

        {/* 구분선 + 카피라이트 */}
        <div className="mt-6 pt-5 border-t border-[var(--line)] text-xs text-ink-dim">
          © 2026 H-RENT CAR. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
