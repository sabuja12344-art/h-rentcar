import Link from "next/link";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { createReview } from "@/app/actions/reviews";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "후기 추가 | 어드민" };

export default function AdminNewReviewPage() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Link href="/admin/reviews" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>← 후기 목록</Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>후기 추가</h1>
      </div>
      <ReviewForm action={createReview} submitLabel="후기 추가" />
    </div>
  );
}
