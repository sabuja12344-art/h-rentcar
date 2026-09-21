export const dynamic = "force-dynamic";
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Link href="/admin/reviews" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>← 후기 목록</Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>후기 수정</h1>
      </div>
      <ReviewForm action={boundAction} submitLabel="저장" review={review} />
    </div>
  );
}
