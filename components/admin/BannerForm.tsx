"use client";

import { useActionState } from "react";
import type { BannerFormState } from "@/app/actions/banners";
import type { Banner } from "@prisma/client";

const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: "11px", color: "#64748b", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" };

const CAR_TYPES = [
  { value: "compact", label: "경차" },
  { value: "sedan", label: "세단" },
  { value: "suv", label: "SUV" },
  { value: "van", label: "승합·미니밴" },
];

type Props = {
  action: (prev: BannerFormState, fd: FormData) => Promise<BannerFormState>;
  submitLabel: string;
  banner?: Banner;
};

export function BannerForm({ action, submitLabel, banner }: Props) {
  const [state, formAction] = useActionState(action, {});

  if (state.success) {
    return (
      <div style={{ padding: "48px", textAlign: "center" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>✓</div>
        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#0f172a" }}>저장되었습니다</div>
        <a href="/admin/banners" style={{ fontSize: "13px", color: "#2563eb" }}>목록으로</a>
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
          <label style={lbl}>칩 라벨 *</label>
          <input name="chipLabel" style={inp} placeholder="예: 경차 특가" defaultValue={banner?.chipLabel} />
        </div>
        <div>
          <label style={lbl}>가격 텍스트 *</label>
          <input name="chipPrice" style={inp} placeholder="예: 월 24만원~" defaultValue={banner?.chipPrice} />
        </div>
      </div>

      <div>
        <label style={lbl}>배너 문구 (선택)</label>
        <input name="caption" style={inp} placeholder="예: 초기비용 없이 시작하는 장기렌트" defaultValue={banner?.caption ?? ""} />
      </div>

      <div>
        <label style={lbl}>차량 SVG 유형 *</label>
        <select name="carType" style={inp} defaultValue={banner?.carType ?? "sedan"}>
          {CAR_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div>
        <label style={lbl}>글로우 색상 (rgba)</label>
        <input name="glow" style={inp} placeholder="rgba(61,139,255,.28)" defaultValue={banner?.glow ?? "rgba(61,139,255,.28)"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={lbl}>정렬 순서</label>
          <input name="sortOrder" type="number" style={inp} defaultValue={banner?.sortOrder ?? 0} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "11px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151", cursor: "pointer" }}>
            <input name="isActive" type="checkbox" defaultChecked={banner?.isActive ?? true} value="on" style={{ width: "16px", height: "16px" }} />
            배너 활성화
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
