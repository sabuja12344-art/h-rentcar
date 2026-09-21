"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/admin",
    label: "대시보드",
    exact: true,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="3" y="3" width="6" height="6" rx="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/cars",
    label: "차량 관리",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 13l1.5-5h9L16 13" />
        <rect x="3" y="13" width="14" height="3.5" rx="1" />
        <circle cx="6.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="13.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "/admin/categories",
    label: "카테고리",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M3 5h14M3 10h14M3 15h8" />
      </svg>
    ),
  },
  {
    href: "/admin/rate-cards",
    label: "요금표",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </svg>
    ),
  },
  {
    href: "/admin/inquiries",
    label: "상담 문의",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h14v9H3z" />
        <path d="M7 17l3-4 3 4" />
      </svg>
    ),
  },
  {
    href: "/admin/banners",
    label: "배너 관리",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="2" y="5" width="16" height="10" rx="1.5" />
        <path d="M2 8h16" />
      </svg>
    ),
  },
  {
    href: "/admin/reviews",
    label: "후기 관리",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.4l-4.8 2.5.9-5.4L2.2 7.7l5.4-.8z" />
      </svg>
    ),
  },
  {
    href: "/admin/settings",
    label: "설정",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="2.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
      </svg>
    ),
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
      {navItems.map((item) => {
        const active = item.exact ? pathname === item.href : (pathname?.startsWith(item.href) && item.href !== "/admin");
        const isActive = item.exact ? pathname === item.href : active;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: isActive ? 600 : 400,
              textDecoration: "none",
              background: isActive ? "#2563eb" : "transparent",
              color: isActive ? "#fff" : "#475569",
              transition: "background .12s, color .12s",
            }}
            onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; }}
            onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
