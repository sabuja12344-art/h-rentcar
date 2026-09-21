import { AdminNav } from "@/components/admin/AdminNav";
import { logout } from "@/app/actions/admin";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#fff" }}>

      {/* 사이드바 */}
      <aside style={{ width: "190px", flexShrink: 0, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column" }}>
        {/* 로고 */}
        <div style={{ height: "56px", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#2563eb" }}>H-RENT</span>
          <span style={{ fontSize: "12px", color: "#94a3b8", marginLeft: "6px", fontWeight: 500 }}>어드민</span>
        </div>

        <AdminNav />

        {/* 홈 보기 */}
        <div style={{ padding: "12px", borderTop: "1px solid #e5e7eb", flexShrink: 0 }}>
          <a
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "8px", fontSize: "12px", color: "#94a3b8", textDecoration: "none" }}
          >
            <svg viewBox="0 0 16 16" width="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 8l6-6 6 6" /><path d="M4 6v8h3v-4h2v4h3V6" />
            </svg>
            홈 보기
          </a>
        </div>
      </aside>

      {/* 우측 전체 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* 탑바 */}
        <header style={{ height: "56px", flexShrink: 0, background: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>현대렌트카 관리자</span>
          <form action={logout}>
            <button
              type="submit"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", fontSize: "12px", color: "#64748b", cursor: "pointer", fontWeight: 500 }}
            >
              <svg viewBox="0 0 16 16" width="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M10 8H3m0 0l2.5-2.5M3 8l2.5 2.5" /><path d="M6 4V3a1 1 0 011-1h5a1 1 0 011 1v10a1 1 0 01-1 1H7a1 1 0 01-1-1v-1" />
              </svg>
              로그아웃
            </button>
          </form>
        </header>

        {/* 콘텐츠 */}
        <main style={{ flex: 1, overflow: "auto", padding: "32px 36px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
