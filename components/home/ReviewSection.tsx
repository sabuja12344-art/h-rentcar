import { prisma } from "@/lib/prisma";

export async function ReviewSection() {
  const reviews = await prisma.review.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  if (reviews.length === 0) return null;

  return (
    <section className="section-py section-soft border-t border-[var(--line)]">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sec-header">
          <div>
            <div className="text-[13px] font-bold text-blue tracking-[.14em] uppercase mb-3">Review</div>
            <h2 className="sec-h2">
              고객이 남긴 실제 후기
            </h2>
            <p className="text-ink-soft text-[16px] mt-3">H-RENT CAR와 함께한 고객들의 이야기입니다.</p>
          </div>
          <a href="#consult" className="text-[15px] text-blue-bright font-semibold whitespace-nowrap shrink-0">
            후기 더 보기 →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch" style={{ gap: "20px" }}>
          {reviews.map((r) => (
            <div key={r.id} className="glass rounded-[18px] flex flex-col" style={{ padding: "24px" }}>
              <div className="text-[14px] tracking-[2px]" style={{ color: "#f5a623" }}>{"★".repeat(r.stars)}</div>
              <p className="text-[14px] text-ink-soft leading-[1.75] line-clamp-4 flex-1" style={{ margin: "14px 0 18px" }}>{r.text}</p>
              <div className="flex items-center gap-[10px] border-t border-[var(--line)] pt-[14px]">
                <div
                  className="w-[34px] h-[34px] rounded-full grid place-items-center text-white font-black text-[14px] shrink-0"
                  style={{ background: "linear-gradient(135deg,#4f86f0,#2f6be6)" }}
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
