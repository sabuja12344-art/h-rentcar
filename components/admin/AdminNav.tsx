"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/admin",
    label: "대시보드",
    exact: true,
    icon: (
      <svg viewBox="0 0 20 20" width="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
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
      <svg viewBox="0 0 20 20" width="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 13l1.5-5h9L16 13" />
        <rect x="3" y="13" width="14" height="4" rx="1" />
        <circle cx="6.5" cy="17" r="1" fill="currentColor" stroke="none" />
        <circle cx="13.5" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "/admin/inquiries",
    label: "상담 문의",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h14v10H3z" />
        <path d="M3 14l4 3 3-3" />
      </svg>
    ),
  },
  {
    href: "/admin/banners",
    label: "배너 관리",
    exact: false,
    icon: (
      <svg viewBox="0 0 20 20" width="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
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
      <svg viewBox="0 0 20 20" width="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.4l-4.8 2.5.9-5.4L2.2 7.7l5.4-.8z" />
      </svg>
    ),
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
      {navItems.map((item) => {
        const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
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
              fontSize: "13px",
              fontWeight: active ? 600 : 500,
              textDecoration: "none",
              background: active ? "#2563eb" : "transparent",
              color: active ? "#fff" : "#64748b",
              transition: "all .15s",
            }}
            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; }}
            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <span style={{ flexShrink: 0 }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
