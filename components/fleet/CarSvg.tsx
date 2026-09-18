const cls = "w-[82%] h-auto drop-shadow-[0_14px_24px_rgba(0,0,0,0.52)]";

/* ── 공용 컬러 ── */
const B = "#dde4f0";      // 차체 밝은 면
const BD = "#c0cad e";    // 차체 어두운 면 (unused, kept for reference)
const BM = "#c8d2e2";     // 차체 중간
const G = "#7aa8d4";      // 유리 밝음
const GD = "#4870a0";     // 유리 어두움
const W1 = "#141c2c";     // 타이어
const W2 = "#263448";     // 림 바깥
const W3 = "#3c5070";     // 림 안쪽
const W4 = "#6888a8";     // 허브
const SH = "rgba(0,0,0,.38)"; // 그림자

/* ── 바퀴 컴포넌트 ── */
function Wheel({ cx, cy, r = 22 }: { cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={W1} />
      <circle cx={cx} cy={cy} r={r * 0.72} fill={W2} />
      {/* 림 스포크 */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos((deg * Math.PI) / 180) * r * 0.6}
          y2={cy + Math.sin((deg * Math.PI) / 180) * r * 0.6}
          stroke={W3}
          strokeWidth="3"
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.36} fill={W3} />
      <circle cx={cx} cy={cy} r={r * 0.16} fill={W4} />
    </>
  );
}

