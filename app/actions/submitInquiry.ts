"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요"),
  phone: z
    .string()
    .min(9, "연락처를 입력해주세요")
    .regex(/^[\d\-\s]+$/, "올바른 연락처를 입력해주세요"),
  carInterest: z.string().optional(),
  message: z.string().optional(),
  agreedPrivacy: z.enum(["on"], {
    errorMap: () => ({ message: "개인정보 수집 및 이용에 동의해주세요" }),
  }),
  pickupDate: z.string().optional(),
  pickupTime: z.string().optional(),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
});

export type InquiryState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "agreedPrivacy", string>>;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    carInterest: formData.get("carInterest") || undefined,
    message: formData.get("message") || undefined,
    agreedPrivacy: formData.get("agreedPrivacy"),
    pickupDate: formData.get("pickupDate") || undefined,
    pickupTime: formData.get("pickupTime") || undefined,
    returnDate: formData.get("returnDate") || undefined,
    returnTime: formData.get("returnTime") || undefined,
  };

  const result = schema.safeParse(raw);

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors;
    return {
      success: false,
      fieldErrors: Object.fromEntries(
        Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? ""])
      ) as InquiryState["fieldErrors"],
    };
  }

  const { name, phone, carInterest, message, pickupDate, pickupTime, returnDate, returnTime } =
    result.data;

  try {
    await prisma.inquiry.create({
      data: {
        name,
        phone,
        carInterest: carInterest || null,
        message: message || null,
        agreedPrivacy: true,
        pickupDate: pickupDate || null,
        pickupTime: pickupTime || null,
        returnDate: returnDate || null,
        returnTime: returnTime || null,
      },
    });

    await sendInquiryEmail({ name, phone, carInterest, message, pickupDate, pickupTime, returnDate, returnTime });

    return { success: true };
  } catch (err) {
    console.error("[submitInquiry]", err);
    return { success: false, error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
}
