"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  chipLabel: z.string().min(1, "칩 라벨을 입력해주세요"),
  chipPrice: z.string().min(1, "가격 텍스트를 입력해주세요"),
  caption: z.string().optional(),
  carType: z.enum(["compact", "sedan", "suv", "van"]),
  glow: z.string().default("rgba(61,139,255,.28)"),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().default(0),
});

export type BannerFormState = { success?: boolean; error?: string };

export async function createBanner(_prev: BannerFormState, formData: FormData): Promise<BannerFormState> {
  const raw = {
    chipLabel: formData.get("chipLabel"),
    chipPrice: formData.get("chipPrice"),
    caption: formData.get("caption") || undefined,
    carType: formData.get("carType"),
    glow: formData.get("glow") || "rgba(61,139,255,.28)",
    isActive: formData.get("isActive") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  };

  const result = schema.safeParse(raw);
  if (!result.success) return { error: result.error.flatten().formErrors[0] ?? "입력값을 확인해주세요" };

  try {
    await prisma.banner.create({ data: result.data });
    revalidatePath("/");
    revalidatePath("/admin/banners");
    return { success: true };
  } catch {
    return { error: "배너 저장 중 오류가 발생했습니다." };
  }
}

export async function updateBanner(id: string, _prev: BannerFormState, formData: FormData): Promise<BannerFormState> {
  const raw = {
    chipLabel: formData.get("chipLabel"),
    chipPrice: formData.get("chipPrice"),
    caption: formData.get("caption") || undefined,
    carType: formData.get("carType"),
    glow: formData.get("glow") || "rgba(61,139,255,.28)",
    isActive: formData.get("isActive") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  };

  const result = schema.safeParse(raw);
  if (!result.success) return { error: result.error.flatten().formErrors[0] ?? "입력값을 확인해주세요" };

  try {
    await prisma.banner.update({ where: { id }, data: result.data });
    revalidatePath("/");
    revalidatePath("/admin/banners");
    return { success: true };
  } catch {
    return { error: "배너 수정 중 오류가 발생했습니다." };
  }
}

export async function deleteBanner(id: string) {
  await prisma.banner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

export async function toggleBannerActive(id: string, current: boolean) {
  await prisma.banner.update({ where: { id }, data: { isActive: !current } });
  revalidatePath("/");
  revalidatePath("/admin/banners");
}
