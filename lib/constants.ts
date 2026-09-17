export const CAR_CATEGORIES = [
  "경차",
  "소형/준중형 세단",
  "중형/대형 세단",
  "SUV",
  "승합/미니밴",
  "수입/프리미엄",
] as const;

export type CarCategory = (typeof CAR_CATEGORIES)[number];

export const CAR_LABELS = ["인기", "신차"] as const;
export type CarLabel = (typeof CAR_LABELS)[number];

export const PRICE_FILTERS = [
  { label: "30만 이하", key: "30이하", min: 0, max: 30 },
  { label: "30~50만", key: "30-50", min: 30, max: 50 },
  { label: "50만 이상", key: "50이상", min: 50, max: 9999 },
] as const;

export const SEAT_FILTERS = [
  { label: "2~4인승", key: "2-4", min: 2, max: 4 },
  { label: "5~7인승", key: "5-7", min: 5, max: 7 },
  { label: "8인 이상", key: "8이상", min: 8, max: 99 },
] as const;

export const INQUIRY_STATUSES = {
  NEW: { label: "신규", next: "IN_PROGRESS", nextLabel: "→ 상담중" },
  IN_PROGRESS: { label: "상담중", next: "DONE", nextLabel: "→ 완료" },
  DONE: { label: "완료", next: "NEW", nextLabel: "→ 재개" },
} as const;
