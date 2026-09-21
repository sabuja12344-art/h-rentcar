import Link from "next/link";
import { BannerForm } from "@/components/admin/BannerForm";
import { createBanner } from "@/app/actions/banners";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "배너 추가 | 어드민" };

export default function AdminNewBannerPage() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Link href="/admin/banners" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>← 배너 목록</Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>배너 추가</h1>
      </div>
      <BannerForm action={createBanner} submitLabel="배너 추가" />
    </div>
  );
}
