"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCategory(id: string, label: string, sortOrder: number): Promise<void> {
  await prisma.category.update({ where: { id }, data: { label, sortOrder } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}
