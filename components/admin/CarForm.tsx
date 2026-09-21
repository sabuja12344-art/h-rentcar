"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Car } from "@prisma/client";
import type { CarFormState } from "@/app/actions/cars";

const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: "11px", color: "#64748b", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" };
const card: React.CSSProperties = { background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "16px" };
const cardTitle: React.CSSProperties = { fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "20px" };
const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
const grid3: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" };

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p style={{ fontSize: "11px", color: "#dc2626", marginTop: "4px" }}>{msg}</p> : null;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{ padding: "10px 24px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, background: "#2563eb", color: "#fff", border: "none", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.6 : 1 }}
    >
      {pending ? "저장 중..." : label}
    </button>
  );
}

type Action = (prev: CarFormState, fd: FormData) => Promise<CarFormState>;

const CATEGORIES = ["세단", "SUV", "승합·미니밴", "경차", "전기·친환경"];
const FUELS = ["가솔린", "디젤", "하이브리드", "전기", "LPG"];
const LABELS = ["", "인기", "신차", "특가", "즉시출고"];

export function CarForm({ action, defaultValues, submitLabel = "저장" }: { action: Action; defaultValues?: Partial<Car>; submitLabel?: string }) {
  const [state, formAction] = useActionState(action, {});
  const d = defaultValues ?? {};
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction}>
      {state.error && (
        <div style={{ padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>
          {state.error}
        </div>
      )}

      <div style={card}>
        <div style={cardTitle}>기본 정보</div>
        <div style={grid2}>
          <div>
            <label style={lbl}>차량명 *</label>
            <input name="name" type="text" placeholder="예: 그랜저" defaultValue={d.name ?? ""} style={inp} />
            <FieldError msg={fe.name} />
          </div>
          <div>
            <label style={lbl}>영문명</label>
            <input name="nameEn" type="text" placeholder="예: Grandeur" defaultValue={d.nameEn ?? ""} style={inp} />
          </div>
          <div>
            <label style={lbl}>차종 *</label>
            <select name="category" defaultValue={d.category ?? ""} style={inp}>
              <option value="">선택</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <FieldError msg={fe.category} />
          </div>
          <div>
            <label style={lbl}>브랜드</label>
            <input name="brand" type="text" placeholder="예: 현대" defaultValue={d.brand ?? ""} style={inp} />
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>가격 / 계약</div>
        <div style={grid3}>
          <div>
            <label style={lbl}>월 렌트료 (만원) *</label>
            <input name="monthlyPrice" type="number" min="1" placeholder="43" defaultValue={d.monthlyPrice ?? ""} style={inp} />
            <FieldError msg={fe.monthlyPrice} />
          </div>
          <div>
            <label style={lbl}>계약기간</label>
            <input name="contractTerms" type="text" placeholder="예: 24/36/48개월" defaultValue={d.contractTerms ?? ""} style={inp} />
          </div>
          <div>
            <label style={lbl}>보증금</label>
            <input name="deposit" type="text" placeholder="예: 없음" defaultValue={d.deposit ?? ""} style={inp} />
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>차량 스펙</div>
        <div style={grid3}>
          <div>
            <label style={lbl}>연식</label>
            <input name="year" type="text" placeholder="예: 2024년형" defaultValue={d.year ?? ""} style={inp} />
          </div>
          <div>
            <label style={lbl}>연료</label>
            <select name="fuel" defaultValue={d.fuel ?? ""} style={inp}>
              <option value="">선택</option>
              {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>인승</label>
            <input name="seats" type="number" min="1" max="45" placeholder="5" defaultValue={d.seats ?? ""} style={inp} />
          </div>
          <div>
            <label style={lbl}>약정 주행거리</label>
            <input name="mileage" type="text" placeholder="예: 2만km/년" defaultValue={d.mileage ?? ""} style={inp} />
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <label style={lbl}>주요 옵션</label>
          <input name="options" type="text" placeholder="콤마로 구분: 스마트 크루즈, 통풍시트, ..." defaultValue={d.options ?? ""} style={inp} />
        </div>
        <div style={{ marginTop: "16px" }}>
          <label style={lbl}>차량 설명</label>
          <textarea name="description" rows={3} placeholder="차량 상세 설명" defaultValue={d.description ?? ""} style={{ ...inp, resize: "vertical", minHeight: "72px" }} />
        </div>
        <div style={{ marginTop: "16px" }}>
          <label style={lbl}>썸네일 URL</label>
          <input name="thumbnail" type="text" placeholder="https://..." defaultValue={d.thumbnail ?? ""} style={inp} />
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>노출 설정</div>
        <div style={grid3}>
          <div>
            <label style={lbl}>라벨</label>
            <select name="label" defaultValue={d.label ?? ""} style={inp}>
              {LABELS.map((l) => <option key={l} value={l}>{l || "없음"}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>정렬 순서</label>
            <input name="sortOrder" type="number" defaultValue={d.sortOrder ?? 0} style={inp} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "2px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input name="isActive" type="checkbox" value="on" defaultChecked={d.isActive !== false} style={{ width: "16px", height: "16px" }} />
              <span style={{ fontSize: "13px", color: "#374151" }}>활성화 (목록 노출)</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <SubmitButton label={submitLabel} />
        <a href="/admin/cars" style={{ padding: "10px 24px", borderRadius: "10px", fontSize: "13px", fontWeight: 500, color: "#64748b", border: "1px solid #e5e7eb", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
          취소
        </a>
      </div>
    </form>
  );
}
