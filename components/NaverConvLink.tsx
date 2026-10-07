"use client";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function naverConvert() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.wcs) {
      if (!w.wcs_add) w.wcs_add = {};
      w.wcs_add["wa"] = "s_4b5dc677bbb";
      w.wcs.trans({ type: "lead" });
    }
  } catch {}
}

export function NaverConvLink({ onClick, children, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        naverConvert();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
