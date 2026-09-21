"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitSideInquiry, type SideInquiryState } from "@/app/actions/submitSideInquiry";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: "8px",
  border: "1px solid var(--line-strong)",
  background: "#ffffff",
  fontSize: "13px",
  color: "var(--color-ink)",
  outline: "none",
  transition: "border-color .15s",
  boxSizing: "border-box",
};

function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ fontSize: "11px", color: "var(--color-red)", marginTop: "3px" }}>{msg}</p>;
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%",
        padding: "11px",
        borderRadius: "9px",
        border: "none",
        background: "linear-gradient(135deg,#4f86f0,#2f6be6)",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 800,
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.7 : 1,
        boxShadow: "0 6px 16px rgba(47,107,230,.3)",
        transition: "opacity .15s",
      }}
    >
      {pending ? "전송 중..." : "상담 신청하기"}
    </button>
  );
}

const initial: SideInquiryState = {};

export function SideQuickForm() {
  const [state, action] = useActionState(submitSideInquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    /* 데스크탑 전용 — 모바일/태블릿에서 숨김 */
    <div
      className="hidden lg:block"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "296px",   /* float-btns(4개×52px + 3gap×11px = 241px) + bottom:22px + 여백 */
        width: "272px",
        zIndex: 79,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(26,34,51,.14), 0 2px 8px rgba(26,34,51,.08)",
        border: "1px solid var(--line)",
        background: "#fff",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          background: "linear-gradient(135deg,#2f6be6,#4f86f0)",
          padding: "13px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg viewBox="0 0 24 24" width="16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1 0 2 .9 2 2v10c0 1-1 2-2 2H8l-4 4V6c0-1 1-2 2-2z" />
        </svg>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: "14px" }}>빠른 견적 문의</span>
      </div>

      {/* 폼 바디 */}
      <div style={{ padding: "14px 14px 16px" }}>
        {state.success ? (
          /* 완료 상태 */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(18,178,106,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <svg viewBox="0 0 24 24" width="22" fill="none" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--color-ink)" }}>상담 신청 완료!</div>
            <div style={{ fontSize: "12px", color: "var(--color-ink-dim)", marginTop: "6px", lineHeight: 1.6 }}>
              담당자가 빠르게 연락드리겠습니다.
            </div>
          </div>
        ) : (
          <form ref={formRef} action={action} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {state.error && (
              <div style={{ padding: "8px 10px", borderRadius: "7px", background: "rgba(229,72,77,.08)", border: "1px solid rgba(229,72,77,.3)", fontSize: "11.5px", color: "var(--color-red)" }}>
                {state.error}
              </div>
            )}

            {/* 희망 차종 */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-ink-soft)", display: "block", marginBottom: "4px" }}>
                희망 차종 <span style={{ color: "var(--color-blue)" }}>*</span>
              </label>
              <input name="carInterest" type="text" placeholder="예: 그랜저, SUV" style={inputStyle} />
              <FieldErr msg={state.fieldErrors?.carInterest} />
            </div>

            {/* 성함 */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-ink-soft)", display: "block", marginBottom: "4px" }}>
                성함 <span style={{ color: "var(--color-blue)" }}>*</span>
              </label>
              <input name="name" type="text" placeholder="홍길동" style={inputStyle} />
              <FieldErr msg={state.fieldErrors?.name} />
            </div>

            {/* 연락처 */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-ink-soft)", display: "block", marginBottom: "4px" }}>
                연락처 <span style={{ color: "var(--color-blue)" }}>*</span>
              </label>
              <input name="phone" type="tel" placeholder="ex) 01012341234" style={inputStyle} />
              <FieldErr msg={state.fieldErrors?.phone} />
            </div>

            {/* 안내 방법 라디오 */}
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-ink-soft)", marginBottom: "6px" }}>
                견적 안내방법
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {(["전화", "문자", "카톡"] as const).map((method) => (
                  <label key={method} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "var(--color-ink-soft)", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      defaultChecked={method === "전화"}
                      style={{ accentColor: "var(--color-blue)", width: "14px", height: "14px" }}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>

            {/* 개인정보 동의 */}
            <label style={{ display: "flex", gap: "6px", alignItems: "flex-start", fontSize: "11.5px", color: "var(--color-ink-dim)", cursor: "pointer", lineHeight: 1.5 }}>
              <input name="agreedPrivacy" type="checkbox" value="on" style={{ marginTop: "2px", flexShrink: 0, accentColor: "var(--color-blue)", width: "13px", height: "13px" }} />
              개인정보 수집 및 이용에 동의합니다.
            </label>
            <FieldErr msg={state.fieldErrors?.agreedPrivacy} />

            <SubmitBtn />
          </form>
        )}
      </div>
    </div>
  );
}
