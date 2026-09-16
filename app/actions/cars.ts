"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CarFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

const optStr = (schema = z.string()) =>
  schema.optional().transform((v) => v || null);

const carSchema = z.object({
  name: z.string().min(1, "차량명을 입력하세요"),
  nameEn: optStr(),
  category: z.enum(["세단", "SUV", "승합·미니밴", "경차", "전기·친환경"], {
    errorMap: () => ({ message: "차종을 선택하세요" }),
  }),
  brand: optStr(),
  monthlyPrice: z.coerce.number().int().min(1, "월 렌트료를 입력하세요"),
  year: optStr(),
  fuel: optStr(),
  seats: z.preprocess(
    (v) => (v === "" || v == null ? null : Number(v)),
    z.number().int().nullable()
  ),
  mileage: optStr(),
  contractTerms: optStr(),
  deposit: optStr(),
  description: optStr(),
  options: optStr(),
  label: optStr(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.preprocess((v) => v === "on", z.boolean()),
});

function flattenErrors(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}

export async function createCar(
  _prev: CarFormState,
  formData: FormData
): Promise<CarFormState> {
  const result = carSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { fieldErrors: flattenErrors(result.error) };
  }
  try {
    await prisma.car.create({ data: result.data });
  } catch {
    return { error: "저장 중 오류가 발생했습니다." };
  }
  revalidatePath("/admin/cars");
  revalidatePath("/");
  redirect("/admin/cars");
}

export async function updateCar(
  id: string,
  _prev: CarFormState,
  formData: FormData
): Promise<CarFormState> {
  const result = carSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { fieldErrors: flattenErrors(result.error) };
  }
  try {
    await prisma.car.update({ where: { id }, data: result.data });
  } catch {
    return { error: "수정 중 오류가 발생했습니다." };
  }
  revalidatePath("/admin/cars");
  revalidatePath("/");
  redirect("/admin/cars");
}

export async function deleteCar(id: string): Promise<void> {
  await prisma.car.delete({ where: { id } });
  revalidatePath("/admin/cars");
  revalidatePath("/");
}

export async function toggleCarActive(id: string, current: boolean): Promise<void> {
  await prisma.car.update({ where: { id }, data: { isActive: !current } });
  revalidatePath("/admin/cars");
  revalidatePath("/");
}