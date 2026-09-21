export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteReview, toggleReviewActive } from "@/app/actions/reviews";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "후기 관리 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "11px", color: "#94a3b8", fontWeight: 600, padding: "10px 16px", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "12px 16px", fontSize: "13px", color: "#374151", borderBottom: "1px solid #f1f5f9" };

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>후기 관리</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>총 {reviews.length}개</p>
        </div>
        <Link
          href="/admin/reviews/new"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, background: "#2563eb", color: "#fff", textDecoration: "none" }}
        >
          + 후기 추가
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["순서", "이니셜", "이름", "별점", "후기 내용", "상태", ""].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 && (
              <tr>
                <td colSpan={7} style={{ ...td, textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  등록된 후기가 없습니다.
                </td>
              </tr>
            )}
            {reviews.map((review) => {
              const toggleAction = toggleReviewActive.bind(null, review.id, review.isActive);
              const deleteAction = deleteReview.bind(null, review.id);
              return (
                <tr key={review.id} style={{ background: "#fff" }}>
                  <td style={{ ...td, color: "#94a3b8", width: "60px" }}>{review.sortOrder}</td>
                  <td style={td}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: "13px", background: "linear-gradient(135deg,#60a5fa,#2563eb)" }}>
                      {review.initial}
                    </div>
                  </td>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{review.name}</div>
                    {review.detail && <div style={{ fontSize: "11px", color: "#94a3b8" }}>{review.detail}</div>}
                  </td>
                  <td style={{ ...td, color: "#f59e0b" }}>{"★".repeat(review.stars)}</td>
                  <td style={{ ...td, maxWidth: "240px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", color: "#64748b" }} title={review.text}>
                      {review.text}
                    </div>
                  </td>
                  <td style={td}>
                    <form action={toggleAction}>
                      <button
                        type="submit"
                        style={{
                          fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: "none", cursor: "pointer",
                          background: review.isActive ? "#dcfce7" : "#f1f5f9",
                          color: review.isActive ? "#16a34a" : "#94a3b8",
                        }}
                      >
                        {review.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Link href={`/admin/reviews/${review.id}/edit`} style={{ fontSize: "12px", color: "#64748b", textDecoration: "none" }}>수정</Link>
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
