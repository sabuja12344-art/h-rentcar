import Link from "next/link";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { createReview } from "@/app/actions/reviews";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "후기 추가 | 어드민" };

export default function AdminNewReviewPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/reviews" className="text-ink-dim hover:text-ink transition-colors text-[13px]">
          ← 후기 목록
        </Link>
        <span className="text-ink-dim">/</span>
        <h1 className="text-[20px] font-black">후기 추가</h1>
      </div>
      <ReviewForm action={createReview} submitLabel="후기 추가" />
    </div>
  );
}
