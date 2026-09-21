export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBanner, toggleBannerActive } from "@/app/actions/banners";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "배너 관리 | 어드민" };

const CAR_TYPE_LABELS: Record<string, string> = {
  compact: "경차",
  sedan: "세단",
  suv: "SUV",
  van: "승합·미니밴",
};

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-black">배너 관리</h1>
          <p className="text-ink-dim text-[13px] mt-1">총 {banners.length}개</p>
        </div>
        <Link
          href="/admin/banners/new"
          className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[10px] text-[13px] font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold hover:brightness-105 transition-all"
        >
          + 배너 추가
        </Link>
      </div>

      <div className="bg-panel border border-[var(--line)] rounded-[14px] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--line)]">
              {["순서", "칩 라벨", "가격", "문구", "차종", "상태", ""].map((h) => (
                <th key={h} className="text-left text-[11px] text-ink-dim font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {banners.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink-dim text-[13px]">
                  등록된 배너가 없습니다.
                </td>
              </tr>
            )}
            {banners.map((banner) => {
              const toggleAction = toggleBannerActive.bind(null, banner.id, banner.isActive);
              const deleteAction = deleteBanner.bind(null, banner.id);

              return (
                <tr key={banner.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="py-3 px-4 text-[12px] text-ink-dim w-[60px]">{banner.sortOrder}</td>
                  <td className="py-3 px-4 text-[13px] font-semibold">{banner.chipLabel}</td>
                  <td className="py-3 px-4 text-[13px] text-gold-soft font-semibold">{banner.chipPrice}</td>
                  <td className="py-3 px-4 text-[13px] text-ink-soft max-w-[200px] truncate">
                    {banner.caption || "—"}
                  </td>
                  <td className="py-3 px-4 text-[13px] text-ink-soft">
                    {CAR_TYPE_LABELS[banner.carType] ?? banner.carType}
                  </td>
                  <td className="py-3 px-4">
                    <form action={toggleAction}>
                      <button
                        type="submit"
                        className={`text-[11px] font-semibold px-[10px] py-[4px] rounded-full transition-colors ${
                          banner.isActive
                            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                            : "bg-[rgba(255,255,255,0.06)] text-ink-dim hover:bg-[rgba(255,255,255,0.1)]"
                        }`}
                      >
                        {banner.isActive ? "활성" : "비활성"}
                      </button>
                    </form>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/banners/${banner.id}/edit`}
                        className="text-[12px] text-ink-soft hover:text-gold-soft transition-colors"
                      >
                        수정
                      </Link>
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
