"use client";

import Link from "next/link";
import type { Car } from "@prisma/client";

/* weeklyPrice 필드는 schema에 추가됐으나 prisma generate 전이라 확장 타입 사용 */
type CarWithWeekly = Car & { weeklyPrice?: number | null };

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
  "중형차": "중형차",
  "중형": "중형",
  "대형": "대형",
  "중형/대형 세단": "세단",
  "SUV": "SUV",
  "승합/미니밴": "승합차",
  "수입/프리미엄": "프리미엄",
  "전기·친환경": "전기차",
};

function displayCat(car: CarWithWeekly) {
  return CAT_LABEL[car.category] ?? car.category;
}

function BadgeEl({ label }: { label: string }) {
  const isHot = label === "인기";
  const isSale = label.includes("할인");
  if (isHot) return <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", background: "var(--color-blue)", color: "#fff", display: "inline-flex", alignItems: "center" }}>{label}</span>;
  if (isSale) return <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", background: "var(--color-red)", color: "#fff", display: "inline-flex", alignItems: "center" }}>{label}</span>;
  return (
    <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", background: "rgba(255,255,255,.94)", color: "var(--color-ink)", boxShadow: "0 2px 6px rgba(26,34,51,.12)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-green)", flexShrink: 0 }} />
      {label}
    </span>
  );
}

function ServiceChip({ label }: { label: string }) {
  return (
    <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "5px", background: "rgba(18,178,106,.10)", color: "var(--color-green)", border: "1px solid rgba(18,178,106,.2)", display: "inline-flex", alignItems: "center", gap: "3px" }}>
      <svg viewBox="0 0 12 12" width="10" fill="currentColor"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zm2.3 3.7l-2.6 2.6a.5.5 0 01-.7 0l-1-1a.5.5 0 01.7-.7l.65.65 2.25-2.25a.5.5 0 01.7.7z"/></svg>
      {label}
    </span>
  );
}

