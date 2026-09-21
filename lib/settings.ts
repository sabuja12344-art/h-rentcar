import { prisma } from "./prisma";

export async function getSetting(key: string, fallback = ""): Promise<string> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    return row?.value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSetting.findMany({ where: { key: { in: keys } } });
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;
    return map;
  } catch {
    return {};
  }
}

export const SETTING_DEFAULTS: Record<string, string> = {
  phone_display: "010-0000-0000",
  phone_tel: "01000000000",
  kakao_url: "https://open.kakao.com/",
  business_name: "현대렌트카",
  business_ceo: "대표자명",
  business_reg_no: "000-00-00000",
  business_email: "example@email.com",
  business_address: "광주광역시 오목천동 870 1층",
  hours_weekday: "09:00~18:00",
  hours_sunday: "10:00~15:00",
  hours_note: "토요일·공휴일 상담 가능",
  logo_url: "",
  instagram_url: "",
};
