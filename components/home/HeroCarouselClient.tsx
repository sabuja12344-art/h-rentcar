"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Banner } from "@prisma/client";

const INTERVAL = 5000;

const stats = [
  { n: "24", u: "만원~", l: "월 렌트료 시작가" },
  { n: "120", u: "여종", l: "보유 차량 라인업" },
  { n: "24", u: "시간", l: "상담 접수 가능" },
];

export function HeroCarouselClient({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = banners.length;

  const next = useCallback(() => setActive(i => (i + 1) % count), [count]);
  const prev = () => setActive(i => (i - 1 + count) % count);

  useEffect(() => {
    if (count < 2 || paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [count, paused, next]);

  return (
    <section className="py-[22px]">
      <div className="wrap">

        {/* ── 히어로 텍스트 영역 (슬라이더 위) ── */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-cyan border border-[rgba(87,214,240,.3)] rounded-full px-[13px] py-[6px] mb-[10px] bg-[rgba(87,214,240,.06)]">
              <span className="w-[5px] h-[5px] rounded-full bg-cyan shadow-[0_0_8px_#57d6f0]" />
              광주 전용 · 월 장기렌트 전문
            </div>
            <h1 className="text-[clamp(24px,3.5vw,40px)] font-black leading-[1.2] tracking-[-0.025em]">
              합리적인 장기렌트,{" "}
              <em className="not-italic text-blue-bright">현대렌트카</em>와 함께
            </h1>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/#consult"
              className="inline-flex items-center gap-2 px-[22px] py-[12px] rounded-[12px] text-[14px] font-bold text-white whitespace-nowrap transition-all duration-150 hover:-translate-y-px"
              style={{
                background: "linear-gradient(135deg,#5ea6ff,#3d8bff)",
                boxShadow: "0 8px 22px rgba(61,139,255,.38)",
              }}
            >
              무료 상담 신청 →
            </Link>
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold text-ink border border-[var(--glass-line)] bg-[var(--glass-bg)] whitespace-nowrap hover:bg-[rgba(255,255,255,.1)] hover:border-blue-bright transition-all duration-150"
            >
              차량 둘러보기
            </Link>
          </div>
        </div>

        {/* ── 풀폭 슬라이더 ── */}
        <div
          className="relative rounded-[24px] overflow-hidden"
          style={{
            border: "1px solid var(--glass-line)",
            boxShadow: "0 30px 70px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.08)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* 슬라이드 트랙 */}
          <div
            className="flex transition-transform duration-700"
            style={{
              transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
              width: count > 0 ? `${count * 100}%` : "100%",
              transform: `translateX(${count > 0 ? -active * (100 / count) : 0}%)`,
            }}
          >
            {count > 0 ? banners.map((banner) => (
              <div
                key={banner.id}
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width: `${100 / count}%`,
                  aspectRatio: "32/11",
                  minHeight: "300px",
                  background: `
                    radial-gradient(620px 340px at 76% 28%, ${banner.glow}, transparent 62%),
                    linear-gradient(120deg,#12203c,#0d1830 60%,#0b1424)
                  `,
                }}
              >
                {/* 차량 SVG */}
                <div
                  className="absolute inset-0 grid place-items-center"
                  style={{ padding: "3% 5%" }}
                >
                  <SlideCar type={banner.carType} />
                </div>

                {/* 가격 칩 (우상단) */}
                <div
                  className="absolute top-[16px] right-[18px] px-[14px] py-[10px] rounded-[14px] text-white z-10"
                  style={{
                    background: "linear-gradient(135deg,#5ea6ff,#3d8bff)",
                    boxShadow: "0 8px 22px rgba(61,139,255,.5)",
                  }}
                >
                  <div className="text-[11px] font-bold opacity-80 leading-none mb-[3px]">{banner.chipLabel}</div>
                  <div className="text-[22px] font-black leading-[1]">{banner.chipPrice}</div>
                </div>

                {/* 캡션 (좌하단) */}
                {banner.caption && (
                  <div
                    className="absolute bottom-[16px] left-[18px] text-[12.5px] text-ink-soft z-10 rounded-full px-[14px] py-[7px]"
                    style={{
                      background: "rgba(6,11,22,.5)",
                      border: "1px solid rgba(255,255,255,.1)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {banner.caption}
                  </div>
                )}
              </div>
            )) : (
              <div
                className="flex-shrink-0 w-full relative"
                style={{ aspectRatio: "32/11", minHeight: "300px", background: "linear-gradient(120deg,#12203c,#0d1830)" }}
              >
                <div className="absolute inset-0 grid place-items-center text-ink-dim text-[14px]">
                  어드민에서 배너를 추가해주세요
                </div>
              </div>
            )}
          </div>

          {/* 좌우 화살표 */}
          {count > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="이전 슬라이드"
                className="absolute left-[18px] top-1/2 -translate-y-1/2 z-20 w-[46px] h-[46px] rounded-full grid place-items-center text-ink border border-[var(--glass-line)] transition-all duration-150 hover:bg-[rgba(61,139,255,.5)] hover:border-transparent"
                style={{ background: "rgba(6,11,22,.4)", backdropFilter: "blur(8px)" }}
              >
                <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="다음 슬라이드"
                className="absolute right-[18px] top-1/2 -translate-y-1/2 z-20 w-[46px] h-[46px] rounded-full grid place-items-center text-ink border border-[var(--glass-line)] transition-all duration-150 hover:bg-[rgba(61,139,255,.5)] hover:border-transparent"
                style={{ background: "rgba(6,11,22,.4)", backdropFilter: "blur(8px)" }}
              >
                <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* 하단 점 (dots) */}
          {count > 1 && (
            <div className="absolute bottom-[18px] left-0 right-0 z-20 flex justify-center gap-[8px]">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); setPaused(false); }}
                  aria-label={`슬라이드 ${i + 1}`}
                  className="border-0 p-0 cursor-pointer rounded-full transition-all duration-200"
                  style={{
                    width: i === active ? "26px" : "9px",
                    height: "9px",
                    background: i === active ? "#5ea6ff" : "rgba(255,255,255,.4)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── 하단 통계 바 ── */}
        <div className="flex gap-[36px] mt-[20px] flex-wrap px-[6px]">
          {stats.map(s => (
            <div key={s.l} className="min-w-[90px]">
              <div className="text-[24px] font-black tracking-[-0.02em] leading-none">
                {s.n}
                <small className="text-[13px] text-cyan font-bold ml-[2px]">{s.u}</small>
              </div>
              <div className="text-[13px] text-ink-dim mt-[4px]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   배너 슬라이드용 차량 SVG (대형)
════════════════════════════════════ */
function SlideCar({ type }: { type: string }) {
  const cls = "w-full h-auto drop-shadow-[0_24px_36px_rgba(0,0,0,.6)]";

  /* 경차 */
  if (type === "compact") return (
    <svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sc-body-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8eef8"/><stop offset="1" stopColor="#c2cee0"/></linearGradient>
        <linearGradient id="sc-glass-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8ab2d8"/><stop offset="1" stopColor="#4a6ea8"/></linearGradient>
      </defs>
      <ellipse cx="310" cy="218" rx="252" ry="18" fill="rgba(0,0,0,.38)" />
      <path d="M90 186 Q90 160 106 142 L124 106 Q138 80 166 64 L224 46 Q268 38 370 38 Q446 40 478 66 L510 96 Q534 124 540 158 L540 186 Q540 198 530 200 L102 200 Q90 198 90 186Z" fill="url(#sc-body-c)" />
      <path d="M110 166 Q260 148 536 160" stroke="rgba(255,255,255,.5)" strokeWidth="3" fill="none"/>
      <path d="M172 64 L156 96 L228 92 L250 48 L224 46 Z" fill="url(#sc-glass-c)" opacity=".86"/>
      <path d="M156 96 L150 136 L226 136 L228 92 Z" fill="url(#sc-glass-c)" opacity=".8"/>
      <path d="M236 92 L232 136 L384 136 L392 92 Z" fill="url(#sc-glass-c)" opacity=".82"/>
      <path d="M400 92 L392 136 L466 134 L488 116 L478 66 L446 40 Q396 38 376 40 Z" fill="url(#sc-glass-c)" opacity=".8"/>
      <line x1="232" y1="90" x2="230" y2="200" stroke="rgba(0,0,0,.1)" strokeWidth="2"/>
      <line x1="396" y1="90" x2="394" y2="200" stroke="rgba(0,0,0,.1)" strokeWidth="2"/>
      <rect x="516" y="130" width="30" height="14" rx="4" fill="white" opacity=".72"/>
      <path d="M520 120 Q540 124 540 148 L516 148 Z" fill="#d0e2f4" opacity=".88"/>
      <rect x="96" y="140" width="26" height="42" rx="4" fill="#e04040" opacity=".9"/>
      <rect x="97" y="142" width="10" height="20" rx="2" fill="#ff7070" opacity=".8"/>
      <path d="M528 188 Q540 194 540 200 L514 200 L514 194 Z" fill="#c2ccd8"/>
      <rect x="512" y="190" width="30" height="9" rx="3" fill="#b0bcc8" opacity=".7"/>
      <circle cx="194" cy="200" r="40" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="194" cy="200" r="26" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={194} y1={200} x2={194+Math.cos(d*Math.PI/180)*24} y2={200+Math.sin(d*Math.PI/180)*24} stroke="#3a5068" strokeWidth="4"/>
      ))}
      <circle cx="194" cy="200" r="12" fill="#3a5068"/>
      <circle cx="194" cy="200" r="5" fill="#6080a0"/>
      <circle cx="452" cy="200" r="40" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="452" cy="200" r="26" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={452} y1={200} x2={452+Math.cos(d*Math.PI/180)*24} y2={200+Math.sin(d*Math.PI/180)*24} stroke="#3a5068" strokeWidth="4"/>
      ))}
      <circle cx="452" cy="200" r="12" fill="#3a5068"/>
      <circle cx="452" cy="200" r="5" fill="#6080a0"/>
    </svg>
  );

  /* SUV */
  if (type === "suv") return (
    <svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sc-body-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eaf2f8"/><stop offset="1" stopColor="#b8cee4"/></linearGradient>
        <linearGradient id="sc-glass-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8abfee"/><stop offset="1" stopColor="#4a7ab8"/></linearGradient>
      </defs>
      <ellipse cx="310" cy="228" rx="268" ry="20" fill="rgba(0,0,0,.4)" />
      <rect x="110" y="28" width="380" height="8" rx="4" fill="#c8d2de"/>
      <path d="M56 192 Q58 160 72 140 L90 108 Q100 80 128 62 L168 44 Q198 34 272 30 L388 30 Q456 32 498 60 L544 96 Q580 132 588 170 L590 192 Q590 204 580 206 L70 206 Q56 204 56 192Z" fill="url(#sc-body-s)" />
      <path d="M66 170 Q270 150 590 168" stroke="rgba(255,255,255,.5)" strokeWidth="3" fill="none"/>
      <path d="M130 62 L108 96 L188 92 L208 36 L168 44 Z" fill="url(#sc-glass-s)" opacity=".86"/>
      <path d="M108 96 L102 138 L186 138 L188 92 Z" fill="url(#sc-glass-s)" opacity=".82"/>
      <path d="M196 92 L190 138 L356 138 L364 92 Z" fill="url(#sc-glass-s)" opacity=".82"/>
      <path d="M372 92 L364 138 L462 136 L490 118 L498 60 L458 32 Z" fill="url(#sc-glass-s)" opacity=".8"/>
      <path d="M106 138 Q280 126 464 134" stroke="#c0ccd8" strokeWidth="3" fill="none"/>
      <line x1="194" y1="90" x2="192" y2="206" stroke="rgba(0,0,0,.1)" strokeWidth="2"/>
      <line x1="370" y1="90" x2="368" y2="206" stroke="rgba(0,0,0,.1)" strokeWidth="2"/>
      <rect x="556" y="116" width="36" height="16" rx="4" fill="white" opacity=".74"/>
      <path d="M560 106 Q590 112 590 140 L554 140 Z" fill="#d0e4f4" opacity=".9"/>
      <rect x="96" y="136" width="28" height="48" rx="4" fill="#e03030" opacity=".9"/>
      <rect x="97" y="138" width="11" height="22" rx="2" fill="#ff6060" opacity=".82"/>
      <circle cx="174" cy="206" r="44" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="174" cy="206" r="28" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={174} y1={206} x2={174+Math.cos(d*Math.PI/180)*26} y2={206+Math.sin(d*Math.PI/180)*26} stroke="#3a5068" strokeWidth="5"/>
      ))}
      <circle cx="174" cy="206" r="13" fill="#3a5068"/>
      <circle cx="174" cy="206" r="6" fill="#6080a0"/>
      <circle cx="494" cy="206" r="44" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="494" cy="206" r="28" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={494} y1={206} x2={494+Math.cos(d*Math.PI/180)*26} y2={206+Math.sin(d*Math.PI/180)*26} stroke="#3a5068" strokeWidth="5"/>
      ))}
      <circle cx="494" cy="206" r="13" fill="#3a5068"/>
      <circle cx="494" cy="206" r="6" fill="#6080a0"/>
    </svg>
  );

  /* 승합 */
  if (type === "van") return (
    <svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sc-body-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eaf0f8"/><stop offset="1" stopColor="#bccde0"/></linearGradient>
        <linearGradient id="sc-glass-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8ab0cc"/><stop offset="1" stopColor="#4a6a8a"/></linearGradient>
      </defs>
      <ellipse cx="310" cy="228" rx="272" ry="20" fill="rgba(0,0,0,.4)" />
      <path d="M50 194 Q52 164 64 148 L78 120 Q88 92 108 72 L134 52 Q160 38 214 34 L430 34 Q492 36 534 62 L570 94 Q598 126 608 166 L610 194 Q610 206 600 208 L62 208 Q50 206 50 194Z" fill="url(#sc-body-v)" />
      <path d="M60 170 Q300 152 608 168" stroke="rgba(255,255,255,.5)" strokeWidth="3" fill="none"/>
      <path d="M136 52 L114 82 L184 80 L204 36 L162 40 Z" fill="url(#sc-glass-v)" opacity=".86"/>
      <path d="M114 82 L110 124 L182 124 L184 80 Z" fill="url(#sc-glass-v)" opacity=".82"/>
      <path d="M192 80 L188 124 L308 124 L316 80 Z" fill="url(#sc-glass-v)" opacity=".82"/>
      <path d="M324 80 L316 124 L440 124 L448 80 Z" fill="url(#sc-glass-v)" opacity=".8"/>
      <path d="M456 80 L448 124 L518 122 L546 108 L534 62 L492 36 L432 34 Z" fill="url(#sc-glass-v)" opacity=".8"/>
      <path d="M112 124 Q310 112 520 120" stroke="#b0bccc" strokeWidth="2.5" fill="none"/>
      {/* 슬라이딩 도어 레일 */}
      <path d="M188 106 L448 106" stroke="#c0ccd8" strokeWidth="2.5" fill="none"/>
      <line x1="188" y1="78" x2="186" y2="208" stroke="rgba(0,0,0,.1)" strokeWidth="2"/>
      <line x1="320" y1="78" x2="318" y2="208" stroke="rgba(0,0,0,.1)" strokeWidth="2"/>
      <line x1="452" y1="78" x2="450" y2="208" stroke="rgba(0,0,0,.1)" strokeWidth="2"/>
      <rect x="564" y="118" width="36" height="16" rx="4" fill="white" opacity=".74"/>
      <path d="M568 108 Q610 118 608 148 L560 148 Z" fill="#d0e2f0" opacity=".88"/>
      <rect x="68" y="128" width="30" height="54" rx="4" fill="#e03030" opacity=".9"/>
      <circle cx="180" cy="208" r="44" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="180" cy="208" r="28" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={180} y1={208} x2={180+Math.cos(d*Math.PI/180)*26} y2={208+Math.sin(d*Math.PI/180)*26} stroke="#3a5068" strokeWidth="5"/>
      ))}
      <circle cx="180" cy="208" r="13" fill="#3a5068"/>
      <circle cx="180" cy="208" r="6" fill="#6080a0"/>
      <circle cx="514" cy="208" r="44" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="514" cy="208" r="28" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={514} y1={208} x2={514+Math.cos(d*Math.PI/180)*26} y2={208+Math.sin(d*Math.PI/180)*26} stroke="#3a5068" strokeWidth="5"/>
      ))}
      <circle cx="514" cy="208" r="13" fill="#3a5068"/>
      <circle cx="514" cy="208" r="6" fill="#6080a0"/>
    </svg>
  );

  /* 기본 (세단) */
  return (
    <svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" className={cls} aria-hidden="true">
      <defs>
        <linearGradient id="sc-body-d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0f5fb"/><stop offset="1" stopColor="#c6d3e6"/></linearGradient>
        <linearGradient id="sc-glass-d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fc0ee"/><stop offset="1" stopColor="#5a7cae"/></linearGradient>
      </defs>
      <ellipse cx="310" cy="216" rx="268" ry="20" fill="rgba(0,0,0,.38)" />
      <path d="M54 180 Q74 128 166 110 Q220 74 382 72 Q520 72 590 124 L606 152 Q614 164 608 180 L598 188 Q562 190 540 190 L120 190 Q60 190 54 180Z" fill="url(#sc-body-d)" />
      <path d="M66 158 Q250 140 604 154" stroke="rgba(255,255,255,.52)" strokeWidth="3" fill="none"/>
      <path d="M210 110 Q250 84 380 80 Q490 82 550 122 L492 120 Q360 112 234 118 Z" fill="url(#sc-glass-d)" opacity=".85"/>
      <path d="M66 158 Q90 130 166 112 L196 126 Q136 140 90 172 Z" fill="#a8b8cc" opacity=".45"/>
      <rect x="550" y="136" width="26" height="12" rx="3" fill="white" opacity=".72"/>
      <path d="M552 124 Q608 132 604 160 L546 160 Z" fill="#d0e0f4" opacity=".88"/>
      <path d="M554 122 L602 128" stroke="#c0d8ec" strokeWidth="2.5"/>
      <rect x="66" y="134" width="22" height="36" rx="4" fill="#d03030" opacity=".9"/>
      <rect x="67" y="136" width="8" height="16" rx="1.5" fill="#ff6060" opacity=".82"/>
      <rect x="67" y="154" width="20" height="8" rx="1.5" fill="white" opacity=".3"/>
      <path d="M60 180 Q54 186 54 192 L74 192 L74 186 Z" fill="#c0ccd8"/>
      <path d="M600 180 Q608 186 608 192 L580 192 L580 186 Z" fill="#c0ccd8"/>
      <ellipse cx="80" cy="190" rx="6" ry="4" fill="#707888"/>
      <ellipse cx="98" cy="190" rx="6" ry="4" fill="#707888"/>
      <circle cx="174" cy="190" r="40" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="174" cy="190" r="26" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={174} y1={190} x2={174+Math.cos(d*Math.PI/180)*24} y2={190+Math.sin(d*Math.PI/180)*24} stroke="#3a5068" strokeWidth="4"/>
      ))}
      <circle cx="174" cy="190" r="12" fill="#3a5068"/>
      <circle cx="174" cy="190" r="5" fill="#6080a0"/>
      <circle cx="472" cy="190" r="40" fill="#10182a" stroke="#2c3c54" strokeWidth="6"/>
      <circle cx="472" cy="190" r="26" fill="#223040"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d} x1={472} y1={190} x2={472+Math.cos(d*Math.PI/180)*24} y2={190+Math.sin(d*Math.PI/180)*24} stroke="#3a5068" strokeWidth="4"/>
      ))}
      <circle cx="472" cy="190" r="12" fill="#3a5068"/>
      <circle cx="472" cy="190" r="5" fill="#6080a0"/>
    </svg>
  );
}
