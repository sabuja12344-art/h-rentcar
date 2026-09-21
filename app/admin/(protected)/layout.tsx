import { AdminNav } from "@/components/admin/AdminNav";
import { logout } from "@/app/actions/admin";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f8fafc", fontFamily: "inherit" }}>

      {/* 사이드바 */}
      <aside style={{
        width: "220px",
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        zIndex: 10,
      }}>
        {/* 로고 */}
        <div style={{ height: "60px", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid #e2e8f0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#2563eb", display: "grid", placeItems: "center", color: "#fff", fontSize: "14px", fontWeight: 900 }}>H</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>H-RENT</div>
              <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: 1 }}>관리자</div>
            </div>
          </div>
        </div>

        <AdminNav />

        {/* 하단 영역 */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid #e2e8f0", flexShrink: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
          <a
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f1f5f9")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <svg viewBox="0 0 20 20" width="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M2 8l8-6 8 6" /><path d="M4 7v11h4v-5h4v5h4V7" />
            </svg>
            홈 보기
          </a>
          <form action={logout}>
            <button
              type="submit"
              style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#fef2f2")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
            >
              <svg viewBox="0 0 20 20" width="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M13 10H5m0 0l2.5-2.5M5 10l2.5 2.5" /><path d="M7 4.5V4a1 1 0 011-1h7a1 1 0 011 1v12a1 1 0 01-1 1H8a1 1 0 01-1-1v-.5" />
              </svg>
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* 우측 본문 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* 탑바 */}
        <header style={{ height: "60px", flexShrink: 0, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 32px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>현대렌트카 관리자 시스템</span>
        </header>

        {/* 콘텐츠 */}
        <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
