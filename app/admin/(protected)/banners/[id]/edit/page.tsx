export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BannerForm } from "@/components/admin/BannerForm";
import { updateBanner } from "@/app/actions/banners";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "배너 수정 | 어드민" };

export default async function AdminEditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) notFound();

  const boundAction = updateBanner.bind(null, id);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/banners" className="text-ink-dim hover:text-ink transition-colors text-[13px]">
          ← 배너 목록
        </Link>
        <span className="text-ink-dim">/</span>
        <h1 className="text-[20px] font-black">배너 수정</h1>
      </div>
      <BannerForm action={boundAction} submitLabel="저장" banner={banner} />
    </div>
  );
}
