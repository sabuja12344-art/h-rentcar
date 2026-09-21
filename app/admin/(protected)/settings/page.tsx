export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { saveSettings } from "@/app/actions/settings";
import { SETTING_DEFAULTS } from "@/lib/settings";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "설정 | 어드민" };

const S = {
  inp: { width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "14px", border: "1px solid #d1d5db", color: "#0f172a", background: "#fff", outline: "none", height: "42px", boxSizing: "border-box" } as React.CSSProperties,
  lbl: { display: "block", fontSize: "12px", color: "#64748b", fontWeight: 600, marginBottom: "6px" } as React.CSSProperties,
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "28px", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,.04)" } as React.CSSProperties,
  cardTitle: { fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } as React.CSSProperties,
};

export default async function AdminSettingsPage() {
  const rows = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  for (const row of rows) settings[row.key] = row.value;
  const g = (key: string) => settings[key] ?? SETTING_DEFAULTS[key] ?? "";

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>설정</h1>
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>여기서 변경한 값이 방문자 사이트에 즉시 반영됩니다.</p>
      </div>

      <form action={saveSettings}>

        {/* 로고 */}
        <div style={S.card}>
          <div style={S.cardTitle}>로고</div>
          <div>
            <label style={S.lbl}>로고 이미지 URL</label>
            <input name="logo_url" type="text" placeholder="https://..." defaultValue={g("logo_url")} style={S.inp} />
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>비워두면 텍스트 로고를 사용합니다. 외부 이미지 URL 또는 Supabase Storage URL을 붙여넣으세요.</p>
          </div>
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
              <label style={S.lbl}>전화번호 (tel: 링크용, 하이픈 제외)</label>
              <input name="phone_tel" type="text" placeholder="01000000000" defaultValue={g("phone_tel")} style={S.inp} />
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
              <input name="kakao_external" type="checkbox" value="true" defaultChecked={g("kakao_external") === "true"} style={{ width: "18px", height: "18px", accentColor: "#2563eb" }} />
              카카오 버튼 클릭 시 외부 채널 이동
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
              <input name="sms_enabled" type="checkbox" value="true" defaultChecked={g("sms_enabled") !== "false"} style={{ width: "18px", height: "18px", accentColor: "#2563eb" }} />
              문자 버튼 클릭 시 문자앱 실행
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{ padding: "12px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}
        >
          전체 저장
        </button>
      </form>
    </div>
  );
}
