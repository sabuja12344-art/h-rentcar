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
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Link href="/admin/banners" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>← 배너 목록</Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>배너 수정</h1>
      </div>
      <BannerForm action={boundAction} submitLabel="저장" banner={banner} />
    </div>
  );
}
