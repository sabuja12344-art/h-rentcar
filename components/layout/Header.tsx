"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#fleet", label: "차량안내" },
  { href: "/#steps", label: "장기렌트 안내" },
  { href: "/#consult", label: "상담문의" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-[100] border-b border-[var(--glass-line)]"
      style={{
        height: "var(--header-h)",
        background: "rgba(255,255,255,.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="wrap h-full flex items-center justify-between">
        {/* 로고 */}
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-[10px] font-black text-[19px] tracking-[-0.01em]"
        >
          <span
            className="w-8 h-8 rounded-[9px] grid place-items-center text-white font-black text-[16px]"
            style={{
              background: "linear-gradient(145deg,#4f86f0,#2f6be6)",
              boxShadow: "0 4px 12px rgba(47,107,230,.35)",
            }}
          >
            H
          </span>
          <span>
            현대<span className="text-blue-bright">렌트카</span>
          </span>
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] text-ink-soft font-medium transition-colors duration-150 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#consult"
            className="px-[18px] py-[9px] rounded-full text-[14px] font-bold text-white transition-all duration-150 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg,#4f86f0,#2f6be6)",
              boxShadow: "0 6px 16px rgba(47,107,230,.3)",
            }}
          >
            견적 상담
          </Link>
        </nav>

        {/* 햄버거 (모바일) */}
        <button
          className="flex sm:hidden flex-col gap-[5px] p-2 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="메뉴"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-ink rounded-sm transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink rounded-sm transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink rounded-sm transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* 모바일 드로어 */}
      <nav
        className={`sm:hidden fixed inset-x-0 top-[var(--header-h)] z-40 flex flex-col border-b border-[var(--line)] px-6 pb-5 pt-2 transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-[130%]"}`}
        style={{
          background: "rgba(255,255,255,.98)",
          backdropFilter: "blur(12px)",
        }}
        aria-hidden={!menuOpen}
      >
        {navLinks.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            className="w-full py-[15px] border-b border-[var(--line)] text-base font-medium text-ink-soft"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/#consult"
          onClick={close}
          className="mt-[14px] text-center px-5 py-[14px] rounded-full text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#4f86f0,#2f6be6)" }}
        >
          견적 상담
        </Link>
      </nav>
    </header>
  );
}
