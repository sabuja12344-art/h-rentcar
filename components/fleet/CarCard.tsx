"use client";

import Link from "next/link";
import type { Car } from "@prisma/client";

function CarIllustration({ category }: { category: string }) {
  if (category === "승합/미니밴") {
    return (
      <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "80%", height: "auto" }}>
        <ellipse cx="150" cy="112" rx="132" ry="10" fill="rgba(26,34,51,.12)" />
        <path d="M20 82 Q26 34 60 28 L84 16 Q100 12 232 14 Q268 16 282 44 L288 62 Q290 70 290 82 L290 88 Q290 94 282 94 L34 94 Q20 94 20 82Z" fill="#e2e9f3" />
        <path d="M74 28 L90 18 Q104 14 150 15 L150 46 L88 46Z" fill="#b7cae6" />
        <path d="M158 15 Q210 15 240 44 L158 44Z" fill="#b7cae6" />
        <circle cx="84" cy="94" r="20" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
        <circle cx="232" cy="94" r="20" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
      </svg>
    );
  }
  if (category === "SUV") {
    return (
      <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "80%", height: "auto" }}>
        <ellipse cx="150" cy="112" rx="128" ry="10" fill="rgba(26,34,51,.12)" />
        <path d="M24 80 Q34 42 84 36 L110 18 Q132 12 202 14 Q246 16 268 48 L284 62 Q290 66 290 78 L290 88 Q290 94 282 94 L38 94 Q24 94 24 80Z" fill="#e2e9f3" />
        <path d="M94 36 L114 20 Q136 14 196 16 Q232 18 250 46 L204 46 Q150 40 116 42Z" fill="#b7cae6" />
        <circle cx="90" cy="94" r="20" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
        <circle cx="224" cy="94" r="20" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
      </svg>
    );
  }
  if (category === "경차") {
    return (
      <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "80%", height: "auto" }}>
        <ellipse cx="120" cy="104" rx="104" ry="9" fill="rgba(26,34,51,.12)" />
        <path d="M22 82 Q22 52 34 40 L48 22 Q62 12 90 10 Q152 10 170 16 L190 32 Q202 44 204 66 L204 82 Q204 90 196 92 L30 92 Q22 90 22 82Z" fill="#e2e9f3" />
        <path d="M52 22 L44 40 L100 40 L108 12 Q78 8 52 22Z" fill="#b7cae6" />
        <path d="M116 12 L108 40 L168 40 L178 20 Q158 10 136 10Z" fill="#b7cae6" />
        <circle cx="70" cy="92" r="18" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
        <circle cx="164" cy="92" r="18" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "80%", height: "auto" }}>
      <ellipse cx="150" cy="112" rx="128" ry="10" fill="rgba(26,34,51,.12)" />
      <path d="M26 84 Q42 48 104 42 Q134 22 190 22 Q244 24 268 56 L282 66 Q290 70 290 80 L290 88 Q290 94 282 94 L40 94 Q26 94 26 84Z" fill="#e2e9f3" />
      <path d="M116 42 Q140 26 188 26 Q226 28 244 54 L206 54 Q160 48 128 50Z" fill="#b7cae6" />
      <circle cx="92" cy="94" r="19" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
      <circle cx="222" cy="94" r="19" fill="#2c3a52" stroke="#8296b5" strokeWidth="5" />
    </svg>
  );
}

const CAT_LABEL: Record<string, string> = {
  "경차": "경차",
  "소형/준중형 세단": "세단",
  "중형/대형 세단": "세단",
  "SUV": "SUV",
  "승합/미니밴": "승합차",
  "수입/프리미엄": "프리미엄",
  "전기·친환경": "전기차",
};

function displayCat(car: Car) {
  return CAT_LABEL[car.category] ?? car.category;
}

