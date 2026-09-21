"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CarFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

const optStr = () => z.string().optional().transform((v) => v || null);

const RENTAL_OPTIONS = ["단기렌트", "장기렌트", "월렌트"];
const OPTION_LIST = ["금연", "네비", "블랙박스", "후방카메라", "하이패스", "만21세이상", "열선시트", "통풍시트", "열선핸들", "카플레이", "원격시동"];

const carSchema = z.object({
  name: z.string().min(1, "차량명을 입력하세요"),
  nameEn: optStr(),
  slug: optStr(),
  category: z.string().min(1, "차종을 선택하세요"),
  brand: optStr(),
  monthlyPrice: z.coerce.number().int().min(1, "월 렌트료를 입력하세요"),
  dailyPrice: z.preprocess((v) => (!v || v === "" ? null : Number(v)), z.number().int().nullable()),
  year: optStr(),
  fuel: optStr(),
  seats: z.preprocess((v) => (!v || v === "" ? null : Number(v)), z.number().int().nullable()),
  mileage: optStr(),
  contractTerms: optStr(),
  deposit: optStr(),
  description: optStr(),
  thumbnail: optStr(),
  label: optStr(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.preprocess((v) => v === "on", z.boolean()),
  isFeatured: z.preprocess((v) => v === "on", z.boolean()),
});

function flattenErrors(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}

function parseCheckboxArray(formData: FormData, name: string, allowed: string[]): string {
  const selected = allowed.filter((v) => formData.get(`${name}__${v}`) === "on");
  return JSON.stringify(selected);
}

export async function createCar(_prev: CarFormState, formData: FormData): Promise<CarFormState> {
  const raw = Object.fromEntries(formData.entries());
  const result = carSchema.safeParse(raw);
  if (!result.success) return { fieldErrors: flattenErrors(result.error) };

  const options = parseCheckboxArray(formData, "opt", OPTION_LIST);
  const rentalTypes = parseCheckboxArray(formData, "rental", RENTAL_OPTIONS);

  try {
    const { thumbnail, ...rest } = result.data;
    await prisma.car.create({ data: { ...rest, thumbnail: thumbnail ?? "", options, rentalTypes } });
  } catch {
    return { error: "저장 중 오류가 발생했습니다." };
  }
  revalidatePath("/admin/cars");
  revalidatePath("/");
  redirect("/admin/cars");
}

export async function updateCar(id: string, _prev: CarFormState, formData: FormData): Promise<CarFormState> {
  const raw = Object.fromEntries(formData.entries());
  const result = carSchema.safeParse(raw);
  if (!result.success) return { fieldErrors: flattenErrors(result.error) };

  const options = parseCheckboxArray(formData, "opt", OPTION_LIST);
  const rentalTypes = parseCheckboxArray(formData, "rental", RENTAL_OPTIONS);

  try {
    const { thumbnail, ...rest } = result.data;
    await prisma.car.update({ where: { id }, data: { ...rest, thumbnail: thumbnail ?? undefined, options, rentalTypes } });
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

export async function toggleCarFeatured(id: string, current: boolean): Promise<void> {
  await prisma.car.update({ where: { id }, data: { isFeatured: !current } });
  revalidatePath("/admin/cars");
  revalidatePath("/");
}
