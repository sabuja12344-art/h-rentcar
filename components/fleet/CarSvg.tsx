/*
 * 차량 SVG 일러스트 — 차종별 사이드뷰 실루엣
 *
 * ── 실제 차량 사진으로 교체하려면 ──
 * CarCard.tsx 의 <CarSvg category={car.category} /> 부분을 아래처럼 교체하세요:
 *
 *   <img
 *     src={car.imageUrl ?? "/images/cars/placeholder.jpg"}
 *     alt={car.name}
 *     className="w-full h-full object-contain"
 *   />
 *
 * 어드민에서 차량별 imageUrl 필드를 추가하면 차종마다 개별 사진을 사용할 수 있습니다.
 */

const cls = "w-[82%] h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,.5)]";

/* 공용 색상 */
const BODY = "#dde5f2";
const BODY_MID = "#c8d3e4";
const GLASS = "#7aabda";
const GLASS_DK = "#486c9a";
const TIRE = "#141c2c";
const RIM = "#2c3e54";
const HUB = "#4a6080";
const SHADOW = "rgba(0,0,0,.38)";

/* ─────────────────────────────────────────────
   경차 (레이·모닝) — 짧고 박스형, 좁은 휠베이스
   viewBox 300×130: 좁은 캔버스 → 화면서 작아 보임
   ───────────────────────────────────────────── */
