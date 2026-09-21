"use client";

import { useActionState } from "react";
import type { ReviewFormState } from "@/app/actions/reviews";
import type { Review } from "@prisma/client";

const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: "11px", color: "#64748b", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" };

type Props = {
  action: (prev: ReviewFormState, fd: FormData) => Promise<ReviewFormState>;
  submitLabel: string;
  review?: Review;
};

export function ReviewForm({ action, submitLabel, review }: Props) {
  const [state, formAction] = useActionState(action, {});

  if (state.success) {
    return (
      <div style={{ padding: "48px", textAlign: "center" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>✓</div>
        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#0f172a" }}>저장되었습니다</div>
        <a href="/admin/reviews" style={{ fontSize: "13px", color: "#2563eb" }}>목록으로</a>
      </div>
    );
  }

  return (
    <form action={formAction} style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {state.error && (
        <div style={{ padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px" }}>
          {state.error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={lbl}>이름 *</label>
          <input name="name" style={inp} placeholder="예: 김○○" defaultValue={review?.name} />
        </div>
        <div>
          <label style={lbl}>이니셜 * (아바타 표시)</label>
          <input name="initial" style={inp} placeholder="예: 김" maxLength={2} defaultValue={review?.initial} />
        </div>
      </div>

      <div>
        <label style={lbl}>부가 설명 (선택)</label>
        <input name="detail" style={inp} placeholder="예: 카니발 2년 계약" defaultValue={review?.detail ?? ""} />
      </div>

      <div>
        <label style={lbl}>별점 *</label>
        <select name="stars" style={inp} defaultValue={review?.stars ?? 5}>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)} ({n}점)</option>)}
        </select>
      </div>

      <div>
        <label style={lbl}>후기 내용 *</label>
        <textarea name="text" rows={4} style={{ ...inp, resize: "vertical", minHeight: "100px" }} placeholder="고객 후기 내용을 입력해주세요." defaultValue={review?.text} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={lbl}>정렬 순서</label>
          <input name="sortOrder" type="number" style={inp} defaultValue={review?.sortOrder ?? 0} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "11px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151", cursor: "pointer" }}>
            <input name="isActive" type="checkbox" defaultChecked={review?.isActive ?? true} value="on" style={{ width: "16px", height: "16px" }} />
            후기 활성화
          </label>
        </div>
      </div>

      <div>
        <button type="submit" style={{ padding: "10px 24px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
