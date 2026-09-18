const faqs = [
  {
    q: "장기렌트와 할부·리스는 무엇이 다른가요?",
    a: "장기렌트는 차량이 렌트사 소유라 금융이력 변동이 없고 초기비용 부담이 적습니다. 보험도 렌트사 가입으로 처리되어 편리합니다. 자세한 조건은 상담 시 안내해 드립니다.",
  },
  {
    q: "계약 가능한 최소 기간은 얼마인가요?",
    a: "일반적으로 12개월부터 최대 48~60개월까지 선택 가능합니다. 이용 목적에 맞는 기간을 상담 시 함께 정해드립니다.",
  },
  {
    q: "운전 경력이 짧아도 이용할 수 있나요?",
    a: "운전면허 취득자로 운전자 범위에 해당하면 이용 가능합니다. 조건이 궁금하시면 부담 없이 상담 신청해 주세요.",
  },
  {
    q: "초기비용은 어느 정도 드나요?",
    a: "선납금·보증금 없이 시작하는 무보증 조건부터, 선납·보증을 두어 월 납입금을 낮추는 조건까지 선택할 수 있습니다. 예산에 맞춰 안내해 드립니다.",
  },
];

export function FAQSection() {
  return (
    <section className="section-py border-t border-[var(--line)]">
      <div className="wrap">
        <div className="text-center sec-header">
          <div className="text-[13px] font-bold text-blue tracking-[.14em] uppercase mb-3">FAQ</div>
          <h2 className="sec-h2">자주 묻는 질문</h2>
        </div>

        <div className="faq-wrap">
          {faqs.map((faq, i) => (
            <details key={i} className="qa glass rounded-[12px] overflow-hidden" style={{ marginBottom: "12px" }} open={i === 0}>
              <summary className="flex items-center justify-between gap-4 cursor-pointer text-[16px] font-semibold" style={{ padding: "20px 22px" }}>
                {faq.q}
                <span className="qa-plus text-blue-bright text-[20px] shrink-0 leading-none">+</span>
              </summary>
              <div className="text-[14.5px] text-ink-soft" style={{ padding: "0 22px 20px", lineHeight: "1.8" }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
