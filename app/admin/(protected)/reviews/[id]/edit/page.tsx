import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { updateReview } from "@/app/actions/reviews";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "후기 수정 | 어드민" };

export default async function AdminEditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) notFound();

  const boundAction = updateReview.bind(null, id);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/reviews" className="text-ink-dim hover:text-ink transition-colors text-[13px]">
          ← 후기 목록
        </Link>
        <span className="text-ink-dim">/</span>
        <h1 className="text-[20px] font-black">후기 수정</h1>
      </div>
      <ReviewForm action={boundAction} submitLabel="저장" review={review} />
    </div>
  );
}
