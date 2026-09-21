export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBanner, toggleBannerActive } from "@/app/actions/banners";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "배너 관리 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "13px", color: "#64748b", fontWeight: 600, padding: "13px 16px", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "14px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" };

const LABELS: Record<string, string> = { compact: "경차", sedan: "세단", suv: "SUV", van: "승합·미니밴" };

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>배너 관리</h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>히어로 슬라이드 배너를 관리합니다. 총 {banners.length}개</p>
        </div>
        <Link href="/admin/banners/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "11px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, background: "#2563eb", color: "#fff", textDecoration: "none" }}>
          + 배너 추가
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["순서", "칩 라벨", "가격", "문구", "차종", "상태", ""].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {banners.length === 0 && (
              <tr><td colSpan={7} style={{ ...td, textAlign: "center", padding: "56px", color: "#94a3b8" }}>등록된 배너가 없습니다.</td></tr>
            )}
            {banners.map((b) => {
              const toggleAction = toggleBannerActive.bind(null, b.id, b.isActive);
              const deleteAction = deleteBanner.bind(null, b.id);
              return (
                <tr key={b.id}>
                  <td style={{ ...td, color: "#94a3b8", width: "60px" }}>{b.sortOrder}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{b.chipLabel}</td>
                  <td style={{ ...td, fontWeight: 700, color: "#2563eb" }}>{b.chipPrice}</td>
                  <td style={{ ...td, maxWidth: "200px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#64748b" }}>{b.caption || "—"}</div>
                  </td>
                  <td style={{ ...td, color: "#64748b" }}>{LABELS[b.carType] ?? b.carType}</td>
                  <td style={td}>
                    <form action={toggleAction}>
                      <button type="submit" style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: "none", cursor: "pointer", background: b.isActive ? "#dcfce7" : "#f1f5f9", color: b.isActive ? "#16a34a" : "#94a3b8" }}>
                        {b.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <Link href={`/admin/banners/${b.id}/edit`} style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>수정</Link>
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
