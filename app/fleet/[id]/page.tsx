export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarSvg } from "@/components/fleet/CarSvg";
import { CarCard } from "@/components/fleet/CarCard";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) return { title: "차량 없음 | H-RENT CAR" };
  return {
    title: `${car.name} 월 장기렌트 | 현대렌트카`,
    description: car.description ?? undefined,
  };
}

export default async function FleetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();

  /* 관련 차량 — 같은 카테고리 우선, 부족하면 전체에서 보충 */
  const sameCat = await prisma.car.findMany({
    where: { isActive: true, id: { not: car.id }, category: car.category },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });
  const related =
    sameCat.length >= 3
      ? sameCat
      : [
          ...sameCat,
          ...(await prisma.car.findMany({
            where: { isActive: true, id: { notIn: [car.id, ...sameCat.map(c => c.id)] } },
            orderBy: { sortOrder: "asc" },
            take: 3 - sameCat.length,
          })),
        ];

  const specs: { label: string; value: string }[] = [
    { label: "차종", value: car.category },
    ...(car.fuel ? [{ label: "연료", value: car.fuel }] : []),
    ...(car.seats ? [{ label: "인승", value: `${car.seats}인승` }] : []),
    ...(car.year ? [{ label: "연식", value: car.year }] : []),
    ...(car.mileage ? [{ label: "주행거리", value: car.mileage }] : []),
    ...(car.contractTerms ? [{ label: "계약기간", value: car.contractTerms }] : []),
    ...(car.deposit ? [{ label: "보증금", value: car.deposit }] : []),
  ];

  /* 스펙을 2개씩 묶어 행(row)으로 */
  const specRows: (typeof specs)[] = [];
  for (let i = 0; i < specs.length; i += 2) specRows.push(specs.slice(i, i + 2));

  const isHot = car.label === "인기";
  const isSale = car.label?.includes("할인");

  return (
    <main className="pt-[70px] sm:pt-[90px] pb-[80px] sm:pb-[120px]">
      <div className="wrap">
        {/* 뒤로 */}
        <Link
          href="/fleet"
          className="inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink transition-colors mb-8 font-medium"
        >
          ← 차량 목록
        </Link>

        {/* 본문 2컬럼 */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

          {/* 좌: 이미지 */}
          <div
            className="relative rounded-[22px] overflow-hidden border border-[var(--line)]"
            style={{ background: "linear-gradient(135deg,#f0f4fa,#e4ebf5)", aspectRatio: "4/3" }}
          >
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "44%", background: "linear-gradient(120deg,#2f6be6,#4f86f0)", clipPath: "polygon(0 42%,100% 0,100% 100%,0 100%)", opacity: 0.12 }} />

            <div className="relative z-[1] w-full h-full flex items-center justify-center p-[9%]">
              {car.thumbnail ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={car.thumbnail} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                <CarSvg category={car.category} />
              )}
            </div>

            {car.label && (
              <div className="absolute top-4 left-4 z-[2]">
                {isHot ? (
                  <span style={{ fontSize: "12px", fontWeight: 800, padding: "6px 13px", borderRadius: "8px", background: "var(--color-blue)", color: "#fff" }}>{car.label}</span>
                ) : isSale ? (
                  <span style={{ fontSize: "12px", fontWeight: 800, padding: "6px 13px", borderRadius: "8px", background: "var(--color-red)", color: "#fff" }}>{car.label}</span>
                ) : (
                  <span style={{ fontSize: "12px", fontWeight: 800, padding: "6px 13px", borderRadius: "8px", background: "rgba(255,255,255,.94)", color: "var(--color-ink)", boxShadow: "0 2px 6px rgba(26,34,51,.12)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-green)" }} />
                    {car.label}
                  </span>
                )}
              </div>
            )}

            <div className="absolute bottom-4 right-4 z-[2] text-[12px] text-ink-dim bg-[rgba(255,255,255,.82)] backdrop-blur-sm rounded-full px-[12px] py-[6px] border border-[var(--line)]">
              이미지 교체 예정
            </div>
          </div>

          {/* 우: 정보 */}
          <div>
            {/* 카테고리 */}
            <div className="text-[14px] text-blue font-semibold mb-2">{car.category}</div>

            {/* 차량명 — 40px+, 800 weight */}
            <h1 style={{ fontSize: "clamp(36px,4.5vw,48px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15, color: "var(--color-ink)" }}>
              {car.name}
              {car.nameEn && (
                <small style={{ fontSize: "clamp(15px,1.5vw,18px)", color: "var(--color-ink-dim)", fontWeight: 500, marginLeft: "10px", verticalAlign: "middle" }}>
                  {car.nameEn}
                </small>
              )}
            </h1>

            {/* 가격 박스 */}
            <div style={{ marginTop: "20px", padding: "20px 22px", borderRadius: "16px", background: "rgba(47,107,230,.05)", border: "1px solid rgba(47,107,230,.18)" }}>
              <div style={{ fontSize: "13px", color: "var(--color-ink-dim)", marginBottom: "6px" }}>월 장기렌트 시작가</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2px", lineHeight: 1 }}>
                <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-ink)" }}>약</span>
                <span style={{ fontSize: "44px", fontWeight: 800, color: "var(--color-blue)", marginLeft: "5px" }}>{car.monthlyPrice}</span>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-ink)", marginLeft: "3px" }}>만원~</span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-ink-dim)", marginTop: "8px" }}>
                * 실제 금액은 조건에 따라 달라질 수 있습니다
              </div>
            </div>

            {/* 스펙 테이블 */}
            <div className="mt-6 rounded-[16px] overflow-hidden border border-[var(--line)]">
              {specRows.map((pair, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`${pair.length === 2 ? "grid grid-cols-2" : ""} border-b border-[var(--line)] last:border-0`}
                  style={{ background: rowIdx % 2 === 0 ? "#f4f6fa" : "#ffffff" }}
                >
                  {pair.map((spec, colIdx) => (
                    <div
                      key={spec.label}
                      className={colIdx === 0 && pair.length === 2 ? "border-r border-[var(--line)]" : ""}
                      style={{ padding: "20px 24px" }}
                    >
                      <div style={{ fontSize: "12px", color: "var(--color-ink-dim)", marginBottom: "7px", fontWeight: 500 }}>{spec.label}</div>
                      <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-ink)" }}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* 설명 */}
            {car.description && (
              <div className="mt-8 pb-8 border-b border-[var(--line)]">
                <p style={{ fontSize: "15px", color: "var(--color-ink-soft)", lineHeight: 1.85, wordBreak: "keep-all" }}>
                  {car.description}
                </p>
              </div>
            )}

            {/* 포함 옵션 — 기능 항목 강조 */}
            {car.options && (
              <div style={{ marginTop: car.description ? "28px" : "28px", padding: "22px 24px", borderRadius: "14px", border: "1px solid rgba(47,107,230,.18)", background: "rgba(47,107,230,.04)" }}>
                <div style={{ fontSize: "12px", color: "var(--color-blue)", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.06em", textTransform: "uppercase" }}>포함 옵션</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
                  {car.options.split(",").map((opt) => (
                    <span
                      key={opt.trim()}
                      style={{
                        fontSize: "13.5px",
                        color: "var(--color-blue)",
                        background: "rgba(47,107,230,.09)",
                        border: "1px solid rgba(47,107,230,.22)",
                        borderRadius: "9px",
                        padding: "8px 14px",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg viewBox="0 0 12 10" width="11" fill="none" style={{ flexShrink: 0 }}>
                        <polyline points="1 5 4.5 8.5 11 1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {opt.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA 버튼 — 높이 52px+, 16px 굵게 */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 font-black text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
                style={{
                  padding: "18px 24px",
                  borderRadius: "14px",
                  fontSize: "17px",
                  background: "linear-gradient(135deg,#4f86f0,#2f6be6)",
                  boxShadow: "0 8px 24px rgba(47,107,230,.3)",
                  textDecoration: "none",
                }}
              >
                <svg viewBox="0 0 24 24" width="20" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
                </svg>
                전화 상담
              </a>
              <Link
                href="/#consult"
                className="flex-1 inline-flex items-center justify-center gap-2 font-bold text-blue bg-white transition-all duration-200 hover:bg-blue hover:text-white"
                style={{
                  padding: "18px 24px",
                  borderRadius: "14px",
                  fontSize: "17px",
                  border: "2px solid var(--color-blue)",
                  textDecoration: "none",
                }}
              >
                온라인 상담 신청
              </Link>
            </div>
          </div>
        </div>

        {/* 다른 차량 둘러보기 — 실제 카드 */}
        {related.length > 0 && (
          <div className="mt-[72px] pt-[56px] border-t border-[var(--line)]">
            <div className="flex items-center justify-between mb-2">
              <h2 style={{ fontSize: "22px", fontWeight: 800 }}>다른 차량 둘러보기</h2>
              <Link href="/fleet" className="text-[14px] text-blue font-semibold hover:underline">
                전체 보기 →
              </Link>
            </div>
            <p className="text-ink-dim text-[14px] mb-8">
              {car.category} 외 다양한 차종을 확인해보세요.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(c => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
