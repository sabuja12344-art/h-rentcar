"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Car } from "@prisma/client";
import type { CarFormState } from "@/app/actions/cars";

const S = {
  inp: { width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "14px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", boxSizing: "border-box", height: "42px" } as React.CSSProperties,
  lbl: { display: "block", fontSize: "12px", color: "#64748b", fontWeight: 600, marginBottom: "6px" } as React.CSSProperties,
  card: { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", marginBottom: "16px" } as React.CSSProperties,
  cardTitle: { fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } as React.CSSProperties,
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" } as React.CSSProperties,
  errText: { fontSize: "12px", color: "#ef4444", marginTop: "4px" } as React.CSSProperties,
};

const CATEGORIES = ["세단", "SUV", "승합·미니밴", "경차", "전기·친환경"];
const FUELS = ["가솔린", "디젤", "하이브리드", "전기", "LPG"];
const LABELS = ["", "인기", "신차", "특가", "즉시출고"];
const RENTAL_TYPES = ["단기렌트", "장기렌트", "월렌트"];
const OPTIONS = ["금연", "네비", "블랙박스", "후방카메라", "하이패스", "만21세이상", "열선시트", "통풍시트", "열선핸들", "카플레이", "원격시동"];

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p style={S.errText}>{msg}</p> : null;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{ padding: "11px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, background: "#2563eb", color: "#fff", border: "none", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.6 : 1 }}
    >
      {pending ? "저장 중..." : label}
    </button>
  );
}

type Action = (prev: CarFormState, fd: FormData) => Promise<CarFormState>;

export function CarForm({ action, defaultValues, submitLabel = "저장" }: { action: Action; defaultValues?: Partial<Car>; submitLabel?: string }) {
  const [state, formAction] = useActionState(action, {});
  const d = defaultValues ?? {};
  const fe = state.fieldErrors ?? {};

  const currentOptions: string[] = (() => { try { return JSON.parse(d.options ?? "[]"); } catch { return []; } })();
  const currentRentalTypes: string[] = (() => { try { return JSON.parse(d.rentalTypes ?? "[]"); } catch { return []; } })();

  return (
    <form action={formAction}>
      {state.error && (
        <div style={{ padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", fontSize: "14px", marginBottom: "16px" }}>
          {state.error}
        </div>
      )}

      {/* 기본 정보 */}
      <div style={S.card}>
        <div style={S.cardTitle}>기본 정보</div>
        <div style={S.grid2}>
          <div>
            <label style={S.lbl}>차량명 *</label>
            <input name="name" type="text" placeholder="예: 그랜저" defaultValue={d.name ?? ""} style={S.inp} />
            <FieldError msg={fe.name} />
          </div>
          <div>
            <label style={S.lbl}>영문명</label>
            <input name="nameEn" type="text" placeholder="예: Grandeur" defaultValue={d.nameEn ?? ""} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>슬러그 (URL용)</label>
            <input name="slug" type="text" placeholder="예: grandeur-2024" defaultValue={d.slug ?? ""} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>제조사</label>
            <input name="brand" type="text" placeholder="예: 현대" defaultValue={d.brand ?? ""} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>차종 카테고리 *</label>
            <select name="category" defaultValue={d.category ?? ""} style={S.inp}>
              <option value="">선택</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <FieldError msg={fe.category} />
          </div>
          <div>
            <label style={S.lbl}>연료</label>
            <select name="fuel" defaultValue={d.fuel ?? ""} style={S.inp}>
              <option value="">선택</option>
              {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={S.lbl}>인승</label>
            <input name="seats" type="number" min="1" max="45" placeholder="5" defaultValue={d.seats ?? ""} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>연식</label>
            <input name="year" type="text" placeholder="예: 2024년형" defaultValue={d.year ?? ""} style={S.inp} />
          </div>
        </div>
      </div>

      {/* 가격·계약 */}
      <div style={S.card}>
        <div style={S.cardTitle}>가격 · 계약</div>
        <div style={S.grid3}>
          <div>
            <label style={S.lbl}>월 렌트료 (만원) *</label>
            <input name="monthlyPrice" type="number" min="1" placeholder="43" defaultValue={d.monthlyPrice ?? ""} style={S.inp} />
            <FieldError msg={fe.monthlyPrice} />
          </div>
          <div>
            <label style={S.lbl}>일 대여료 (원)</label>
            <input name="dailyPrice" type="number" placeholder="50000" defaultValue={d.dailyPrice ?? ""} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>계약기간</label>
            <input name="contractTerms" type="text" placeholder="예: 24/36/48개월" defaultValue={d.contractTerms ?? ""} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>보증금</label>
            <input name="deposit" type="text" placeholder="예: 없음" defaultValue={d.deposit ?? ""} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>약정 주행거리</label>
            <input name="mileage" type="text" placeholder="예: 2만km/년" defaultValue={d.mileage ?? ""} style={S.inp} />
          </div>
        </div>

        {/* 이용 가능 기간 */}
        <div style={{ marginTop: "20px" }}>
          <label style={S.lbl}>이용 가능 기간</label>
          <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
            {RENTAL_TYPES.map((rt) => (
              <label key={rt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  name={`rental__${rt}`}
                  value="on"
                  defaultChecked={currentRentalTypes.includes(rt)}
                  style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
                />
                {rt}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 옵션 */}
      <div style={S.card}>
        <div style={S.cardTitle}>차량 옵션</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {OPTIONS.map((opt) => (
            <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151", cursor: "pointer", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
              <input
                type="checkbox"
                name={`opt__${opt}`}
                value="on"
                defaultChecked={currentOptions.includes(opt)}
                style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* 상세 설명 */}
      <div style={S.card}>
        <div style={S.cardTitle}>상세 설명</div>
        <div>
          <label style={S.lbl}>썸네일 이미지 URL</label>
          <input name="thumbnail" type="text" placeholder="https://..." defaultValue={d.thumbnail ?? ""} style={{ ...S.inp, marginBottom: "16px" }} />
        </div>
        <div>
          <label style={S.lbl}>차량 설명</label>
          <textarea name="description" rows={4} placeholder="차량 상세 설명을 입력하세요." defaultValue={d.description ?? ""} style={{ ...S.inp, height: "auto", resize: "vertical", minHeight: "100px" }} />
        </div>
      </div>

      {/* 노출 설정 */}
      <div style={S.card}>
        <div style={S.cardTitle}>노출 설정</div>
        <div style={S.grid3}>
          <div>
            <label style={S.lbl}>라벨</label>
            <select name="label" defaultValue={d.label ?? ""} style={S.inp}>
              {LABELS.map((l) => <option key={l} value={l}>{l || "없음"}</option>)}
            </select>
          </div>
          <div>
            <label style={S.lbl}>정렬 순서</label>
            <input name="sortOrder" type="number" defaultValue={d.sortOrder ?? 0} style={S.inp} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "32px", marginTop: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
            <input name="isFeatured" type="checkbox" value="on" defaultChecked={d.isFeatured === true} style={{ width: "18px", height: "18px", accentColor: "#2563eb" }} />
            <span><strong>추천 차량</strong> 홈 화면 노출</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
            <input name="isActive" type="checkbox" value="on" defaultChecked={d.isActive !== false} style={{ width: "18px", height: "18px", accentColor: "#2563eb" }} />
            <span><strong>활성화</strong> 차량 목록 노출</span>
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <SubmitButton label={submitLabel} />
        <a href="/admin/cars" style={{ padding: "11px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, color: "#64748b", border: "1px solid #e2e8f0", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
          취소
        </a>
      </div>
    </form>
  );
}
