"use client";
import Script from "next/script";

export function NaverScript() {
  return (
    <>
      <Script src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
      <Script id="naver-wcs-init" strategy="afterInteractive">{`
        if (!wcs_add) var wcs_add={};
        wcs_add["wa"] = "s_4b5dc677bbb";
        if (!_nasa) var _nasa={};
        if(window.wcs){ wcs.inflow(); wcs_do(); }
      `}</Script>
    </>
  );
}
