import Link from "next/link";
import { siteConfig } from "@/config/site";

export function CTABanner() {
  return (
    <div style={{ background: "linear-gradient(100deg,#1a3a7a 0%,#2256d4 50%,#3d74ee 100%)" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          padding: "52px 24px",
        }}
      >
        {/* 왼쪽 텍스트 */}
        <div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,.65)", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "10px" }}>
            Free Consulting
          </div>
          <h3 style={{ fontSize: "clamp(20px,2.8vw,30px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.3, letterSpacing: "-0.02em", wordBreak: "keep-all" }}>
            지금 상담하면 맞춤 견적을<br />바로 받아보실 수 있습니다
          </h3>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,.7)", marginTop: "10px", wordBreak: "keep-all" }}>
            차량·기간·예산만 알려주시면 담당자가 직접 연락드립니다.
          </p>
        </div>

        {/* 오른쪽 버튼 + 전화 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
          <Link
            href="/#consult"
            className="cta-banner-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "15px 30px",
              borderRadius: "12px",
              background: "#ffffff",
              color: "var(--color-blue)",
              fontSize: "15px",
              fontWeight: 800,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(0,0,0,.2)",
            }}
          >
            <svg viewBox="0 0 24 24" width="17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1 0 2 .9 2 2v10c0 1-1 2-2 2H8l-4 4V6c0-1 1-2 2-2z" />
            </svg>
            무료 상담 신청
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "rgba(255,255,255,.85)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          >
            <svg viewBox="0 0 24 24" width="15" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
            </svg>
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
