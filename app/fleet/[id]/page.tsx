import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarSvg } from "@/components/fleet/CarSvg";
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
    title: `${car.name} 월 장기렌트 | H-RENT CAR`,
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

  const specs: { label: string; value: string }[] = [
    { label: "차종", value: car.category },
    ...(car.fuel ? [{ label: "연료", value: car.fuel }] : []),
    ...(car.seats ? [{ label: "인승", value: `${car.seats}인승` }] : []),
    ...(car.year ? [{ label: "연식", value: car.year }] : []),
    ...(car.mileage ? [{ label: "주행거리", value: car.mileage }] : []),
    ...(car.contractTerms ? [{ label: "계약기간", value: car.contractTerms }] : []),
    ...(car.deposit ? [{ label: "보증금", value: car.deposit }] : []),
  ];

  return (
    <main className="pt-[56px] sm:pt-[80px] pb-[80px] sm:pb-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* 뒤로 */}
        <Link
          href="/fleet"
          className="inline-flex items-center gap-2 text-[13px] text-ink-dim hover:text-ink transition-colors mb-8"
        >
          ← 차량 목록
        </Link>

        {/* 본문 */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* 좌: 이미지 영역 */}
          <div
            className="relative rounded-[22px] overflow-hidden aspect-[4/3] border border-[var(--line-strong)] grid place-items-center"
            style={{
              background: "linear-gradient(160deg, #1a2740 0%, #0e1626 60%, #0a111e 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(80% 70% at 55% 45%, rgba(200,161,90,0.18), transparent 65%)",
              }}
            />
            <div className="relative w-full flex items-center justify-center p-[10%]">
              <CarSvg category={car.category} />
            </div>
            {car.label && (
              <div className="absolute top-4 left-4 bg-gold text-[#1a1305] text-[12px] font-bold px-[12px] py-[5px] rounded-full shadow-[0_4px_12px_rgba(200,161,90,0.4)]">
                {car.label}
              </div>
            )}
            <div className="absolute bottom-4 right-4 text-[11px] text-ink-dim bg-[rgba(7,11,19,0.6)] backdrop-blur-sm rounded-full px-[12px] py-[6px] border border-[var(--line)]">
              이미지 교체 예정
            </div>
          </div>

          {/* 우: 정보 */}
          <div>
            <div className="text-[13px] text-gold-soft font-semibold mb-2">{car.category}</div>
            <h1 className="text-[clamp(28px,3.5vw,40px)] font-black tracking-[-0.025em] leading-[1.15]">
              {car.name}
              {car.nameEn && (
                <small className="text-[16px] text-ink-dim font-medium ml-[8px] align-middle">
                  {car.nameEn}
                </small>
              )}
            </h1>

            {/* 가격 */}
            <div className="mt-6 p-5 rounded-[14px] bg-[rgba(200,161,90,0.06)] border border-[rgba(200,161,90,0.2)]">
              <div className="text-[12px] text-ink-dim">월 장기렌트 시작가</div>
              <div className="text-[32px] font-black text-ink mt-1">
                약{" "}
                <span className="text-gold-soft">{car.monthlyPrice}</span>
                <small className="text-[16px] text-ink-soft font-semibold">만원~</small>
              </div>
              <div className="text-[12px] text-ink-dim mt-1">
                * 실제 금액은 조건에 따라 달라질 수 있습니다
              </div>
            </div>

            {/* 스펙 */}
            <div className="mt-6 grid grid-cols-2 gap-[1px] rounded-[12px] overflow-hidden border border-[var(--line)]">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`px-4 py-[13px] bg-panel-2 ${i % 2 === 0 ? "" : ""}`}
                >
                  <div className="text-[11px] text-ink-dim">{spec.label}</div>
                  <div className="text-[14px] font-semibold mt-[3px]">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* 설명 */}
            {car.description && (
              <p className="mt-6 text-[14px] text-ink-soft leading-[1.75]">{car.description}</p>
            )}

            {/* 주요 옵션 */}
            {car.options && (
              <div className="mt-5">
                <div className="text-[12px] text-ink-dim font-semibold mb-2">주요 옵션</div>
                <div className="flex flex-wrap gap-2">
                  {car.options.split(",").map((opt) => (
                    <span
                      key={opt.trim()}
                      className="text-[12px] text-ink-soft bg-[rgba(255,255,255,0.06)] border border-[var(--line)] rounded-full px-[11px] py-[5px]"
                    >
                      {opt.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-[15px] rounded-btn font-bold text-[15px] text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold shadow-[0_8px_24px_rgba(200,161,90,0.28)] hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(200,161,90,0.4)] transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" width="18" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
                </svg>
                전화 상담
              </a>
              <Link
                href="/#consult"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-[15px] rounded-btn font-bold text-[15px] text-ink border border-[var(--line-strong)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.07)] hover:border-gold transition-all duration-200"
              >
                온라인 상담 신청
              </Link>
            </div>
          </div>
        </div>

        {/* 하단: 다른 차량 */}
        <div className="mt-[70px] pt-[50px] border-t border-[var(--line)]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[18px] font-bold">다른 차량 둘러보기</h2>
            <Link href="/fleet" className="text-[13px] text-gold-soft font-semibold hover:underline">
              전체 보기 →
            </Link>
          </div>
          <p className="text-ink-dim text-[13px] mb-6">더 많은 차량을 확인해보세요.</p>
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-[14px] text-ink border border-[var(--line-strong)] px-5 py-3 rounded-btn hover:border-gold transition-colors"
          >
            ← 차량 목록으로
          </Link>
        </div>
      </div>
    </main>
  );
}
