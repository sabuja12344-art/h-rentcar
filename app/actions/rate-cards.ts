"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRateCard(fd: FormData): Promise<void> {
  const name = (fd.get("name") as string)?.trim();
  if (!name) return;
  const price = fd.get("startingPrice");
  const startingPrice = price && price !== "" ? Number(price) : null;
  const sortOrder = Number(fd.get("sortOrder") || 0);
  await prisma.rateCard.create({ data: { id: crypto.randomUUID(), name, startingPrice, sortOrder } });
  revalidatePath("/admin/rate-cards");
  revalidatePath("/");
}

export async function updateRateCard(id: string, fd: FormData): Promise<void> {
  const name = (fd.get("name") as string)?.trim();
  const price = fd.get("startingPrice");
  const startingPrice = price && price !== "" ? Number(price) : null;
  const sortOrder = Number(fd.get("sortOrder") || 0);
  await prisma.rateCard.update({ where: { id }, data: { name, startingPrice, sortOrder } });
  revalidatePath("/admin/rate-cards");
  revalidatePath("/");
}

export async function deleteRateCard(id: string): Promise<void> {
  await prisma.rateCard.delete({ where: { id } });
  revalidatePath("/admin/rate-cards");
  revalidatePath("/");
}
