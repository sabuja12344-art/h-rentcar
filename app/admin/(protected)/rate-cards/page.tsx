export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { createRateCard, updateRateCard, deleteRateCard } from "@/app/actions/rate-cards";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "요금표 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "13px", color: "#64748b", fontWeight: 600, padding: "13px 16px", borderBottom: "1px solid #e2e8f0" };
const td: React.CSSProperties = { padding: "12px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: "8px", fontSize: "14px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", height: "38px", boxSizing: "border-box" };

export default async function AdminRateCardsPage() {
  const items = await prisma.rateCard.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>요금표 관리</h1>
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>월 렌트 시작가를 비우면 "전화문의"로 표시됩니다.</p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.04)", marginBottom: "24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["항목명", "월 렌트 시작가 (원)", "정렬 순서", ""].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={4} style={{ ...td, textAlign: "center", padding: "48px", color: "#94a3b8" }}>등록된 요금 항목이 없습니다. 아래에서 추가하세요.</td></tr>
            )}
            {items.map((item) => {
              const updateAction = async (fd: FormData) => {
                "use server";
                await updateRateCard(item.id, fd);
              };
              const deleteAction = deleteRateCard.bind(null, item.id);
              return (
                <tr key={item.id}>
                  <td style={td}>
                    <form id={`rc-${item.id}`} action={updateAction} />
                    <input form={`rc-${item.id}`} name="name" type="text" defaultValue={item.name} style={{ ...inp, width: "200px" }} />
                  </td>
                  <td style={td}>
                    <input form={`rc-${item.id}`} name="startingPrice" type="number" placeholder="비우면 전화문의" defaultValue={item.startingPrice ?? ""} style={{ ...inp, width: "180px" }} />
                  </td>
                  <td style={{ ...td, width: "120px" }}>
                    <input form={`rc-${item.id}`} name="sortOrder" type="number" defaultValue={item.sortOrder} style={{ ...inp, width: "80px" }} />
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button form={`rc-${item.id}`} type="submit" style={{ padding: "7px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}>저장</button>
                      <form action={deleteAction} onSubmit={undefined}>
                        <button type="submit" style={{ padding: "7px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", cursor: "pointer" }}
                          onClick={e => { if (!confirm("삭제할까요?")) e.preventDefault(); }}>삭제</button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 새 항목 추가 */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>새 항목 추가</div>
        <form action={createRateCard} style={{ display: "flex", gap: "12px", alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#64748b", fontWeight: 600, marginBottom: "6px" }}>항목명 *</label>
            <input name="name" type="text" placeholder="예: 경차 장기렌트" style={{ ...inp, width: "200px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#64748b", fontWeight: 600, marginBottom: "6px" }}>시작가 (원, 비우면 전화문의)</label>
            <input name="startingPrice" type="number" placeholder="240000" style={{ ...inp, width: "200px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#64748b", fontWeight: 600, marginBottom: "6px" }}>정렬 순서</label>
            <input name="sortOrder" type="number" defaultValue={0} style={{ ...inp, width: "90px" }} />
          </div>
          <button type="submit" style={{ padding: "9px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", height: "38px" }}>
            + 추가
          </button>
        </form>
      </div>
    </div>
  );
}
