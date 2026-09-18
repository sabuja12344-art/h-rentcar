import Link from "next/link";
import type { Car } from "@prisma/client";
import { CarSvg } from "./CarSvg";

export function CarCard({ car }: { car: Car }) {
  const hasLabel = car.label !== null;
  const badgeText = car.label ?? car.category;

  return (
    <Link
      href={`/fleet/${car.id}`}
      className="group relative rounded-[18px] overflow-hidden bg-[var(--glass-bg)] border border-[rgba(255,255,255,.12)] [backdrop-filter:blur(16px)] [-webkit-backdrop-filter:blur(16px)] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition-all duration-200 hover:-translate-y-[6px] hover:border-[rgba(94,166,255,.5)] hover:shadow-[0_22px_46px_rgba(0,0,0,.45)] block"
    >
      {/* 뱃지 */}
      <span
        className={`absolute top-[13px] left-[13px] z-10 text-[11px] font-bold tracking-[0.02em] px-[11px] py-[5px] rounded-full ${
          hasLabel
            ? "text-white [background:linear-gradient(135deg,#5ea6ff,#3d8bff)]"
            : "bg-[rgba(255,255,255,.14)] text-ink backdrop-blur-sm border border-[var(--glass-line)]"
        }`}
      >
        {badgeText}
      </span>

      {/* 차량 이미지 */}
      <div
        className="h-[196px] grid place-items-center overflow-hidden"
        style={{
          background:
            car.category === "수입/프리미엄"
              ? "radial-gradient(130% 130% at 50% 30%, rgba(140,100,220,.14), rgba(61,139,255,.06) 60%, transparent 80%)"
              : car.category === "SUV"
              ? "radial-gradient(130% 130% at 50% 30%, rgba(61,180,120,.12), rgba(61,139,255,.06) 60%, transparent 80%)"
              : car.category === "승합/미니밴"
              ? "radial-gradient(130% 130% at 50% 30%, rgba(220,130,60,.12), rgba(61,139,255,.06) 60%, transparent 80%)"
              : "radial-gradient(130% 130% at 50% 30%, rgba(61,139,255,.14), transparent 72%)",
        }}
      >
        <CarSvg category={car.category} />
      </div>

      {/* 카드 내용 */}
      <div className="px-[22px] pt-5 pb-[22px]">
        <div className="text-[12px] text-cyan font-semibold">{car.category}</div>
        <div className="text-[22px] font-black mt-1 tracking-[-0.01em]">
          {car.name}
          {car.nameEn && (
            <small className="text-[13px] text-ink-dim font-medium ml-[6px]">{car.nameEn}</small>
          )}
        </div>
        <div className="flex gap-[6px] mt-3 flex-wrap">
          {car.seats && (
            <span className="text-[12px] text-ink-soft bg-[rgba(255,255,255,.05)] border border-[var(--line)] rounded-[6px] px-2 py-1">
              {car.seats}인승
            </span>
          )}
          {car.fuel && (
            <span className="text-[12px] text-ink-soft bg-[rgba(255,255,255,.05)] border border-[var(--line)] rounded-[6px] px-2 py-1">
              {car.fuel}
            </span>
          )}
          {car.year && (
            <span className="text-[12px] text-ink-soft bg-[rgba(255,255,255,.05)] border border-[var(--line)] rounded-[6px] px-2 py-1">
              {car.year}
            </span>
          )}
        </div>
        <div className="flex items-end justify-between mt-[18px] pt-4 border-t border-[var(--line)]">
          <div>
            <div className="text-[11px] text-ink-dim">월 장기렌트</div>
            <div className="text-[21px] font-black text-ink">
              약 <span className="text-blue-bright">{car.monthlyPrice}</span>
              <small className="text-[13px] text-ink-soft font-semibold">만원~</small>
            </div>
          </div>
          <div className="w-[40px] h-[40px] rounded-[10px] border border-[var(--line-strong)] grid place-items-center text-ink-soft transition-all duration-150 group-hover:bg-blue group-hover:text-white group-hover:border-blue">
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
