import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarSvg } from "@/components/fleet/CarSvg";

export async function PromoSection() {
  /* [특가 차량] — 할인 라벨 우선, 없으면 전체 중 상위 4개 */
  const saleFirst = await prisma.car.findMany({
    where: { isActive: true, label: { contains: "할인" } },
    orderBy: { sortOrder: "asc" },
    take: 4,
  });

  const cars =
    saleFirst.length >= 2
      ? saleFirst
      : await prisma.car.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          take: 4,
        });

  if (cars.length === 0) return null;

  const [featured, ...rest] = cars;
  const listCars = rest.slice(0, 3);
  const isSaleBadge = featured.label?.includes("할인");
  const isHotBadge = featured.label === "인기";

  return (
    <section className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        {/* 헤더 */}
        <div className="sec-header">
          <div className="text-[13px] font-bold text-blue tracking-[.14em] uppercase mb-3">
            Special Offer
          </div>
          <h2 className="sec-h2">이달의 특가 차량</h2>
          <p className="text-ink-soft text-[16px] mt-3">
            지금 바로 출고 가능한 할인 차량을 먼저 만나보세요.
          </p>
        </div>

        {/* 메인 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-stretch" style={{ gap: "24px" }}>

          {/* ── 좌: 메인 특가 카드 ── */}
          <Link href={`/fleet/${featured.id}`} className="promo-featured group relative rounded-[20px] overflow-hidden flex flex-col" style={{ textDecoration: "none", minHeight: "340px" }}>
            {/* 배경 */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg,#1a3a7a 0%,#2256d4 55%,#2f6be6 100%)" }} />
            {/* 장식 서클 */}
            <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
            <div style={{ position: "absolute", right: "60px", bottom: "-80px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />

            {/* 배지 */}
            {featured.label && (
              <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 2 }}>
                {isSaleBadge ? (
                  <span style={{ fontSize: "12px", fontWeight: 800, padding: "6px 13px", borderRadius: "8px", background: "var(--color-red)", color: "#fff" }}>{featured.label}</span>
                ) : isHotBadge ? (
                  <span style={{ fontSize: "12px", fontWeight: 800, padding: "6px 13px", borderRadius: "8px", background: "rgba(255,255,255,.2)", color: "#fff" }}>{featured.label}</span>
                ) : (
                  <span style={{ fontSize: "12px", fontWeight: 800, padding: "6px 13px", borderRadius: "8px", background: "var(--color-green)", color: "#fff" }}>{featured.label}</span>
                )}
              </div>
            )}

            {/* 차량 이미지 */}
            <div className="transition-transform duration-300 group-hover:scale-[1.04]" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px 10px", position: "relative", zIndex: 1 }}>
              {featured.thumbnail ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={featured.thumbnail} alt={featured.name} style={{ maxHeight: "240px", objectFit: "contain", filter: "drop-shadow(0 16px 32px rgba(0,0,0,.35))" }} />
              ) : (
                <div style={{ width: "100%", maxWidth: "460px", filter: "drop-shadow(0 16px 32px rgba(0,0,0,.35))" }}>
                  <CarSvg category={featured.category} />
                </div>
              )}
            </div>

            {/* 정보 */}
            <div style={{ padding: "20px 28px 28px", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,.65)", marginBottom: "6px", fontWeight: 600 }}>{featured.category}</div>
              <div style={{ fontSize: "clamp(22px,2.5vw,28px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                {featured.name}
                {featured.nameEn && <small style={{ fontSize: "14px", opacity: 0.6, fontWeight: 500, marginLeft: "8px" }}>{featured.nameEn}</small>}
              </div>
              <div style={{ marginTop: "14px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,.55)", marginBottom: "3px" }}>월 장기렌트</div>
                  <div style={{ fontSize: "clamp(28px,3vw,36px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                    약 <span style={{ color: "#a8d0ff" }}>{featured.monthlyPrice}</span>
                    <small style={{ fontSize: "16px", fontWeight: 600, opacity: 0.7, marginLeft: "2px" }}>만원~</small>
                  </div>
                </div>
                <div style={{ padding: "10px 18px", borderRadius: "10px", background: "rgba(255,255,255,.18)", color: "#fff", fontSize: "13px", fontWeight: 700, border: "1px solid rgba(255,255,255,.25)", whiteSpace: "nowrap" }}>
                  견적 보기 →
                </div>
              </div>
            </div>
          </Link>

          {/* ── 우: 소형 특가 리스트 ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {listCars.map(car => {
              const sale = car.label?.includes("할인");
              const hot = car.label === "인기";
              return (
                <Link key={car.id} href={`/fleet/${car.id}`} className="promo-list-item group flex items-center gap-4 glass rounded-[16px]" style={{ padding: "18px 20px", textDecoration: "none", flex: "1 1 0" }}>
                  {/* 미니 이미지 — 어두운 파랑 bg로 SVG가 잘 보임 */}
                  <div style={{ width: "90px", height: "72px", flexShrink: 0, borderRadius: "10px", background: "linear-gradient(135deg,#2256d4,#3d74ee)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <div className="transition-transform duration-300 group-hover:scale-[1.08]" style={{ width: "76px" }}>
                      {car.thumbnail ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={car.thumbnail} alt={car.name} style={{ width: "100%", objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,.3))" }} />
                      ) : (
                        <CarSvg category={car.category} />
                      )}
                    </div>
                  </div>
                  {/* 정보 */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ marginBottom: "5px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px", background: sale ? "var(--color-red)" : hot ? "var(--color-blue)" : "rgba(47,107,230,.08)", color: (sale || hot) ? "#fff" : "var(--color-blue)" }}>
                        {car.label ?? car.category}
                      </span>
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{car.name}</div>
                    <div style={{ fontSize: "13px", color: "var(--color-ink-dim)", marginTop: "3px" }}>
                      약 <span style={{ color: "var(--color-blue)", fontWeight: 700 }}>{car.monthlyPrice}</span>만원~
                    </div>
                  </div>
                  <div style={{ color: "var(--color-ink-dim)", fontSize: "18px", flexShrink: 0 }}>→</div>
                </Link>
              );
            })}

            <Link href="/fleet" className="promo-go-btn flex items-center justify-center gap-2 rounded-[16px] border border-[var(--line-strong)] text-[14px] font-bold text-blue transition-all duration-150" style={{ padding: "16px", flex: "0 0 auto" }}>
              전체 차량 보기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
