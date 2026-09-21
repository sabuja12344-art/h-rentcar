export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "대시보드 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "13px", color: "#64748b", fontWeight: 600, padding: "12px 16px", borderBottom: "1px solid #e2e8f0" };
const td: React.CSSProperties = { padding: "14px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" };

function StatCard({ label, value, icon, color, href }: { label: string; value: number; icon: React.ReactNode; color: string; href: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", display: "flex", alignItems: "flex-start", gap: "16px", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
      <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: color + "18", display: "grid", placeItems: "center", color, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>{label}</div>
      </div>
    </Link>
  );
}

export default async function AdminDashboard() {
  const [totalCars, activeCars, featuredCars, totalInquiries, newInquiries, activeBanners, activeReviews, recentInquiries] =
    await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { isActive: true } }),
      prisma.car.count({ where: { isFeatured: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.banner.count({ where: { isActive: true } }),
      prisma.review.count({ where: { isActive: true } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "등록 차량", value: totalCars, color: "#2563eb", href: "/admin/cars", icon: <svg viewBox="0 0 20 20" width="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13l1.5-5h9L16 13" /><rect x="3" y="13" width="14" height="3.5" rx="1" /><circle cx="6.5" cy="16.5" r="1" fill="currentColor" stroke="none" /><circle cx="13.5" cy="16.5" r="1" fill="currentColor" stroke="none" /></svg> },
    { label: "활성 차량", value: activeCars, color: "#16a34a", href: "/admin/cars", icon: <svg viewBox="0 0 20 20" width="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 10l4 4 6-8" /></svg> },
    { label: "추천 차량", value: featuredCars, color: "#f59e0b", href: "/admin/cars", icon: <svg viewBox="0 0 20 20" width="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.4l-4.8 2.5.9-5.4L2.2 7.7l5.4-.8z" /></svg> },
    { label: "전체 상담", value: totalInquiries, color: "#8b5cf6", href: "/admin/inquiries", icon: <svg viewBox="0 0 20 20" width="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h14v9H3z" /><path d="M7 17l3-4 3 4" /></svg> },
    { label: "신규 상담", value: newInquiries, color: newInquiries > 0 ? "#ef4444" : "#94a3b8", href: "/admin/inquiries", icon: <svg viewBox="0 0 20 20" width="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="10" cy="10" r="7" /><path d="M10 7v3.5l2 2" /></svg> },
    { label: "활성 배너", value: activeBanners, color: "#0ea5e9", href: "/admin/banners", icon: <svg viewBox="0 0 20 20" width="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="5" width="16" height="10" rx="1.5" /><path d="M2 8h16" /></svg> },
  ];

  const statusLabel: Record<string, string> = { NEW: "신규", IN_PROGRESS: "상담중", DONE: "완료" };
  const statusStyle: Record<string, React.CSSProperties> = {
    NEW: { background: "#eff6ff", color: "#2563eb" },
    IN_PROGRESS: { background: "#fefce8", color: "#ca8a04" },
    DONE: { background: "#f1f5f9", color: "#94a3b8" },
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>대시보드</h1>
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>현대렌트카 관리 현황을 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px" }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* 최근 상담 */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>최근 상담</h2>
          <Link href="/admin/inquiries" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>전체 보기 →</Link>
        </div>
        {recentInquiries.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>접수된 상담이 없습니다.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["이름", "연락처", "희망 차종", "상태", "접수일"].map(h => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id}>
                  <td style={{ ...td, fontWeight: 600 }}>{inq.name}</td>
                  <td style={td}>{inq.phone}</td>
                  <td style={{ ...td, color: "#64748b" }}>{inq.carInterest || "—"}</td>
                  <td style={td}>
                    <span style={{ fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", ...(statusStyle[inq.status] ?? statusStyle.DONE) }}>
                      {statusLabel[inq.status] ?? inq.status}
                    </span>
                  </td>
                  <td style={{ ...td, color: "#94a3b8" }}>{inq.createdAt.toLocaleDateString("ko-KR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
