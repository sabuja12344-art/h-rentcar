"use client";

import { useActionState } from "react";
import type { BannerFormState } from "@/app/actions/banners";
import type { Banner } from "@prisma/client";

const inputClass =
  "w-full px-[13px] py-[11px] rounded-[9px] text-[14px] bg-[rgba(255,255,255,.04)] border border-[var(--line)] text-ink placeholder:text-ink-dim focus:outline-none focus:border-gold/60 transition-colors";

const labelClass = "block text-[12px] text-ink-dim font-semibold mb-[6px]";

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

const initial: BannerFormState = {};

export function BannerForm({ action, submitLabel, banner }: Props) {
  const [state, formAction] = useActionState(action, initial);

  if (state.success) {
    return (
      <div className="py-12 text-center">
        <div className="text-[36px] mb-3">✓</div>
        <div className="text-[16px] font-bold mb-2">저장되었습니다</div>
        <a href="/admin/banners" className="text-[13px] text-gold underline underline-offset-2">
          목록으로
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 max-w-[600px]">
      {state.error && (
        <div className="px-4 py-3 rounded-[9px] bg-red-500/10 border border-red-500/30 text-red-400 text-[13px]">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>칩 라벨 *</label>
          <input
            name="chipLabel"
            className={inputClass}
            placeholder="예: 경차 특가"
            defaultValue={banner?.chipLabel}
          />
        </div>
        <div>
          <label className={labelClass}>가격 텍스트 *</label>
          <input
            name="chipPrice"
            className={inputClass}
            placeholder="예: 월 24만원~"
            defaultValue={banner?.chipPrice}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>배너 문구 (선택)</label>
        <input
          name="caption"
          className={inputClass}
          placeholder="예: 초기비용 없이 시작하는 장기렌트"
          defaultValue={banner?.caption ?? ""}
        />
      </div>

      <div>
        <label className={labelClass}>차량 SVG 유형 *</label>
        <select
          name="carType"
          className={inputClass}
          defaultValue={banner?.carType ?? "sedan"}
        >
          {CAR_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>글로우 색상 (rgba)</label>
        <input
          name="glow"
          className={inputClass}
          placeholder="rgba(61,139,255,.28)"
          defaultValue={banner?.glow ?? "rgba(61,139,255,.28)"}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>정렬 순서</label>
          <input
            name="sortOrder"
            type="number"
            className={inputClass}
            defaultValue={banner?.sortOrder ?? 0}
          />
        </div>
        <div className="flex items-end pb-[11px]">
          <label className="flex items-center gap-2 text-[13px] text-ink-soft cursor-pointer">
            <input
              name="isActive"
              type="checkbox"
              defaultChecked={banner?.isActive ?? true}
              value="on"
              className="w-4 h-4"
            />
            배너 활성화
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="px-6 py-[11px] rounded-[10px] text-[13px] font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold hover:brightness-105 transition-all"
      >
        {submitLabel}
      </button>
    </form>
  );
}
