import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/fleet/CarCard";

export async function FleetSection() {
  /* 홈 추천 차량: 중형 세단·SUV·승합 중 "인기" 라벨 3종 (그랜저·싼타페·카니발) */
  const cars = await prisma.car.findMany({
    where: {
      isActive: true,
      label: "인기",
      category: { in: ["중형/대형 세단", "SUV", "승합/미니밴", "수입/프리미엄"] },
    },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  return (
    <section id="fleet" className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sec-header">
          <div>
            <div className="text-[13px] font-bold text-blue tracking-[.14em] uppercase mb-3">
              Popular
            </div>
            <h2 className="sec-h2">
              맞춤 견적 차량 추천
            </h2>
            <p className="text-ink-soft text-[16px] mt-3">
              가장 많이 문의하는 차량입니다. 전 차종은 차량안내에서 확인하세요.
            </p>
          </div>
          <Link
            href="/fleet"
            className="text-[15px] text-blue-bright font-semibold whitespace-nowrap shrink-0"
          >
            전체 차량 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
