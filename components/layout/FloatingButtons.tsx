import Link from "next/link";
import { getSettings, SETTING_DEFAULTS } from "@/lib/settings";

export async function FloatingButtons() {
  const s = await getSettings(["phone_tel", "kakao_url", "instagram_url", "sms_enabled"]);
  const phone = s.phone_tel || SETTING_DEFAULTS.phone_tel;
  const kakao = s.kakao_url || SETTING_DEFAULTS.kakao_url;
  const instagram = s.instagram_url || SETTING_DEFAULTS.instagram_url;
  const smsEnabled = s.sms_enabled !== "false";

  return (
    <div className="float-btns">
      <Link href={`tel:${phone}`} title="전화 상담" className="w-[52px] h-[52px] rounded-full grid place-items-center text-white shadow-[0_8px_22px_rgba(0,0,0,.4)] transition-transform duration-150 hover:scale-[1.08]" style={{ background: "linear-gradient(135deg,#4f86f0,#2f6be6)" }}>
        <svg viewBox="0 0 24 24" width="22" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" /></svg>
      </Link>

      <Link href={kakao} title="카카오 상담" target="_blank" rel="noopener noreferrer" className="w-[52px] h-[52px] rounded-full grid place-items-center bg-[#FAE100] text-[#3a1d1d] shadow-[0_8px_22px_rgba(0,0,0,.4)] transition-transform duration-150 hover:scale-[1.08]">
        <svg viewBox="0 0 24 24" width="22" fill="currentColor"><path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.7 1.8 5.1 4.6 6.5l-1 3.6 4-2.6c.8.1 1.6.2 2.4.2 5.5 0 10-3.5 10-7.9S17.5 3 12 3z" /></svg>
      </Link>

      {instagram && (
        <Link href={instagram} title="인스타그램" target="_blank" rel="noopener noreferrer" className="w-[52px] h-[52px] rounded-full grid place-items-center text-white shadow-[0_8px_22px_rgba(0,0,0,.4)] transition-transform duration-150 hover:scale-[1.08]" style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
          <svg viewBox="0 0 24 24" width="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
        </Link>
      )}

      {smsEnabled && (
        <Link href={`sms:${phone}`} title="문자 상담" className="w-[52px] h-[52px] rounded-full grid place-items-center bg-[#2f6be6] text-white shadow-[0_8px_22px_rgba(0,0,0,.4)] transition-transform duration-150 hover:scale-[1.08]">
          <svg viewBox="0 0 24 24" width="22" fill="currentColor"><path d="M4 4h16c1 0 2 .9 2 2v10c0 1-1 2-2 2H8l-4 4V6c0-1 1-2 2-2z" /></svg>
        </Link>
      )}
    </div>
  );
}
