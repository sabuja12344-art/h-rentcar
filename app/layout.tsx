import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { FooterSlot } from "@/components/layout/FooterSlot";
import { NaverScript } from "@/components/NaverScript";

export const metadata: Metadata = {
  title: {
    default: "현대렌트카 | 화성 월 장기렌트",
    template: "%s | 현대렌트카",
  },
  description:
    "화성·경기 당일배차/월장기/장기렌트 현대렌트카. 경차부터 수입/프리미엄까지 120여 종, 보험·정비 포함, 초기비용 없이 월 24만원부터 시작.",
  keywords: ["화성 장기렌트", "화성 월렌트", "장기렌트", "현대렌트카", "화성 렌트카", "경기 렌트카"],
  openGraph: {
    title: "현대렌트카 | 화성 월 장기렌트",
    description: "화성·경기 당일배차/월장기/장기렌트 현대렌트카. 보험·정비 포함, 월 24만원부터 시작.",
    url: "https://h-rentcar.kr",
    siteName: "현대렌트카",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-deep text-ink">
        <SiteShell>{children}</SiteShell>
        <FooterSlot>
          <Footer />
          <FloatingButtons />
        </FooterSlot>
        <NaverScript />
      </body>
    </html>
  );
}
