"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "대시보드", exact: true },
  { href: "/admin/cars", label: "차량 관리", exact: false },
  { href: "/admin/inquiries", label: "상담 목록", exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-4 px-3 space-y-[2px]">
      {navItems.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-[10px] px-[12px] py-[10px] rounded-[10px] text-[13px] font-medium transition-colors ${
              active
                ? "bg-[rgba(200,161,90,0.12)] text-gold-soft"
                : "text-ink-soft hover:bg-[rgba(255,255,255,0.05)] hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}