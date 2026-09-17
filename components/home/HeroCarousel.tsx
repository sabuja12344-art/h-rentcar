"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const INTERVAL = 5000;

const slides = [
  {
    chipLabel: "월 렌트 시작가",
    chipPrice: "43만원~",
    cap: "세단 · 그랜저 대표 이미지",
    glow: "rgba(61,139,255,.28)",
    car: "sedan",
  },
  {
    chipLabel: "SUV 렌트 시작가",
    chipPrice: "55만원~",
    cap: "SUV · 싼타페 대표 이미지",
    glow: "rgba(87,214,240,.22)",
    car: "suv",
  },
  {
    chipLabel: "전기차 렌트 시작가",
    chipPrice: "72만원~",
    cap: "전기차 · 아이오닉 대표 이미지",
    glow: "rgba(87,214,240,.30)",
    car: "ev",
  },
  {
    chipLabel: "승합차 렌트 시작가",
    chipPrice: "65만원~",
    cap: "승합 · 카니발 대표 이미지",
    glow: "rgba(61,139,255,.22)",
    car: "van",
  },
];

const stats = [
  { n: "43", u: "만원~", l: "월 렌트료 시작가" },
  { n: "120", u: "여종", l: "보유 차량 라인업" },
  { n: "24", u: "시간", l: "상담 접수 가능" },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive(i => (i - 1 + slides.length) % slides.length);
  const next = () => setActive(i => (i + 1) % slides.length);

  return (
    <section className="py-[22px]">
      <div className="wrap">
        <div
          className="relative rounded-[24px] overflow-hidden"
          style={{
            background: "linear-gradient(120deg, rgba(61,139,255,.20), rgba(87,214,240,.08) 55%, rgba(255,255,255,.02))",
            border: "1px solid var(--glass-line)",
            boxShadow: "0 30px 70px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.08)",
            minHeight: "340px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* 별가루 */}
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20% 30%,rgba(255,255,255,.5),transparent)," +
                "radial-gradient(1px 1px at 70% 24%,rgba(255,255,255,.4),transparent)," +
                "radial-gradient(1.5px 1.5px at 85% 60%,rgba(255,255,255,.5),transparent)," +
                "radial-gradient(1px 1px at 40% 70%,rgba(255,255,255,.3),transparent)",
            }}
          />
          {/* 우측 글로우 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(600px 320px at 88% 20%, rgba(94,166,255,.28), transparent 62%)",
            }}
          />

          {/* 콘텐츠 그리드 */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-6 lg:gap-8 items-center px-6 py-8 lg:px-[44px] lg:py-[40px]">

            {/* 왼쪽: 텍스트 */}
            <div>
              <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-cyan border border-[rgba(87,214,240,.3)] rounded-full px-[14px] py-[7px] mb-5 bg-[rgba(87,214,240,.06)]">
                <span className="w-[6px] h-[6px] rounded-full bg-cyan shadow-[0_0_8px_#57d6f0]" />
                광주 전용 · 월 장기렌트 전문
              </div>
              <h1 className="text-[clamp(30px,4.2vw,48px)] font-black leading-[1.15] tracking-[-0.025em]">
                합리적인 장기렌트,<br />
                <em className="not-italic text-blue-bright">H-RENT CAR</em>와 함께
              </h1>
              <p className="mt-4 text-[clamp(14px,1.5vw,17px)] text-ink-soft leading-[1.7]">
                복잡한 절차 없이 원하는 차량을 월 단위로.<br className="hidden sm:block" />
                초기비용 부담을 낮추고, 정비·보험까지 한 번에.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/#consult"
                  className="inline-flex items-center gap-2 px-[26px] py-[14px] rounded-[12px] text-[15px] font-bold text-white transition-all duration-150 hover:-translate-y-[2px]"
                  style={{
                    background: "linear-gradient(135deg,#5ea6ff,#3d8bff)",
                    boxShadow: "0 10px 28px rgba(61,139,255,.4)",
                  }}
                >
                  무료 상담 신청하기 →
                </Link>
                <Link
                  href="/#fleet"
                  className="inline-flex items-center gap-2 px-[24px] py-[14px] rounded-[12px] text-[15px] font-semibold text-ink border border-[var(--glass-line)] bg-[var(--glass-bg)] backdrop-blur-sm hover:bg-[rgba(255,255,255,.1)] hover:border-blue-bright transition-all duration-150"
                >
                  차량 둘러보기
                </Link>
              </div>
              <div className="flex flex-wrap gap-[30px] mt-6">
                {stats.map(s => (
                  <div key={s.l}>
                    <div className="text-[24px] font-black tracking-[-0.02em] leading-none">
                      {s.n}
                      <small className="text-[13px] text-cyan font-bold ml-[2px]">{s.u}</small>
                    </div>
                    <div className="text-[12.5px] text-ink-dim mt-[2px]">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽: 슬라이딩 차량 비주얼 */}
            <div className="hidden lg:block">
              {/* overflow-hidden 으로 트랙 클리핑, translate로 슬라이드 이동 */}
              <div
                className="overflow-hidden relative rounded-[18px]"
                style={{ aspectRatio: "16/10" }}
              >
                {/* 슬라이드 트랙: 전체 너비 = slide수 × 100% */}
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{
                    width: `${slides.length * 100}%`,
                    transform: `translateX(${-active * (100 / slides.length)}%)`,
                  }}
                >
                  {slides.map((slide, i) => (
                    <div
                      key={i}
                      className="glass relative h-full"
                      style={{ width: `${100 / slides.length}%`, flexShrink: 0 }}
                    >
                      {/* 글로우 */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(70% 60% at 60% 40%, ${slide.glow}, transparent 65%)`,
                        }}
                      />
                      {/* 차량 SVG */}
                      <div
                        className="absolute inset-0 grid place-items-center"
                        style={{ padding: "6% 8%" }}
                      >
                        <SlideCar type={slide.car} />
                      </div>
                      {/* 가격 칩 */}
                      <div
                        className="absolute top-[14px] right-[14px] px-[13px] py-[9px] rounded-[12px] text-white"
                        style={{
                          background: "linear-gradient(135deg,#5ea6ff,#3d8bff)",
                          boxShadow: "0 8px 20px rgba(61,139,255,.4)",
                        }}
                      >
                        <div className="text-[11px] font-bold opacity-85">{slide.chipLabel}</div>
                        <div className="text-[18px] font-black leading-[1.1]">{slide.chipPrice}</div>
                      </div>
                      {/* 캡션 */}
                      <div className="absolute bottom-[12px] left-[14px] text-[11.5px] text-ink-soft bg-[rgba(6,11,22,.5)] border border-[var(--line)] rounded-full px-[12px] py-[6px] backdrop-blur-sm">
                        {slide.cap}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 도트 + 화살표 */}
          <div className="absolute bottom-4 right-6 lg:right-[44px] z-20 flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="이전"
              className="w-7 h-7 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-line)] grid place-items-center text-ink-soft hover:text-ink transition-colors text-[14px] font-bold"
            >
              ‹
            </button>
            <div className="flex gap-[6px] items-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`슬라이드 ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "16px" : "6px",
                    height: "6px",
                    background: i === active ? "#5ea6ff" : "var(--glass-line)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="다음"
              className="w-7 h-7 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-line)] grid place-items-center text-ink-soft hover:text-ink transition-colors text-[14px] font-bold"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideCar({ type }: { type: string }) {
  const cls = "w-full h-auto drop-shadow-[0_22px_28px_rgba(0,0,0,.5)]";

  if (type === "sedan") return (
    <svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sb1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0f5fb" /><stop offset="1" stopColor="#c6d3e6" />
        </linearGradient>
        <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fc0ee" /><stop offset="1" stopColor="#5a7cae" />
        </linearGradient>
      </defs>
      <ellipse cx="310" cy="210" rx="266" ry="20" fill="rgba(0,0,0,.35)" />
      <path d="M62 172 Q86 116 176 104 Q234 66 386 64 Q516 64 588 118 L600 148 Q608 158 602 174 L592 182 Q558 182 538 182 L120 182 Q64 182 62 172Z" fill="url(#sb1)" />
      <path d="M208 104 Q250 78 382 76 Q488 78 548 116 L492 116 Q358 108 234 114 Z" fill="url(#sg1)" />
      <circle cx="176" cy="182" r="36" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
      <circle cx="176" cy="182" r="14" fill="#4a6088" />
      <circle cx="466" cy="182" r="36" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
      <circle cx="466" cy="182" r="14" fill="#4a6088" />
      <path d="M578 136 Q600 140 596 154 L562 152 Z" fill="#5ea6ff" />
    </svg>
  );

  if (type === "suv") return (
    <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sb2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf2f8" /><stop offset="1" stopColor="#b8cee4" />
        </linearGradient>
        <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8abfee" /><stop offset="1" stopColor="#4a7ab8" />
        </linearGradient>
      </defs>
      <ellipse cx="310" cy="222" rx="270" ry="22" fill="rgba(0,0,0,.4)" />
      <path d="M58 182 Q68 130 124 110 L154 80 Q180 60 290 56 Q410 54 480 80 L530 110 Q580 136 598 170 L600 182 Q600 192 590 194 L80 194 Q58 192 58 182Z" fill="url(#sb2)" />
      <path d="M148 110 L164 82 Q188 66 284 62 Q396 62 462 84 L504 110 L420 106 Q290 102 214 108Z" fill="url(#sg2)" />
      <circle cx="164" cy="194" r="40" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
      <circle cx="164" cy="194" r="16" fill="#4a6088" />
      <circle cx="484" cy="194" r="40" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
      <circle cx="484" cy="194" r="16" fill="#4a6088" />
      <path d="M582 148 Q602 152 598 166 L566 164 Z" fill="#57d6f0" />
    </svg>
  );

  if (type === "ev") return (
    <svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sb3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8eef8" /><stop offset="1" stopColor="#a4c8e8" />
        </linearGradient>
        <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7ab4d4" /><stop offset="1" stopColor="#3a7aaa" />
        </linearGradient>
      </defs>
      <ellipse cx="310" cy="210" rx="260" ry="18" fill="rgba(0,0,0,.35)" />
      <path d="M64 174 Q80 116 172 102 Q230 64 384 62 Q518 64 592 120 L602 150 Q610 160 604 176 L594 184 Q560 184 540 184 L124 184 Q64 184 64 174Z" fill="url(#sb3)" />
      <path d="M206 104 Q248 78 380 74 Q490 78 550 118 L494 118 Q360 108 234 114 Z" fill="url(#sg3)" />
      <circle cx="178" cy="184" r="36" fill="#0f1826" stroke="#3a8cc8" strokeWidth="6" />
      <circle cx="178" cy="184" r="14" fill="#4a88b0" />
      <circle cx="468" cy="184" r="36" fill="#0f1826" stroke="#3a8cc8" strokeWidth="6" />
      <circle cx="468" cy="184" r="14" fill="#4a88b0" />
      <path d="M318 72 L302 98 L316 98 L300 124 L326 94 L312 94 Z" fill="#57d6f0" opacity="0.9" />
      <path d="M586 136 Q608 142 604 156 L568 154 Z" fill="#57d6f0" />
    </svg>
  );

  return (
    <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sb4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf0f8" /><stop offset="1" stopColor="#bccde0" />
        </linearGradient>
        <linearGradient id="sg4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ab0cc" /><stop offset="1" stopColor="#4a6a8a" />
        </linearGradient>
      </defs>
      <ellipse cx="310" cy="222" rx="270" ry="22" fill="rgba(0,0,0,.4)" />
      <path d="M56 184 Q62 130 112 110 L134 74 Q156 60 200 56 L420 56 Q480 58 530 82 L572 114 Q598 138 604 172 L606 184 Q606 196 596 196 L66 196 Q56 196 56 184Z" fill="url(#sb4)" />
      <path d="M128 110 L148 76 Q168 64 200 60 L416 60 Q472 62 516 84 L548 110 L370 108 Q220 108 164 112Z" fill="url(#sg4)" />
      <rect x="168" y="72" width="60" height="36" rx="4" fill="url(#sg4)" opacity="0.7" />
      <rect x="238" y="72" width="70" height="36" rx="4" fill="url(#sg4)" opacity="0.7" />
      <rect x="318" y="72" width="70" height="36" rx="4" fill="url(#sg4)" opacity="0.7" />
      <circle cx="164" cy="196" r="40" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
      <circle cx="164" cy="196" r="16" fill="#4a6088" />
      <circle cx="490" cy="196" r="40" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
      <circle cx="490" cy="196" r="16" fill="#4a6088" />
      <path d="M586 148 Q608 152 604 168 L570 166 Z" fill="#5ea6ff" />
    </svg>
  );
}
