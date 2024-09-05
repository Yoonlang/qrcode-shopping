import { Noto_Sans } from "next/font/google";
import { ReactNode } from "react";

const notoSans = Noto_Sans({
  subsets: ["latin"],
});

export default function NotoSans({ children }: { children: ReactNode }) {
  return <body className={notoSans.className}>{children}</body>;
}
