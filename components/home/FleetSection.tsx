import Link from "next/link";
import { popularCars, type CarStub, type CarCategory } from "@/data/cars";

function CarSvgPlaceholder({ category }: { category: CarCategory }) {
  const cls = "w-4/5 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]";
  if (category === "세단") {
    return (
      <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
        <ellipse cx="130" cy="102" rx="112" ry="9" fill="rgba(0,0,0,.4)" />
        <path d="M26 78 Q40 46 92 40 Q118 22 168 22 Q214 24 236 52 L246 60 Q252 64 252 74 L252 80 Q252 86 244 86 L38 86 Q26 86 26 78Z" fill="#e8ecf2" />
        <path d="M100 40 Q120 26 165 26 Q198 28 214 50 L180 50 Q140 46 112 48Z" fill="#9fb0c8" />
        <circle cx="82" cy="86" r="17" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
        <circle cx="196" cy="86" r="17" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
      </svg>
    );
  }
  if (category === "SUV") {
    return (
      <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
        <ellipse cx="130" cy="102" rx="112" ry="9" fill="rgba(0,0,0,.4)" />
        <path d="M24 74 Q34 40 78 34 L100 20 Q120 14 180 16 Q220 18 240 46 L248 58 Q252 62 252 72 L252 80 Q252 86 244 86 L36 86 Q24 86 24 74Z" fill="#e8ecf2" />
        <path d="M86 34 L102 22 Q122 18 172 20 Q206 22 222 44 L180 44 Q130 40 100 42Z" fill="#9fb0c8" />
        <circle cx="80" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
        <circle cx="198" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="130" cy="102" rx="112" ry="9" fill="rgba(0,0,0,.4)" />
      <path d="M22 72 Q30 36 70 30 L90 18 Q108 12 186 14 Q226 16 244 44 L250 58 Q252 64 252 72 L252 80 Q252 86 244 86 L34 86 Q22 86 22 72Z" fill="#e8ecf2" />
      <path d="M78 30 L94 20 Q112 16 182 18 Q214 20 230 42 L96 42Z" fill="#9fb0c8" />
      <circle cx="78" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
      <circle cx="200" cy="86" r="18" fill="#0c121e" stroke="#5a6478" strokeWidth="4" />
    </svg>
  );
}

function CarCard({ car }: { car: CarStub }) {
  const hasLabel = car.label !== null;
  const badgeText = car.label ?? car.category;
  const badgeClass = hasLabel
    ? "bg-gold text-[#1a1305]"
    : "bg-[rgba(255,255,255,0.12)] text-ink backdrop-blur-sm";

  return (
    <article className="group relative rounded-card overflow-hidden border border-[var(--line)] bg-gradient-to-b from-panel to-panel-2 transition-all duration-200 hover:-translate-y-[6px] hover:border-[rgba(200,161,90,0.4)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
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
        <CarSvgPlaceholder category={car.category} />
      </div>

      <div className="px-[22px] pt-5 pb-6">
        <div className="text-[12px] text-gold-soft font-semibold">{car.category}</div>
        <div className="text-[23px] font-black mt-[5px] tracking-[-0.01em]">
          {car.name}
          <small className="text-[14px] text-ink-dim font-medium ml-[6px]">{car.nameEn}</small>
        </div>
        <div className="flex gap-[14px] mt-[14px] flex-wrap">
          <span className="text-[12px] text-ink-soft">◦ {car.seats}인승</span>
          <span className="text-[12px] text-ink-soft">◦ {car.fuel}</span>
          <span className="text-[12px] text-ink-soft">◦ {car.year}</span>
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
    </article>
  );
}

export function FleetSection() {
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
          {popularCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}