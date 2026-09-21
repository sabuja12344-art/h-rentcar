export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteReview, toggleReviewActive } from "@/app/actions/reviews";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "후기 관리 | 어드민" };

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-black">후기 관리</h1>
          <p className="text-ink-dim text-[13px] mt-1">총 {reviews.length}개</p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[10px] text-[13px] font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold hover:brightness-105 transition-all"
        >
          + 후기 추가
        </Link>
      </div>

      <div className="bg-panel border border-[var(--line)] rounded-[14px] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--line)]">
              {["순서", "이니셜", "이름", "별점", "후기 내용", "상태", ""].map((h) => (
                <th key={h} className="text-left text-[11px] text-ink-dim font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink-dim text-[13px]">
                  등록된 후기가 없습니다.
                </td>
              </tr>
            )}
            {reviews.map((review) => {
              const toggleAction = toggleReviewActive.bind(null, review.id, review.isActive);
              const deleteAction = deleteReview.bind(null, review.id);

              return (
                <tr key={review.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="py-3 px-4 text-[12px] text-ink-dim w-[60px]">{review.sortOrder}</td>
                  <td className="py-3 px-4">
                    <div
                      className="w-[30px] h-[30px] rounded-full grid place-items-center text-white font-black text-[13px]"
                      style={{ background: "linear-gradient(135deg,#5ea6ff,#3d8bff)" }}
                    >
                      {review.initial}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-[13px] font-semibold">{review.name}</div>
                    {review.detail && <div className="text-[11px] text-ink-dim">{review.detail}</div>}
                  </td>
                  <td className="py-3 px-4 text-[13px] text-cyan">{"★".repeat(review.stars)}</td>
                  <td className="py-3 px-4 text-[12px] text-ink-soft max-w-[240px] truncate" title={review.text}>
                    {review.text}
                  </td>
                  <td className="py-3 px-4">
                    <form action={toggleAction}>
                      <button
                        type="submit"
                        className={`text-[11px] font-semibold px-[10px] py-[4px] rounded-full transition-colors ${
                          review.isActive
                            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                            : "bg-[rgba(255,255,255,0.06)] text-ink-dim hover:bg-[rgba(255,255,255,0.1)]"
                        }`}
                      >
                        {review.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/reviews/${review.id}/edit`}
                        className="text-[12px] text-ink-soft hover:text-gold-soft transition-colors"
                      >
                        수정
                      </Link>
                      <DeleteButton action={deleteAction} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
