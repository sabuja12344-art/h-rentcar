import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/fleet/CarCard";
import { CAR_CATEGORIES, PRICE_FILTERS, SEAT_FILTERS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "차량 안내",
  description: "광주 월 장기렌트 가능한 전 차종. 경차부터 수입/프리미엄까지 120여 종.",
};

type SearchParams = {
  category?: string;
  price?: string;
  seats?: string;
};

function activeBtn(active: boolean) {
  return active
    ? "bg-blue border-blue text-white"
    : "border-[var(--line-strong)] text-ink-soft hover:border-blue-bright hover:text-blue-bright";
}

export default async function FleetPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category, price, seats } = await searchParams;

  const priceRange = PRICE_FILTERS.find(p => p.key === price);
  const seatRange = SEAT_FILTERS.find(s => s.key === seats);

  const cars = await prisma.car.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
      ...(priceRange ? { monthlyPrice: { gte: priceRange.min, lte: priceRange.max } } : {}),
      ...(seatRange ? { seats: { gte: seatRange.min, lte: seatRange.max } } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  function filterHref(overrides: Partial<SearchParams>) {
    const params = new URLSearchParams();
    const merged = { category, price, seats, ...overrides };
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v); });
    const s = params.toString();
    return `/fleet${s ? "?" + s : ""}`;
  }

  return (
    <main className="fleet-main">
      <div className="wrap">
        {/* 헤더 */}
        <div className="mb-10">
          <div className="text-[12.5px] font-bold text-blue tracking-[.14em] uppercase mb-[10px]">VEHICLE LINEUP</div>
          <h1 className="text-[clamp(28px,3.8vw,44px)] font-black tracking-[-0.025em] leading-[1.15]">
            차량 안내
          </h1>
          <p className="text-ink-soft text-[15px] mt-3 max-w-[44ch] leading-[1.7]" style={{ wordBreak: "keep-all" }}>
            현대렌트카의 전 차종입니다. 원하는 차종을 선택 후 상담을 신청하세요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div style={{ marginBottom: "16px" }}>
          <div className="text-[11.5px] text-ink-dim font-semibold uppercase tracking-wider" style={{ marginBottom: "10px" }}>차종</div>
          <div className="flex gap-2 flex-wrap">
            <Link
              href={filterHref({ category: undefined })}
              className={`filter-btn rounded-full text-[13px] font-semibold border transition-colors duration-150 ${activeBtn(!category)}`}
            >
              전체
            </Link>
            {CAR_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={filterHref({ category: cat })}
                className={`filter-btn rounded-full text-[13px] font-semibold border transition-colors duration-150 ${activeBtn(category === cat)}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* 가격 필터 */}
        <div style={{ marginBottom: "16px" }}>
          <div className="text-[11.5px] text-ink-dim font-semibold uppercase tracking-wider" style={{ marginBottom: "10px" }}>월 렌트료</div>
          <div className="flex gap-2 flex-wrap">
            <Link
              href={filterHref({ price: undefined })}
              className={`filter-btn rounded-full text-[13px] font-semibold border transition-colors duration-150 ${activeBtn(!price)}`}
            >
              전체
            </Link>
            {PRICE_FILTERS.map((p) => (
              <Link
                key={p.key}
                href={filterHref({ price: p.key })}
                className={`filter-btn rounded-full text-[13px] font-semibold border transition-colors duration-150 ${activeBtn(price === p.key)}`}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 인원 필터 */}
        <div className="border-b border-[var(--line)]" style={{ marginBottom: "28px", paddingBottom: "16px" }}>
          <div className="text-[11.5px] text-ink-dim font-semibold uppercase tracking-wider" style={{ marginBottom: "10px" }}>인원</div>
          <div className="flex gap-2 flex-wrap">
            <Link
              href={filterHref({ seats: undefined })}
              className={`filter-btn rounded-full text-[13px] font-semibold border transition-colors duration-150 ${activeBtn(!seats)}`}
            >
              전체
            </Link>
            {SEAT_FILTERS.map((s) => (
              <Link
                key={s.key}
                href={filterHref({ seats: s.key })}
                className={`filter-btn rounded-full text-[13px] font-semibold border transition-colors duration-150 ${activeBtn(seats === s.key)}`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 결과 카운트 */}
        <div className="mb-6 text-[14px] text-ink-dim">
          <span className="text-ink font-semibold">{cars.length}종</span> 차량
          {category && <span className="ml-1 text-blue-bright">· {category}</span>}
          {price && <span className="ml-1 text-blue-bright">· 월 {PRICE_FILTERS.find(p => p.key === price)?.label}</span>}
          {seats && <span className="ml-1 text-blue-bright">· {SEAT_FILTERS.find(s => s.key === seats)?.label}</span>}
        </div>

        {/* 차량 그리드 */}
        {cars.length === 0 ? (
          <div className="py-[100px] text-center">
            <div className="text-[40px] mb-4">🔍</div>
            <div className="text-ink-soft text-[16px]">해당 조건의 차량이 없습니다.</div>
            <Link
              href="/fleet"
              className="inline-block mt-6 text-[13px] text-blue-bright underline underline-offset-2"
            >
              전체 차량 보기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        {/* 하단 상담 배너 */}
        <div
          className="mt-[60px] sm:mt-[80px] rounded-[20px] border border-[var(--line)] p-[28px] sm:p-[36px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ background: "rgba(47,107,230,.06)" }}
        >
          <div>
            <div className="font-bold text-[17px]">원하는 차량이 없으신가요?</div>
            <div className="text-ink-soft text-[14px] mt-1">
              요청 차종 맞춤 견적 상담이 가능합니다.
            </div>
          </div>
          <Link
            href="/#consult"
            className="shrink-0 inline-flex items-center gap-2 px-[24px] py-[12px] rounded-[12px] text-[14px] font-bold text-white transition-all duration-150 hover:-translate-y-[2px]"
            style={{ background: "linear-gradient(135deg,#4f86f0,#2f6be6)", boxShadow: "0 8px 22px rgba(47,107,230,.3)" }}
          >
            상담 신청하기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