function BadgeEl({ label }: { label: string }) {
  const isHot = label === "인기";
  const isSale = label.includes("할인");
  if (isHot) {
    return (
      <span style={{ fontSize: "11.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "7px", background: "var(--color-blue)", color: "#fff", display: "inline-flex", alignItems: "center" }}>
        {label}
      </span>
    );
  }
  if (isSale) {
    return (
      <span style={{ fontSize: "11.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "7px", background: "var(--color-red)", color: "#fff", display: "inline-flex", alignItems: "center" }}>
        {label}
      </span>
    );
  }
  return (
    <span style={{ fontSize: "11.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "7px", background: "rgba(255,255,255,.94)", color: "var(--color-ink)", boxShadow: "0 2px 6px rgba(26,34,51,.12)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-green)", flexShrink: 0 }} />
      {label}
    </span>
  );
}

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/fleet/${car.id}`}
      className="group"
      style={{
        display: "flex", flexDirection: "column", position: "relative",
        borderRadius: "16px", overflow: "hidden",
        background: "#ffffff", border: "1px solid var(--line)",
        boxShadow: "var(--shadow)",
        transition: "transform .2s, box-shadow .2s",
        textDecoration: "none",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
      }}
    >
      {/* 이미지 영역 */}
      <div style={{ position: "relative", height: "190px", flexShrink: 0, background: "linear-gradient(135deg,#f0f4fa,#e4ebf5)", overflow: "hidden" }}>
        {/* 배지 */}
        {car.label && (
          <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 3, display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <BadgeEl label={car.label} />
          </div>
        )}

        {/* 대각선 블루 스트라이프 */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "44%",
          background: "linear-gradient(120deg,#2f6be6 0%,#4f86f0 100%)",
          clipPath: "polygon(0 42%,100% 0,100% 100%,0 100%)",
          opacity: 0.14,
        }} />

        {/* 차량 이미지 */}
        <div className="transition-transform duration-300 group-hover:scale-[1.05]" style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "grid", placeItems: "center", padding: "14px 18px" }}>
          {car.thumbnail ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={car.thumbnail} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <CarIllustration category={car.category} />
          )}
        </div>
      </div>

      {/* 카드 본문 */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* 카테고리 태그 */}
        <span style={{ display: "inline-block", fontSize: "11.5px", fontWeight: 600, color: "var(--color-blue)", background: "rgba(47,107,230,.08)", borderRadius: "6px", padding: "4px 9px", marginBottom: "10px", alignSelf: "flex-start" }}>
          {displayCat(car)}
        </span>

        {/* 차량명 */}
        <div style={{ fontSize: "19px", fontWeight: 800, color: "var(--color-ink)", lineHeight: 1.3 }}>
          {car.name}
          {car.nameEn && (
            <small style={{ fontSize: "13px", color: "var(--color-ink-dim)", fontWeight: 500, marginLeft: "6px" }}>
              {car.nameEn}
            </small>
          )}
        </div>

        {/* 스펙 태그 */}
        <div style={{ display: "flex", gap: "6px", marginTop: "13px", flexWrap: "wrap" }}>
          {car.seats && (
            <span style={{ fontSize: "12px", color: "var(--color-ink-soft)", background: "var(--color-bg)", border: "1px solid var(--line)", borderRadius: "6px", padding: "4px 9px" }}>
              {car.seats}인승
            </span>
          )}
          {car.fuel && (
            <span style={{ fontSize: "12px", color: "var(--color-ink-soft)", background: "var(--color-bg)", border: "1px solid var(--line)", borderRadius: "6px", padding: "4px 9px" }}>
              {car.fuel}
            </span>
          )}
          {car.year && (
            <span style={{ fontSize: "12px", color: "var(--color-ink-soft)", background: "var(--color-bg)", border: "1px solid var(--line)", borderRadius: "6px", padding: "4px 9px" }}>
              {car.year}
            </span>
          )}
        </div>

        {/* 가격 행 */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
          <div>
            <div style={{ fontSize: "12px", color: "var(--color-ink-dim)", marginBottom: "2px" }}>월 장기렌트</div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-ink)" }}>
              약 <span style={{ color: "var(--color-blue)" }}>{car.monthlyPrice}</span>
              <small style={{ fontSize: "14px", color: "var(--color-ink-soft)", fontWeight: 600 }}>만원~</small>
            </div>
          </div>
          <div
            className="transition-all duration-150 group-hover:bg-blue group-hover:text-white group-hover:border-transparent"
            style={{
              width: "42px", height: "42px", borderRadius: "11px",
              border: "1px solid var(--line-strong)",
              display: "grid", placeItems: "center",
              color: "var(--color-ink-soft)",
              flexShrink: 0,
            }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
