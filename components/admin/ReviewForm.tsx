"use client";

import { useActionState } from "react";
import type { ReviewFormState } from "@/app/actions/reviews";
import type { Review } from "@prisma/client";

const inputClass =
  "w-full px-[13px] py-[11px] rounded-[9px] text-[14px] bg-[rgba(255,255,255,.04)] border border-[var(--line)] text-ink placeholder:text-ink-dim focus:outline-none focus:border-gold/60 transition-colors";

const labelClass = "block text-[12px] text-ink-dim font-semibold mb-[6px]";

type Props = {
  action: (prev: ReviewFormState, fd: FormData) => Promise<ReviewFormState>;
  submitLabel: string;
  review?: Review;
};

const initial: ReviewFormState = {};

export function ReviewForm({ action, submitLabel, review }: Props) {
  const [state, formAction] = useActionState(action, initial);

  if (state.success) {
    return (
      <div className="py-12 text-center">
        <div className="text-[36px] mb-3">✓</div>
        <div className="text-[16px] font-bold mb-2">저장되었습니다</div>
        <a href="/admin/reviews" className="text-[13px] text-gold underline underline-offset-2">
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
          <label className={labelClass}>이름 *</label>
          <input
            name="name"
            className={inputClass}
            placeholder="예: 김○○"
            defaultValue={review?.name}
          />
        </div>
        <div>
          <label className={labelClass}>이니셜 * (아바타 표시)</label>
          <input
            name="initial"
            className={inputClass}
            placeholder="예: 김"
            maxLength={2}
            defaultValue={review?.initial}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>부가 설명 (선택)</label>
        <input
          name="detail"
          className={inputClass}
          placeholder="예: 카니발 2년 계약"
          defaultValue={review?.detail ?? ""}
        />
      </div>

      <div>
        <label className={labelClass}>별점 *</label>
        <select
          name="stars"
          className={inputClass}
          defaultValue={review?.stars ?? 5}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{"★".repeat(n)} ({n}점)</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>후기 내용 *</label>
        <textarea
          name="text"
          rows={4}
          className={`${inputClass} resize-y min-h-[100px]`}
          placeholder="고객 후기 내용을 입력해주세요."
          defaultValue={review?.text}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>정렬 순서</label>
          <input
            name="sortOrder"
            type="number"
            className={inputClass}
            defaultValue={review?.sortOrder ?? 0}
          />
        </div>
        <div className="flex items-end pb-[11px]">
          <label className="flex items-center gap-2 text-[13px] text-ink-soft cursor-pointer">
            <input
              name="isActive"
              type="checkbox"
              defaultChecked={review?.isActive ?? true}
              value="on"
              className="w-4 h-4"
            />
            후기 활성화
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
