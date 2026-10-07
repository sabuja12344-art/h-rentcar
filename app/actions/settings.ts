"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* 폼에 없으면 false로 저장해야 하는 체크박스 키 목록 */
const BOOLEAN_KEYS = ["sms_enabled", "kakao_notify_enabled"];

export async function saveSettings(fd: FormData): Promise<void> {
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

    /* 체크박스가 미체크 상태면 FormData에 포함되지 않으므로 명시적으로 false 저장 */
    for (const boolKey of BOOLEAN_KEYS) {
      const inForm = entries.some(([k]) => k === boolKey);
      if (!inForm) {
        ops.push(
          prisma.siteSetting.upsert({
            where: { key: boolKey },
            update: { value: "false" },
            create: { key: boolKey, value: "false" },
          })
        );
      }
    }

    await Promise.all(ops);
    revalidatePath("/");
    revalidatePath("/admin/settings");
  } catch (e) {
    console.error("Settings save error:", e);
  }
  redirect("/admin/settings?saved=1");
}
