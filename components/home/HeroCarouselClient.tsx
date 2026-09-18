"use client";

import { useState, useEffect, useCallback } from "react";
import type { Banner } from "@prisma/client";

const INTERVAL = 5000;

const FALLBACK_SLIDES = [
  {
    id: "ph1", idx: 1,
    imageUrl: "/images/banner-1.png",
    bg: "linear-gradient(120deg,#e8eef6,#f0f4f8)",
  },
  {
    id: "ph2", idx: 2,
    imageUrl: "/images/banner-2.png",
    bg: "linear-gradient(120deg,#0f1e34,#0b1526)",
  },
];

const stats = [
  { n: "43", u: "만원~", l: "월 렌트료 시작가" },
  { n: "120", u: "여종", l: "보유 차량 라인업" },
  { n: "24", u: "시간", l: "상담 접수 가능" },
];

export function HeroCarouselClient({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const useFallback = banners.length === 0;
  const count = useFallback ? FALLBACK_SLIDES.length : banners.length;

  const next = useCallback(() => setActive(i => (i + 1) % count), [count]);
  const prev = () => setActive(i => (i - 1 + count) % count);

  useEffect(() => {
    if (count < 2 || paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [count, paused, next]);

  const slides = useFallback ? FALLBACK_SLIDES : banners.map((b, i) => ({
    id: b.id,
    idx: i + 1,
    imageUrl: undefined as string | undefined,
    bg: `radial-gradient(620px 340px at 76% 28%, ${b.glow}, transparent 62%), linear-gradient(120deg,#12203c,#0d1830 60%,#0b1424)`,
  }));

  return (
    <section style={{ padding: "22px 0" }}>
      <div className="wrap">

        {/* 슬라이더 */}
        <div
          className="relative rounded-[24px] overflow-hidden"
          style={{
            border: "1px solid var(--line)",
            boxShadow: "var(--shadow-hover)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* 트랙 */}
          <div
            className="flex"
            style={{
              transition: "transform .6s cubic-bezier(.4,0,.2,1)",
              width: `${count * 100}%`,
              transform: `translateX(${-active * (100 / count)}%)`,
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative overflow-hidden flex-shrink-0"
                style={{
                  width: `${100 / count}%`,
                  aspectRatio: "32/11",
                  minHeight: "300px",
                  background: slide.bg,
                }}
              >
                {slide.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={slide.imageUrl}
                    alt={`메인 배너 ${slide.idx}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 grid place-items-center">
                      <PlaceholderCarSvg idx={slide.idx} />
                    </div>
                    <span
                      className="absolute left-[26px] top-[24px] text-[13px] font-semibold"
                      style={{
                        color: "var(--color-blue)",
                        border: "1px solid rgba(47,107,230,.3)",
                        borderRadius: "999px",
                        padding: "7px 15px",
                        background: "rgba(47,107,230,.06)",
                      }}
                    >
                      메인 배너 {slide.idx}
                    </span>
                    <span
                      className="absolute left-[26px] bottom-[22px] text-[13px]"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      실제 배너 이미지로 교체 가능
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* 좌우 화살표 */}
          {count > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="이전 슬라이드"
                className="absolute left-[18px] top-1/2 -translate-y-1/2 z-20 w-[46px] h-[46px] rounded-full grid place-items-center border transition-all duration-150 hover:border-transparent"
                style={{
                  background: "rgba(255,255,255,.9)",
                  backdropFilter: "blur(8px)",
                  borderColor: "var(--line)",
                  color: "var(--color-ink)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(47,107,230,.9)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.9)")}
              >
                <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="다음 슬라이드"
                className="absolute right-[18px] top-1/2 -translate-y-1/2 z-20 w-[46px] h-[46px] rounded-full grid place-items-center border transition-all duration-150 hover:border-transparent"
                style={{
                  background: "rgba(255,255,255,.9)",
                  backdropFilter: "blur(8px)",
                  borderColor: "var(--line)",
                  color: "var(--color-ink)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(47,107,230,.9)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.9)")}
              >
                <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* 하단 점 */}
          {count > 1 && (
            <div className="absolute bottom-[18px] left-0 right-0 z-20 flex justify-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); setPaused(false); }}
                  aria-label={`슬라이드 ${i + 1}`}
                  className="border-0 p-0 cursor-pointer rounded-full transition-all duration-200"
                  style={{
                    width: i === active ? "26px" : "9px",
                    height: "9px",
                    background: i === active ? "#2f6be6" : "rgba(26,34,51,.2)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 배너 하단 통계 */}
        <div style={{ display: "flex", gap: "36px", marginTop: "20px", flexWrap: "wrap", padding: "0 6px" }}>
          {stats.map(s => (
            <div key={s.l} style={{ minWidth: "96px" }}>
              <div style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-.02em" }}>
                {s.n}
                <small style={{ fontSize: "13px", color: "var(--color-blue)", fontWeight: 700, marginLeft: "2px" }}>
                  {s.u}
                </small>
              </div>
              <div style={{ fontSize: "13px", color: "var(--color-ink-dim)", marginTop: "3px" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 배너 플레이스홀더용 간단한 세단 SVG — 슬라이드별로 약간씩 다른 그라데이션 ID */
function PlaceholderCarSvg({ idx }: { idx: number }) {
  const gid = `ph-body-${idx}`;
  return (
    <svg
      viewBox="0 0 620 250"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "50%",
        maxWidth: "520px",
        height: "auto",
        filter: "drop-shadow(0 26px 34px rgba(0,0,0,.55))",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef4fb" />
          <stop offset="1" stopColor="#c2d0e6" />
        </linearGradient>
      </defs>
      <ellipse cx="310" cy="212" rx="262" ry="18" fill="rgba(0,0,0,.32)" />
      <path
        d="M64 172 Q88 116 178 104 Q236 66 388 64 Q518 64 590 118 L602 148 Q610 158 604 174 L594 182 Q560 182 540 182 L122 182 Q66 182 64 172Z"
        fill={`url(#${gid})`}
      />
      <path d="M210 104 Q252 78 384 76 Q490 78 550 116 L494 116 Q360 108 236 114 Z" fill="#9fc0ee" />
      <circle cx="178" cy="182" r="34" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
      <circle cx="468" cy="182" r="34" fill="#0f1826" stroke="#2c3f5c" strokeWidth="6" />
    </svg>
  );
}
