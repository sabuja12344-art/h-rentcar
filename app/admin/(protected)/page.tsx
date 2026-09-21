export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "대시보드 | 어드민" };

const S = {
  card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 24px" } as React.CSSProperties,
  th: { textAlign: "left" as const, fontSize: "12px", color: "#94a3b8", fontWeight: 600, padding: "10px 16px", borderBottom: "1px solid #e5e7eb" },
  td: { padding: "12px 16px", fontSize: "13px", color: "#374151", borderBottom: "1px solid #f1f5f9" },
};

export default async function AdminDashboard() {
  const [totalCars, activeCars, totalInquiries, newInquiries, recentInquiries] =
    await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { isActive: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "전체 차량", value: totalCars, href: "/admin/cars", color: "#0f172a" },
    { label: "활성 차량", value: activeCars, href: "/admin/cars", color: "#2563eb" },
    { label: "전체 상담", value: totalInquiries, href: "/admin/inquiries", color: "#0f172a" },
    { label: "신규 상담", value: newInquiries, href: "/admin/inquiries", color: newInquiries > 0 ? "#dc2626" : "#94a3b8", highlight: newInquiries > 0 },
  ];

  const statusLabel: Record<string, string> = { NEW: "신규", IN_PROGRESS: "처리중", DONE: "완료" };
  const statusStyle: Record<string, React.CSSProperties> = {
    NEW: { background: "#eff6ff", color: "#2563eb" },
    IN_PROGRESS: { background: "#fefce8", color: "#ca8a04" },
    DONE: { background: "#f1f5f9", color: "#94a3b8" },
  };

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>대시보드</h1>
        <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>현대렌트카 관리 현황</p>
      </div>

      {/* 통계 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "32px" }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ ...S.card, textDecoration: "none", border: s.highlight ? "1px solid #fecaca" : "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600, marginBottom: "8px" }}>{s.label}</div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
          </Link>
        ))}
      </div>

      {/* 최근 상담 */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>최근 상담</h2>
          <Link href="/admin/inquiries" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "none" }}>전체 보기 →</Link>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
          {recentInquiries.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>접수된 상담이 없습니다.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["이름", "연락처", "희망 차종", "상태", "접수일"].map(h => <th key={h} style={S.th}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} style={{ background: "#fff" }}>
                    <td style={S.td}><span style={{ fontWeight: 600 }}>{inq.name}</span></td>
                    <td style={S.td}>{inq.phone}</td>
                    <td style={S.td}>{inq.carInterest || "—"}</td>
                    <td style={S.td}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", ...(statusStyle[inq.status] ?? statusStyle.DONE) }}>
                        {statusLabel[inq.status] ?? inq.status}
                      </span>
                    </td>
                    <td style={{ ...S.td, color: "#94a3b8" }}>{inq.createdAt.toLocaleDateString("ko-KR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
