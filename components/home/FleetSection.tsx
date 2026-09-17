import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/fleet/CarCard";

export async function FleetSection() {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  return (
    <section id="fleet" className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-[38px]">
          <div>
            <div className="text-[12.5px] font-bold text-cyan tracking-[.14em] uppercase mb-[10px]">
              Popular
            </div>
            <h2 className="text-[clamp(24px,3.1vw,34px)] font-black tracking-[-0.02em]">
              맞춤 견적 차량 추천
            </h2>
            <p className="text-ink-soft text-[15px] mt-[10px]">
              가장 많이 문의하는 차량입니다. 전 차종은 차량안내에서 확인하세요.
            </p>
          </div>
          <Link
            href="/fleet"
            className="text-[14px] text-blue-bright font-semibold whitespace-nowrap shrink-0 hover:underline"
          >
            전체 차량 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
