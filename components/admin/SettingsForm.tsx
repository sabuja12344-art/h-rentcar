"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { saveSettings } from "@/app/actions/settings";
import { sendTestKakaoNotification } from "@/app/actions/kakao";

const S = {
  inp: { width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "14px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", height: "42px", boxSizing: "border-box" } as React.CSSProperties,
  lbl: { display: "block", fontSize: "12px", color: "#64748b", fontWeight: 600, marginBottom: "6px" } as React.CSSProperties,
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "28px", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,.04)" } as React.CSSProperties,
  cardTitle: { fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } as React.CSSProperties,
};

type Props = { settings: Record<string, string> };

export function SettingsForm({ settings }: Props) {
  const g = (key: string) => settings[key] ?? "";
  const [kakaoKey, setKakaoKey] = useState(g("kakao_rest_api_key"));
  const [testMsg, setTestMsg] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const params = useSearchParams();

  const isConnected = !!g("kakao_access_token");

  useEffect(() => {
    if (params.get("saved") === "1") setSavedMsg("✅ 저장 완료!");
    if (params.get("kakao") === "success") setSavedMsg("✅ 카카오 연동 완료!");
    if (params.get("kakao") === "denied") setSavedMsg("❌ 카카오 로그인이 거부됐습니다.");
    const t = setTimeout(() => setSavedMsg(""), 4000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleTest() {
    setTestMsg("전송 중...");
    const result = await sendTestKakaoNotification();
    setTestMsg(result.ok ? "✅ 테스트 메시지 발송 성공!" : `❌ 실패: ${result.error}`);
    setTimeout(() => setTestMsg(""), 5000);
  }

  function handleKakaoLogin() {
    const key = kakaoKey.trim();
    if (!key) {
      alert("REST API 키를 먼저 입력하고 저장해주세요.");
      return;
    }
    const redirectUri = `${location.origin}/api/kakao/callback`;
    const url =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${key}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=talk_message`;
    location.href = url;
  }

  return (
    <form action={saveSettings}>

      {/* 로고 */}
      <div style={S.card}>
        <div style={S.cardTitle}>로고</div>
        <ImageUpload
          name="logo_url"
          defaultValue={g("logo_url")}
          folder="logo"
          label="로고 이미지"
          hint="비워두면 텍스트 로고를 사용합니다. PNG/SVG 투명 배경 권장."
          width={160}
          height={60}
        />
      </div>

      {/* 사업자 정보 */}
      <div style={S.card}>
        <div style={S.cardTitle}>사업자 정보</div>
        <div style={S.grid2}>
          <div>
            <label style={S.lbl}>상호명</label>
            <input name="business_name" type="text" defaultValue={g("business_name")} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>대표자</label>
            <input name="business_ceo" type="text" defaultValue={g("business_ceo")} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>사업자등록번호</label>
            <input name="business_reg_no" type="text" placeholder="000-00-00000" defaultValue={g("business_reg_no")} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>이메일</label>
            <input name="business_email" type="email" defaultValue={g("business_email")} style={S.inp} />
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <label style={S.lbl}>주소</label>
          <input name="business_address" type="text" defaultValue={g("business_address")} style={S.inp} />
        </div>
      </div>

      {/* 연락처 */}
      <div style={S.card}>
        <div style={S.cardTitle}>연락처</div>
        <div style={S.grid2}>
          <div>
            <label style={S.lbl}>대표 전화번호 (표시용)</label>
            <input name="phone_display" type="text" placeholder="010-0000-0000" defaultValue={g("phone_display")} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>전화·문자 번호 (하이픈 제외) *</label>
            <input name="phone_tel" type="text" placeholder="01000000000" defaultValue={g("phone_tel")} style={S.inp} />
            <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>전화 버튼·문자 버튼·모바일 하단바에 동일하게 사용됩니다.</p>
          </div>
          <div>
            <label style={S.lbl}>평일 운영시간</label>
            <input name="hours_weekday" type="text" placeholder="09:00~18:00" defaultValue={g("hours_weekday")} style={S.inp} />
          </div>
          <div>
            <label style={S.lbl}>일요일 운영시간</label>
            <input name="hours_sunday" type="text" placeholder="10:00~15:00" defaultValue={g("hours_sunday")} style={S.inp} />
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <label style={S.lbl}>휴무 안내 문구</label>
          <input name="hours_note" type="text" placeholder="토요일·공휴일 상담 가능" defaultValue={g("hours_note")} style={S.inp} />
        </div>
      </div>

      {/* 상담 채널 */}
      <div style={S.card}>
        <div style={S.cardTitle}>상담 채널</div>
        <div>
          <label style={S.lbl}>카카오톡 채널 URL</label>
          <input name="kakao_url" type="text" placeholder="https://open.kakao.com/..." defaultValue={g("kakao_url")} style={S.inp} />
        </div>
        <div style={{ marginTop: "16px" }}>
          <label style={S.lbl}>인스타그램 URL</label>
          <input name="instagram_url" type="text" placeholder="https://instagram.com/..." defaultValue={g("instagram_url")} style={S.inp} />
        </div>
        <div style={{ display: "flex", gap: "32px", marginTop: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
            <input name="sms_enabled" type="checkbox" value="true" defaultChecked={g("sms_enabled") !== "false"} style={{ width: "18px", height: "18px", accentColor: "#2563eb" }} />
            문자 버튼 활성화
          </label>
        </div>
      </div>

      {/* 카카오톡 상담 알림 */}
      <div style={S.card}>
        <div style={S.cardTitle}>카카오톡 상담 알림 (나에게 보내기)</div>
        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px", lineHeight: 1.6 }}>
          상담 신청이 들어오면 내 카카오톡으로 즉시 알림을 받습니다.<br />
          카카오 개발자 앱의 REST API 키를 저장하고 로그인하면 연동됩니다.
        </p>

        <div>
          <label style={S.lbl}>카카오 REST API 키</label>
          <input
            name="kakao_rest_api_key"
            type="text"
            placeholder="예: abcdef1234567890abcdef1234567890"
            defaultValue={kakaoKey}
            onChange={e => setKakaoKey(e.target.value)}
            style={S.inp}
          />
          <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
            developers.kakao.com → 내 애플리케이션 → 앱 키 → REST API 키
          </p>
        </div>

        {/* 연결 상태 */}
        <div style={{ marginTop: "16px", padding: "12px 16px", borderRadius: "8px", border: `1px solid ${isConnected ? "#bbf7d0" : "#fde047"}`, background: isConnected ? "#f0fdf4" : "#fefce8" }}>
          {isConnected ? (
            <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "14px" }}>✅ 카카오 연결됨 — 알림 수신 활성 상태</span>
          ) : (
            <span style={{ color: "#854d0e", fontSize: "14px" }}>⚠️ 미연결 — 아래 버튼으로 카카오 로그인을 완료해주세요</span>
          )}
        </div>

        {/* 버튼 */}
        <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={handleKakaoLogin}
            style={{ padding: "10px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, background: "#FEE500", color: "#191919", border: "none", cursor: "pointer" }}
          >
            카카오 로그인 →
          </button>
          {isConnected && (
            <button
              type="button"
              onClick={handleTest}
              style={{ padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, background: "#f1f5f9", color: "#374151", border: "1px solid #d1d5db", cursor: "pointer" }}
            >
              테스트 전송
            </button>
          )}
          {testMsg && (
            <span style={{ fontSize: "13px", color: testMsg.startsWith("✅") ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
              {testMsg}
            </span>
          )}
        </div>

        {/* 알림 수신 토글 */}
        {isConnected && (
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #f1f5f9" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
              <input
                name="kakao_notify_enabled"
                type="checkbox"
                value="true"
                defaultChecked={g("kakao_notify_enabled") === "true"}
                style={{ width: "18px", height: "18px", accentColor: "#2563eb" }}
              />
              상담 신청 시 카카오톡 알림 수신
            </label>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          type="submit"
          style={{ padding: "12px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}
        >
          전체 저장
        </button>
        {savedMsg && (
          <span style={{ fontSize: "14px", fontWeight: 600, color: savedMsg.startsWith("✅") ? "#16a34a" : "#dc2626" }}>
            {savedMsg}
          </span>
        )}
      </div>
    </form>
  );
}
