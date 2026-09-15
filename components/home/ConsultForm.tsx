"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type InquiryState } from "@/app/actions/submitInquiry";

const inputClass =
  "w-full px-[14px] py-[13px] rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.04)] border border-[var(--line-strong)] text-ink placeholder:text-ink-dim transition-colors duration-150 focus:outline-none focus:border-gold";

const errorClass = "text-[11px] text-red-400 mt-[5px]";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className={errorClass}>{msg}</p>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-[15px] rounded-[11px] border-0 cursor-pointer text-[15px] font-black text-[#1a1305] bg-gradient-to-br from-gold-soft to-gold mt-1 transition-all duration-200 hover:brightness-105 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
    >
      {pending ? "전송 중..." : "상담 신청하기"}
    </button>
  );
}

const initial: InquiryState = {};

export function ConsultForm() {
  const [state, action] = useActionState(submitInquiry, initial);

  if (state.success) {
    return (
      <div className="bg-[rgba(7,11,19,0.5)] border border-[var(--line)] rounded-[16px] p-6 flex flex-col items-center justify-center gap-4 min-h-[320px] text-center">
        <div className="w-16 h-16 rounded-full bg-[rgba(200,161,90,0.14)] grid place-items-center text-gold-soft">
          <svg viewBox="0 0 24 24" width="30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <div className="text-[18px] font-black">상담 신청 완료!</div>
          <div className="text-ink-soft text-[14px] mt-2 leading-[1.7]">
            빠른 시일 내에 담당자가 연락드리겠습니다.
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-[13px] text-gold-soft underline underline-offset-2 mt-2"
        >
          다시 신청하기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(7,11,19,0.5)] border border-[var(--line)] rounded-[16px] p-6">
      {state.error && (
        <div className="mb-4 px-4 py-3 rounded-[10px] bg-red-500/10 border border-red-500/30 text-red-400 text-[13px]">
          {state.error}
        </div>
      )}
      <form action={action}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[12px] text-ink-soft mb-[6px] font-semibold">
              이름 <span className="text-gold">*</span>
            </label>
            <input name="name" type="text" placeholder="홍길동" className={inputClass} />
            <FieldError msg={state.fieldErrors?.name} />
          </div>
          <div>
            <label className="block text-[12px] text-ink-soft mb-[6px] font-semibold">
              연락처 <span className="text-gold">*</span>
            </label>
            <input name="phone" type="tel" placeholder="010-0000-0000" className={inputClass} />
            <FieldError msg={state.fieldErrors?.phone} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[12px] text-ink-soft mb-[6px] font-semibold">
              희망 차종
            </label>
            <input name="carInterest" type="text" placeholder="예: 그랜저" className={inputClass} />
          </div>
          <div>
            <label className="block text-[12px] text-ink-soft mb-[6px] font-semibold">
              문의 유형 <span className="text-gold">*</span>
            </label>
            <select name="type" className={inputClass} style={{ colorScheme: "dark" }} defaultValue="신규">
              <option value="신규">신규 상담</option>
              <option value="견적">견적 요청</option>
              <option value="기타">기타 문의</option>
            </select>
            <FieldError msg={state.fieldErrors?.type} />
          </div>
        </div>
        <div className="mb-1">
          <label className="block text-[12px] text-ink-soft mb-[6px] font-semibold">
            문의 내용
          </label>
          <textarea
            name="message"
            placeholder="희망 계약기간, 예산 등을 남겨주세요."
            rows={3}
            className={`${inputClass} resize-y min-h-[74px]`}
          />
        </div>
        <SubmitButton />
        <label className="flex gap-[7px] items-start text-[12px] text-ink-dim mt-3 cursor-pointer">
          <input name="agreedPrivacy" type="checkbox" value="on" className="mt-[2px] shrink-0" />
          개인정보 수집 및 이용에 동의합니다.
        </label>
        <FieldError msg={state.fieldErrors?.agreedPrivacy} />
      </form>
    </div>
  );
}
