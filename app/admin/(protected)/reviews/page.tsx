export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteReview, toggleReviewActive } from "@/app/actions/reviews";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "후기 관리 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "13px", color: "#64748b", fontWeight: 600, padding: "13px 16px", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "14px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" };

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>후기 관리</h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>총 {reviews.length}개</p>
        </div>
        <Link href="/admin/reviews/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "11px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, background: "#2563eb", color: "#fff", textDecoration: "none" }}>
          + 후기 추가
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["순서", "아바타", "이름", "별점", "후기 내용", "상태", ""].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 && (
              <tr><td colSpan={7} style={{ ...td, textAlign: "center", padding: "56px", color: "#94a3b8" }}>등록된 후기가 없습니다.</td></tr>
            )}
            {reviews.map((r) => {
              const toggleAction = toggleReviewActive.bind(null, r.id, r.isActive);
              const deleteAction = deleteReview.bind(null, r.id);
              return (
                <tr key={r.id}>
                  <td style={{ ...td, color: "#94a3b8", width: "60px" }}>{r.sortOrder}</td>
                  <td style={td}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: "14px", background: "linear-gradient(135deg,#60a5fa,#2563eb)" }}>{r.initial}</div>
                  </td>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                    {r.detail && <div style={{ fontSize: "12px", color: "#94a3b8" }}>{r.detail}</div>}
                  </td>
                  <td style={{ ...td, color: "#f59e0b", fontSize: "16px" }}>{"★".repeat(r.stars)}</td>
                  <td style={{ ...td, maxWidth: "260px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "13px", color: "#64748b" }} title={r.text}>{r.text}</div>
                  </td>
                  <td style={td}>
                    <form action={toggleAction}>
                      <button type="submit" style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: "none", cursor: "pointer", background: r.isActive ? "#dcfce7" : "#f1f5f9", color: r.isActive ? "#16a34a" : "#94a3b8" }}>
                        {r.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <Link href={`/admin/reviews/${r.id}/edit`} style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>수정</Link>
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
