"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Car } from "@prisma/client";
import type { CarFormState } from "@/app/actions/cars";

const inp =
  "w-full px-3 py-2 rounded-[8px] text-[13px] bg-[rgba(255,255,255,0.05)] border border-[var(--line-strong)] text-ink placeholder:text-ink-dim focus:outline-none focus:border-gold transition-colors";
const lbl = "block text-[11px] text-ink-dim font-semibold mb-[5px] uppercase tracking-wide";
const err = "text-[11px] text-red-400 mt-1";

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className={err}>{msg}</p> : null;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-[10px] rounded-[10px] text-[13px] font-bold text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
    >
      {pending ? "저장 중..." : label}
    </button>
  );
}

type Action = (prev: CarFormState, fd: FormData) => Promise<CarFormState>;

const CATEGORIES = ["세단", "SUV", "승합·미니밴", "경차", "전기·친환경"];
const FUELS = ["가솔린", "디젤", "하이브리드", "전기", "LPG"];
const LABELS = ["", "인기", "신차", "특가", "즉시출고"];

export function CarForm({
  action,
  defaultValues,
  submitLabel = "저장",
}: {
  action: Action;
  defaultValues?: Partial<Car>;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, {});
  const d = defaultValues ?? {};
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="px-4 py-3 rounded-[10px] bg-red-500/10 border border-red-500/30 text-red-400 text-[13px]">
          {state.error}
        </div>
      )}

      {/* 기본 정보 */}
      <div className="bg-panel rounded-[14px] border border-[var(--line)] p-6">
        <h3 className="text-[14px] font-bold mb-5">기본 정보</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>차량명 *</label>
            <input name="name" type="text" placeholder="예: 그랜저" defaultValue={d.name ?? ""} className={inp} />
            <FieldError msg={fe.name} />
          </div>
          <div>
            <label className={lbl}>영문명</label>
            <input name="nameEn" type="text" placeholder="예: Grandeur" defaultValue={d.nameEn ?? ""} className={inp} />
          </div>
          <div>
            <label className={lbl}>차종 *</label>
            <select name="category" defaultValue={d.category ?? ""} className={inp} style={{ colorScheme: "dark" }}>
              <option value="">선택</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <FieldError msg={fe.category} />
          </div>
          <div>
            <label className={lbl}>브랜드</label>
            <input name="brand" type="text" placeholder="예: 현대" defaultValue={d.brand ?? ""} className={inp} />
          </div>
        </div>
      </div>

      {/* 가격 / 계약 */}
      <div className="bg-panel rounded-[14px] border border-[var(--line)] p-6">
        <h3 className="text-[14px] font-bold mb-5">가격 / 계약</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={lbl}>월 렌트료 (만원) *</label>
            <input name="monthlyPrice" type="number" min="1" placeholder="43" defaultValue={d.monthlyPrice ?? ""} className={inp} />
            <FieldError msg={fe.monthlyPrice} />
          </div>
          <div>
            <label className={lbl}>계약기간</label>
            <input name="contractTerms" type="text" placeholder="예: 24/36/48개월" defaultValue={d.contractTerms ?? ""} className={inp} />
          </div>
          <div>
            <label className={lbl}>보증금</label>
            <input name="deposit" type="text" placeholder="예: 없음" defaultValue={d.deposit ?? ""} className={inp} />
          </div>
        </div>
      </div>

      {/* 차량 스펙 */}
      <div className="bg-panel rounded-[14px] border border-[var(--line)] p-6">
        <h3 className="text-[14px] font-bold mb-5">차량 스펙</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={lbl}>연식</label>
            <input name="year" type="text" placeholder="예: 2024년형" defaultValue={d.year ?? ""} className={inp} />
          </div>
          <div>
            <label className={lbl}>연료</label>
            <select name="fuel" defaultValue={d.fuel ?? ""} className={inp} style={{ colorScheme: "dark" }}>
              <option value="">선택</option>
              {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>인승</label>
            <input name="seats" type="number" min="1" max="45" placeholder="5" defaultValue={d.seats ?? ""} className={inp} />
          </div>
          <div>
            <label className={lbl}>약정 주행거리</label>
            <input name="mileage" type="text" placeholder="예: 2만km/년" defaultValue={d.mileage ?? ""} className={inp} />
          </div>
        </div>
        <div className="mt-4">
          <label className={lbl}>주요 옵션</label>
          <input name="options" type="text" placeholder="콤마로 구분: 스마트 크루즈, 통풍시트, ..." defaultValue={d.options ?? ""} className={inp} />
        </div>
        <div className="mt-4">
          <label className={lbl}>차량 설명</label>
          <textarea name="description" rows={3} placeholder="차량 상세 설명" defaultValue={d.description ?? ""} className={`${inp} resize-y min-h-[72px]`} />
        </div>
      </div>

      {/* 노출 설정 */}
      <div className="bg-panel rounded-[14px] border border-[var(--line)] p-6">
        <h3 className="text-[14px] font-bold mb-5">노출 설정</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={lbl}>라벨</label>
            <select name="label" defaultValue={d.label ?? ""} className={inp} style={{ colorScheme: "dark" }}>
              {LABELS.map((l) => <option key={l} value={l}>{l || "없음"}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>정렬 순서</label>
            <input name="sortOrder" type="number" defaultValue={d.sortOrder ?? 0} className={inp} />
          </div>
          <div className="flex items-end pb-[2px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="isActive"
                type="checkbox"
                value="on"
                defaultChecked={d.isActive !== false}
                className="w-4 h-4"
              />
              <span className="text-[13px] text-ink-soft">활성화 (목록 노출)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <SubmitButton label={submitLabel} />
        <a
          href="/admin/cars"
          className="px-6 py-[10px] rounded-[10px] text-[13px] font-medium text-ink-soft border border-[var(--line-strong)] hover:text-ink hover:border-ink-dim transition-colors"
        >
          취소
        </a>
      </div>
    </form>
  );
}