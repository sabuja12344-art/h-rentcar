"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingButtons } from "./FloatingButtons";
import { SideQuickForm } from "./SideQuickForm";
import { siteConfig } from "@/config/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
      <SideQuickForm />

      {/* 모바일 하단 바 */}
      <nav
        className="sm:hidden fixed left-0 right-0 bottom-0 z-[90] grid grid-cols-4 border-t border-[var(--glass-line)]"
        style={{
          background: "rgba(255,255,255,.97)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 -2px 12px rgba(26,34,51,.08)",
        }}
      >
        <Link
          href={`tel:${siteConfig.phone}`}
          className="flex flex-col items-center gap-1 py-[10px] text-[11px] text-ink-soft"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
          </svg>
          전화
        </Link>
        <Link
          href={siteConfig.kakaoOpenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-[10px] text-[11px] text-ink-soft"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.7 1.8 5.1 4.6 6.5l-1 3.6 4-2.6c.8.1 1.6.2 2.4.2 5.5 0 10-3.5 10-7.9S17.5 3 12 3z" />
          </svg>
          카톡
        </Link>
        <Link
          href="/#fleet"
          className="flex flex-col items-center gap-1 py-[10px] text-[11px] text-ink-soft"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 15l1.5-5a2 2 0 012-1.5h9a2 2 0 012 1.5L20 15" />
            <rect x="3" y="15" width="18" height="4" rx="1.5" />
          </svg>
          차량
        </Link>
        <Link
          href="/#consult"
          className="flex flex-col items-center gap-1 py-[10px] text-[11px] text-blue-bright"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M4 4h16c1 0 2 .9 2 2v10c0 1-1 2-2 2H8l-4 4V6c0-1 1-2 2-2z" />
          </svg>
          상담신청
        </Link>
      </nav>
    </>
  );
}
