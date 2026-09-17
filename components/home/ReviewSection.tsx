import { prisma } from "@/lib/prisma";

export async function ReviewSection() {
  const reviews = await prisma.review.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  if (reviews.length === 0) return null;

  return (
    <section className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-[38px]">
          <div>
            <div className="text-[12.5px] font-bold text-cyan tracking-[.14em] uppercase mb-[10px]">Review</div>
            <h2 className="text-[clamp(24px,3.1vw,34px)] font-black tracking-[-0.02em]">
              고객이 남긴 실제 후기
            </h2>
            <p className="text-ink-soft text-[15px] mt-[10px]">현대렌트카와 함께한 고객들의 이야기입니다.</p>
          </div>
          <a href="#consult" className="text-[14px] text-blue-bright font-semibold whitespace-nowrap shrink-0">
            후기 더 보기 →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.id} className="glass rounded-[18px] p-6">
              <div className="text-cyan text-[14px] tracking-[2px]">{"★".repeat(r.stars)}</div>
              <p className="text-[14px] text-ink-soft leading-[1.75] my-[14px] line-clamp-4">{r.text}</p>
              <div className="flex items-center gap-[10px] border-t border-[var(--line)] pt-[14px]">
                <div
                  className="w-[34px] h-[34px] rounded-full grid place-items-center text-white font-black text-[14px] shrink-0"
                  style={{ background: "linear-gradient(135deg,#5ea6ff,#3d8bff)" }}
                >
                  {r.initial}
                </div>
                <div>
                  <b className="text-[13.5px] font-bold block">{r.name}</b>
                  {r.detail && <span className="text-[12px] text-ink-dim">{r.detail}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
