export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { updateCategory } from "@/app/actions/categories";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "카테고리 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "13px", color: "#64748b", fontWeight: 600, padding: "13px 16px", borderBottom: "1px solid #e2e8f0" };
const td: React.CSSProperties = { padding: "12px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: "8px", fontSize: "14px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", height: "38px", width: "100%", boxSizing: "border-box" };

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>카테고리 관리</h1>
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>표시명과 정렬 순서만 수정 가능합니다. 슬러그(차종 식별자)는 변경할 수 없습니다.</p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["슬러그 (고정)", "표시명", "정렬 순서", ""].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr><td colSpan={4} style={{ ...td, textAlign: "center", padding: "48px", color: "#94a3b8" }}>카테고리가 없습니다. 아래 Supabase SQL로 초기 데이터를 추가하세요.</td></tr>
            )}
            {categories.map((cat) => {
              const action = async (fd: FormData) => {
                "use server";
                const label = fd.get("label") as string;
                const sortOrder = Number(fd.get("sortOrder") || 0);
                await updateCategory(cat.id, label, sortOrder);
              };
              return (
                <tr key={cat.id}>
                  <td style={td}><code style={{ background: "#f1f5f9", padding: "3px 8px", borderRadius: "5px", fontSize: "13px", color: "#475569" }}>{cat.slug}</code></td>
                  <td style={td}>
                    <form id={`cat-${cat.id}`} action={action} />
                    <input form={`cat-${cat.id}`} name="label" type="text" defaultValue={cat.label} style={inp} />
                  </td>
                  <td style={{ ...td, width: "120px" }}>
                    <input form={`cat-${cat.id}`} name="sortOrder" type="number" defaultValue={cat.sortOrder} style={{ ...inp, width: "80px" }} />
                  </td>
                  <td style={{ ...td, width: "80px" }}>
                    <button form={`cat-${cat.id}`} type="submit" style={{ padding: "7px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}>
                      저장
                    </button>
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