/* ── 3단 가격 그리드 (PC용) ── */
function PriceGrid({ car }: { car: CarWithWeekly }) {
  const cols = [
    car.dailyPrice ? { label: "1일 / 24시간", value: `${car.dailyPrice.toLocaleString()}원~` } : null,
    car.weeklyPrice ? { label: "1주일", value: `${car.weeklyPrice}만원~` } : null,
    { label: "1개월", value: `${car.monthlyPrice}만원~` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols.length}, 1fr)`, gap: "6px", marginBottom: "12px" }}>
      {cols.map(({ label, value }) => (
        <div key={label} style={{ background: "var(--color-bg)", borderRadius: "8px", padding: "8px 10px" }}>
          <div style={{ fontSize: "10px", color: "var(--color-ink-dim)", marginBottom: "3px", fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: label === "1개월" ? "15px" : "13px", fontWeight: 800, color: label === "1개월" ? "var(--color-blue)" : "var(--color-ink)" }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 3단 가격 (모바일 인라인용) ── */
function MobilePriceRow({ car }: { car: CarWithWeekly }) {
  return (
    <div style={{ marginTop: "5px", display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
      {car.dailyPrice && (
        <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
          <span style={{ fontSize: "10px", color: "var(--color-ink-dim)" }}>1일/24시간</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-ink-soft)", marginLeft: "2px" }}>{car.dailyPrice.toLocaleString()}원~</span>
        </div>
      )}
      {car.weeklyPrice && (
        <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
          <span style={{ fontSize: "10px", color: "var(--color-ink-dim)" }}>1주일</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-ink-soft)", marginLeft: "2px" }}>{car.weeklyPrice}만원~</span>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
        <span style={{ fontSize: "10px", color: "var(--color-ink-dim)" }}>1개월</span>
        <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-blue)", marginLeft: "2px" }}>{car.monthlyPrice}만원~</span>
      </div>
    </div>
  );
}

export function CarCard({ car }: { car: Car }) {
  const c = car as CarWithWeekly;

  return (
    <div
      className="group relative car-card"
      style={{ borderRadius: "16px", overflow: "hidden", background: "#ffffff", border: "1px solid var(--line)", boxShadow: "var(--shadow)", transition: "transform .2s, box-shadow .2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)"; }}
    >
      {/* ── 모바일: 왼쪽 정보 패널 ── */}
      <Link
        href={`/fleet/${c.id}`}
        className="car-card-mob-info"
        style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "12px 12px 10px", minWidth: 0, paddingTop: c.label ? "32px" : "12px", textDecoration: "none" }}
      >
        {c.label && (
          <div style={{ position: "absolute", top: "9px", left: "9px", zIndex: 10 }}>
            <BadgeEl label={c.label} />
          </div>
        )}
        <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-blue)", background: "rgba(47,107,230,.08)", borderRadius: "5px", padding: "2px 6px", marginBottom: "4px", alignSelf: "flex-start" }}>
          {displayCat(c)}
        </span>
        <div style={{ fontSize: "17px", fontWeight: 800, color: "var(--color-ink)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {c.name}
        </div>
        {/* 3단 가격 */}
        <MobilePriceRow car={c} />
        {/* 예약하기 */}
        <div style={{ marginTop: "8px", padding: "5px 10px", borderRadius: "7px", background: "var(--color-blue)", color: "#fff", fontSize: "11px", fontWeight: 700, textAlign: "center", alignSelf: "flex-start" }}>
          예약하기
        </div>
      </Link>

      {/* ── 모바일: 오른쪽 이미지 패널 ── */}
      <Link
        href={`/fleet/${c.id}`}
        className="car-card-mob-img"
        style={{ width: "145px", flexShrink: 0, background: "linear-gradient(135deg,#eef2fa,#e0e9f5)", display: "grid", placeItems: "center", padding: "10px", textDecoration: "none" }}
      >
        {c.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.thumbnail} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <CarIllustration category={c.category} />
        )}
      </Link>

      {/* ── PC: 이미지 영역 ── */}
      <Link
        href={`/fleet/${c.id}`}
        className="car-card-pc-img"
        style={{ position: "relative", height: "190px", flexShrink: 0, background: "linear-gradient(135deg,#f0f4fa,#e4ebf5)", overflow: "hidden", width: "100%", textDecoration: "none" }}
      >
        {c.label && <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 3 }}><BadgeEl label={c.label} /></div>}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "44%", background: "linear-gradient(120deg,#2f6be6 0%,#4f86f0 100%)", clipPath: "polygon(0 42%,100% 0,100% 100%,0 100%)", opacity: 0.14 }} />
        <div className="transition-transform duration-300 group-hover:scale-[1.05]" style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "grid", placeItems: "center", padding: "14px 18px" }}>
          {c.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.thumbnail} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <CarIllustration category={c.category} />
          )}
        </div>
      </Link>

      {/* ── PC: 카드 본문 ── */}
      <div className="car-card-pc-body" style={{ padding: "16px 18px 18px", flex: 1, flexDirection: "column" }}>
        <span style={{ display: "inline-block", fontSize: "11.5px", fontWeight: 600, color: "var(--color-blue)", background: "rgba(47,107,230,.08)", borderRadius: "6px", padding: "4px 9px", marginBottom: "8px" }}>
          {displayCat(c)}
        </span>
        <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--color-ink)", lineHeight: 1.3 }}>
          {c.name}
          {c.nameEn && <small style={{ fontSize: "13px", color: "var(--color-ink-dim)", fontWeight: 500, marginLeft: "6px" }}>{c.nameEn}</small>}
        </div>

        {/* 스펙 칩 */}
        <div style={{ display: "flex", gap: "5px", marginTop: "10px", flexWrap: "wrap" }}>
          {c.seats && <span style={{ fontSize: "12px", color: "var(--color-ink-soft)", background: "var(--color-bg)", border: "1px solid var(--line)", borderRadius: "6px", padding: "3px 8px" }}>{c.seats}인승</span>}
          {c.fuel && <span style={{ fontSize: "12px", color: "var(--color-ink-soft)", background: "var(--color-bg)", border: "1px solid var(--line)", borderRadius: "6px", padding: "3px 8px" }}>{c.fuel}</span>}
          {c.year && <span style={{ fontSize: "12px", color: "var(--color-ink-soft)", background: "var(--color-bg)", border: "1px solid var(--line)", borderRadius: "6px", padding: "3px 8px" }}>{c.year}</span>}
        </div>

        {/* 서비스 칩 */}
        <div style={{ display: "flex", gap: "5px", marginTop: "7px", flexWrap: "wrap" }}>
          <ServiceChip label="사고대차" />
          <ServiceChip label="보험대차" />
        </div>

        {/* 3단 가격 + 예약하기 */}
        <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
          <PriceGrid car={c} />
          <Link
            href="/#consult"
            style={{ display: "block", width: "100%", padding: "10px 0", borderRadius: "10px", background: "var(--color-blue)", color: "#fff", fontSize: "14px", fontWeight: 700, textAlign: "center", textDecoration: "none", transition: "background .15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-blue-dark)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-blue)"; }}
          >
            예약하기
          </Link>
        </div>
      </div>
    </div>
  );
}
