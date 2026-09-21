export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toggleCarActive } from "@/app/actions/cars";
import { DeleteCarButton } from "@/components/admin/DeleteCarButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "차량 관리 | 어드민" };

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-black">차량 관리</h1>
          <p className="text-ink-dim text-[13px] mt-1">총 {cars.length}종</p>
        </div>
        <Link
          href="/admin/cars/new"
          className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[10px] text-[13px] font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold hover:brightness-105 transition-all"
        >
          + 차량 추가
        </Link>
      </div>

      <div className="bg-panel border border-[var(--line)] rounded-[14px] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--line)]">
              {["순서", "차량명", "차종", "월렌트료", "라벨", "상태", ""].map((h) => (
                <th key={h} className="text-left text-[11px] text-ink-dim font-semibold uppercase tracking-wide py-3 px-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink-dim text-[13px]">
                  등록된 차량이 없습니다.
                </td>
              </tr>
            )}
            {cars.map((car) => {
              const toggleAction = toggleCarActive.bind(null, car.id, car.isActive);

              return (
                <tr key={car.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="py-3 px-4 text-[12px] text-ink-dim w-[60px]">{car.sortOrder}</td>
                  <td className="py-3 px-4">
                    <div className="text-[13px] font-semibold">{car.name}</div>
                    {car.nameEn && <div className="text-[11px] text-ink-dim">{car.nameEn}</div>}
                  </td>
                  <td className="py-3 px-4 text-[13px] text-ink-soft">{car.category}</td>
                  <td className="py-3 px-4 text-[13px] font-semibold text-gold-soft">{car.monthlyPrice}만원~</td>
                  <td className="py-3 px-4">
                    {car.label ? (
                      <span className="text-[11px] font-bold px-[9px] py-[3px] rounded-full bg-gold/10 text-gold">
                        {car.label}
                      </span>
                    ) : (
                      <span className="text-[11px] text-ink-dim">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <form action={toggleAction}>
                      <button
                        type="submit"
                        className={`text-[11px] font-semibold px-[10px] py-[4px] rounded-full transition-colors ${
                          car.isActive
                            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                            : "bg-[rgba(255,255,255,0.06)] text-ink-dim hover:bg-[rgba(255,255,255,0.1)]"
                        }`}
                      >
                        {car.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/cars/${car.id}/edit`}
                        className="text-[12px] text-ink-soft hover:text-gold-soft transition-colors"
                      >
                        수정
                      </Link>
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