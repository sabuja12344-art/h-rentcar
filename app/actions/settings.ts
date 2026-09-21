"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettings(fd: FormData): Promise<{ success?: boolean; error?: string }> {
  try {
    const entries = Array.from(fd.entries()) as [string, string][];
    const ops = entries
      .filter(([key]) => key !== "")
      .map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      );
    await Promise.all(ops);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch {
    return { error: "저장 중 오류가 발생했습니다." };
  }
}
