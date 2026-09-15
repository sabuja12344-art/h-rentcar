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
    <section id="fleet" className="py-[60px] sm:py-[88px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex items-end justify-between gap-5 mb-[42px] flex-wrap">
          <div>
            <h2 className="text-[clamp(26px,3.4vw,38px)] font-black tracking-[-0.02em]">
              인기 차량 맞춤 견적
            </h2>
            <p className="text-ink-soft text-[15px] mt-2">
              가장 문의가 많은 차량입니다. 전 차종은 차량안내에서 확인하세요.
            </p>
          </div>
          <Link
            href="/fleet"
            className="text-[14px] text-gold-soft font-semibold inline-flex items-center gap-[6px] shrink-0"
          >
            전체 차량 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
