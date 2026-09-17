const reviews = [
  {
    stars: 5,
    text: "장기렌트가 처음이라 걱정했는데, 궁금한 점을 먼저 설명해주셔서 안심하고 진행했습니다. 차량도 빠르게 받았어요.",
    name: "김○○ 고객님",
    detail: "그랜저 · 광주 서구",
    initial: "김",
  },
  {
    stars: 5,
    text: "다른 곳보다 견적이 합리적이었고, 원하는 색상까지 잘 찾아주셨어요. 상담부터 인수까지 친절하게 진행해 주셔서 만족합니다.",
    name: "이○○ 고객님",
    detail: "싼타페 · 광주 북구",
    initial: "이",
  },
  {
    stars: 5,
    text: "아이가 있어 승합차가 필요했는데 조건에 딱 맞는 차량을 추천받았습니다. 보험·정비까지 포함이라 신경 쓸 게 없어 편해요.",
    name: "박○○ 고객님",
    detail: "카니발 · 전남 나주",
    initial: "박",
  },
];

export function ReviewSection() {
  return (
    <section className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-[38px]">
          <div>
            <div className="text-[12.5px] font-bold text-cyan tracking-[.14em] uppercase mb-[10px]">Review</div>
            <h2 className="text-[clamp(24px,3.1vw,34px)] font-black tracking-[-0.02em]">
              고객이 남긴 실제 후기
            </h2>
            <p className="text-ink-soft text-[15px] mt-[10px]">H-RENT CAR와 함께한 고객들의 이야기입니다.</p>
          </div>
          <a href="#consult" className="text-[14px] text-blue-bright font-semibold whitespace-nowrap shrink-0">
            후기 더 보기 →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="glass rounded-[18px] p-6">
              <div className="text-cyan text-[14px] tracking-[2px]">{"★".repeat(r.stars)}</div>
              <p className="text-[14px] text-ink-soft leading-[1.75] my-[14px] line-clamp-4">{r.text}</p>
              <div className="flex items-center gap-[10px] border-t border-[var(--line)] pt-[14px]">
                <div
                  className="w-[34px] h-[34px] rounded-full grid place-items-center text-white font-black text-[14px] shrink-0"
                  style={{ background: "linear-gradient(135deg,#5ea6ff,#3d8bff)" }}
                >
                  {r.initial}
                </div>
                <div>
                  <b className="text-[13.5px] font-bold block">{r.name}</b>
                  <span className="text-[12px] text-ink-dim">{r.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
