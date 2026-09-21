export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "대시보드 | 어드민" };

export default async function AdminDashboard() {
  const [totalCars, activeCars, totalInquiries, newInquiries, totalBanners, totalReviews, recentInquiries] =
    await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { isActive: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.banner.count({ where: { isActive: true } }),
      prisma.review.count({ where: { isActive: true } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "전체 차량", value: totalCars, href: "/admin/cars", color: "text-ink" },
    { label: "활성 차량", value: activeCars, href: "/admin/cars", color: "text-gold-soft" },
    { label: "전체 상담", value: totalInquiries, href: "/admin/inquiries", color: "text-ink" },
    {
      label: "신규 상담",
      value: newInquiries,
      href: "/admin/inquiries",
      color: newInquiries > 0 ? "text-gold" : "text-ink-dim",
      highlight: newInquiries > 0,
    },
    { label: "활성 배너", value: totalBanners, href: "/admin/banners", color: "text-cyan" },
    { label: "활성 후기", value: totalReviews, href: "/admin/reviews", color: "text-blue-400" },
  ];

  const statusLabel: Record<string, string> = {
    NEW: "신규",
    IN_PROGRESS: "처리중",
    DONE: "완료",
  };
  const statusColor: Record<string, string> = {
    NEW: "bg-gold/10 text-gold",
    IN_PROGRESS: "bg-blue-500/10 text-blue-400",
    DONE: "bg-[rgba(255,255,255,0.06)] text-ink-dim",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-black">대시보드</h1>
        <p className="text-ink-dim text-[13px] mt-1">현대렌트카 관리 현황</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`bg-panel border rounded-[14px] p-5 hover:border-[rgba(200,161,90,0.3)] transition-colors ${
              s.highlight ? "border-[rgba(200,161,90,0.25)]" : "border-[var(--line)]"
            }`}
          >
            <div className="text-[11px] text-ink-dim font-semibold uppercase tracking-wide">
              {s.label}
            </div>
            <div className={`text-[32px] font-black mt-1 ${s.color}`}>{s.value}</div>
          </Link>
        ))}
      </div>

      {/* 최근 상담 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold">최근 상담</h2>
          <Link href="/admin/inquiries" className="text-[12px] text-gold-soft hover:underline">
            전체 보기 →
          </Link>
        </div>
        {recentInquiries.length === 0 ? (
          <div className="bg-panel border border-[var(--line)] rounded-[12px] p-8 text-center text-ink-dim text-[13px]">
            접수된 상담이 없습니다.
          </div>
        ) : (
          <div className="bg-panel border border-[var(--line)] rounded-[12px] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  {["이름", "연락처", "희망 차종", "상태", "일시"].map((h) => (
                    <th key={h} className="text-left text-[11px] text-ink-dim font-semibold uppercase py-3 px-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="py-3 px-4 text-[13px] font-medium">{inq.name}</td>
                    <td className="py-3 px-4 text-[13px] text-ink-soft">{inq.phone}</td>
                    <td className="py-3 px-4 text-[13px] text-ink-soft">{inq.carInterest || "—"}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-semibold px-[10px] py-[4px] rounded-full ${statusColor[inq.status] ?? ""}`}>
                        {statusLabel[inq.status] ?? inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[12px] text-ink-dim">
                      {inq.createdAt.toLocaleDateString("ko-KR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
