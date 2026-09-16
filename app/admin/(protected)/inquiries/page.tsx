import { prisma } from "@/lib/prisma";
import { updateInquiryStatus } from "@/app/actions/inquiries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "상담 목록 | 어드민" };

const STATUS_FLOW: Record<string, { label: string; next: string; nextLabel: string; color: string }> = {
  NEW: { label: "신규", next: "IN_PROGRESS", nextLabel: "→ 처리중", color: "bg-gold/10 text-gold" },
  IN_PROGRESS: { label: "처리중", next: "DONE", nextLabel: "→ 완료", color: "bg-blue-500/10 text-blue-400" },
  DONE: { label: "완료", next: "NEW", nextLabel: "→ 재개", color: "bg-[rgba(255,255,255,0.06)] text-ink-dim" },
};

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const newCount = inquiries.filter((i) => i.status === "NEW").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-black">상담 목록</h1>
          <p className="text-ink-dim text-[13px] mt-1">
            총 {inquiries.length}건
            {newCount > 0 && (
              <span className="ml-2 text-gold font-semibold">신규 {newCount}건</span>
            )}
          </p>
        </div>
      </div>

      <div className="bg-panel border border-[var(--line)] rounded-[14px] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--line)]">
              {["일시", "이름", "연락처", "희망 차종", "유형", "문의 내용", "상태"].map((h) => (
                <th key={h} className="text-left text-[11px] text-ink-dim font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink-dim text-[13px]">
                  접수된 상담이 없습니다.
                </td>
              </tr>
            )}
            {inquiries.map((inq) => {
              const s = STATUS_FLOW[inq.status] ?? STATUS_FLOW.NEW;
              const nextAction = updateInquiryStatus.bind(null, inq.id, s.next);

              return (
                <tr key={inq.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="py-3 px-4 text-[12px] text-ink-dim whitespace-nowrap">
                    {inq.createdAt.toLocaleDateString("ko-KR")}
                    <div className="text-[10px]">
                      {inq.createdAt.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[13px] font-semibold">{inq.name}</td>
                  <td className="py-3 px-4 text-[13px] text-ink-soft">
                    <a href={`tel:${inq.phone}`} className="hover:text-gold transition-colors">
                      {inq.phone}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-ink-soft">{inq.carInterest || "—"}</td>
                  <td className="py-3 px-4 text-[12px] text-ink-soft">{inq.type || "—"}</td>
                  <td className="py-3 px-4 text-[12px] text-ink-soft max-w-[200px] truncate" title={inq.message ?? ""}>
                    {inq.message || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-[5px] items-start">
                      <span className={`text-[11px] font-semibold px-[10px] py-[3px] rounded-full ${s.color}`}>
                        {s.label}
                      </span>
                      <form action={nextAction}>
                        <button
                          type="submit"
                          className="text-[10px] text-ink-dim hover:text-ink transition-colors underline underline-offset-2"
                        >
                          {s.nextLabel}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}