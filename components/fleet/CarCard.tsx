import Link from "next/link";
import type { Car } from "@prisma/client";
import { CarSvg } from "./CarSvg";

export function CarCard({ car }: { car: Car }) {
  const hasLabel = car.label !== null;
  const badgeText = car.label ?? car.category;
  const badgeClass = hasLabel
    ? "bg-gold text-[#1a1305]"
    : "bg-[rgba(255,255,255,0.12)] text-ink backdrop-blur-sm";

  return (
    <Link
      href={`/fleet/${car.id}`}
      className="group relative rounded-card overflow-hidden border border-[var(--line)] bg-gradient-to-b from-panel to-panel-2 transition-all duration-200 hover:-translate-y-[6px] hover:border-[rgba(200,161,90,0.4)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] block"
    >
      <span
        className={`absolute top-[14px] left-[14px] z-10 text-[11px] font-bold tracking-[0.02em] px-[11px] py-[5px] rounded-full ${badgeClass}`}
      >
        {badgeText}
      </span>

      <div
        className="h-[172px] grid place-items-center"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 30%, rgba(200,161,90,0.08), transparent 70%)",
        }}
      >
        <CarSvg category={car.category} />
      </div>

      <div className="px-[22px] pt-5 pb-6">
        <div className="text-[12px] text-gold-soft font-semibold">{car.category}</div>
        <div className="text-[23px] font-black mt-[5px] tracking-[-0.01em]">
          {car.name}
          {car.nameEn && (
            <small className="text-[14px] text-ink-dim font-medium ml-[6px]">{car.nameEn}</small>
          )}
        </div>
        <div className="flex gap-[14px] mt-[14px] flex-wrap">
          {car.seats && <span className="text-[12px] text-ink-soft">◦ {car.seats}인승</span>}
          {car.fuel && <span className="text-[12px] text-ink-soft">◦ {car.fuel}</span>}
          {car.year && <span className="text-[12px] text-ink-soft">◦ {car.year}</span>}
        </div>
        <div className="flex items-end justify-between mt-5 pt-[18px] border-t border-[var(--line)]">
          <div>
            <div className="text-[11px] text-ink-dim">월 장기렌트</div>
            <div className="text-[22px] font-black text-ink">
              약{" "}
              <span className="text-gold-soft">{car.monthlyPrice}</span>
              <small className="text-[13px] text-ink-soft font-semibold">만원~</small>
            </div>
          </div>
          <div className="w-[42px] h-[42px] rounded-[11px] border border-[var(--line-strong)] grid place-items-center text-ink-soft transition-all duration-200 group-hover:bg-gold group-hover:text-[#1a1305] group-hover:border-gold">
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
