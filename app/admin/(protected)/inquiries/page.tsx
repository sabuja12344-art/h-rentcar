export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { updateInquiryStatus, deleteInquiry } from "@/app/actions/inquiries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "상담 문의 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "13px", color: "#64748b", fontWeight: 600, padding: "13px 16px", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "14px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" };

const STATUS_OPTIONS = [
  { value: "NEW", label: "신규", bg: "#eff6ff", color: "#2563eb" },
  { value: "IN_PROGRESS", label: "상담중", bg: "#fefce8", color: "#ca8a04" },
  { value: "DONE", label: "완료", bg: "#f0fdf4", color: "#16a34a" },
];

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = inquiries.filter((i) => i.status === "NEW").length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>상담 문의</h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            총 {inquiries.length}건
            {newCount > 0 && <span style={{ marginLeft: "10px", color: "#ef4444", fontWeight: 700 }}>신규 {newCount}건 미처리</span>}
          </p>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "auto", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["접수일", "유입경로", "이름", "연락처", "희망 차종", "문의 내용", "상태", "삭제"].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 && (
              <tr><td colSpan={8} style={{ ...td, textAlign: "center", padding: "56px", color: "#94a3b8" }}>접수된 상담이 없습니다.</td></tr>
            )}
            {inquiries.map((inq) => {
              const currentStatus = STATUS_OPTIONS.find(s => s.value === inq.status) ?? STATUS_OPTIONS[0];
              const deleteAction = deleteInquiry.bind(null, inq.id);
              const changeStatusAction = async (fd: FormData) => {
                "use server";
                const status = fd.get("status") as string;
                await updateInquiryStatus(inq.id, status);
              };

              return (
                <tr key={inq.id}>
                  <td style={{ ...td, color: "#94a3b8", whiteSpace: "nowrap" }}>
                    <div>{inq.createdAt.toLocaleDateString("ko-KR")}</div>
                    <div style={{ fontSize: "12px" }}>{inq.createdAt.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
                  </td>
                  <td style={td}>
                    <span style={{ fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: "#f1f5f9", color: "#64748b" }}>
                      {inq.type || "일반폼"}
                    </span>
                  </td>
                  <td style={{ ...td, fontWeight: 700 }}>{inq.name}</td>
                  <td style={td}>
                    <a href={`tel:${inq.phone}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>{inq.phone}</a>
                  </td>
                  <td style={{ ...td, color: "#64748b" }}>{inq.carInterest || "—"}</td>
                  <td style={{ ...td, maxWidth: "200px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "13px", color: "#64748b" }} title={inq.message ?? ""}>{inq.message || "—"}</div>
                  </td>
                  <td style={td}>
                    <form action={changeStatusAction}>
                      <select
                        name="status"
                        defaultValue={inq.status}
                        onChange={e => { e.currentTarget.form?.requestSubmit(); }}
                        style={{ padding: "5px 10px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, border: "1px solid #e2e8f0", cursor: "pointer", background: currentStatus.bg, color: currentStatus.color, outline: "none" }}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </form>
                  </td>
                  <td style={td}>
                    <form action={deleteAction} onSubmit={undefined}>
                      <button type="submit" style={{ fontSize: "13px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: "6px" }}
                        onClick={e => { if (!confirm("정말 삭제할까요?")) e.preventDefault(); }}>
                        삭제
                      </button>
                    </form>
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
