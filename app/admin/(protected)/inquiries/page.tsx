export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { updateInquiryStatus } from "@/app/actions/inquiries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "상담 목록 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "11px", color: "#94a3b8", fontWeight: 600, padding: "10px 16px", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "12px 16px", fontSize: "13px", color: "#374151", borderBottom: "1px solid #f1f5f9" };

const STATUS_FLOW: Record<string, { label: string; next: string; nextLabel: string; bg: string; color: string }> = {
  NEW: { label: "신규", next: "IN_PROGRESS", nextLabel: "→ 처리중", bg: "#eff6ff", color: "#2563eb" },
  IN_PROGRESS: { label: "처리중", next: "DONE", nextLabel: "→ 완료", bg: "#fefce8", color: "#ca8a04" },
  DONE: { label: "완료", next: "NEW", nextLabel: "→ 재개", bg: "#f1f5f9", color: "#94a3b8" },
};

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = inquiries.filter((i) => i.status === "NEW").length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>상담 목록</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
            총 {inquiries.length}건
            {newCount > 0 && <span style={{ marginLeft: "8px", color: "#dc2626", fontWeight: 600 }}>신규 {newCount}건</span>}
          </p>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr>
              {["접수일", "이름", "연락처", "희망 차종", "문의 유형", "문의 내용", "상태"].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={7} style={{ ...td, textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  접수된 상담이 없습니다.
                </td>
              </tr>
            )}
            {inquiries.map((inq) => {
              const s = STATUS_FLOW[inq.status] ?? STATUS_FLOW.NEW;
              const nextAction = updateInquiryStatus.bind(null, inq.id, s.next);
              return (
                <tr key={inq.id} style={{ background: "#fff" }}>
                  <td style={{ ...td, color: "#94a3b8", whiteSpace: "nowrap" }}>
                    <div>{inq.createdAt.toLocaleDateString("ko-KR")}</div>
                    <div style={{ fontSize: "11px" }}>{inq.createdAt.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
                  </td>
                  <td style={{ ...td, fontWeight: 600 }}>{inq.name}</td>
                  <td style={td}>
                    <a href={`tel:${inq.phone}`} style={{ color: "#374151", textDecoration: "none" }}>{inq.phone}</a>
                  </td>
                  <td style={{ ...td, color: "#64748b" }}>{inq.carInterest || "—"}</td>
                  <td style={td}>
                    {inq.type ? (
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: "#f0fdf4", color: "#16a34a" }}>
                        {inq.type}
                      </span>
                    ) : <span style={{ color: "#94a3b8" }}>—</span>}
                  </td>
                  <td style={{ ...td, maxWidth: "180px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", color: "#64748b" }} title={inq.message ?? ""}>
                      {inq.message || "—"}
                    </div>
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                      <form action={nextAction}>
                        <button type="submit" style={{ fontSize: "10px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                          {s.nextLabel}
                        </button>
                      </form>
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