/* ═══════════════════════════════════════════════
   경차 (Morning / Ray 스타일) — 짧고 박스형
═══════════════════════════════════════════════ */
function Compact() {
  return (
    <svg viewBox="0 0 360 148" xmlns="http://www.w3.org/2000/svg" className={cls}>
      {/* 그림자 */}
      <ellipse cx="180" cy="138" rx="152" ry="10" fill={SH} />
      {/* 차체 */}
      <path
        d="M42 118
           Q42 96 54 82
           L68 52
           Q78 36 104 30
           L220 28
           Q254 28 264 44
           L278 68
           Q294 86 296 106
           L296 118
           Q296 124 288 126
           L54 126
           Q42 124 42 118Z"
        fill={B}
      />
      {/* 차체 하이라이트 (옆면 캐릭터라인) */}
      <path d="M52 94 Q120 86 290 92" stroke="rgba(255,255,255,.55)" strokeWidth="2" fill="none" />
      {/* 앞 유리 */}
      <path
        d="M106 30 L104 30 Q86 32 78 44 L68 52 L92 54 L116 36 Z"
        fill={G}
        opacity="0.85"
      />
      {/* 측면 창문 */}
      <path
        d="M92 54 L68 52 L66 78 L90 78 Z"
        fill={G}
        opacity="0.78"
      />
      <path
        d="M96 54 L92 78 L162 78 L168 54 Z"
        fill={G}
        opacity="0.82"
      />
      <path
        d="M172 54 L166 78 L226 78 L230 56 Z"
        fill={G}
        opacity="0.78"
      />
      {/* 뒷 유리 */}
      <path
        d="M232 56 L226 78 L250 76 L260 62 L264 44 Q252 30 230 28 L220 28 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 도어 라인 */}
      <line x1="94" y1="52" x2="92" y2="126" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="168" y1="52" x2="166" y2="126" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="230" y1="54" x2="228" y2="126" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      {/* 전조등 */}
      <path d="M286 78 Q296 84 296 100 L280 100 Z" fill="#d8e4f0" opacity="0.9" />
      <rect x="284" y="70" width="12" height="8" rx="2" fill="white" opacity="0.7" />
      {/* 후미등 */}
      <rect x="46" y="80" width="12" height="22" rx="3" fill="#e05050" opacity="0.9" />
      <rect x="47" y="82" width="5" height="10" rx="1" fill="#ff9090" opacity="0.8" />
      {/* 앞 범퍼 */}
      <path d="M290 114 Q296 118 296 126 L278 126 L278 120 Z" fill={BM} />
      <rect x="278" y="116" width="18" height="6" rx="2" fill="#c0ccd8" opacity="0.6" />
      {/* 뒷 범퍼 */}
      <path d="M56 114 Q42 118 42 126 L60 126 L60 120 Z" fill={BM} />
      {/* 바퀴 */}
      <Wheel cx={108} cy={126} r={24} />
      <Wheel cx={248} cy={126} r={24} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   소형/준중형 세단 (아반떼/K3 스타일) — 스포티 3박스
═══════════════════════════════════════════════ */
function SmallSedan() {
  return (
    <svg viewBox="0 0 400 148" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="200" cy="138" rx="172" ry="10" fill={SH} />
      {/* 차체 */}
      <path
        d="M34 116
           Q36 100 44 88
           L56 64
           Q64 48 86 38
           L114 26
           Q140 20 200 20
           Q258 20 290 30
           L322 46
           Q346 60 352 80
           L358 104
           L358 116
           Q358 124 350 126
           L46 126
           Q34 124 34 116Z"
        fill={B}
      />
      <path d="M42 96 Q150 84 356 92" stroke="rgba(255,255,255,.5)" strokeWidth="2" fill="none" />
      {/* 앞 유리 */}
      <path
        d="M88 38 L80 56 L144 52 L152 26 L114 26 Z"
        fill={G}
        opacity="0.85"
      />
      {/* 측면 창문 (2개) */}
      <path
        d="M80 56 L76 80 L140 80 L144 52 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M148 52 L144 80 L240 80 L246 52 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 뒷 유리 */}
      <path
        d="M252 52 L246 80 L296 78 L314 62 L322 46 L292 30 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 도어 라인 */}
      <line x1="146" y1="50" x2="144" y2="126" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="250" y1="50" x2="248" y2="126" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      {/* 전조등 (날카로운) */}
      <path d="M346 88 Q358 92 358 108 L342 108 Z" fill="#d8e4f4" opacity="0.9" />
      <rect x="340" y="80" width="18" height="8" rx="2" fill="white" opacity="0.75" />
      <rect x="340" y="76" width="14" height="4" rx="1" fill="#a0bcdc" opacity="0.6" />
      {/* 후미등 */}
      <rect x="38" y="82" width="14" height="26" rx="3" fill="#e04848" opacity="0.9" />
      <rect x="39" y="84" width="6" height="12" rx="1" fill="#ff8080" opacity="0.8" />
      <rect x="39" y="98" width="12" height="8" rx="1" fill="#fff" opacity="0.4" />
      {/* 앞 범퍼 그릴 */}
      <path d="M350 110 Q358 114 358 122 L342 122 L342 116 Z" fill={BM} />
      <rect x="340" y="112" width="20" height="6" rx="2" fill="#b8c8d8" opacity="0.7" />
      {/* 뒷 범퍼 */}
      <path d="M50 110 Q34 114 34 122 L52 122 L52 116 Z" fill={BM} />
      {/* 바퀴 */}
      <Wheel cx={114} cy={126} r={26} />
      <Wheel cx={286} cy={126} r={26} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   중형/대형 세단 (쏘나타/그랜저 스타일) — 길고 우아한
═══════════════════════════════════════════════ */
function LargeSedan() {
  return (
    <svg viewBox="0 0 480 148" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="240" cy="138" rx="212" ry="10" fill={SH} />
      {/* 차체 — 길고 유선형 */}
      <path
        d="M28 118
           Q30 100 40 88
           L52 68
           Q60 52 82 40
           L114 26
           Q140 18 200 16
           L300 16
           Q366 18 400 38
           L424 60
           Q444 78 448 102
           L448 118
           Q448 126 440 128
           L40 128
           Q28 126 28 118Z"
        fill={B}
      />
      <path d="M36 96 Q180 82 448 92" stroke="rgba(255,255,255,.55)" strokeWidth="2" fill="none" />
      {/* 앞 유리 (완만한 기울기) */}
      <path
        d="M84 40 L72 62 L142 58 L152 22 L114 26 Z"
        fill={G}
        opacity="0.82"
      />
      {/* 측면 창문 (3개 - 대형 세단) */}
      <path
        d="M72 62 L68 84 L138 84 L142 58 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M148 58 L144 84 L248 84 L254 58 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M260 58 L254 84 L332 84 L340 62 Z"
        fill={G}
        opacity="0.78"
      />
      {/* 뒷 유리 */}
      <path
        d="M346 62 L340 84 L382 82 L404 62 L400 38 L368 22 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 도어 라인 */}
      <line x1="148" y1="56" x2="146" y2="128" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="256" y1="56" x2="254" y2="128" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="344" y1="60" x2="342" y2="128" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      {/* 벨트라인 크롬 몰딩 */}
      <path d="M70 84 Q240 76 384 82" stroke="#c0ccd8" strokeWidth="2.5" fill="none" />
      {/* 전조등 */}
      <path d="M436 88 Q448 94 448 114 L430 114 Z" fill="#d0e0f2" opacity="0.9" />
      <rect x="428" y="78" width="20" height="10" rx="2" fill="white" opacity="0.75" />
      <rect x="428" y="74" width="16" height="4" rx="1" fill="#a8c0dc" opacity="0.6" />
      {/* 후미등 */}
      <rect x="32" y="84" width="16" height="28" rx="3" fill="#e04040" opacity="0.9" />
      <rect x="33" y="86" width="6" height="14" rx="1" fill="#ff7070" opacity="0.8" />
      <rect x="33" y="102" width="14" height="8" rx="1" fill="#fff" opacity="0.35" />
      {/* 앞 범퍼 */}
      <path d="M440 114 Q448 118 448 128 L428 128 L428 120 Z" fill={BM} />
      <rect x="426" y="116" width="24" height="7" rx="2" fill="#b0c2d4" opacity="0.7" />
      {/* 뒷 범퍼 */}
      <path d="M44 114 Q28 118 28 128 L48 128 L48 120 Z" fill={BM} />
      {/* 바퀴 */}
      <Wheel cx={124} cy={128} r={28} />
      <Wheel cx={356} cy={128} r={28} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   SUV (투싼/싼타페 스타일) — 높고 당당한
═══════════════════════════════════════════════ */
function Suv() {
  return (
    <svg viewBox="0 0 420 158" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="210" cy="148" rx="180" ry="10" fill={SH} />
      {/* 차체 */}
      <path
        d="M28 122
           Q28 104 38 92
           L50 72
           Q56 52 74 40
           L98 28
           Q120 20 180 18
           Q250 18 296 26
           L330 40
           Q366 56 378 82
           L388 108
           L388 122
           Q388 130 380 132
           L40 132
           Q28 130 28 122Z"
        fill={B}
      />
      <path d="M36 100 Q160 86 388 96" stroke="rgba(255,255,255,.5)" strokeWidth="2" fill="none" />
      {/* 루프 레일 */}
      <rect x="90" y="16" width="248" height="5" rx="2.5" fill={BM} />
      {/* 앞 유리 (급경사) */}
      <path
        d="M76 40 L60 64 L116 60 L128 24 L98 28 Z"
        fill={G}
        opacity="0.84"
      />
      {/* 측면 창문 (2개) */}
      <path
        d="M60 64 L56 90 L114 90 L116 60 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M120 60 L116 90 L236 90 L244 60 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 뒷 유리 */}
      <path
        d="M250 60 L244 90 L310 88 L330 70 L330 40 L296 26 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 도어 라인 */}
      <line x1="120" y1="58" x2="118" y2="132" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="248" y1="58" x2="246" y2="132" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      {/* 벨트라인 */}
      <path d="M58 90 Q200 82 312 88" stroke="#c0ccd8" strokeWidth="2.5" fill="none" />
      {/* 앞 범퍼 & 그릴 */}
      <path d="M370 110 Q388 116 388 128 L368 128 L368 118 Z" fill={BM} />
      <rect x="366" y="112" width="24" height="8" rx="2" fill="#b0c0d0" opacity="0.7" />
      {/* 전조등 (넓은 SUV 스타일) */}
      <path d="M358 82 Q388 88 388 110 L356 110 Z" fill="#d2e2f4" opacity="0.9" />
      <rect x="354" y="72" width="34" height="10" rx="3" fill="white" opacity="0.75" />
      <rect x="354" y="68" width="28" height="5" rx="2" fill="#a8c0dc" opacity="0.55" />
      {/* 후미등 */}
      <rect x="32" y="82" width="18" height="32" rx="3" fill="#e04040" opacity="0.9" />
      <rect x="33" y="84" width="7" height="16" rx="1" fill="#ff7070" opacity="0.8" />
      {/* 뒷 범퍼 */}
      <path d="M48 118 Q28 122 28 130 L50 130 L50 122 Z" fill={BM} />
      {/* 바퀴 (SUV는 큰 바퀴) */}
      <Wheel cx={116} cy={132} r={30} />
      <Wheel cx={302} cy={132} r={30} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   승합/미니밴 (카니발/스타리아 스타일) — 키 크고 넓은
═══════════════════════════════════════════════ */
function Van() {
  return (
    <svg viewBox="0 0 460 158" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="230" cy="148" rx="200" ry="10" fill={SH} />
      {/* 차체 */}
      <path
        d="M26 124
           Q26 108 34 96
           L46 76
           Q52 56 68 44
           L86 30
           Q104 20 142 18
           L358 18
           Q400 20 420 46
           L432 70
           Q438 86 438 106
           L438 124
           Q438 132 430 134
           L38 134
           Q26 132 26 124Z"
        fill={B}
      />
      <path d="M34 102 Q220 88 438 100" stroke="rgba(255,255,255,.5)" strokeWidth="2" fill="none" />
      {/* 앞 유리 (약간 앞으로 기울어짐) */}
      <path
        d="M86 30 L70 56 L124 54 L136 18 L104 20 Z"
        fill={G}
        opacity="0.84"
      />
      {/* 측면 창문 3열 */}
      <path
        d="M70 56 L66 82 L122 82 L124 54 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M132 54 L128 82 L216 82 L222 54 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M230 54 L224 82 L316 82 L322 54 Z"
        fill={G}
        opacity="0.78"
      />
      {/* 뒷 유리 */}
      <path
        d="M328 54 L322 82 L384 82 L404 64 L420 46 L390 22 L358 18 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 슬라이딩 도어 라인 */}
      <line x1="128" y1="52" x2="126" y2="134" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />
      <line x1="228" y1="52" x2="226" y2="134" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />
      <line x1="328" y1="52" x2="326" y2="134" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />
      {/* 슬라이딩 도어 레일 */}
      <path d="M130 68 L324 68" stroke="#c8d2df" strokeWidth="2" fill="none" />
      {/* 벨트라인 */}
      <path d="M68 82 Q240 74 386 80" stroke="#c0ccd8" strokeWidth="2.5" fill="none" />
      {/* 전조등 (미니밴 스타일, 두꺼운) */}
      <path d="M420 90 Q438 96 438 118 L414 118 Z" fill="#d0e0f0" opacity="0.9" />
      <rect x="412" y="78" width="28" height="12" rx="3" fill="white" opacity="0.75" />
      <rect x="412" y="74" width="24" height="5" rx="2" fill="#a8c0d8" opacity="0.55" />
      {/* 후미등 */}
      <rect x="30" y="86" width="20" height="32" rx="3" fill="#e04040" opacity="0.9" />
      <rect x="31" y="88" width="8" height="16" rx="1" fill="#ff7070" opacity="0.8" />
      {/* 앞 범퍼 */}
      <path d="M430 118 Q438 122 438 134 L414 134 L414 124 Z" fill={BM} />
      <rect x="412" y="120" width="28" height="8" rx="2" fill="#b0c0d0" opacity="0.7" />
      {/* 뒷 범퍼 */}
      <path d="M44 118 Q26 122 26 132 L48 132 L48 124 Z" fill={BM} />
      {/* 바퀴 */}
      <Wheel cx={126} cy={134} r={28} />
      <Wheel cx={336} cy={134} r={28} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   수입/프리미엄 (E-클래스/5시리즈 스타일) — 클래식 럭셔리
═══════════════════════════════════════════════ */
function Premium() {
  return (
    <svg viewBox="0 0 500 148" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="250" cy="138" rx="226" ry="10" fill={SH} />
      {/* 차체 */}
      <path
        d="M26 118
           Q28 100 38 88
           L54 66
           Q64 50 88 38
           L124 24
           Q154 16 214 14
           L316 14
           Q378 14 414 36
           L444 60
           Q466 80 470 106
           L472 118
           Q472 128 462 130
           L38 130
           Q26 128 26 118Z"
        fill={B}
      />
      <path d="M34 96 Q200 80 472 92" stroke="rgba(255,255,255,.58)" strokeWidth="2.2" fill="none" />
      {/* 앞 유리 */}
      <path
        d="M90 38 L76 62 L148 58 L162 20 L124 24 Z"
        fill={G}
        opacity="0.82"
      />
      {/* 측면 창문 (3개 - 럭셔리) */}
      <path
        d="M76 62 L72 86 L144 86 L148 58 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M154 58 L150 86 L258 86 L264 58 Z"
        fill={G}
        opacity="0.8"
      />
      <path
        d="M270 58 L264 86 L350 86 L360 66 Z"
        fill={G}
        opacity="0.78"
      />
      {/* 뒷 유리 */}
      <path
        d="M366 66 L358 86 L406 84 L426 68 L444 60 L414 36 L378 14 L348 14 Z"
        fill={G}
        opacity="0.8"
      />
      {/* 도어 라인 */}
      <line x1="152" y1="56" x2="150" y2="130" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="268" y1="56" x2="266" y2="130" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="364" y1="64" x2="362" y2="130" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      {/* 프리미엄 크롬 몰딩 (두 줄) */}
      <path d="M74 86 Q250 76 408 84" stroke="#b8c8d8" strokeWidth="2.5" fill="none" />
      <path d="M36 110 Q250 106 470 110" stroke="#d0dae6" strokeWidth="1.5" fill="none" />
      {/* 전조등 (LED 라인 디테일) */}
      <path d="M454 86 Q472 92 472 112 L450 112 Z" fill="#d0e0f4" opacity="0.9" />
      <rect x="448" y="74" width="24" height="12" rx="2" fill="white" opacity="0.78" />
      <rect x="450" y="70" width="20" height="5" rx="1.5" fill="#c0d8ec" opacity="0.65" />
      <path d="M452 76 L470 80" stroke="#e0f0ff" strokeWidth="1.5" />
      {/* 후미등 (LED 스타일) */}
      <rect x="30" y="82" width="18" height="30" rx="3" fill="#d03030" opacity="0.9" />
      <rect x="31" y="84" width="7" height="14" rx="1" fill="#ff6060" opacity="0.8" />
      <rect x="30" y="98" width="18" height="3" rx="1" fill="#ff9090" opacity="0.6" />
      <rect x="31" y="104" width="16" height="6" rx="1" fill="white" opacity="0.35" />
      {/* 앞 범퍼 */}
      <path d="M462 112 Q472 116 472 128 L448 128 L448 120 Z" fill={BM} />
      <rect x="446" y="114" width="28" height="8" rx="2" fill="#b0c2d4" opacity="0.7" />
      {/* 뒷 범퍼 */}
      <path d="M44 112 Q26 116 26 128 L50 128 L50 120 Z" fill={BM} />
      {/* 배기구 */}
      <ellipse cx="62" cy="128" rx="6" ry="4" fill="#80909a" />
      <ellipse cx="78" cy="128" rx="6" ry="4" fill="#80909a" />
      {/* 바퀴 */}
      <Wheel cx={132} cy={130} r={28} />
      <Wheel cx={368} cy={130} r={28} />
    </svg>
  );
}

export function CarSvg({ category }: { category: string }) {
  if (category === "경차") return <Compact />;
  if (category === "소형/준중형 세단") return <SmallSedan />;
  if (category === "중형/대형 세단") return <LargeSedan />;
  if (category === "SUV") return <Suv />;
  if (category === "승합/미니밴") return <Van />;
  if (category === "수입/프리미엄") return <Premium />;
  // 레거시 카테고리 호환
  if (category === "세단" || category === "전기·친환경") return <LargeSedan />;
  if (category === "승합·미니밴") return <Van />;
  return <LargeSedan />;
}
