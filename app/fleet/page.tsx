import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/fleet/CarCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "차량 안내 | H-RENT CAR",
  description: "광주 월 장기렌트 가능한 전 차종을 확인하세요. 세단, SUV, 승합, 경차, 전기차 라인업.",
};

const CATEGORIES = ["세단", "SUV", "승합·미니밴", "경차", "전기·친환경"] as const;

export default async function FleetPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const cars = await prisma.car.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="pt-[60px] sm:pt-[88px] pb-[80px] sm:pb-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* 헤더 */}
        <div className="mb-10">
          <div className="text-[13px] text-gold-soft font-semibold mb-3">VEHICLE LINEUP</div>
          <h1 className="text-[clamp(28px,3.8vw,44px)] font-black tracking-[-0.025em] leading-[1.15]">
            차량 안내
          </h1>
          <p className="text-ink-soft text-[15px] mt-3 max-w-[44ch] leading-[1.7]">
            광주 월 장기렌트 가능한 전 차종입니다. 원하는 차종을 선택 후 상담을 신청하세요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-2 flex-wrap mb-10 pb-10 border-b border-[var(--line)]">
          <Link
            href="/fleet"
            className={`px-[18px] py-[9px] rounded-full text-[13px] font-semibold border transition-colors duration-150 ${
              !category
                ? "bg-gold text-[#1a1305] border-gold"
                : "border-[var(--line-strong)] text-ink-soft hover:border-gold hover:text-gold-soft"
            }`}
          >
            전체 ({!category ? cars.length : "·"})
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/fleet?category=${encodeURIComponent(cat)}`}
              className={`px-[18px] py-[9px] rounded-full text-[13px] font-semibold border transition-colors duration-150 ${
                category === cat
                  ? "bg-gold text-[#1a1305] border-gold"
                  : "border-[var(--line-strong)] text-ink-soft hover:border-gold hover:text-gold-soft"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* 검색 결과 카운트 */}
        {category && (
          <div className="mb-6 text-[14px] text-ink-dim">
            <span className="text-gold-soft font-semibold">{category}</span> 차량{" "}
            {cars.length}종
          </div>
        )}

        {/* 차량 그리드 */}
        {cars.length === 0 ? (
          <div className="py-[100px] text-center">
            <div className="text-[40px] mb-4">🔍</div>
            <div className="text-ink-soft text-[16px]">해당 카테고리 차량이 없습니다.</div>
            <Link
              href="/fleet"
              className="inline-block mt-6 text-[13px] text-gold-soft underline underline-offset-2"
            >
              전체 차량 보기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        {/* 하단 상담 배너 */}
        <div className="mt-[60px] sm:mt-[80px] rounded-[20px] border border-[var(--line-strong)] bg-[rgba(200,161,90,0.06)] p-[28px] sm:p-[36px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="font-bold text-[17px]">원하는 차량이 없으신가요?</div>
            <div className="text-ink-soft text-[14px] mt-1">
              요청 차종 맞춤 견적 상담 가능합니다.
            </div>
          </div>
          <Link
            href="/#consult"
            className="shrink-0 inline-flex items-center gap-2 px-[24px] py-[12px] rounded-btn text-[14px] font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold hover:-translate-y-px transition-all duration-200"
          >
            상담 신청하기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