function Compact() {
  return (
    <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="150" cy="122" rx="118" ry="9" fill={SHADOW} />

      {/* 차체: 짧고 키 있는 박스형 */}
      <path
        d="M46 104 Q46 84 58 72 L72 50 Q80 36 98 28 Q116 22 174 22 Q214 24 228 36
           L242 54 Q252 68 254 88 L254 104 Q254 112 246 114 L58 114 Q46 112 46 104Z"
        fill={BODY}
      />

      {/* 앞 유리 — 거의 수직 */}
      <path d="M100 28 L88 50 L140 50 L148 28 Q120 22 100 28Z" fill={GLASS} opacity=".86" />

      {/* 측면 창문 — 2분할 */}
      <path d="M88 50 L84 76 L136 76 L140 50 Z" fill={GLASS} opacity=".8" />
      <path d="M144 50 L140 76 L216 76 L220 56 L228 36 Q210 24 186 22 L174 22 Q158 22 150 28 Z"
        fill={GLASS} opacity=".78" />

      {/* 도어 라인 */}
      <line x1="140" y1="48" x2="138" y2="114" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />

      {/* 차체 하이라이트 */}
      <path d="M54 88 Q150 80 250 86" stroke="rgba(255,255,255,.5)" strokeWidth="1.8" fill="none" />

      {/* 후미등 */}
      <rect x="48" y="74" width="12" height="24" rx="3" fill="#e04040" opacity=".9" />
      <rect x="49" y="76" width="5" height="10" rx="1" fill="#ff8080" opacity=".8" />

      {/* 전조등 */}
      <rect x="242" y="72" width="14" height="10" rx="2" fill="white" opacity=".72" />
      <path d="M244 82 Q254 86 254 100 L240 100 Z" fill="#c8dcf0" opacity=".85" />

      {/* 앞 범퍼 */}
      <path d="M250 102 Q254 108 254 114 L236 114 L236 108 Z" fill={BODY_MID} />

      {/* 바퀴 — 짧은 휠베이스로 가까이 */}
      <circle cx="96" cy="114" r="22" fill={TIRE} />
      <circle cx="96" cy="114" r="14" fill={RIM} />
      <circle cx="96" cy="114" r="8" fill={HUB} />
      <circle cx="96" cy="114" r="3.5" fill="#8098b8" />

      <circle cx="210" cy="114" r="22" fill={TIRE} />
      <circle cx="210" cy="114" r="14" fill={RIM} />
      <circle cx="210" cy="114" r="8" fill={HUB} />
      <circle cx="210" cy="114" r="3.5" fill="#8098b8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   소형/준중형 세단 (아반떼·K3) — 낮고 긴 3박스 세단
   viewBox 400×130: 넓은 캔버스 → 화면서 낮아 보임
   ───────────────────────────────────────────── */
function SmallSedan() {
  return (
    <svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="200" cy="122" rx="168" ry="9" fill={SHADOW} />

      {/* 차체: 낮고 스포티한 3박스 형태 */}
      <path
        d="M34 110 Q36 94 46 84 L60 66 Q70 50 92 42 L120 30 Q148 22 192 20
           Q248 20 282 32 L314 50 Q338 64 344 84 L346 100 L346 110
           Q346 118 338 120 L46 120 Q34 118 34 110Z"
        fill={BODY}
      />

      {/* 앞 유리 — 완만한 기울기 */}
      <path d="M94 42 L78 66 L148 64 L160 26 L122 30 Z" fill={GLASS} opacity=".85" />

      {/* 측면 창문 — 2분할 */}
      <path d="M78 66 L74 90 L144 90 L148 64 Z" fill={GLASS} opacity=".8" />
      <path d="M154 64 L150 90 L256 90 L264 66 L282 32 L248 20 Q216 18 186 22 L162 26 Z"
        fill={GLASS} opacity=".8" />

      {/* 트렁크 (3박스의 핵심 — 후방 구분선) */}
      <line x1="256" y1="88" x2="254" y2="120" stroke="rgba(0,0,0,.13)" strokeWidth="1.5" />

      {/* 도어 라인 */}
      <line x1="150" y1="62" x2="148" y2="120" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />

      {/* 차체 하이라이트 */}
      <path d="M42 92 Q200 82 344 90" stroke="rgba(255,255,255,.52)" strokeWidth="1.8" fill="none" />

      {/* 후미등 */}
      <rect x="36" y="82" width="14" height="26" rx="3" fill="#e04040" opacity=".9" />
      <rect x="37" y="84" width="5" height="12" rx="1" fill="#ff7070" opacity=".82" />

      {/* 전조등 */}
      <rect x="330" y="80" width="18" height="10" rx="2" fill="white" opacity=".74" />
      <path d="M334 90 Q346 96 346 108 L328 108 Z" fill="#c8dcf2" opacity=".86" />

      {/* 바퀴 */}
      <circle cx="106" cy="120" r="24" fill={TIRE} /><circle cx="106" cy="120" r="16" fill={RIM} />
      <circle cx="106" cy="120" r="9" fill={HUB} /><circle cx="106" cy="120" r="4" fill="#8098b8" />

      <circle cx="282" cy="120" r="24" fill={TIRE} /><circle cx="282" cy="120" r="16" fill={RIM} />
      <circle cx="282" cy="120" r="9" fill={HUB} /><circle cx="282" cy="120" r="4" fill="#8098b8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   중형/대형 세단 (쏘나타·그랜저) — 길고 우아한
   ───────────────────────────────────────────── */
function LargeSedan() {
  return (
    <svg viewBox="0 0 460 130" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="230" cy="122" rx="200" ry="9" fill={SHADOW} />

      <path
        d="M30 110 Q32 94 44 82 L58 62 Q68 46 92 36 L126 22 Q156 14 210 12
           L300 12 Q370 14 408 38 L436 62 Q452 80 454 102 L454 110
           Q454 120 444 122 L42 122 Q30 120 30 110Z"
        fill={BODY}
      />

      {/* 앞 유리 */}
      <path d="M94 36 L78 62 L156 58 L172 18 L128 22 Z" fill={GLASS} opacity=".84" />

      {/* 측면 창문 — 3분할 */}
      <path d="M78 62 L74 88 L152 88 L156 58 Z" fill={GLASS} opacity=".8" />
      <path d="M162 58 L158 88 L268 88 L276 58 Z" fill={GLASS} opacity=".8" />
      <path d="M282 58 L276 88 L356 88 L374 66 L408 38 L374 14 L340 12 L306 12 L280 18 Z"
        fill={GLASS} opacity=".8" />

      {/* 크롬 벨트라인 */}
      <path d="M76 88 Q260 78 378 86" stroke="#b8c8d8" strokeWidth="2.5" fill="none" />

      {/* 도어 라인 */}
      <line x1="160" y1="56" x2="158" y2="122" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="280" y1="56" x2="278" y2="122" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />

      <path d="M38 92 Q230 80 454 90" stroke="rgba(255,255,255,.52)" strokeWidth="2" fill="none" />

      {/* 후미등 */}
      <rect x="34" y="80" width="16" height="30" rx="3" fill="#d03030" opacity=".9" />
      <rect x="35" y="82" width="6" height="14" rx="1" fill="#ff6060" opacity=".82" />

      {/* 전조등 */}
      <rect x="436" y="78" width="20" height="12" rx="2" fill="white" opacity=".74" />
      <path d="M440 90 Q454 96 454 112 L432 112 Z" fill="#c8dcf4" opacity=".88" />

      {/* 배기구 */}
      <ellipse cx="52" cy="122" rx="6" ry="4" fill="#70808a" />
      <ellipse cx="68" cy="122" rx="6" ry="4" fill="#70808a" />

      {/* 바퀴 */}
      <circle cx="118" cy="122" r="26" fill={TIRE} /><circle cx="118" cy="122" r="17" fill={RIM} />
      <circle cx="118" cy="122" r="10" fill={HUB} /><circle cx="118" cy="122" r="4.5" fill="#8098b8" />

      <circle cx="340" cy="122" r="26" fill={TIRE} /><circle cx="340" cy="122" r="17" fill={RIM} />
      <circle cx="340" cy="122" r="10" fill={HUB} /><circle cx="340" cy="122" r="4.5" fill="#8098b8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SUV (투싼·싼타페) — 높고 당당한 박스형
   ───────────────────────────────────────────── */
function Suv() {
  return (
    <svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="200" cy="132" rx="172" ry="10" fill={SHADOW} />

      {/* 차체: 높고 수직적인 SUV 실루엣 */}
      <path
        d="M28 116 Q30 98 42 84 L56 64 Q66 46 88 36 L114 24 Q138 18 186 16
           Q256 16 288 26 L320 42 Q356 60 366 88 L368 106 L368 116
           Q368 126 358 128 L40 128 Q28 126 28 116Z"
        fill={BODY}
      />

      {/* 루프 레일 */}
      <rect x="100" y="14" width="218" height="5" rx="2.5" fill={BODY_MID} />

      {/* 앞 유리 — SUV답게 급경사 */}
      <path d="M90 36 L68 62 L136 60 L152 18 L116 24 Z" fill={GLASS} opacity=".86" />

      {/* 측면 창문 — 2분할 */}
      <path d="M68 62 L64 90 L132 90 L136 60 Z" fill={GLASS} opacity=".82" />
      <path d="M140 60 L136 90 L262 90 L270 62 L288 26 L256 16 Q228 14 200 16 L168 18 L154 18 Z"
        fill={GLASS} opacity=".8" />

      {/* 수직 C필러 (SUV 특징) */}
      <line x1="266" y1="88" x2="264" y2="128" stroke="rgba(0,0,0,.15)" strokeWidth="2.5" />
      <line x1="138" y1="58" x2="136" y2="128" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />

      <path d="M36 96 Q200 84 368 94" stroke="rgba(255,255,255,.5)" strokeWidth="2" fill="none" />

      {/* 후미등 */}
      <rect x="32" y="80" width="18" height="32" rx="3" fill="#e03030" opacity=".9" />
      <rect x="33" y="82" width="7" height="14" rx="1" fill="#ff6060" opacity=".82" />

      {/* 전조등 (SUV 넓은 형태) */}
      <rect x="346" y="76" width="24" height="12" rx="3" fill="white" opacity=".74" />
      <path d="M350 88 Q368 94 368 112 L344 112 Z" fill="#c8dcf2" opacity=".88" />
      <rect x="348" y="72" width="18" height="5" rx="2" fill="#a8c0d8" opacity=".55" />

      {/* 앞 범퍼 그릴 */}
      <rect x="346" y="110" width="24" height="8" rx="2" fill={BODY_MID} opacity=".8" />

      {/* 바퀴 (SUV — 더 큰 바퀴) */}
      <circle cx="108" cy="128" r="28" fill={TIRE} /><circle cx="108" cy="128" r="19" fill={RIM} />
      <circle cx="108" cy="128" r="11" fill={HUB} /><circle cx="108" cy="128" r="5" fill="#8098b8" />

      <circle cx="296" cy="128" r="28" fill={TIRE} /><circle cx="296" cy="128" r="19" fill={RIM} />
      <circle cx="296" cy="128" r="11" fill={HUB} /><circle cx="296" cy="128" r="5" fill="#8098b8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   승합/미니밴 (카니발·스타리아) — 매우 길고 키 큰 박스
   ───────────────────────────────────────────── */
function Van() {
  return (
    <svg viewBox="0 0 460 140" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="230" cy="132" rx="200" ry="10" fill={SHADOW} />

      {/* 차체: 길고 키 큰 박스형 */}
      <path
        d="M24 118 Q24 98 36 84 L50 62 Q60 44 82 32 L108 22 Q132 14 182 12
           L326 12 Q390 14 420 40 L438 64 Q452 86 454 110 L454 118
           Q454 128 444 130 L36 130 Q24 128 24 118Z"
        fill={BODY}
      />

      {/* 앞 유리 */}
      <path d="M82 32 L58 62 L126 60 L148 14 L110 22 Z" fill={GLASS} opacity=".86" />

      {/* 측면 창문 — 3열 (미니밴 특징) */}
      <path d="M58 62 L54 90 L122 90 L126 60 Z" fill={GLASS} opacity=".82" />
      <path d="M132 60 L128 90 L224 90 L230 60 Z" fill={GLASS} opacity=".82" />
      <path d="M236 60 L230 90 L330 90 L336 60 Z" fill={GLASS} opacity=".8" />
      <path d="M342 60 L336 90 L396 88 L416 70 L420 40 L388 14 L350 12 L328 12 Z"
        fill={GLASS} opacity=".8" />

      {/* 슬라이딩 도어 레일 */}
      <path d="M130 76 L334 76" stroke="#c0ccd8" strokeWidth="2.5" fill="none" />

      {/* 도어 구분선 */}
      <line x1="130" y1="58" x2="128" y2="130" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />
      <line x1="234" y1="58" x2="232" y2="130" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />
      <line x1="340" y1="58" x2="338" y2="130" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />

      <path d="M32 98 Q230 86 454 96" stroke="rgba(255,255,255,.5)" strokeWidth="1.8" fill="none" />

      {/* 후미등 */}
      <rect x="28" y="82" width="20" height="36" rx="3" fill="#e03030" opacity=".9" />
      <rect x="29" y="84" width="8" height="16" rx="1" fill="#ff6060" opacity=".82" />

      {/* 전조등 */}
      <rect x="432" y="80" width="24" height="14" rx="3" fill="white" opacity=".74" />
      <path d="M436 94 Q454 100 454 116 L430 116 Z" fill="#c8dcf0" opacity=".88" />

      {/* 바퀴 */}
      <circle cx="112" cy="130" r="26" fill={TIRE} /><circle cx="112" cy="130" r="17" fill={RIM} />
      <circle cx="112" cy="130" r="10" fill={HUB} /><circle cx="112" cy="130" r="4.5" fill="#8098b8" />

      <circle cx="342" cy="130" r="26" fill={TIRE} /><circle cx="342" cy="130" r="17" fill={RIM} />
      <circle cx="342" cy="130" r="10" fill={HUB} /><circle cx="342" cy="130" r="4.5" fill="#8098b8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   수입/프리미엄 (E클래스·5시리즈) — 길고 격조 있는
   ───────────────────────────────────────────── */
function Premium() {
  return (
    <svg viewBox="0 0 480 130" xmlns="http://www.w3.org/2000/svg" className={cls}>
      <ellipse cx="240" cy="122" rx="210" ry="9" fill={SHADOW} />

      <path
        d="M28 110 Q30 92 42 80 L58 60 Q70 44 96 34 L130 22 Q162 14 220 12
           L316 12 Q382 12 418 36 L450 62 Q468 82 470 106 L470 110
           Q470 120 460 122 L40 122 Q28 120 28 110Z"
        fill={BODY}
      />

      {/* 앞 유리 */}
      <path d="M98 34 L80 60 L158 56 L174 16 L132 22 Z" fill={GLASS} opacity=".83" />

      {/* 측면 창문 — 3분할 */}
      <path d="M80 60 L76 86 L154 86 L158 56 Z" fill={GLASS} opacity=".8" />
      <path d="M164 56 L160 86 L272 86 L280 58 Z" fill={GLASS} opacity=".8" />
      <path d="M286 58 L280 86 L364 86 L382 68 L418 36 L386 12 L352 12 L316 12 L286 16 Z"
        fill={GLASS} opacity=".78" />

      {/* 프리미엄 크롬 이중 몰딩 */}
      <path d="M78 86 Q260 76 382 84" stroke="#b0c0d0" strokeWidth="2.8" fill="none" />
      <path d="M30 108 Q244 104 470 108" stroke="#c8d4de" strokeWidth="1.5" fill="none" />

      {/* 도어 라인 */}
      <line x1="162" y1="54" x2="160" y2="122" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />
      <line x1="284" y1="56" x2="282" y2="122" stroke="rgba(0,0,0,.1)" strokeWidth="1.5" />

      <path d="M36 92 Q244 80 470 90" stroke="rgba(255,255,255,.55)" strokeWidth="2" fill="none" />

      {/* 후미등 — LED 스타일 */}
      <rect x="32" y="78" width="18" height="30" rx="3" fill="#c82828" opacity=".9" />
      <rect x="33" y="80" width="7" height="14" rx="1" fill="#ff5050" opacity=".82" />
      <rect x="32" y="96" width="18" height="3" rx="1" fill="#ff9090" opacity=".6" />

      {/* 전조등 — LED 라인 */}
      <rect x="448" y="76" width="24" height="12" rx="2" fill="white" opacity=".74" />
      <path d="M452 88 Q470 94 470 110 L446 110 Z" fill="#c8dcf4" opacity=".88" />
      <path d="M452 78 L470 82" stroke="#d8eeff" strokeWidth="1.5" />

      {/* 듀얼 배기구 */}
      <ellipse cx="50" cy="122" rx="6" ry="4" fill="#70808a" />
      <ellipse cx="66" cy="122" rx="6" ry="4" fill="#70808a" />

      {/* 바퀴 */}
      <circle cx="120" cy="122" r="26" fill={TIRE} /><circle cx="120" cy="122" r="17" fill={RIM} />
      <circle cx="120" cy="122" r="10" fill={HUB} /><circle cx="120" cy="122" r="4.5" fill="#8098b8" />

      <circle cx="356" cy="122" r="26" fill={TIRE} /><circle cx="356" cy="122" r="17" fill={RIM} />
      <circle cx="356" cy="122" r="10" fill={HUB} /><circle cx="356" cy="122" r="4.5" fill="#8098b8" />
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
