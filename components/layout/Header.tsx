"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/#fleet", label: "차량안내" },
  { href: "/#solutions", label: "장기렌트 안내" },
  { href: "/#consult", label: "상담문의" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-bg-deep/72 backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between h-[72px]">
        {/* 로고 */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-[11px] font-black text-xl tracking-tight"
        >
          <span className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-gold-soft to-gold grid place-items-center text-[#1a1305] text-[17px] font-black shadow-[0_4px_14px_rgba(200,161,90,0.28)]">
            H
          </span>
          <span>
            H-RENT <span className="text-gold">CAR</span>
          </span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden sm:flex items-center gap-[38px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[15px] text-ink-soft font-medium transition-colors duration-200 hover:text-ink after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#consult"
            className="px-5 py-[10px] rounded-full text-sm font-bold bg-gold text-[#1a1305] transition-all duration-150 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(200,161,90,0.35)]"
          >
            견적 상담
          </Link>
        </nav>

        {/* 햄버거 버튼 (모바일 전용) */}
        <button
          className="flex sm:hidden flex-col gap-[5px] p-2 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="메뉴"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-ink rounded-sm transition-all duration-200 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink rounded-sm transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink rounded-sm transition-all duration-200 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* 모바일 드로어 */}
      <nav
        className={`sm:hidden fixed inset-x-0 top-[72px] z-40 flex flex-col border-b border-[var(--line)] bg-bg-deep/[98%] backdrop-blur-md px-6 pb-5 pt-2 transition-transform duration-300 ${
          menuOpen ? "translate-y-0" : "-translate-y-[120%]"
        }`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="w-full py-[15px] border-b border-[var(--line)] text-base font-medium text-ink-soft"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/#consult"
          onClick={closeMenu}
          className="mt-[14px] text-center px-5 py-[14px] rounded-full text-sm font-bold bg-gold text-[#1a1305]"
        >
          견적 상담
        </Link>
      </nav>
    </header>
  );
}
