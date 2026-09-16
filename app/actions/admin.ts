"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password") as string;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "비밀번호가 올바르지 않습니다." };
  }

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return { error: "서버 설정 오류입니다. 관리자에게 문의하세요." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}