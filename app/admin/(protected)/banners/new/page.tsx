import Link from "next/link";
import { BannerForm } from "@/components/admin/BannerForm";
import { createBanner } from "@/app/actions/banners";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "배너 추가 | 어드민" };

export default function AdminNewBannerPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/banners" className="text-ink-dim hover:text-ink transition-colors text-[13px]">
          ← 배너 목록
        </Link>
        <span className="text-ink-dim">/</span>
        <h1 className="text-[20px] font-black">배너 추가</h1>
      </div>
      <BannerForm action={createBanner} submitLabel="배너 추가" />
    </div>
  );
}
