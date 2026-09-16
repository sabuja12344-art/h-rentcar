import { AdminNav } from "@/components/admin/AdminNav";
import { logout } from "@/app/actions/admin";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* 사이드바 */}
      <aside className="w-[210px] shrink-0 bg-panel border-r border-[var(--line)] flex flex-col">
        <div className="h-[60px] flex items-center px-5 border-b border-[var(--line)] shrink-0">
          <span className="font-black text-[15px]">
            <span className="text-gold">H</span>-RENT
          </span>
          <span className="ml-2 text-[10px] text-ink-dim bg-[rgba(255,255,255,0.07)] px-[7px] py-[2px] rounded-full">
            관리자
          </span>
        </div>

        <AdminNav />

        <div className="px-3 pb-4 shrink-0">
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-[12px] py-[10px] rounded-[10px] text-[12px] text-ink-dim hover:bg-[rgba(255,255,255,0.05)] hover:text-ink transition-colors"
            >
              <span className="text-[14px]">↩</span>
              로그아웃
            </button>
          </form>
          <a
            href="/"
            className="w-full flex items-center gap-2 px-[12px] py-[8px] rounded-[10px] text-[12px] text-ink-dim hover:text-ink transition-colors"
          >
            <span className="text-[14px]">↗</span>
            홈 보기
          </a>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
