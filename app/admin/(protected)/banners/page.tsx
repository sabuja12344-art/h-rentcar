export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBanner, toggleBannerActive } from "@/app/actions/banners";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "배너 관리 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "11px", color: "#94a3b8", fontWeight: 600, padding: "10px 16px", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "12px 16px", fontSize: "13px", color: "#374151", borderBottom: "1px solid #f1f5f9" };

const CAR_TYPE_LABELS: Record<string, string> = {
  compact: "경차", sedan: "세단", suv: "SUV", van: "승합·미니밴",
};

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>배너 관리</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>총 {banners.length}개</p>
        </div>
        <Link
          href="/admin/banners/new"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, background: "#2563eb", color: "#fff", textDecoration: "none" }}
        >
          + 배너 추가
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["순서", "칩 라벨", "가격", "문구", "차종", "상태", ""].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {banners.length === 0 && (
              <tr>
                <td colSpan={7} style={{ ...td, textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  등록된 배너가 없습니다.
                </td>
              </tr>
            )}
            {banners.map((banner) => {
              const toggleAction = toggleBannerActive.bind(null, banner.id, banner.isActive);
              const deleteAction = deleteBanner.bind(null, banner.id);
              return (
                <tr key={banner.id} style={{ background: "#fff" }}>
                  <td style={{ ...td, color: "#94a3b8", width: "60px" }}>{banner.sortOrder}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{banner.chipLabel}</td>
                  <td style={{ ...td, fontWeight: 600, color: "#2563eb" }}>{banner.chipPrice}</td>
                  <td style={{ ...td, maxWidth: "200px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#64748b" }}>
                      {banner.caption || "—"}
                    </div>
                  </td>
                  <td style={{ ...td, color: "#64748b" }}>{CAR_TYPE_LABELS[banner.carType] ?? banner.carType}</td>
                  <td style={td}>
                    <form action={toggleAction}>
                      <button
                        type="submit"
                        style={{
                          fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: "none", cursor: "pointer",
                          background: banner.isActive ? "#dcfce7" : "#f1f5f9",
                          color: banner.isActive ? "#16a34a" : "#94a3b8",
                        }}
                      >
                        {banner.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Link href={`/admin/banners/${banner.id}/edit`} style={{ fontSize: "12px", color: "#64748b", textDecoration: "none" }}>수정</Link>
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
