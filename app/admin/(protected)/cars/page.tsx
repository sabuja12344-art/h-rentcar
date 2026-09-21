export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toggleCarActive, toggleCarFeatured } from "@/app/actions/cars";
import { DeleteCarButton } from "@/components/admin/DeleteCarButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "차량 관리 | 어드민" };

const th: React.CSSProperties = { textAlign: "left", fontSize: "13px", color: "#64748b", fontWeight: 600, padding: "13px 16px", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "14px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" };

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>차량 관리</h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>총 {cars.length}종 등록됨</p>
        </div>
        <Link href="/admin/cars/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "11px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, background: "#2563eb", color: "#fff", textDecoration: "none" }}>
          + 차량 추가
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["순서", "차량명", "차종", "월렌트료", "라벨", "추천", "상태", ""].map((h) => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 && (
              <tr><td colSpan={8} style={{ ...td, textAlign: "center", padding: "56px", color: "#94a3b8" }}>등록된 차량이 없습니다.</td></tr>
            )}
            {cars.map((car) => {
              const toggleActive = toggleCarActive.bind(null, car.id, car.isActive);
              const toggleFeatured = toggleCarFeatured.bind(null, car.id, car.isFeatured);
              return (
                <tr key={car.id} style={{ background: "#fff" }}>
                  <td style={{ ...td, color: "#94a3b8", width: "60px" }}>{car.sortOrder}</td>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{car.name}</div>
                    {car.nameEn && <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{car.nameEn}</div>}
                  </td>
                  <td style={{ ...td, color: "#64748b" }}>{car.category}</td>
                  <td style={{ ...td, fontWeight: 700, color: "#2563eb" }}>{car.monthlyPrice}만원~</td>
                  <td style={td}>
                    {car.label ? (
                      <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: "#eff6ff", color: "#2563eb" }}>{car.label}</span>
                    ) : <span style={{ color: "#cbd5e1" }}>—</span>}
                  </td>
                  <td style={td}>
                    <form action={toggleFeatured}>
                      <button type="submit" style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: "none", cursor: "pointer", background: car.isFeatured ? "#fefce8" : "#f1f5f9", color: car.isFeatured ? "#ca8a04" : "#94a3b8" }}>
                        {car.isFeatured ? "★ 추천" : "미설정"}
                      </button>
                    </form>
                  </td>
                  <td style={td}>
                    <form action={toggleActive}>
                      <button type="submit" style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: "none", cursor: "pointer", background: car.isActive ? "#dcfce7" : "#f1f5f9", color: car.isActive ? "#16a34a" : "#94a3b8" }}>
                        {car.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Link href={`/admin/cars/${car.id}/edit`} style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>수정</Link>
                      <DeleteCarButton id={car.id} name={car.name} />
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
