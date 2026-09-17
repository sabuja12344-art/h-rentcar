import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "H-RENT CAR | 광주 월 장기렌트",
    template: "%s | H-RENT CAR",
  },
  description:
    "광주·전남 월 장기렌트 전문 H-RENT CAR. 세단·SUV·전기차·승합 120여 종, 보험·정비 포함, 초기비용 없이 월 43만원부터 시작.",
  keywords: ["광주 장기렌트", "광주 월렌트", "장기렌트", "H-RENT CAR", "광주 렌트카"],
  openGraph: {
    title: "H-RENT CAR | 광주 월 장기렌트",
    description: "광주·전남 월 장기렌트 전문. 보험·정비 포함, 월 43만원부터 시작.",
    url: "https://h-rentcar.kr",
    siteName: "H-RENT CAR",
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
      </body>
    </html>
  );
}
