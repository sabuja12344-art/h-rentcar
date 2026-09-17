"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  stars: z.coerce.number().min(1).max(5).default(5),
  text: z.string().min(5, "후기 내용을 5자 이상 입력해주세요"),
  name: z.string().min(1, "이름을 입력해주세요"),
  detail: z.string().optional(),
  initial: z.string().min(1, "이니셜을 입력해주세요"),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().default(0),
});

export type ReviewFormState = { success?: boolean; error?: string };

export async function createReview(_prev: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
  const raw = {
    stars: formData.get("stars") || 5,
    text: formData.get("text"),
    name: formData.get("name"),
    detail: formData.get("detail") || undefined,
    initial: formData.get("initial"),
    isActive: formData.get("isActive") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  };

  const result = schema.safeParse(raw);
  if (!result.success) {
    const errs = result.error.flatten().fieldErrors;
    const first = Object.values(errs).flat()[0];
    return { error: first ?? "입력값을 확인해주세요" };
  }

  try {
    await prisma.review.create({ data: result.data });
    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch {
    return { error: "후기 저장 중 오류가 발생했습니다." };
  }
}

export async function updateReview(id: string, _prev: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
  const raw = {
    stars: formData.get("stars") || 5,
    text: formData.get("text"),
    name: formData.get("name"),
    detail: formData.get("detail") || undefined,
    initial: formData.get("initial"),
    isActive: formData.get("isActive") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  };

  const result = schema.safeParse(raw);
  if (!result.success) {
    const errs = result.error.flatten().fieldErrors;
    const first = Object.values(errs).flat()[0];
    return { error: first ?? "입력값을 확인해주세요" };
  }

  try {
    await prisma.review.update({ where: { id }, data: result.data });
    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch {
    return { error: "후기 수정 중 오류가 발생했습니다." };
  }
}

export async function deleteReview(id: string) {
  await prisma.review.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

export async function toggleReviewActive(id: string, current: boolean) {
  await prisma.review.update({ where: { id }, data: { isActive: !current } });
  revalidatePath("/");
  revalidatePath("/admin/reviews");
}
