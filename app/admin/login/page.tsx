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
      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.6 : 1 }}
    >
      {pending ? "로그인 중..." : "로그인"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, action] = useActionState<LoginState, FormData>(login, {});

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8fafc", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "360px" }}>
        {/* 로고 */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "14px", background: "#2563eb", color: "#fff", fontSize: "22px", fontWeight: 900, marginBottom: "14px" }}>
            H
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>관리자 로그인</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>H-RENT CAR 어드민</p>
        </div>

        {/* 폼 카드 */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "28px" }}>
          {state.error && (
            <div style={{ marginBottom: "16px", padding: "10px 14px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px" }}>
              {state.error}
            </div>
          )}
          <form action={action} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", marginBottom: "6px" }}>
                비밀번호
              </label>
              <input
                name="password"
                type="password"
                placeholder="관리자 비밀번호"
                autoComplete="current-password"
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <LoginButton />
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "20px" }}>
          <a href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>← 홈으로 돌아가기</a>
        </p>
      </div>
    </div>
  );
}
