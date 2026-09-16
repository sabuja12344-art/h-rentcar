"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/actions/admin";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-[13px] rounded-[10px] text-[14px] font-black text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
    >
      {pending ? "로그인 중..." : "로그인"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, action] = useActionState<LoginState, FormData>(login, {});

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] bg-gradient-to-br from-gold-soft to-gold text-[#1a1305] font-black text-[24px] mb-4">
            H
          </div>
          <h1 className="text-[22px] font-black">관리자 로그인</h1>
          <p className="text-ink-dim text-[13px] mt-1">H-RENT CAR 어드민</p>
        </div>

        <div className="bg-panel border border-[var(--line)] rounded-[16px] p-6">
          {state.error && (
            <div className="mb-4 px-4 py-3 rounded-[10px] bg-red-500/10 border border-red-500/30 text-red-400 text-[13px]">
              {state.error}
            </div>
          )}
          <form action={action} className="space-y-4">
            <div>
              <label className="block text-[12px] text-ink-dim font-semibold mb-[6px] uppercase tracking-wide">
                비밀번호
              </label>
              <input
                name="password"
                type="password"
                placeholder="관리자 비밀번호"
                autoComplete="current-password"
                className="w-full px-3 py-[12px] rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] border border-[var(--line-strong)] text-ink placeholder:text-ink-dim focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <LoginButton />
          </form>
        </div>

        <p className="text-center text-[12px] text-ink-dim mt-6">
          <a href="/" className="hover:text-ink transition-colors">← 홈으로 돌아가기</a>
        </p>
      </div>
    </div>
  );
}