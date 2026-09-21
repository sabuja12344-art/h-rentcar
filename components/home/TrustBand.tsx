/* [신뢰 지표 띠] — 숫자/라벨은 아래 stats 배열에서 수정하세요 */
const stats = [
  { num: "5,000+", unit: "건", label: "누적 상담" },
  { num: "120",    unit: "여 종", label: "보유 차량" },
  { num: "10+",    unit: "곳", label: "제휴 금융사" },
  { num: "98",     unit: "%", label: "고객 만족도" },
];

export function TrustBand() {
  return (
    <div
      style={{
        background: "linear-gradient(100deg,#2256d4 0%,#2f6be6 55%,#4f86f0 100%)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "0",
          padding: "28px 24px",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              padding: "12px 24px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,.2)" : "none",
              flex: "1 1 140px",
            }}
          >
            <div
              style={{
                fontSize: "clamp(26px,3vw,34px)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {s.num}
              <span style={{ fontSize: "clamp(14px,1.5vw,17px)", fontWeight: 700, marginLeft: "2px", opacity: 0.85 }}>
                {s.unit}
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,.75)", marginTop: "6px", fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
