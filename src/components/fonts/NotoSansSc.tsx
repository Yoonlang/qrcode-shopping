import { Noto_Sans_SC } from "next/font/google";
import { ReactNode } from "react";

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
});

export default function NotoSansSc({ children }: { children: ReactNode }) {
  return <body className={notoSansSc.className}>{children}</body>;
}
