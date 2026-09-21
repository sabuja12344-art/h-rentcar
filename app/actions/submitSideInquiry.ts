"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2, "성함을 2자 이상 입력해주세요"),
  phone: z
    .string()
    .min(9, "연락처를 입력해주세요")
    .regex(/^[\d\-\s]+$/, "올바른 연락처를 입력해주세요"),
  carInterest: z.string().min(1, "희망 차종을 입력해주세요"),
  contactMethod: z.enum(["전화", "문자", "카톡"]),
  agreedPrivacy: z.enum(["on"], {
    errorMap: () => ({ message: "개인정보 수집 및 이용에 동의해주세요" }),
  }),
});

export type SideInquiryState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "carInterest" | "agreedPrivacy", string>>;
};

export async function submitSideInquiry(
  _prev: SideInquiryState,
  formData: FormData
): Promise<SideInquiryState> {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    carInterest: formData.get("carInterest"),
    contactMethod: formData.get("contactMethod") || "전화",
    agreedPrivacy: formData.get("agreedPrivacy"),
  };

  const result = schema.safeParse(raw);
  if (!result.success) {
    const flat = result.error.flatten().fieldErrors;
    return {
      fieldErrors: Object.fromEntries(
        Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? ""])
      ) as SideInquiryState["fieldErrors"],
    };
  }

  const { name, phone, carInterest, contactMethod } = result.data;

  try {
    await prisma.inquiry.create({
      data: {
        name,
        phone,
        carInterest,
        type: "사이드폼",                          /* 유입 구분 */
        message: `안내방법: ${contactMethod}`,      /* 안내 방법 저장 */
        agreedPrivacy: true,
      },
    });

    await sendInquiryEmail({
      name,
      phone,
      carInterest,
      message: `[빠른 견적] 안내방법: ${contactMethod}`,
    });

    return { success: true };
  } catch (err) {
    console.error("[submitSideInquiry]", err);
    return { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
}
